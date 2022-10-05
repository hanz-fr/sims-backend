const { json } = require("body-parser");
const Validator = require("fastest-validator");
const { Mutasi, Siswa, sequelize } = require("../models");

// import fastest-validator
const v = new Validator();


// get all mutasi
exports.getAllMutasi = async (req, res) => {

    /* Pagination */
    const pageAsNumber = Number.parseInt(req.query.page);
    const perPageAsNumber = Number.parseInt(req.query.perPage);

    let page = 1;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
        page = pageAsNumber
    }

    let perPage = 10;
    if (!Number.isNaN(perPageAsNumber) && perPageAsNumber > 0) {
        perPage = perPageAsNumber;
    }
    
    const mutasi = await Mutasi.findAndCountAll({
        limit: perPage,
        offset: ( page-1 ) * perPage,
    });


    let from = ((page -1) * perPage) + 1;

    let to = page * perPage;

    // pagination params
    path = 'http://127.0.0.1:8000/siswa-keluar';
    firstPageUrl = 'http://127.0.0.1:8000/siswa-keluar?page=1';
    nextPageUrl = `http://127.0.0.1:8000/siswa-keluar?page=${page + 1}`;

    if (page > 1) {
        prevPageUrl = `http://127.0.0.1:8000/siswa-keluar?page=${page - 1}`
    } 

    if (page === 1) {
        prevPageUrl = null
    }

    res.status(200).json({
        current_page: page,
        data: mutasi,
        first_page_url: firstPageUrl,
        from: from,
        next_page_url: nextPageUrl,
        path: path,
        per_page: perPage,
        prev_page_url: prevPageUrl,
        to: to,
      }); 
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
            nis_siswa: { type: "string" },
            nama_siswa: { type: "string" },
            alasan_mutasi: { type: "string", optional: true },
            keluar_di_kelas: { type: "string", optional: true },
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
            where: { nis_siswa: req.body.nis_siswa }
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
        nis_siswa: { type: "string", optional: true },
        nama_siswa: { type: "string", optional: true },
        alasan_mutasi: { type: "string", optional: true },
        keluar_di_kelas: { type: "string", optional: true },
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
