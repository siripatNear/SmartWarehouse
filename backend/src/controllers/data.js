const db = require('../db');
const { v4: uuidv4 } = require('uuid');
var moment = require('moment');
const models = require("../../database/models");
const { Sequelize } = require("../../database/models");
const { Op } = require("sequelize");

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

//* for all dropdown data API
exports.dropDownList = async (req, res) => {
    try {
        /*
        const warehouse = await db.query(`
            SELECT warehouse_id,warehouse_desc FROM warehouse`)
        const zone = await db.query(`
            SELECT zone FROM warehouse_trans 
            GROUP BY zone ORDER BY zone`)
        const category = await db.query(`
            SELECT item_cate_code,cate_name FROM category`)
        const role = await db.query(`SELECT role FROM users GROUP BY role`)
        */
        const warehouse = await models.Warehouse.findAll(
            { attributes: ['warehouse_id', 'warehouse_desc'] }
        )
        const zone = await models.WarehouseTrans.findAll({
            attributes: ['zone'],
            group: 'zone',
            order: [
                ['zone']
            ]
        })
        const category = await models.Category.findAll(
            { attributes: ['item_cate_code', 'cate_name'] },
        )
        const role = await models.Users.findAll({
            attributes: ['role'],
            group: 'role',
            order: [
                ['role']
            ]
        })

        return res.status(200).json({
            success: true,
            warehouse: warehouse,
            zone: zone,
            category: category,
            role: role
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
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
        const overall = await db.query(`
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

        // req.query.category||req.query.page||req.query.length||req.query.zone
        if (Object.keys(req.query).length > 0) {
            console.log(req.query)
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
        const search = req.query.search || "";
        let category = req.query.category || "All";
        let zone = req.query.zone || "All";

        const warehouse_id = String(req.params.wh_id);
        // Get All category
        const allCategoryJson = await models.Category.findAll({
            attributes: [
                'item_cate_code'
            ]
        })
        let categoryList = []
        allCategoryJson.map((c) => {
            categoryList.push(Object.values(c.dataValues)[0])
        })
        // Get All zone
        const allZoneJson = await models.WarehouseTrans.findAll({
            attributes: [
                'zone'
            ],
            group: 'zone',

        })
        let zoneList = []
        allZoneJson.map((z) => {
            zoneList.push(Object.values(z.dataValues)[0])
        })

        // Filtering
        category === "All"
            ? (category = categoryList)
            : (category = [req.query.category]);
        zone === "All"
            ? (zone = zoneList)
            : (zone = [req.query.zone]);

        console.log('category: ' + category)
        console.log('zone: ' + zone)

        const items = await models.RawMaterials.findAll({
            attributes: [
                'item_code',
                'item_cate_code',
                [Sequelize.col('category.cate_name'), 'category'],
                'sub_cate_code',
                'length',
                'create_dt',
                'item_status'
            ],
            where: {
                item_status: {
                    [Op.in]: ['used', 'stock in']
                },
                sub_cate_code: {
                    [Op.like]: '%' + search + '%'
                }
            },
            include: [
                {
                    model: models.WarehouseTrans,
                    attributes: [],
                    where: {
                        warehouse_id: warehouse_id,
                        zone: {
                            [Op.in]: zone
                        }
                    }
                },
                {
                    model: models.Category,
                    as: 'category',
                    attributes: [],
                    where: {
                        item_cate_code: {
                            [Op.in]: category
                        }
                    }
                },
            ],
            offset: page,
            limit: limit,
            raw: true
        });

        res.status(500).json({
            success: true,
            message: "You have permission to access this",
            items
        })

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

    const { items, remarks } = req.body;
    const user_id = req.user.user_id;
    let new_order_id = null;
    try {

        //* 1. Create Order ( run from previous order_id )

        const prev_order = await models.Orders.findAll({
            attributes: ['order_id'],
            order: [['create_dt', 'DESC'],],
            limit: 1
        })

        const prev_order_id = prev_order[0].dataValues['order_id'];
        console.log("prev_order: " + prev_order_id);

        if (!validate_order_id(prev_order_id)) {
            //if not find the correct format from previous order, create the first one
            new_order_id = 'AA0000000000'

        } else {
            new_order_id = genOrderID(prev_order_id);
        }

        genOrderTrans(new_order_id, items)

        //* 2. Add new order to database
        const data = {
            order_id: new_order_id,
            order_status: 'Not started',
            order_remark: remarks,
            quantity: items.length,
            create_by: user_id,
        };
        await models.Orders.create(data)

        //* 3. Create order transaction
        items.forEach(async (item) => {
            //Add each item to database
            await models.OrderTrans.create(item)
        })

        //* 4. Update raw material status, modify_dt and modify_by
        items.forEach(async (item) => {
            let data = {
                item_status: 'in progress',
                modify_by: user_id,
                modify_dt: new Date()
            }
            console.log(data)
            await models.RawMaterials.update(data, {
                where: {
                    item_code: item.item_code
                }
            })
        })


        return res.status(201).json({
            success: true,
            message: `Create order: ${new_order_id} was successful`,
        })


    } catch (error) {
        console.log(error.message);
    }
}

exports.deleteOrder = async (req, res) => {
    const order_id = String(req.params.order_id);
    const user_id = String(req.user.user_id);
    try {
        //* item_status after delete order wil be 'used'?
        //* 1. update item status to 'Used' and update modify_dt, modify_by
        const update_data = {
            item_status: 'used',
            modify_by: user_id,
            modify_dt: new Date()
        }
        await models.RawMaterials.update(update_data, {
            where: {},
            include: {
                model: models.OrderTrans,
                as: 'orders',
                attributes: [],
                where: { order_id: order_id }
            },
            raw: true
        })
        
        //* 2. Delete order_transaction where order_id = req.params.order_id
        await models.OrderTrans.destroy({
            where: {
                order_id: order_id
            }
        })

        //* 3. Delete orders where order_id = req.params.order_id
        const deleted = await models.Orders.destroy({
            where: {
                order_id: order_id
            }
        })

        if (deleted) {
            return res.status(201).json({
                success: true,
                message: `Order was deleted by ${user_id}`,
            });
        }
        throw new Error("Order was not found");

    } catch (error) {
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
        ` , [order_id, zone])
        

        const grid = await positionsGrid(order_id, zone)
        return res.status(200).json({
            warehouse_id: grid.warehouse_id,
            zones: zones.rows,
            zone: grid.zone,
            positions_grid: grid.positions,
            items: items.rows,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            message: "Internal Server error"
        })
    }

}

const positionsGrid = async (order_id, zone) => {
    try {
        const targets = await db.query(`
            SELECT w.warehouse_id, r.position_code ,wt.section, wt.col_no, wt.floor_no
            FROM warehouse_trans wt
            JOIN warehouse w ON w.warehouse_id = wt.warehouse_id
            JOIN raw_materials r ON r.position_code = wt.position_code
            JOIN order_transaction ot ON r.item_code = ot.item_code
            WHERE ot.order_id = $1 AND wt.zone = $2
            ORDER BY wt.zone, wt.section, wt.col_no
        `, [order_id, zone])

        let wh_id = targets.rows[0].warehouse_id;

        const positions = await db.query(`
            SELECT wt.section, wt.col_no, COUNT(r.position_code)
            FROM warehouse_trans wt
            JOIN warehouse w ON w.warehouse_id = wt.warehouse_id
            FULL OUTER JOIN raw_materials r ON r.position_code = wt.position_code
            WHERE wt.zone = $1
            AND w.warehouse_id = $2
            GROUP BY wt.col_no ,wt.zone, wt.section, wt.col_no, wt.warehouse_id
            ORDER BY wt.zone, wt.section, wt.col_no
        `, [zone, wh_id])


        positions.rows.map((pos) => {
            targets.rows.map((target) => {
                if (pos.section === target.section && pos.col_no === target.col_no) {
                    pos.target_in = true
                }
            })
        })

        return {
            warehouse_id: wh_id,
            zone: zone,
            positions: positions.rows,
            target: targets.rows
        }

    } catch (error) {
        console.log(error.message)
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

