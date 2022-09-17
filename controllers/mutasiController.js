const Validator = require("fastest-validator");
const { Mutasi, Siswa, sequelize } = require("../models");

// import fastest-validator
const v = new Validator();


// get all mutasi
exports.getAllMutasi = async (req, res) => {
    const mutasi = await sequelize.query("SELECT * FROM mutasi", {
        model: Mutasi,
        mapToModel: true,
    });

    res.status(200).json(mutasi);
}

// get mutasi
exports.getMutasi = async (req, res) => {
    const id = req.params.id;

    const mutasi = await Mutasi.findByPk(id);

    if (!mutasi) {
        return res.status(404).json({
            message: `Mutasi with id ${id} does not exist`
        });
    }

    res.status(200).json({
        message: `Displaying mutasi with id ${id}`,
        result: mutasi
    });
}

// create mutasi
exports.createMutasi = async (req, res) => {
    try {
        const schema = {
            nis_siswa: { type: "number" },
            alasan_mutasi: { type: "string", optional: true },
            pindah_dari: { type: "string", optional: true },
            pindah_ke: { type: "string", optional: true },
            tgl_mutasi: { type: "date", convert: true },
            sk_mutasi: { type: "string", optional: true },
        }

        const validate = v.validate(req.body, schema);

        // check if validation is success or not
        if (validate.length) {
            return res.status(400).json(validate);
        }

        const siswaExist = await Siswa.findOne({
            where: { nis: req.body.nis_siswa }
        });

        if (!siswaExist) {
            return res.status(409).json({
                status: 'error',
                message: `Siswa with nis ${req.body.nis_siswa} does not exist`,
            });
        }

        const mutasiExist = await Mutasi.findOne({
            where: { nis_siswa: req.body.nis_siswa }
        });

        if (mutasiExist) {
            return res.status(409).json({
                status: 'error',
                message: 'Mutasi already exist' 
            });
        }
        
        var mutasi = await Mutasi.create(req.body);

        res.status(200).json({
            status: "Data added successfully.",
            mutasi
        })

    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ status: "error", message: "Something went wrong. :(" });
    }
}

exports.updateMutasi = async (req, res) => {
    const id = req.params.id;

    let mutasi = await Mutasi.findByPk(id);

    if (!mutasi) {
        return res.status(404).json({
            message: `Mutasi with id ${id} does not exist`
        });
    }

    const schema = {
        nis_siswa: { type: "number", optional: true },
        alasan_mutasi: { type: "string", optional: true },
        pindah_dari: { type: "string", optional: true },
        pindah_ke: { type: "string", optional: true },
        tgl_mutasi: { type: "date", optional: true },
        sk_mutasi: { type: "string", optional: true },
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json(validate);
    }

    if (req.body.nis_siswa) {
        const siswaExist = await Siswa.findOne({
            where: { nis: req.body.nis_siswa }
        });

        if (!siswaExist) {
            return res.status(409).json({
                status: 'error',
                message: `Siswa with nis ${req.body.nis_siswa} does not exist`,
            });
        }
    }

    mutasi = await mutasi.update(req.body);
    res.status(200).json({
        message: `Successfully updated mutasi with id '${id}'`,
        result: mutasi
    });
}

// delete mutasi
exports.deleteMutasi = async (req, res) => {
    const id = req.params.id;

    const mutasi = await Mutasi.findByPk(id);

    if (!mutasi) {
        return res.status(404).json({
            message: `Mutasi with id ${id} does not exist`
        });
    }

    await mutasi.destroy();

    res.status(200).json({
        message: "Mutasi deleted successfully"
    });
}
