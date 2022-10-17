const Validator = require("fastest-validator");
const { Raport, Siswa, NilaiMapel, MapelJurusan, sequelize } = require("../models");

// import fastest-validator
const v = new Validator();

// get all
exports.getAllRaport = async (req, res) => {

    const raport = await Raport.findAll({
        include: [{
            model: NilaiMapel,
            as: 'NilaiMapel',
            include: [{
                model: MapelJurusan
            }]
        }]
    });

    res.status(200).json({
        status: 'success',
        result: raport
    });
}

// get
exports.getRaport = async (req, res) => {
    const id = req.params.id;

    let raport = await Raport.findByPk(id);

    if (!raport) {
        return res.status(404).json({
            status: 'error',
            message: `Raport with id ${id} does not exist`,
        });
    }

    res.status(200).json({
        message: `Displaying raport with id ${id}`,
        result: raport
    });
}

// create
exports.createRaport = async (req, res) => {
    try {
        const schema = {
            nis_siswa: { type: "string", optional: false, max: 10 },
            semester: { type: "number", optional: true },
            thn_ajaran: { type: "number", optional: true },
            sakit: { type: "number", optional: true },
            ijin: { type: "number", optional: true },
            alpa: { type: "number", optional: true },
            isNaik: { type: "boolean", optional: true, },
            naikKelas: { type: "string" },
            tgl_kenaikan: { type: "date", convert: true }
        }

        const validate = v.validate(req.body, schema);

        // check if validation is success or not
        if (validate.length) {
            return res.status(400).json(validate);
        }

        // check if nis siswa exist / valid
        const siswa = await Siswa.findOne({
            where: { nis_siswa: req.body.nis_siswa }
        });

        if (!siswa) {
            return res.status(404).json({
                status: 'error',
                message: `Siswa with nis ${req.body.nis_siswa} is invalid or does not exist`
            });
        }


        // check if raport with the same semester already exist
        const raportSemesterExist = await Raport.findOne({
            where: {
                nis_siswa: req.body.nis_siswa,
                semester: req.body.semester
            }
        });

        if (raportSemesterExist) {
            return res.status(400).json({
                status: 'error',
                message: `Raport for siswa with nis '${req.body.nis_siswa}' semester '${req.body.semester}' already exist.`
            })
        }

        var raport = await Raport.create(req.body);

        res.status(200).json({
            status: "Data added successfully",
            raport
        })
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ status: "error", message: "Something went wrong. :(" });
    }
}

// update
exports.updateRaport = async (req, res) => {

    const id = req.params.id;

    let raport = await Raport.findByPk(id);

    if (!raport) {
        return res.status(404).json({
            status: 'error',
            message: `Raport with id : ${id} is invalid or does not exist`
        });
    }

    const schema = {
        nis_siswa: { type: "string", optional: true, max: 10 },
        semester: { type: "number", optional: true },
        thn_ajaran: { type: "number", optional: true },
        sakit: { type: "number", optional: true },
        ijin: { type: "number", optional: true },
        alpa: { type: "number", optional: true },
        isNaik: { type: "boolean", optional: true },
        naikKelas: { type: "string", optional: true },
        tgl_kenaikan: { type: "date", convert: true, optional: true }
    }

    const validate = v.validate(req.body, schema);

    // check if validation is success or not
    if (validate.length) {
        return res.status(400).json(validate);
    }

    raport = await raport.update(req.body);
    res.status(200).json({
        message: `Successfully updated raport with id : ${id}`,
        result: raport
    });
}

// delete 
exports.deleteRaport = async (req, res) => {
    const id = req.params.id;

    const raport = await Raport.findByPk(id);

    if (!raport) {
        return res.status(404).json({
            status: 'error',
            message: `Raport with id : ${id} is invalid or does not exist`
        });
    }

    await raport.destroy();
    
    res.status(200).json({
        message: "Raport deleted successfully"
    });
}