const db = require('../db');
const { v4: uuidv4 } = require('uuid');
var moment = require('moment');  


//* response to get any form page
exports.getForm = async (req, res, next) => {
    try {
        if (String(req.params)) {

            console.log({
                message: 'you have permission to access',
                params: req.params
            })
            next();

        } else {

            return res.status(200).json({
                success: true,
                message: 'you have permission to access'
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            role: req.user.role,
            message: "you don't have permission to access"
        })
    }
}

//* <<<< Dashboard data
const getSumByZone = async (wh_id, zone_id) => {

    try {
        const { rows } = await db.query(`
            SELECT COUNT(wh_trans.position_code) as total_positions, 
            COUNT(rm.position_code) as usage,
            (COUNT(wh_trans.position_code) - COUNT(rm.position_code)) as empty
            FROM raw_materials rm
            FULL OUTER JOIN warehouse_trans wh_trans ON rm.position_code = wh_trans.position_code 
            FULL OUTER JOIN warehouse wh ON wh_trans.warehouse_id = wh.warehouse_id
            WHERE wh_trans.warehouse_id = $1 
            AND wh_trans.zone = $2
        `, [wh_id, zone_id]);


        response = {
            warehouse: wh_id,
            zone: zone_id,
            positions: rows[0].total_positions,
            usage: rows[0].usage,
            empty: rows[0].empty,
        }

        return response;

    } catch (error) {
        console.log(error.message);
    }
}

const overallWarehouse = async (wh_id) => {
    try {
        //overall in a warehouse
        const overall = await  db.query(`
        SELECT COUNT(wh_trans.position_code) as total_positions, 
        COUNT(rm.position_code) as usage,
        (COUNT(wh_trans.position_code) - COUNT(rm.position_code)) as empty
        FROM raw_materials rm
        FULL OUTER JOIN warehouse_trans wh_trans ON rm.position_code = wh_trans.position_code 
        FULL OUTER JOIN warehouse wh ON wh_trans.warehouse_id = wh.warehouse_id
        WHERE wh_trans.warehouse_id = $1
        `, [wh_id])

        const response = {
            success: true,
            warehouse: wh_id,
            positions: overall.rows[0].total_positions,
            usage: overall.rows[0].usage,
            empty: overall.rows[0].empty,
        }

        return response

    } catch (error) {
        console.log(error.message);
    }
}

//*==================

//* (1) Get dashboard by warehouse_id 
exports.fetchData = async (req, res, next) => {

    const warehouse_id = String(req.params.wh_id);

    try { //get all items in same warehouse to get usage

        if (req.query.zone || req.query.category || req.query.page){
            next();
        } else {
    
            //summary each zone
            const zone_summary = await db.query(`
            SELECT wh_trans.zone as zone, COUNT(wh_trans.position_code) as total_positions, 
            COUNT(rm.position_code) as usage,
            (COUNT(wh_trans.position_code) - COUNT(rm.position_code)) as empty
            FROM raw_materials rm
            FULL OUTER JOIN warehouse_trans wh_trans ON rm.position_code = wh_trans.position_code 
            FULL OUTER JOIN warehouse wh ON wh_trans.warehouse_id = wh.warehouse_id
            WHERE wh_trans.warehouse_id = $1
            GROUP BY wh_trans.zone ORDER BY wh_trans.zone
            `, [warehouse_id])

            //overall in a warehouse
            const overall = await overallWarehouse(warehouse_id);

            return res.status(200).json({
                success: true,
                warehouse: warehouse_id,
                positions: overall.positions,
                usage: overall.usage,
                empty: overall.empty,
                zone_count: zone_summary.rowCount,
                summary: zone_summary.rows,
            })
        }
        
    } catch (error) {
        console.log(error.message);
    }
}

//* (2) If have any query params from fetchData
exports.fetchFilterItems = async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 10; //limit show data
        let category = req.query.category || "All";
        let zone = req.query.zone || "All";

        const warehouse_id = String(req.params.wh_id);

        if (category === "All" && zone === "All") {
            const items = await db.query(`
            SELECT rm.item_code, c.item_cate_code as category,
            rm.length, wh_trans.section, rm.create_dt, rm.item_status as status
            FROM raw_materials rm
            JOIN warehouse_trans wh_trans ON rm.position_code = wh_trans.position_code 
            JOIN warehouse wh ON wh_trans.warehouse_id = wh.warehouse_id
            JOIN category c ON rm.item_cate_code = c.item_cate_code
            WHERE wh_trans.warehouse_id = $1
            AND (rm.item_status = 'stock in' or rm.item_status = 'used')
            LIMIT $2
            OFFSET $3;
            `, [warehouse_id, limit, page])
            //overall in a warehouse
            const overall = await overallWarehouse(warehouse_id);

            return res.status(200).json({
                success: true,
                warehouse: warehouse_id,
                positions: overall.positions,
                usage: overall.usage,
                empty: overall.empty,
                page: page + 1,
                limit,
                items: items.rows
            });
        }
        else if(category === "All" && zone != "All"){
            zone = req.query.zone;
            const items = await db.query(`
            SELECT rm.item_code, c.item_cate_code as category,
            rm.length, wh_trans.section, rm.create_dt, rm.item_status as status
            FROM raw_materials rm
            JOIN warehouse_trans wh_trans ON rm.position_code = wh_trans.position_code 
            JOIN warehouse wh ON wh_trans.warehouse_id = wh.warehouse_id
            JOIN category c ON rm.item_cate_code = c.item_cate_code
            WHERE wh_trans.warehouse_id = $1
            AND wh_trans.zone = $2
            AND (rm.item_status = 'stock in' or rm.item_status = 'used')
            LIMIT $3
            OFFSET $4;
            `, [warehouse_id, zone, limit, page])

            const overall = await getSumByZone(warehouse_id,zone);

            return res.status(200).json({
                success: true,
                warehouse: warehouse_id,
                zone: zone,
                positions: overall.positions,
                usage: overall.usage,
                empty: overall.empty,
                page: page + 1,
                limit,
                items: items.rows
            });
        }
        else if(category != "All" && zone === "All"){
            category = req.query.category;
            const items = await db.query(`
            SELECT rm.item_code, c.item_cate_code as category,
            rm.length, wh_trans.section, rm.create_dt, rm.item_status as status
            FROM raw_materials rm
            JOIN warehouse_trans wh_trans ON rm.position_code = wh_trans.position_code 
            JOIN warehouse wh ON wh_trans.warehouse_id = wh.warehouse_id
            JOIN category c ON rm.item_cate_code = c.item_cate_code
            WHERE wh_trans.warehouse_id = $1
            AND rm.item_cate_code = $2
            AND (rm.item_status = 'stock in' or rm.item_status = 'used')
            LIMIT $3
            OFFSET $4;
            `, [warehouse_id, category, limit, page])
            //overall in a warehouse
            const overall = await overallWarehouse(warehouse_id);

            return res.status(200).json({
                success: true,
                warehouse: warehouse_id,
                positions: overall.positions,
                usage: overall.usage,
                empty: overall.empty,
                page: page + 1,
                limit,
                items: items.rows
            });
        }
        else {
            category = req.query.category;
            zone = req.query.zone;
            let items = await db.query(`
            SELECT rm.item_code, c.item_cate_code as category,
            rm.length, wh_trans.section, rm.create_dt, rm.item_status as status
            FROM raw_materials rm
            JOIN warehouse_trans wh_trans ON rm.position_code = wh_trans.position_code 
            JOIN warehouse wh ON wh_trans.warehouse_id = wh.warehouse_id
            JOIN category c ON rm.item_cate_code = c.item_cate_code
            WHERE wh_trans.warehouse_id = $1
            AND wh_trans.zone = $2
            AND (rm.item_status = 'stock in' or rm.item_status = 'used')
            AND rm.item_cate_code = $3
            LIMIT $4
            OFFSET $5;
            `, [warehouse_id, zone, category, limit, page])

            const overall = await getSumByZone(warehouse_id,zone);

            return res.status(200).json({
                success: true,
                warehouse: warehouse_id,
                zone: zone,
                positions: overall.positions,
                usage: overall.usage,
                empty: overall.empty,
                page: page + 1,
                limit,
                items: items.rows
            });

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            message: "Internal Server error"
        })

    }
}

