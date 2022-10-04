const Validator = require("fastest-validator");
const { MapelJurusan, Mapel, Jurusan, sequelize } = require("../models");

const v = new Validator();

exports.getAllMapel = async (req, res) => {
    const mapel = await sequelize.query("SELECT * FROM mapel", {
        model: Mapel,
        mapToModel: true,
    });

    res.status(200).json(mapel);
}


exports.getMapel = async (req, res) => {
    const id = req.params.id;

    const mapelExist = await Mapel.findByPk(id);

    if (!mapelExist) {
        return res.status(404).json({
            status: "error",
            message: `Mapel with id ${id} does not exist`
        });
    }

    res.status(200).json({
        message: `Displaying Mapel with id ${id}`,
        result: mapelExist
    });
}

exports.createMapel = async (req, res) => {
    try {
        const schema = {
            nama: { type: "string" },
            id: { type: "string" },
        }

        const validate = v.validate(req.body, schema);

        if (validate.length) {
            return res.status(400).json(validate);
        }

        var mapel = await Mapel.create(req.body);

        res.status(200).json({
            status: "Data added successfully.",
            mapel
        });
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ status: "error", message: "Something went wrong. :(" });
    }
}


exports.updateMapel = async (req, res) => {
    const id = req.params.id;

    let mapelExist = await Mapel.findByPk(id);

    if (!mapelExist) {
        return res.status(404).json({
            status: "error",
            message: `Mapel with id ${id} does not exist`
        });
    }

    const schema = {
        nama: { type: "string", optional: true }
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json(validate);
    }

    mapelExist = await mapelExist.update(req.body);
    res.status(200).json({
        message: `Successfully updated Mapel with id ${id}`,
        result: mapelExist
    });
}


exports.deleteMapel = async (req, res) => {
    const id = req.params.id;

    let mapelExist = await Mapel.findByPk(id);

    if (!mapelExist) {
        return res.status(404).json({
            status: "error",
            message: `Mapel with id ${id} does not exist`
        });
    }

    await mapelExist.destroy();

    res.status(200).json({
        message: "Mapel deleted successfully."
    });
}