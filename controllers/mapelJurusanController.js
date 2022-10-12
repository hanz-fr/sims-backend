const Validator = require("fastest-validator");
const { MapelJurusan, Mapel, Jurusan, sequelize } = require("../models");

const v = new Validator();

// get all mapeljurusan
exports.getAllMapelJurusan = async (req, res) => {
    const mapelJurusan = await sequelize.query("SELECT * FROM mapel_jurusan", {
        model: MapelJurusan,
        mapToModel: true,
    });

    res.status(200).json(mapelJurusan);
};

// get mapeljurusan by id
exports.getMapelJurusan = async (req, res) => {
    const mapelJurusanId = req.params.mapelJurusanId;

    const mapelJurusan = await MapelJurusan.findByPk(mapelJurusanId);

    if (!mapelJurusan) {
        return res.status(404).json({
            status: "error",
            message: `Mapel Jurusan with id ${mapelJurusanId} does not exist`
        });
    }

    res.status(200).json({
        message: `Displaying Mapel Jurusan with id ${mapelJurusanId}`,
        result: mapelJurusan
    });
};

// create mapeljurusan
exports.createMapelJurusan = async (req, res) => {
    try {
        const schema ={
            MapelId: { type: "string" },
            JurusanId: { type: "string" },
        }

        const validate = v.validate(req.body, schema);

        if (validate.length) {
            return res.status(400).json(validate);
        }

        // find if mapel with requested id is exist
        let mapelIdExist = await Mapel.findOne({
            where: { id: req.body.MapelId }
        });

        if (!mapelIdExist) {
            return res.status(400).json({
                status: "error",
                message: `Mapel with id ${req.body.MapelId} does not exist`,
            });
        }

        // find if jurusan with requested id is exist
        let jurusanIdExist = await Jurusan.findOne({
            where: { id: req.body.JurusanId }
        });        

        if (!jurusanIdExist) {
            return res.status(400).json({
                status: "error",
                message: `Jurusan with id ${req.body.JurusanId} does not exist`,
            });
        }


        // find if mapelJurusan already exist
        const id = req.body.JurusanId + '_' + req.body.MapelId;
        
        let mapelJurusanExist = await MapelJurusan.findOne({
            where: {
                mapelJurusanId: id
            }
        })


        if (mapelJurusanExist) {
            return res.status(400).json({
                status: 'error',
                message: `MapelJurusan with id ${id} already exist`
            })
        }


        var mapelJurusan = await MapelJurusan.create({
            mapelJurusanId: req.body.JurusanId + '_' + req.body.MapelId,
            MapelId: req.body.MapelId,
            JurusanId: req.body.JurusanId,
        });

        res.status(200).json({
            status: "Data added successfully.",
            mapelJurusan
        });
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ status: "error", message: "Something went wrong. :(" });
    }
};

// update mapeljurusan
exports.updateMapelJurusan = async (req, res) => {
    const mapelJurusanId = req.params.mapelJurusanId;

    let mapelJurusanExist = await MapelJurusan.findByPk(mapelJurusanId);

    if (!mapelJurusanExist) {
        return res.status(404).json({ 
            status: 'error',
            message: "Mapel Jurusan does not exist"
          });
    }


    const schema = {
        MapelId: { type: "string", optional: true },
        JurusanId: { type: "string", optional: true },
    }

    if (req.body.MapelId) {
        // find if mapel with requested id is exist
        let mapelIdExist = await Mapel.findOne({
            where: { id: req.body.MapelId }
        });
    
        if (!mapelIdExist) {
            return res.status(400).json({
                status: "error",
                message: `Mapel with id ${req.body.MapelId} does not exist`,
            });
        }
    }

    if (req.body.JurusanId) {
        // find if jurusan with requested id is exist
        let jurusanIdExist = await Jurusan.findOne({
            where: { id: req.body.JurusanId }
        });        
    
        if (!jurusanIdExist) {
            return res.status(400).json({
                status: "error",
                message: `Jurusan with id ${req.body.JurusanId} does not exist`,
            });
        }
    }
    

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json(validate);
    }

    mapelJurusanExist = await mapelJurusanExist.update({
        mapelJurusanId: req.body.JurusanId + '_' + req.body.MapelId,
        MapelId: req.body.MapelId,
        JurusanId: req.body.JurusanId,
    });

    res.status(200).json({
        message: `Successfully updated Mapel Jurusan with id ${mapelJurusanId}`,
        result: mapelJurusanExist
    });
};  

// delete mapeljurusan
exports.deleteMapelJurusan = async (req, res) => {
    const mapelJurusanId = req.params.mapelJurusanId;

    const mapelJurusanExist = await MapelJurusan.findByPk(mapelJurusanId);

    if (!mapelJurusanExist) {
        return res.status(404).json({ 
            status: 'error',
            message: "Mapel Jurusan does not exist"
          });
    }

    await mapelJurusanExist.destroy();

    res.status(200).json({
        message: "Mapel Jurusan deleted successfully."
    });
};