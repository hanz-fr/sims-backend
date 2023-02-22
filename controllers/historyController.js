const { json } = require("body-parser");
const Validator = require("fastest-validator");
const { History } = require("../models");
const { Op } = require("sequelize");
const models = require('../models');
const searchBuilder = require('sequelize-search-builder');
var mysql = require('mysql');
``
// import fastest-validator
const v = new Validator();


/* get all history */
exports.getAllHistory = async (req, res) => {

    /* limit shown data */
    let limitAsNumber = Number.parseInt(req.query.limit);
    let limit = null;
    if(!Number.isNaN(limitAsNumber) && limitAsNumber > 0) {
        limit = limitAsNumber;
    }
    
    const year = req.query.year;

    try {

        let history = await History.findAndCountAll({
            where: {
                createdAt: {
                    [Op.between]: [`${year}-01-01`, `${year}-12-31`] 
                }
            },
            limit: limit,
            order: [
                ['createdAt', 'DESC']
            ],
        });

        res.status(200).json(history);

    } catch (error) {
        res.status(404).json({
          status: 'error',
          message: error.message,
        });
    }

}


exports.getTodaysHistory = async (req, res) => {

    let connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'sims_backend_1.0'
    });

    connection.query("call get_today_history", function (err, result) {
        if (err) {
            res.status(200).json({
                status: 'error',
                message: err
            })
        } else {
            res.status(200).json({
                status: 'success',
                result: result[0]
            })
        }
    });

}


exports.getHistoryDiff = async (req, res) => {

    let created_at = req.query.created_at;

    let connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'sims_backend_1.0'
    });

    connection.query(`history_diff(${created_at})`, function (err, result) {
        if (err) {
            res.status(200).json({
                status: 'error',
                message: err
            })
        } else {
            res.status(200).json({
                status: 'success',
                result: result[0]
            })
        }
    });

}


exports.getAllHistoryYesterdayAndSo = async (req, res) => {

    let connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'sims_backend_1.0'
    });

    connection.query("call get_older_history", function (err, result) {
        if (err) {
            res.status(200).json({
                status: 'error',
                message: err
            })
        } else {
            res.status(200).json({
                status: 'success',
                result: result[0]
            })
        }
    });

}


/* get all history with specific author */
exports.getAllUserHistory = async (req, res) =>{

    const username = req.params.username;                  // user name
    let limitAsNumber = Number.parseInt(req.query.limit);  // limit how much data to show

    const year = req.query.year;

    let limit = null;
    if(!Number.isNaN(limitAsNumber) && limitAsNumber > 0) {
        limit = limitAsNumber;
    }

    try {

        let history = await History.findAndCountAll({
            where: {
                activityAuthor: {
                    [Op.eq]: username
                },
                createdAt: {
                    [Op.between]: [`${year}-01-01`, `${year}-12-31`] 
                }
            },
            limit: limit,
            order: [
                ['createdAt', 'DESC']
            ],
        });

        res.status(200).json(history);

    } catch (error) {
        res.status(404).json({
          status: 'error',
          message: error.message,
        });
    }

}


/* get history */
exports.getHistory = async (req, res) => {

    const historyId = req.params.historyId;


    let history = await History.findByPk(historyId);

    if (!history) {
        return res.status(404).json({ 
            status: 'error',
            message: 'History does not exist.' 
        });
    } 

    res.status(200).json({
        message: `Displaying History with uuid : ${historyId}`,
        history: history,
    });
}


/* create history */
exports.createHistory = async (req, res) => {

    try {

        const schema = {
            activityName: { type: "string" },
            activityAuthor: { type: "string" },
            activityDesc: { type: "string" },
        }
        
        const validate = v.validate(req.body, schema);

        if (validate.length) {
            return res.status(400).json(validate);
        }

        var history = await History.create(req.body);

        res.status(200).json({
            status: "History added successfully.",
            history,
        });

    } catch (error) {
        res.status(404).json({
            status: 'error',
            message: error.message,
        });
    }

}


/* update history */
exports.updateHistory = async (req, res) => {

    const historyId = req.params.historyId;


    let history = await History.findByPk(historyId);

    if (!history) {
        return res.status(404).json({ 
            status: 'error',
            message: 'History does not exist.' 
        });
    }

    const schema = {
        activityName: { type: "string", optional: true, },
        activityAuthor: { type: "string", optional: true, },
        activityDesc: { type: "string", optional: true, },
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json(validate);
    }

    history = await history.update(req.body);
    res.status(200).json({
        message: `Successfully updated History with uuid : ${historyId}`,
        history: history
    });
    
}


/* get all history per year */
exports.countAllHistoryPerMonth = async (req, res) => {

    const year = req.query.year;

    let januaryActivity = await History.count({
        where: {
            createdAt: {
                [Op.between]: [`${year}-01-01`, `${year}-01-31`] 
            }
        }
    });

    let februaryActivity = await History.count({
        where: {
            createdAt: {
                [Op.between]: [`${year}-02-01`, `${year}-02-28`] 
            }
        }
    });

    let marchActivity = await History.count({
        where: {
            createdAt: {
                [Op.between]: [`${year}-03-01`, `${year}-03-31`] 
            }
        }
    });

    let aprilActivity = await History.count({
        where: {
            createdAt: {
                [Op.between]: [`${year}-04-01`, `${year}-04-30`] 
            }
        }
    });

    let mayActivity = await History.count({
        where: {
            createdAt: {
                [Op.between]: [`${year}-05-01`, `${year}-04-31`] 
            }
        }
    });

    let juneActivity = await History.count({
        where: {
            createdAt: {
                [Op.between]: [`${year}-06-01`, `${year}-06-30`] 
            }
        }
    });

    let julyActivity = await History.count({
        where: {
            createdAt: {
                [Op.between]: [`${year}-07-01`, `${year}-07-31`] 
            }
        }
    });

    let augustActivity = await History.count({
        where: {
            createdAt: {
                [Op.between]: [`${year}-08-01`, `${year}-08-31`] 
            }
        }
    });

    let septemberActivity = await History.count({
        where: {
            createdAt: {
                [Op.between]: [`${year}-09-01`, `${year}-09-30`] 
            }
        }
    });

    let octoberActivity = await History.count({
        where: {
            createdAt: {
                [Op.between]: [`${year}-10-01`, `${year}-10-31`] 
            }
        }
    });

    let novemberActivity = await History.count({
        where: {
            createdAt: {
                [Op.between]: [`${year}-11-01`, `${year}-11-30`] 
            }
        }
    });

    let decemberActivity = await History.count({
        where: {
            createdAt: {
                [Op.between]: [`${year}-12-01`, `${year}-12-31`] 
            }
        }
    });

    res.status(200).json({
        'status': 'success',
        'message': 'Displaying total activity per month',
        'january': januaryActivity,
        'february': februaryActivity,
        'march': marchActivity,
        'april': aprilActivity,
        'may': mayActivity,
        'june': juneActivity,
        'july': julyActivity,
        'august': augustActivity,
        'september': septemberActivity,
        'october': octoberActivity,
        'november': novemberActivity,
        'december': decemberActivity,
    })

}


/* delete history */
exports.deleteHistory = async (req, res) => {

    const historyId = req.params.historyId;


    let history = await History.findByPk(historyId);

    if (!history) {
        return res.status(404).json({ 
            status: 'error',
            message: 'History does not exist.' 
        });
    }
    
    await history.destroy();

    res.status(200).json({
        message: 'History deleted successfully.'
    })

}


