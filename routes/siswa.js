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
          nis: { type:"number" },
          nisn: { type:"number" },
          nama: { type:"string" },
          email: { type:"string" },
          nomor_ijazah_smk: { type:"number" },
          tanggal_ijazah_smk: { type:"date" },
          nomor_ijazah_smp: { type:"number" },
          nomor_skhun: { type:"number" },
          tahun_ijazah_smp: { type:"date" },
          alamat_siswa: { type:"string", min: 5, max: 500 },
          nama_sekolah_asal: { type:"string" },
          tmp_lahir: { type:"string" },
          tgl_lahir: { type:"date" },
          jenis_kelamin: { type:"enum", values:["L", "P"] },
          anak_ke: { type:"number"  },
          status: { type:"enum", values: ["AA", "AK", "AT"] },
          agama: { type:"string" },
          keterangan_lain: { type: "string" },
          no_telp: { type:"number" },
          berat_badan: { type:"number" },
          tinggi_badan: { type:"number" },
          lingkar_kepala: { type:"number" },
          tgl_masuk: { type:"date" },
          isAlumni: { type:"boolean" }
        };
    
        const validate = v.validate(req.body, schema);
    
        // check if validation is success or not
        if (validate.length) {
          return res.status(400).json(validate);
        }
    
        // // find user where email already exist.
        // const userEmailExist = await User.findOne({
        //   where: { email: req.body.email },
        // });
    
        // // find user where phone already exist.
        // const userPhoneExist = await User.findOne({
        //   where: { phone: req.body.phone },
        // });
    
        // // return error message to client if email already exist.
        // if (userEmailExist) {
        //   return res.status(409).json({
        //     status: "error",
        //     message: "Email already exist.",
        //   });
        // }
    
        // // return error message to client if phone already exist.
        // if (userPhoneExist) {
        //   return res.status(409).json({
        //     status: "error",
        //     message: "Phone already exist.",
        //   });
        // }
    
        var user = await Siswa.create(req.body);
    
        res.status(200).json({
          status: "Successfully addded siswa.",
          user,
        });
      } catch (error) {
        console.log(error);
        res.status(500);
        res.send({ status: "error", message: "Something went wrong. :(" });
      }
});

module.exports = router;