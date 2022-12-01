const { json } = require("body-parser");
const Validator = require("fastest-validator");
const { History } = require("../models");
const { Op } = require("sequelize");
const models = require('../models');
const searchBuilder = require('sequelize-search-builder');

// import fastest-validator
const v = new Validator();


/* get all history */
exports.getAllHistory = async (req, res) => {

    try {

        let history = await History.findAndCountAll({
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


/* get all history with specific author */
exports.getAllAuthorHistory = async (req, res) =>{

    const authorName = req.params.authorName;

    try {

        let history = await History.findAndCountAll({
            where: {
                activityAuthor: {
                    [Op.eq]: authorName
                },
            },
            limit: 5,
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


