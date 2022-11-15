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

        // 3. If this order finish ?

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
                AND rm.item_status = 'In progress'
                AND wt.zone = $2
            ` , [order_id, zone])

            // Order by and Create_dt
            const desc = await models.Orders.findOne({
                attributes: ['create_by', 'create_dt'],
                where: { order_id }
            })

            const grid = await positionsGrid(order_id, zone)
            if (grid) {
                return res.status(200).json({
                    success: true,
                    finish: false,
                    warehouse_id: grid.warehouse_id,
                    description: desc,
                    zones: zones.rows,
                    zone: grid.zone,
                    positions_grid: grid.positions,
                    items: items.rows,
                })
            }
            else {
                return res.status(200).json({
                    success: false,
                    message: `Don't find zone = ${zone} in this order list`,
                })
            }
        }

        else {
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

const positionsGrid = async (order_id, zone) => {
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

exports.validateItem = async (req, res, next) => {
    const item_code = String(req.body.item_code); //From RFID
    const order_id = String(req.params.order_id);

    try {

        // 1. Find item_code in order_id
        const validation = await models.OrderTrans.findAll({
            attributes: ['item_code'],
            where: {
                order_id: order_id,
                item_code: item_code
            }
        })

        // 2. Check if item is in the order
        if (validation.length) {
            console.log('Match!')
            next(); // Go to updatedItem()
        } else {
            console.log('Not Match!')
            const { rows } = await db.query(`
                SELECT r.item_code, c.cate_name, r.sub_cate_code,
                r.create_dt, r.length,
                wt.position_code, wt.warehouse_id, wt.zone, wt.section,
                r.create_dt, r.length,
                wt.col_no, wt.floor_no
                FROM raw_materials r
                JOIN category c ON r.item_cate_code = c.item_cate_code
                JOIN warehouse_trans wt ON wt.position_code = r.position_code
                WHERE r.item_code = $1
            `, [item_code])
            return res.status(201).json({
                success: true,
                matching: false,
                finish: false,
                item: rows
            });
        }

    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
}

exports.updateItem = async (req, res) => {
    const item_code = String(req.body.item_code);
    const order_id = String(req.params.order_id);
    const user_id = String(req.user.user_id);

    // 1. Update match item:
    // item_status = Using
    // position_code = null
    // modify_by and modify_dt

    const dataUpdate = {
        item_status: 'Using',
        position_code: null,
        modify_by: user_id
    }
    try {

        const { rows } = await db.query(`
            SELECT r.item_code, c.cate_name, r.sub_cate_code,
            r.create_dt, r.length,
            wt.position_code, wt.warehouse_id, wt.zone, wt.section,
            r.create_dt, r.length,
            wt.col_no, wt.floor_no
            FROM raw_materials r
            JOIN category c ON r.item_cate_code = c.item_cate_code
            JOIN warehouse_trans wt ON wt.position_code = r.position_code
            WHERE r.item_code = $1
        `, [item_code])

        await models.RawMaterials.update(
            dataUpdate,
            {
                where: { item_code: item_code },
            });

        // 2. Check if there is any item in this order is 'In progress'? 
        // (If count is 0 >> Finish)

        const count = await db.query(`
            SELECT o.order_id, count(*) FILTER (WHERE rm.item_status = 'In progress')
            FROM raw_materials rm
            JOIN order_transaction ot ON rm.item_code = ot.item_code
            JOIN orders o ON o.order_id = ot.order_id
            WHERE ot.order_id = $1
            GROUP BY o.order_id
        `, [order_id])

        if (count.rowCount != 0 && count.rows[0].count == 0) {

            //Update order_status = 'Completed'
            // modify_by: user_id
            // modify_dt (Default by Sequelize)

            const updateData = {
                order_status: 'Completed',
                modify_by: user_id,
            }

            await models.Orders.update(updateData,
                {
                    where: { order_id: order_id }
                })

            return res.status(201).json({
                success: true,
                matching: true,
                finish: true,
                message: `Order id ${order_id} is already finish!`,
                item: rows
            })
        } else {
            return res.status(201).json({
                success: true,
                matching: true,
                finish: false,
                item: rows
            });
        }

    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }

}

//=========== Suggest position =================
exports.findPosition = async (req, res) => {

    // 1. Receive item_code from frontend
    const warehouse_id = String(req.params.wh_id); //From Forklift selection
    const item_code = String(req.body.item_code); //From RFID reading

    try {

    // 2. get detail of this item_code
    const item = await itemDetail(item_code);

    // 3. Find zone and section that contain this {category} the most
    let { rows } = await db.query(`
        SELECT r.item_cate_code, wt.zone,
        wt.section, COUNT(*)
        FROM raw_materials r
        JOIN warehouse_trans wt ON wt.position_code = r.position_code
        WHERE wt.warehouse_id = $1 AND r.item_cate_code = $2
        GROUP BY r.item_cate_code, wt.zone, wt.warehouse_id, wt.section
        ORDER BY COUNT(*) DESC
    `, [warehouse_id,item.item_cate_code])
    console.log('Items in section: ' + rows[0].count)

    // 4. if this section is full ?
    // max position of the section
    const sec_position = await db.query(`
        SELECT (cols_per_sect*positions_per_col) as count
        FROM warehouse WHERE warehouse_id = $1
    `, [warehouse_id])

    let i = 0;
    while(parseInt(rows[i].count) >= parseInt(sec_position.rows[i].count)){
        // the section is full
        // find next section
        console.log(`section ${rows[i].section} is Full, Next.`);
        i = i+1;
    }
    console.log(`Zone is ${rows[i].zone} and Section is ${rows[i].section}.`);

    // 5. Find column that contain this {category} the most
    let column = await db.query(`
        SELECT r.item_cate_code, wt.zone,
        wt.section, wt.col_no , COUNT(*)
        FROM raw_materials r
        JOIN warehouse_trans wt ON wt.position_code = r.position_code
        WHERE wt.warehouse_id = $1 AND r.item_cate_code = $2
        AND wt.zone = $3 AND wt.section = $4
        GROUP BY r.item_cate_code, wt.zone, wt.warehouse_id, wt.section, wt.col_no
        ORDER BY COUNT(*) DESC LIMIT 1
    `, [warehouse_id,item.item_cate_code,rows[0].zone,rows[0].section])
    console.log('Items in column: ' + column.rows[0].count)

    // 6. if this column is full ?
    // max position of the column
    const col_position = await db.query(`
        SELECT positions_per_col as count
        FROM warehouse WHERE warehouse_id = $1
    `, [warehouse_id])

    let j = 0;
    while(parseInt(column.rows[j].count) >= parseInt(col_position.rows[j].count)){
        // the section is full
        // find next section
        console.log(`Column ${column.rows[j].col_no} is Full, Next.`);
        j = j+1;
    }
    console.log(`Column is ${column.rows[j].col_no}.`);

    // 7. Select the position
    const position = await db.query(`
        SELECT wt.warehouse_id, wt.zone, wt.section, wt.col_no, 
        wt.floor_no ,wt.position_code
        FROM warehouse_trans wt
        LEFT JOIN raw_materials r ON wt.position_code = r.position_code
        WHERE r.item_code IS NULL AND wt.warehouse_id = $1
        AND wt.zone = $2 AND wt.section = $3 AND wt.col_no = $4
        LIMIT 1
    `, [warehouse_id,rows[i].zone,rows[i].section,column.rows[j].col_no])

    return res.status(201).json({
        success: true,
        data: position.rows[0]

    })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            message: "Internal Server error"
        })
    }
}

// Get detail of this item 
const itemDetail = async (item_code) => {
    try {
        const { dataValues } = await models.RawMaterials.findOne({
            where: { 
                item_code: item_code
            }
        })
        return dataValues
    } catch (error) {
        console.log(error)
    }
}

// Get grid position
const positionGrid = async (position_code) => {
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