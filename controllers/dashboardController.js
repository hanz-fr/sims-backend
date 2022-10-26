const Validator = require("fastest-validator");
const { Op } = require("sequelize");
const { Siswa, Raport, Jurusan, sequelize, Mutasi, MapelJurusan, Kelas,  } = require("../models");
const v = new Validator();
const kelasController = require('../controllers/kelasController');


exports.getMainDashboardData = async (req, res) => {

    const jurusan = await Jurusan.findAndCountAll();
    const siswa = await Siswa.findAndCountAll();
    const mutasi = await Mutasi.findAndCountAll({
        where: {
            pindah_dari: {
                [Op.is]: null
            }
        },
    });
    const siswaMasuk = await Mutasi.findAndCountAll({
        where: {
            pindah_dari: {
                [Op.ne]: null
            }
        }
    });
    const kelas = await Kelas.findAndCountAll();
    const mapel = await MapelJurusan.findAndCountAll();
    const alumni = await Siswa.findAndCountAll({
        where: {
            isAlumni: {
                [Op.eq]: true
            }
        }
    });
    const siswaTdkNaik = await Siswa.findAndCountAll({
        include: [
            {
                model: Raport,
                as: 'raport',
                where: 
                {
                    isNaik: false
                }
            }
        ]
    });
    const jumlahSiswaX = await Siswa.findAndCountAll({
      attributes: [],
      include: [{
        model: Kelas,
        as: 'kelas',
        where: {
          kelas: {
            [Op.eq]: '10'
          }
        }
      }]
    });

    const jumlahSiswaXI = await Siswa.findAndCountAll({
      attributes: [],
      include: [{
        model: Kelas,
        as: 'kelas',
        where: {
          kelas: {
            [Op.eq]: '11'
          }
        }
      }]
    });

    const jumlahSiswaXII = await Siswa.findAndCountAll({
      attributes: [],
      include: [{
        model: Kelas,
        as: 'kelas',
        where: {
          kelas: {
            [Op.eq]: '12'
          }
        }
      }]
    });

      
    res.status(200).json({
        status: 'success',
        jurusan: jurusan,
        siswa: siswa,
        mutasi: mutasi,
        kelas: kelas,
        mapel: mapel,
        alumni: alumni,
        jumlahSiswaX: jumlahSiswaX,
        jumlahSiswaXI: jumlahSiswaXI,
        jumlahSiswaXII: jumlahSiswaXII,
        siswaMasuk: siswaMasuk,
        siswaTdkNaik: siswaTdkNaik,
    });
}


exports.getSiswaTidakNaik = async (req, res) => {

  const siswaTdkNaik = await Siswa.findAndCountAll({
    include: [
        {
            model: Raport,
            as: 'raport',
            where: 
            {
                isNaik: false
            }
        }
    ]
});

  res.status(200).json({
    status: 'success',
    result: siswaTdkNaik
  })

}


exports.getAlumni = async (req, res) => {

  const alumni = await Siswa.findAll({
    where: {
      isAlumni: {
        [Op.is]: true
      }
    }
  })

  res.status(200).json({
    status: 'success',
    result: alumni,
  })
}