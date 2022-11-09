const db = require('../db');
const models = require("../../database/models");


exports.startOrder = async (req, res) => {
    const order_id = String(req.params.order_id);
    const user_id = String(req.user.user_id);

    try {

        // 1. Update order_status
        await models.Orders.update(
            {
                order_status: 'In progress',
                progress_by: user_id,
                modify_by: user_id

            },
            {
                where: { order_id: order_id },
            });

        // 2. Display detail
        const zones = await db.query(`
            SELECT wt.zone 
            FROM raw_materials rm
            JOIN order_transaction ot ON rm.item_code = ot.item_code
            JOIN warehouse_trans wt ON rm.position_code = wt.position_code
            JOIN category c ON rm.item_cate_code = c.item_cate_code
            JOIN orders o ON o.order_id = ot.order_id
            WHERE ot.order_id = $1 GROUP BY wt.zone
        `,
            [order_id]
        );

        if (zones.rowCount != 0) {

            let zone = parseInt(req.query.zone || zones.rows[0].zone);
            const items = await db.query(
                `
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

            const grid = await positionGrid(order_id, zone)
            return res.status(200).json({
                warehouse_id: grid.warehouse_id,
                zones: zones.rows,
                zone: grid.zone,
                positions_grid: grid.positions,
                items: items.rows,
            })
        } else {
            return res.status(200).json({
                success: true,
                message: `Don't find the order id ${order_id} in order list`,
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            message: "Internal Server error"
        })
    }

}

const positionGrid = async (order_id, zone) => {
    try {
        // LIMIT 1 because we want to show only  1 position.
        const targets = await db.query(`
            SELECT w.warehouse_id, r.position_code, r.item_status ,
            wt.section, wt.col_no, wt.floor_no
            FROM warehouse_trans wt
            JOIN warehouse w ON w.warehouse_id = wt.warehouse_id
            JOIN raw_materials r ON r.position_code = wt.position_code
            JOIN order_transaction ot ON r.item_code = ot.item_code
            WHERE ot.order_id = $1 AND wt.zone = $2
            AND r.item_status = 'In progress'
            ORDER BY wt.zone, wt.section, wt.col_no
            LIMIT 1
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
                if (pos.section === target.section
                    && pos.col_no === target.col_no) {
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

exports.pickingItem = async (req, res) => {
    const item_code = String(req.params.item_code);
    const user_id = String(req.user.user_id);

    //* 1. Update item:
    // item_status = Using
    // position_code = null
    // modify_by and modify_dt

    const dataUpdate = {
        item_status: 'Using',
        position_code: null,
        modify_by: user_id
    }

    try {

        const [updated] = await models.Orders.update(
            dataUpdate,
        {
            where: { item_code: item_code },
        });

        if (updated) {
            const updatedItem = await models.RawMaterials.findOne({
                where: { item_code: item_code },
                attributes: ["item_code", "item_status", "modify_by"],
            });
            return res.status(200).json({ item: updatedItem });
        }
        throw new Error("User not found");

    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }

}