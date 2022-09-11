var express = require('express');
var router = express.Router();

const Validator = require("fastest-validator");
const { Siswa } = require("../models");

// import fastest-validator
const v = new Validator();

router.post('/', async (req, res, next) => {
    try {
        // validate incoming request using fastest-validator
        const schema = {
          nis: { type:"string", max:10 },
          nisn: { type:"string", max:10 },
          nama: { type:"string", max:100 },
          email: { type:"string" },
          nomor_ijazah_smk: { type:"string", max:20 },
          nomor_ijazah_smp: { type:"string", max:20 },
          nomor_skhun: { type:"string", max: 10 },
          tanggal_ijazah_smk: { type:"date", convert: true },
          tahun_ijazah_smp: { type:"number" },
          alamat_siswa: { type:"string", min: 5 },
          nama_sekolah_asal: { type:"string" },
          tmp_lahir: { type:"string" },
          tgl_lahir: { type:"date", convert: true},
          jenis_kelamin: { type:"enum", values:["L", "P"] },
          anak_ke: { type:"number"  },
          status: { type:"enum", values: ["AA", "AK", "AT"] },
          agama: { type:"string" },
          keterangan_lain: { type: "string" },
          no_telp: { type:"string", max: 20 },
          berat_badan: { type:"number" },
          tinggi_badan: { type:"number" },
          lingkar_kepala: { type:"number" },
          tgl_masuk: { type:"date", convert: true },
          isAlumni: { type:"boolean" }
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
            message: "NIS siswa sudah terdaftar.",
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
            message: "Email siswa sudah terdaftar."
          });
        }


    
        var siswa = await Siswa.create(req.body);
    
        res.status(200).json({
          status: "Successfully addded siswa.",
          siswa,
        });
      } catch (error) {
        console.log(error);
        res.status(500);
        res.send({ status: "error", message: "Something went wrong. :(" });
      }
});

module.exports = router;