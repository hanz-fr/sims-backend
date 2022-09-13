const Validator = require("fastest-validator");
const { Kelas, Jurusan, sequelize } = require("../models");

const v = new Validator();

// get all kelas
exports.getAllKelas = async (req, res) => {
    const kelas = await sequelize.query("SELECT * FROM kelas", {
        model: Kelas,
        mapToModel: true,
    });

    res.status(200).json(kelas);
}

// get kelas by id
exports.getKelas = async (req, res) => {
    
    const id = req.params.id;

    const kelas = await Kelas.findByPk(id);

    if (!kelas) {
        return res.json({
            message: `Kelas with id ${id}  does not exist`
        });
    }

    res.status(200).json({
        message: `Displaying kelas with id : ${id}`,
        result: kelas
    });
}

// create kelas
exports.createKelas = async (req, res) => {

    try {

        const schema = {
            kelas: { type: "string", max: 50 },
            JurusanId: { type: "number", optional: false},
            tgl_diterima: { type: "date", convert: true, optional: true },
            semester: { type: "number", optional: true },
        }

        const validate = v.validate(req.body, schema);

        if (validate.length) {
            return res.status(400).json(validate);
        }

        let jurusan = await Jurusan.findOne({
            where: {id: req.body.JurusanId}
        });

        if (!jurusan) {
            return res.status(404).json({
                message: `Jurusan with id ${req.body.JurusanId} does not exist`
            });
        }

        var kelas = await Kelas.create(req.body);

        res.status(200).json({
            status: "Data added successfully.",
            kelas,
        });

    } catch (err) {

        console.log(err);

        if (err.code === 'ERR_NO_REFERENCED_ROW_2') {
            res.status(500);
            res.send({
                status: "error",
                message: "Id of Jurusan is invalid or does not exist"
            });
        } else {
            res.status(500);
            res.send({ status: "error", message: "Something went wrong. :(" });
        }
    }
} 

// update kelas
exports.updateKelas = async (req, res) => {

    const id = req.params.id;

    let kelas = await Kelas.findByPk(id);

    if (!kelas) {
        return res.json({
            message: `Kelas with id ${id} does not exist`
        });
    }

    const schema = {
        kelas: { type: "string", max: 50, optional: true },
        JurusanId: { type: "number", optional: true},
        tgl_diterima: { type: "date", convert: true, optional: true },
        semester: { type: "number", optional: true },
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json(validate);
    }

    kelas = await kelas.update(req.body);

    res.status(200).json({
        message: `Successfully updated kelas with id : ${kelas.id}`,
        result: kelas
    });

}

// delete kelas
exports.deleteKelas = async (req, res) => {

    const id = req.params.id;

    let kelas = await Kelas.findByPk(id);

    if (!kelas) {
        return res.json({
            message: `Kelas with id ${id} does not exist`
        });
    }

    await kelas.destroy();

    res.status(200).json({
        message: "Kelas deleted successfully."
    });

}