//* Order section
exports.createOrder = async (req, res) => {

    const { items,remarks } = req.body;
    const user_id = req.user.user_id;
    let new_order_id = null;
    try {
        const prev_order = await db.query(`
            SELECT order_id FROM orders 
            ORDER BY create_dt DESC 
            LIMIT 1
            `)

        const prev_order_id = prev_order.rows[0].order_id

        console.log("prev_order: "+ prev_order_id);

        if (!validate_order_id(prev_order_id) ) {
            //if not find the correct format from previous order, create new
            new_order_id = 'AA0000000000'
        } else {
            new_order_id = genOrderID(prev_order_id);
        }

        genOrderTrans(new_order_id,items)

        //save to database
        await db.query(`
            INSERT INTO orders(order_id, order_remark, quantity, create_by)
            VALUES ($1,$2,$3,$4)`,[new_order_id, remarks, items.length, user_id ])

        items.map(async (item) => {
            //save order_transaction to database
            await db.query(`
            INSERT INTO order_transaction(order_id_trans, item_code, order_id)
            VALUES ($1,$2,$3)`,[item.order_id_trans, item.item_code, item.order_id ])

            let modify_dt = moment().format('YYYY-MM-DD HH:mm:ss.sss');
            //update item_status in raw_materials
            await db.query(`
            UPDATE  raw_materials SET item_status = 'in progress'
            , modify_by = $1, modify_dt = $2
            WHERE item_code = $3
            `,[user_id, modify_dt, item.item_code ])

        })

        return res.status(201).json({
            success: true,
            message: 'Create order was successful',
        })

    } catch (error) {
        console.log(error.message);
    }
}

