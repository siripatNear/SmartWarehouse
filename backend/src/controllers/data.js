const db = require('../db');

//*get zone list by warehouse ID
exports.getZonesData = async (req, res) => {

    const warehouse_id = String(req.params.id);

    try { //get all item in same warehouse

        const data = await db.query(`
        SELECT rm.position_code 
        FROM warehouse_trans wh_trans 
        JOIN raw_materials rm ON rm.position_code = wh_trans.position_code
        WHERE wh_trans.warehouse_id = $1
        `, [warehouse_id]);

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


        return res.status(200).json({
            message: 'you have permission to access',
            warehouse: warehouse_id,
            item_count: data.rowCount,
            zone_count: zone_summary.rowCount,
            summary: zone_summary.rows,

        })

    } catch (error) {
        console.log(error.message);
    }
}

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

//* Get summary data from specific zone
const getSumByZone = async (wh_id, zone_id) => {

    try {
        const data = await db.query(`
            SELECT rm.item_code, c.item_cate_code as category,
            rm.length, wh_trans.section, rm.create_dt, rm.item_status as status
            FROM raw_materials rm
            JOIN warehouse_trans wh_trans ON rm.position_code = wh_trans.position_code 
            JOIN warehouse wh ON wh_trans.warehouse_id = wh.warehouse_id
            JOIN category c ON rm.item_cate_code = c.item_cate_code
            WHERE wh_trans.warehouse_id = $1
            AND wh_trans.zone = $2
            AND (rm.item_status = 'stock in' or rm.item_status = 'used')
            ORDER BY rm.item_status DESC
        `, [wh_id, zone_id]);

        const total_position = await db.query(`
            SELECT wh_trans.position_code
            FROM warehouse_trans wh_trans 
            WHERE wh_trans.warehouse_id = $1 AND wh_trans.zone = $2
        `, [wh_id, zone_id]);

        return response = {
            message: 'you have permission to access',
            warehouse: wh_id,
            zone: zone_id,
            total_positions: total_position.rowCount,
            usage: data.rowCount,
            empty: (total_position.rowCount - data.rowCount),
        }

    } catch (error) {
        console.log(error.message);
    }
}

exports.fetchItems = async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5; //limit show data
        let category = req.query.category || "All";

        const warehouse_id = String(req.params.wh_id);
        const zone_id = String(req.params.zone_id);

        const summary = await getSumByZone(warehouse_id, zone_id);

        if (category === "All") {
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
            LIMIT $3
            OFFSET $4;
            `, [warehouse_id, zone_id, limit, page])
            const response = {
                summary,
                error: false,
                page: page + 1,
                limit,
                items: items.rows
            }
            return res.status(200).json(response);

        }
        else {
            category = req.query.category;
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
            `, [warehouse_id, zone_id, category, limit, page])
            const response = {
                summary,
                error: false,
                page: page + 1,
                limit,
                items: items.rows
            }
            return res.status(200).json(response);

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            message: "Internal Server error"
        })

    }
}


// exports.getCompletedOrder = async (req, res) => {
//     try {
//         const data = await db.query(`
//             SELECT order_id, create_dt, quantity, order_status, 
//             create_by as ordered_by
//             FROM orders WHERE order_status = 'Completed'
//             `, [wh_id, zone_id]);

//         const total_position = await db.query(`
//             SELECT wh_trans.position_code
//             FROM warehouse_trans wh_trans 
//             WHERE wh_trans.warehouse_id = $1 AND wh_trans.zone = $2
//         `, [wh_id, zone_id]);

//         return response = {
//             message: 'you have permission to access',
//             warehouse: wh_id,
//             zone: zone_id,
//             total_positions: total_position.rowCount,
//             usage: data.rowCount,
//             empty: (total_position.rowCount - data.rowCount),
//         }

//     } catch (error) {
//         console.log(error.message);
//     }
// }

exports.getCurrentOrder = (req, res) => {

}

//Order ID & Order ID trans
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
    const quantity = Object.keys(items).length;
    console.log('test')
    items.map((item, i) => {
        item["order_id_trans"] = order_id + "-" + String(i + 1).padStart(2, "0");
        item["order_id"] = order_id;
    })
    const response = [{
        "quantity": quantity,
        items
    }]

    return response
}

exports.createOrder = (req, res) => {

    const order_id = 'AA0000000000';
    const items = [{
        "item_code": "FK001"
    }, {
        "item_code": "FK002"
    }, {
        "item_code": "FK003"
    }
    ]
    try {
        const response = genOrderTrans(order_id,items)
        return res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}