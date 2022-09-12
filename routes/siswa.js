var express = require("express");
var router = express.Router();

const Validator = require("fastest-validator");
const { Siswa, Ortu, sequelize } = require("../models");

// import fastest-validator
const v = new Validator();


// get all siswa
router.get('/', async (req, res) => {
  const siswa = await sequelize.query("SELECT * FROM siswa", {
    model: Siswa,
    mapToModel: true,
  });

  res.status(200).json(siswa);
});


// get siswa by nis
router.get('/:nis', async (req, res) => {
  const nis = req.params.nis;

  // check if siswa exist
  const siswa = await Siswa.findByPk(nis);

  if (!siswa) {
    return res.json({
      message: "Siswa does not exist"
    });
  }

  res.status(200).json({
    message: `Displaying siswa with nis : ${nis}`,
    result: siswa
  });
});


// create route
router.post('/', async (req, res) => {
  try {
    // validate incoming request using fastest-validator
    const schema = {
      nis: { type: "string", max: 10 },
      nisn: { type: "string", max: 10 },
      nama: { type: "string", max: 100 },
      email: { type: "string" },
      OrtuId: { type: "number", optional: true },
      nomor_ijazah_smk: { type: "string", max: 20 },
      nomor_ijazah_smp: { type: "string", max: 20 },
      nomor_skhun: { type: "string", max: 10 },
      tanggal_ijazah_smk: { type: "date", convert: true },
      tahun_ijazah_smp: { type: "number" },
      alamat_siswa: { type: "string" },
      nama_sekolah_asal: { type: "string" },
      tmp_lahir: { type: "string" },
      tgl_lahir: { type: "date", convert: true },
      jenis_kelamin: { type: "enum", values: ["L", "P"] },
      anak_ke: { type: "number" },
      status: { type: "enum", values: ["AA", "AK", "AT"] },
      agama: { type: "string" },
      keterangan_lain: { type: "string" },
      no_telp: { type: "string", max: 20 },
      berat_badan: { type: "number" },
      tinggi_badan: { type: "number" },
      lingkar_kepala: { type: "number" },
      tgl_masuk: { type: "date", convert: true },
      isAlumni: { type: "boolean" },
    };

    const validate = v.validate(req.body, schema);

    // check if validation is success or not
    if (validate.length) {
      return res.status(400).json(validate);
    }

    // find Siswa where nis already exist.
    const siswaIsExist = await Siswa.findOne({
      where: { nis: req.body.nis },
    });

    // return error message to client if siswa already exist.
    if (siswaIsExist) {
      return res.status(409).json({
        status: "error",
        message: "NIS already exist",
      });
    }

    // find Siswa where email already exist.
    const siswaEmailExist = await Siswa.findOne({
      where: { email: req.body.email },
    });

    // return error message to client if email siswa already exist.
    if (siswaEmailExist) {
      return res.status(409).json({
        status: "error",
        message: "Email already exist",
      });
    }


    // find if ortuid is exist or not
    const ortuIdExist = await Ortu.findOne({
      where: { id: req.body.OrtuId }
    });

    if (!ortuIdExist) {
      return res.json({ message: "Ortu ID is invalid or does not exist" })
    }

    var siswa = await Siswa.create(req.body);

    res.status(200).json({
      status: "Data added successfully.",
      siswa,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ status: "error", message: "Something went wrong. :(" });
  }
});


// update route
router.put('/:nis', async (req, res) => {

  // get nis from req params
  const nis = req.params.nis;

  // check if siswa exist in db or not.
  let siswaExist = await Siswa.findByPk(nis);

  if (!siswaExist) {
    return res.json({ message: "Siswa does not exist" });
  }

  // validate incoming request
  const schema = {
    nis: { type: "string", max: 10, optional: true },
    nisn: { type: "string", max: 10, optional: true },
    nama: { type: "string", max: 100, optional: true },
    email: { type: "string", optional: true },
    OrtuId: { type: "number", optional: true },
    nomor_ijazah_smk: { type: "string", max: 20, optional: true },
    nomor_ijazah_smp: { type: "string", max: 20, optional: true },
    nomor_skhun: { type: "string", max: 10, optional: true },
    tanggal_ijazah_smk: { type: "date", convert: true, optional: true },
    tahun_ijazah_smp: { type: "number", optional: true },
    alamat_siswa: { type: "string", optional: true },
    nama_sekolah_asal: { type: "string", optional: true },
    tmp_lahir: { type: "string", optional: true },
    tgl_lahir: { type: "date", convert: true, optional: true },
    jenis_kelamin: { type: "enum", values: ["L", "P"], optional: true },
    anak_ke: { type: "number", optional: true },
    status: { type: "enum", values: ["AA", "AK", "AT"], optional: true },
    agama: { type: "string", optional: true },
    keterangan_lain: { type: "string", optional: true },
    no_telp: { type: "string", max: 20, optional: true },
    berat_badan: { type: "number", optional: true },
    tinggi_badan: { type: "number", optional: true },
    lingkar_kepala: { type: "number", optional: true },
    tgl_masuk: { type: "date", convert: true, optional: true },
    isAlumni: { type: "boolean", optional: true },
  };


  // find if ortu id is exist (if 'OrtuId' is not null.)
  if (req.body.OrtuId) {
    const ortuIdExist = await Ortu.findOne({
      where: { id: req.body.OrtuId }
    });

    if (!ortuIdExist) {
      return res.json({ message: "Ortu ID is invalid or does not exist" })
    }
  }

  // validate schema
  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }


  // update siswa
  siswaExist = await siswaExist.update(req.body);
  res.status(200).json({
    message: `Successfully updated Siswa with nis : ${siswaExist.nis}`,
    result: siswaExist
  });
});


// delete route
router.delete('/:nis', async (req, res) => {
  
  const nis = req.params.nis; // get nis from req params

  const siswa = await Siswa.findByPk(nis); // find siswa by nis

  
  // return error if siswa doesn't exist
  if (!siswa) {
    return res.json({
      message: "Siswa does not exist"
    });
  }

  await siswa.destroy();

  res.json({
    message: "Siswa deleted successfully"
  })

});




module.exports = router;
