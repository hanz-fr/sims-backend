const Validator = require("fastest-validator");
const { Raport, Siswa, NilaiMapel, MapelJurusan, sequelize } = require("../models");
const { Op } = require("sequelize");


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

    let raport = await Raport.findOne({
        where: {
            id: {
                [Op.eq]: id
            }
        },
        include: [
            {
                model: Siswa,
                as: 'Siswa',
            },
            {
                model: NilaiMapel,
                as: 'NilaiMapel',
                include: [{
                    model: MapelJurusan
                }]
            }
        ]
    });

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
            naikKelas: { type: "string", optional: true },
            tgl_kenaikan: { type: "date", convert: true, optional: true },
            tinggal_di_Kelas: { type: "string", optional: true },
            alasan_tidak_naik: { type: "string", optional: true },
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

        var raport = await Raport.create({
            id: 'RPT' + req.body.nis_siswa + '-' + req.body.semester,
            nis_siswa: req.body.nis_siswa,
            semester: req.body.semester,
            thn_ajaran: req.body.thn_ajaran,
            sakit: req.body.sakit,
            ijin: req.body.ijin,
            alpa: req.body.alpa,
            isNaik: req.body.isNaik,
            naikKelas: req.body.naikKelas,
            tgl_kenaikan: req.body.tgl_kenaikan,
            tinggal_di_Kelas: req.body.tinggal_di_Kelas,
            alasan_tidak_naik: req.body.alasan_tidak_naik,
        });

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

exports.createRaportnNilaiMapel = async (req, res) => {
    try {
        const schemaRP = {
            nis_siswa: { type: "string", optional: false, max: 10 },
            semester: { type: "number", optional: true },
            thn_ajaran: { type: "number", optional: true },
            sakit: { type: "number", optional: true },
            ijin: { type: "number", optional: true },
            alpa: { type: "number", optional: true },
            isNaik: { type: "boolean", optional: true, },
            naikKelas: { type: "string", optional: true },
            tgl_kenaikan: { type: "date", convert: true },
            tinggal_di_kelas: { type: "string", optional: true },
            alasan_tidak_naik: { type: "string", optional: true },
        }

        const validateRP = v.validate(req.body, schemaRP);

        // check if validation is success or not
        if (validateRP.length) {
            return res.status(400).json(validateRP);
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

        const raportID = 'RPT' + req.body.nis_siswa + '-' + req.body.semester,

        raport = await Raport.create({
            id: raportID,
            nis_siswa: req.body.nis_siswa,
            semester: req.body.semester,
            thn_ajaran: req.body.thn_ajaran,
            sakit: req.body.sakit,
            ijin: req.body.ijin,
            alpa: req.body.alpa,
            isNaik: req.body.isNaik,
            naikKelas: req.body.naikKelas,
            tgl_kenaikan: req.body.tgl_kenaikan,
            tinggal_di_Kelas: req.body.tinggal_di_kelas,
            alasan_tidak_naik: req.body.alasan_tidak_naik,
        });

        /* CREATE NILAIMAPEL */
        const schemaNM = {
            idMapelJurusan: { type: "string" },
            RaportId: { type: "string" },
            nilai_keterampilan: { type: "number", max: 100 },
            nilai_pengetahuan: { type: "number", max: 100 },
            kkm: { type: "number", max: 100 },
            nilai_us_teori: { type: "number", max: 100, optional: true },
            nilai_us_praktek: { type: "number", max: 100, optional: true },
            nilai_ukk_teori: { type: "number", max: 100, optional: true },
            nilai_ukk_praktek: { type: "number", max: 100, optional: true },
            nilai_akm: { type: "number", max: 100, optional: true },
        };

        const validateNM = v.validate(req.body, schemaNM);

        // check if validation is success or not
        if (validateNM.length) {
            return res.status(400).json(validateNM);
        }

        // check for existing mapelJurusan
        const mapelJurusanExist = await MapelJurusan.findOne({
            where: { mapelJurusanId: req.body.idMapelJurusan },
        });

        if (!mapelJurusanExist) {
            return res.status(404).json({
                status: "error",
                message: `Mapel Jurusan with id ${req.body.idMapelJurusan} does not exist`,
            });
        }

        // check for existing raport
        const raportExist = await Raport.findOne({
            where: { id: req.body.RaportId },
        });

        if (!raportExist) {
            return res.status(404).json({
                status: "error",
                message: `Raport with id ${req.body.RaportId} does not exist`,
            });
        }


        // check if NilaiMapel already exist
        const idmapel = req.body.idMapelJurusan;
        const idraport = req.body.RaportId;

        const nilaiMapelExist = await NilaiMapel.findOne({
            where: {
                idMapelJurusan: idmapel,
                RaportId: idraport
            }
        });

        if (nilaiMapelExist) {
            return res.status(400).json({
                status: 'error',
                message: `Nilai Mapel '${idmapel}' for raport with id '${idraport}' already exist.`
            });
        }

        var nilaiMapel = await NilaiMapel.create({
            id: 'NM' + raportID + '-' + req.body.idMapelJurusan,
            idMapelJurusan: req.body.idMapelJurusan,
            RaportId: raportID,
            nilai_keterampilan: req.body.nilai_keterampilan,
            nilai_pengetahuan: req.body.nilai_pengetahuan,
            kkm: req.body.kkm,
            nilai_us_teori: req.body.nilai_us_teori,
            nilai_us_praktek: req.body.nilai_us_praktek,
            nilai_ukk_teori: req.body.nilai_ukk_teori,
            nilai_ukk_praktek: req.body.nilai_ukk_praktek,
            nilai_akm: req.body.nilai_akm
        });

        res.status(200).json({
            status: 'success',
            raport: raport,
            nilaiMapel: nilaiMapel 
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
        tgl_kenaikan: { type: "date", convert: true, optional: true },
        tinggal_di_Kelas: { type: "string", optional: true },
        alasan_tidak_naik: { type: "string", optional: true },
    }

    const validate = v.validate(req.body, schema);

    // check if validation is success or not
    if (validate.length) {
        return res.status(400).json(validate);
    }

    raport = await raport.update({
        id: 'RPT' + req.body.nis_siswa + '-' + req.body.semester,
        nis_siswa: req.body.nis_siswa,
        semester: req.body.semester,
        thn_ajaran: req.body.thn_ajaran,
        sakit: req.body.sakit,
        ijin: req.body.ijin,
        alpa: req.body.alpa,
        isNaik: req.body.isNaik,
        naikKelas: req.body.naikKelas,
        tgl_kenaikan: req.body.tgl_kenaikan,
        tinggal_di_Kelas: req.body.tinggal_di_Kelas,
        alasan_tidak_naik: req.body.alasan_tidak_naik,
    });

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