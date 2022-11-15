const db = require("../db");
const models = require("../../database/models");
const { Sequelize } = require("../../database/models");
const { Op } = require("sequelize");

//* response to get any form page
exports.getForm = async (req, res, next) => {
  try {
    if (String(req.params)) {
      console.log({
        message: "you have permission to access",
        params: req.params,
      });
      next();
    } else {
      return res.status(200).json({
        success: true,
        message: "you have permission to access",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      role: req.user.role,
      message: "you don't have permission to access",
    });
  }
};

//* for all dropdown data API
exports.dropDownList = async (req, res) => {
  try {
    const warehouse = await db.query(`
            SELECT warehouse_id,warehouse_desc FROM warehouse`);
    const zone = await db.query(`
            SELECT zone FROM warehouse_trans 
            GROUP BY zone ORDER BY zone`);
    const category = await db.query(`
            SELECT item_cate_code,cate_name FROM category`);
    const role = await db.query(`SELECT role FROM users GROUP BY role`);

    return res.status(200).json({
      success: true,
      warehouse: warehouse,
      zone: zone,
      category: category,
      role: role,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//* <<<< Dashboard data
const getSumByZone = async (wh_id, zone_id) => {
  try {
    const { rows } = await db.query(
      `
            SELECT COUNT(wh_trans.position_code) as total_positions, 
            COUNT(rm.position_code) as usage,
            (COUNT(wh_trans.position_code) - COUNT(rm.position_code)) as empty
            FROM raw_materials rm
            FULL OUTER JOIN warehouse_trans wh_trans ON rm.position_code = wh_trans.position_code 
            FULL OUTER JOIN warehouse wh ON wh_trans.warehouse_id = wh.warehouse_id
            WHERE wh_trans.warehouse_id = $1 
            AND wh_trans.zone = $2
        `,
      [wh_id, zone_id]
    );

    response = {
      warehouse: wh_id,
      zone: zone_id,
      positions: rows[0].total_positions,
      usage: rows[0].usage,
      empty: rows[0].empty,
    };

    return response;
  } catch (error) {
    console.log(error.message);
  }
};

const overallWarehouse = async (wh_id) => {
  try {
    //overall in a warehouse
    const overall = await db.query(
      `
        SELECT COUNT(wh_trans.position_code) as total_positions, 
        COUNT(rm.position_code) as usage,
        (COUNT(wh_trans.position_code) - COUNT(rm.position_code)) as empty
        FROM raw_materials rm
        FULL OUTER JOIN warehouse_trans wh_trans ON rm.position_code = wh_trans.position_code 
        FULL OUTER JOIN warehouse wh ON wh_trans.warehouse_id = wh.warehouse_id
        WHERE wh_trans.warehouse_id = $1
        `,
      [wh_id]
    );

    const response = {
      warehouse: wh_id,
      positions: overall.rows[0].total_positions,
      usage: overall.rows[0].usage,
      empty: overall.rows[0].empty,
    };

    return response;
  } catch (error) {
    console.log(error.message);
  }
};

//*==================

//* (1) Get dashboard by warehouse_id
exports.fetchData = async (req, res, next) => {
  const warehouse_id = String(req.params.wh_id);

  try {
    //get all items in same warehouse to get usage

    // req.query.category||req.query.page||req.query.length||req.query.zone
    if (Object.keys(req.query).length > 0) {
      console.log(req.query);
      next();
    } else {
      //summary each zone
      const zone_summary = await db.query(
        `
            SELECT wh_trans.zone as zone, COUNT(wh_trans.position_code) as total_positions, 
            COUNT(rm.position_code) as usage,
            (COUNT(wh_trans.position_code) - COUNT(rm.position_code)) as empty
            FROM raw_materials rm
            FULL OUTER JOIN warehouse_trans wh_trans ON rm.position_code = wh_trans.position_code 
            FULL OUTER JOIN warehouse wh ON wh_trans.warehouse_id = wh.warehouse_id
            WHERE wh_trans.warehouse_id = $1
            GROUP BY wh_trans.zone ORDER BY wh_trans.zone
            `,
        [warehouse_id]
      );

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
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

//* (2) If have any query params from fetchData
exports.fetchFilterItems = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; //limit show data
    const page = (parseInt(req.query.page) - 1) * limit || 0;
    const search = req.query.search || "";
    let category = req.query.category || "All";
    let zone = req.query.zone || "All";

    const warehouse_id = String(req.params.wh_id);
    // Get All category
    const allCategoryJson = await models.Category.findAll({
      attributes: ["item_cate_code"],
    });
    let categoryList = [];
    allCategoryJson.map((c) => {
      categoryList.push(Object.values(c.dataValues)[0]);
    });
    // Get All zone
    const allZoneJson = await models.WarehouseTrans.findAll({
      attributes: ["zone"],
      group: "zone",
    });
    let zoneList = [];
    allZoneJson.map((z) => {
      zoneList.push(Object.values(z.dataValues)[0]);
    });

    // Filtering
    category === "All"
      ? (category = categoryList)
      : (category = [req.query.category]);
    zone === "All" ? (zone = zoneList) : (zone = [req.query.zone]);

    const { count, rows } = await models.RawMaterials.findAndCountAll({
      attributes: [
        "item_code",
        "item_cate_code",
        [Sequelize.col("category.cate_name"), "category"],
        "sub_cate_code",
        "length",
        "create_dt",
        "item_status",
      ],
      where: {
        item_status: {
          [Op.in]: ["used", "stock in"],
        },
        sub_cate_code: {
          [Op.iLike]: "%" + search + "%",
        },
      },
      include: [
        {
          model: models.WarehouseTrans,
          attributes: [],
          where: {
            warehouse_id: warehouse_id,
            zone: {
              [Op.in]: zone,
            },
          },
        },
        {
          model: models.Category,
          as: "category",
          attributes: [],
          where: {
            item_cate_code: {
              [Op.in]: category,
            },
          },
        },
      ],
      offset: page,
      limit: limit,
      raw: true,
    });

    if (zone.length === 1) {
      const summary = await getSumByZone(warehouse_id, zone[0]);
      res.status(200).json({
        success: true,
        message: "You have permission to access",
        summary,
        items: rows,
        meta: {
          last: Math.ceil(count / limit),
        },
      });
    } else {
      const summary = await overallWarehouse(warehouse_id);
      res.status(200).json({
        success: true,
        message: "You have permission to access",
        summary,
        items: rows,
        meta: {
          last: Math.ceil(count / limit),
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Internal Server error",
    });
  }
};

// GET summary of each category for Admin
exports.getStock = async (req, res) => {
  try {
    const data = await db.query(`
            SELECT c.item_cate_code, c.cate_name as category, cs.max_quantity, 
            cs.min_quantity, (cs.max_quantity-COUNT(*)) as empty, COUNT(*) as usage
            FROM category c
            JOIN raw_materials r ON c.item_cate_code = r.item_cate_code
            JOIN category_stock cs ON c.item_cate_code = cs.item_cate_code
            GROUP BY c.item_cate_code, cs.max_quantity,cs.min_quantity
            ORDER BY c.item_cate_code
        `);
    return res.status(200).json({
      success: true,
      message: "You have permission to access",
      data: data.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal Server error",
    });
  }
};
