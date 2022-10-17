const db = require('../db');

//*get zone list by warehouse ID
exports.getZonesData = async (req, res) => {

    const warehouse_id = String(req.params.id);
    
    try {
        
        //get all item in same warehouse
        
        const data = await db.query(`
        SELECT rm.position_code 
        FROM warehouse_trans wh_trans 
        JOIN raw_materials rm ON rm.position_code = wh_trans.position_code
        WHERE wh_trans.warehouse_id = $1
        `, [warehouse_id]);

        const zone_summary = await db.query(`
        SELECT wh_trans.zone as zone, COUNT(wh_trans.position_code) as total_positions, 
        COUNT(rm.position_code) as usage
        FROM raw_materials rm
        FULL OUTER JOIN warehouse_trans wh_trans ON rm.position_code = wh_trans.position_code 
        FULL OUTER JOIN warehouse wh ON wh_trans.warehouse_id = wh.warehouse_id
        WHERE wh_trans.warehouse_id = $1
        GROUP BY wh_trans.zone ORDER BY wh_trans.zone
        `, [warehouse_id])

        
        return res.status(200).json({
            message: 'you have permission to access',
            warehouse: warehouse_id,
            items_count: data.rowCount,
            zones_count: zone_summary.rowCount,
            summary: zone_summary.rows,

        }) 

    }catch(error) {
        console.log(error.message);
    }
}