exports.deleteOrder = async (req, res) => {
    const order_id = String(req.params.order_id);
    try {
        //UPDATE item_status
        //? item_status after delete order should be 'used'?
        //? create new column for used/new

        await db.query(`
            UPDATE raw_materials rm SET item_status = 'stock in'
            FROM order_transaction ot
            WHERE rm.item_code = ot.item_code
            AND order_id = $1
            `,[order_id])
        //DELETE from order_transaction before in orders
        await db.query(`
            DELETE FROM order_transaction WHERE order_id = $1
            `,[order_id])
        await db.query(`
            DELETE FROM orders WHERE order_id = $1
            `,[order_id])

        return res.status(201).json({
            success: true,
            message: 'Delete order was successful',
            order_id: order_id
        })


    }catch(error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message,
        })
    }
}

exports.getCompletedOrder = async (req, res) => {
    try {
        const { rows } = await db.query(`
            SELECT order_id, create_dt, quantity, order_status, 
            create_by as ordered_by
            FROM orders WHERE order_status = 'Completed'
            `);

        return res.status(500).json({
            message: 'you have permission to access',
            order_list: rows
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error: true,
            message: "Internal Server error"
        })
    }
}

exports.getCurrentOrder = async (req, res) => {
    try {
        const { rows } = await db.query(`
            SELECT order_id, create_dt, quantity, order_status, 
            create_by as ordered_by, progress_by
            FROM orders WHERE order_status != 'Completed'
            ORDER BY order_status DESC
        `)

        return res.status(200).json({
            message: 'you have permission to access',
            order_list: rows
        })

        
    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            error: true,
            message: "Internal Server error"
        })
    }
} 

const positionsGrid = (req, res) => {

}

exports.getOrderDetail = async (req, res) => {

    const order_id = String(req.params.order_id);
    
    try {
        const zones = await db.query(`
            SELECT wt.zone 
            FROM raw_materials rm
            JOIN order_transaction ot ON rm.item_code = ot.item_code
            JOIN warehouse_trans wt ON rm.position_code = wt.position_code
            JOIN category c ON rm.item_cate_code = c.item_cate_code
            JOIN orders o ON o.order_id = ot.order_id
            WHERE ot.order_id = $1 GROUP BY wt.zone
        `, [order_id])

        let zone = parseInt(req.query.zone || zones.rows[0].zone);
        console.log(order_id)

        const items = await db.query(`
            SELECT rm.item_code, c.cate_name as category, rm.length, 
            rm.create_dt, wt.zone
            FROM raw_materials rm
            JOIN order_transaction ot ON rm.item_code = ot.item_code
            JOIN warehouse_trans wt ON rm.position_code = wt.position_code
            JOIN category c ON rm.item_cate_code = c.item_cate_code
            JOIN orders o ON o.order_id = ot.order_id
            WHERE ot.order_id = $1 
            AND wt.zone = $2
        ` ,[order_id, zone])

        return res.status(200).json({
            zones : zones.rows,
            items : items.rows
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            message: "Internal Server error"
        })
    }

}

//>>>>Order ID & Order ID trans
genOrderID = (prev_id) => {
    const prev_order = prev_id;
    const prev_letter = prev_order.slice(0, 2)
    const prev_num = parseInt(prev_order.slice(2));
    const last_num = 9999999999;
    let new_order = null
    let new_num = null
    let new_letter = null
    if (prev_num === last_num) {
        if ((prev_letter[0] === 'Z') && (prev_letter[1] === 'Z')) {
            new_letter = 'AA';
        }
        else if (prev_letter[1] === 'Z') {
            const new_num_letter0 = prev_letter[0].charCodeAt(0) + 1;
            const new_letter0 = String.fromCharCode(new_num_letter0);
            const new_letter1 = 'A'
            new_letter = new_letter0 + new_letter1;

        }
        else {
            const new_letter0 = prev_letter[0];
            const new_num_letter1 = prev_letter[1].charCodeAt(0) + 1;
            const new_letter1 = String.fromCharCode(new_num_letter1);
            new_letter = new_letter0 + new_letter1;
        }
        new_num = '0000000000';
        new_order = new_letter + new_num

    } else {
        new_num = String(prev_num + 1);
        new_order = prev_letter + new_num.padStart(10, "0")
    }
    return new_order
}

genOrderTrans = (order_id, items) => {
    items.map((item, i) => {
        // item["order_id_trans"] = order_id + "-" + String(i + 1).padStart(2, "0");
        item["order_id_trans"] = uuidv4();
        item["order_id"] = order_id;
    })
    const response = [{
        items
    }]

    return response
}

validate_order_id = (str) => {
    const format = /^[A-Z]{2}\d{10}?$/;
    //if valid return true
    return format.test(str);
}

//===============================

