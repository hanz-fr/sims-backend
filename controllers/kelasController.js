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
            id: { type: "string", max: 50, optional: true },
            kelas: { type: "string", max: 50 },
            jurusan: { type: "string", max: 50 },
            JurusanId: { type: "string", optional: false},
            rombel: { type: "string", max: 5 }
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

        let kelasExist = await Kelas.findOne({
            where: {id: req.body.kelas+req.body.JurusanId+req.body.rombel}
        });

        if (kelasExist) {
            return res.status(400).json({
                status: 'error',
                message: `Kelas with id '${kelasExist.id}' already exist`
            });
        }

        var kelas = await Kelas.create({
            id: req.body.kelas+req.body.jurusan+req.body.rombel,
            kelas: req.body.kelas,
            JurusanId: req.body.JurusanId,
            jurusan: req.body.jurusan,
            rombel: req.body.rombel,
        });



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
        kelas: { type: "string", max: 50, optional: false },
        JurusanId: { type: "string", optional: false },
        jurusan: { type: "string", max: 50, optional: false },
        rombel: { type: "string", max: 5, optional: false }
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json(validate);
    }

    kelas = await kelas.update({
        id: req.body.kelas+req.body.jurusan+req.body.rombel,
        kelas: req.body.kelas,
        JurusanId: req.body.JurusanId,
        rombel: req.body.rombel,
    });

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