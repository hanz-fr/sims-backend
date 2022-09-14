const Validator = require("fastest-validator");
const { NilaiAkhir, sequelize } = require("../models");

// import fastest-validator
const v = new Validator();

// get all
exports.getAllNilaiAkhir = async (req, res) => {
 const nilaiakhir = await sequelize.query("SELECT * FROM nilai_akhir", {
    model: NilaiAkhir,
    mapToModel: true,
 });

 res.status(200).json(nilaiakhir);
}

// get
exports.getNilaiAkhir = async (req, res) => {
    const id = req.params.id;

    // check if nilaiakhir exist
    const nilaiAkhir = await NilaiAkhir.findByPk(id);

    if (!nilaiAkhir) {
        return res.status(400).json({
            message: "Nilai Akhir does not exist"
        });
    }


    res.status(200).json({
        message: `Displaying nilai akhir with id : ${id}`,
        result: nilaiAkhir
    });
}

// create
exports.createNilaiAkhir = async (req, res) => {
    try {
        const schema = {
            nilai_us_teori: { type: "number", max: 100 },
            nilai_us_praktek: { type: "number", max: 100 },
            nilai_ukk: { type: "number", max: 100 },
            nilai_akm: { type: "number", max: 100 },
        }

        const validate = v.validate(req.body, schema);

        if (validate.length) {
            return res.status(400).json(validate);
        }

        var nilaiAkhir = await NilaiAkhir.create(req.body);
        
        res.status(200).json({
            status: "Data added successfully.",
            nilaiAkhir
        });
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ status: "error", message: "Something went wrong. :(" });
    }
}

// update
exports.updateNilaiAkhir = async (req, res) => {
    const id = req.params.id;

    let nilaiAkhirExist = await NilaiAkhir.findByPk(id);

    if (!nilaiAkhirExist) {
        return res.status(400).json({
            status: 'error',
            message: 'Nilai akhir does not exist'
        });
    }

    const schema = {
        nilai_us_teori: { type: "number", max: 100, optional: true },
        nilai_us_praktek: { type: "number", max: 100, optional: true },
        nilai_ukk: { type: "number", max: 100, optional: true },
        nilai_akm: { type: "number", max: 100, optional: true },
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json(validate);
    }

    nilaiAkhirExist = await nilaiAkhirExist.update(req.body);

    res.status(200).json({
        message: `Successfully updated nilai akhir with id : ${id}`,
        result: nilaiAkhirExist
    });
}

// delete
exports.deleteNilaiAkhir = async (req, res) => {
    const id = req.params.id;

    let nilaiAkhirExist = await NilaiAkhir.findByPk(id);

    if (!nilaiAkhirExist) {
        return res.status(400).json({
            status: 'error',
            message: 'Nilai akhir does not exist'
        });
    }

    await nilaiAkhirExist.destroy();

    res.status(200).json({
        message: "Nilai akhir deleted successfully."
    });
}