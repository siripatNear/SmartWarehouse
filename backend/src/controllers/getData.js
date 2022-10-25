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
exports.getForm = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: 'you have permission to access'
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
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
        
        const summary = await getSumByZone(warehouse_id,zone_id);
        
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
            `, [warehouse_id, zone_id, category,limit, page])
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