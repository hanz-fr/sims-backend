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

    const jumlahSiswaAKL = await Siswa.findAndCountAll({
      attributes: [],
      include:[{
        model: Kelas,
        as: 'kelas',
        attributes: [],
        where: {
          jurusan: 'AKL'
        }
      }]
    });

    const jumlahSiswaDKV = await Siswa.findAndCountAll({
      attributes: [],
      include:[{
        model: Kelas,
        as: 'kelas',
        attributes: [],
        where: {
          jurusan: 'DKV'
        }
      }]
    });

    const jumlahSiswaMPLB = await Siswa.findAndCountAll({
      attributes: [],
      include:[{
        model: Kelas,
        as: 'kelas',
        attributes: [],
        where: {
          jurusan: 'MPLB'
        }
      }]
    });

    const jumlahSiswaPM = await Siswa.findAndCountAll({
      attributes: [],
      include:[{
        model: Kelas,
        as: 'kelas',
        attributes: [],
        where: {
          jurusan: 'PM'
        }
      }]
    });

    const jumlahSiswaPPLG = await Siswa.findAndCountAll({
      attributes: [],
      include:[{
        model: Kelas,
        as: 'kelas',
        attributes: [],
        where: {
          jurusan: 'PPLG'
        }
      }]
    });

    const jumlahSiswaTJKT = await Siswa.findAndCountAll({
      attributes: [],
      include:[{
        model: Kelas,
        as: 'kelas',
        attributes: [],
        where: {
          jurusan: 'TJKT'
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
        jumlahSiswaAKL: jumlahSiswaAKL,
        jumlahSiswaAKL: jumlahSiswaAKL,
        jumlahSiswaDKV: jumlahSiswaDKV,
        jumlahSiswaMPLB: jumlahSiswaMPLB,
        jumlahSiswaPM: jumlahSiswaPM,
        jumlahSiswaPPLG: jumlahSiswaPPLG,
        jumlahSiswaTJKT: jumlahSiswaTJKT,
        siswaMasuk: siswaMasuk,
        siswaTdkNaik: siswaTdkNaik,
    });
}


exports.getSiswaTidakNaik = async (req, res) => { 

  const { search } = req.query;

  try {

    if (!search) {

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
      });

    } else {

      const siswaTdkNaik = await Siswa.findAndCountAll({
        where: {
          [Op.or]: [
            {
              nama_siswa: {
                [Op.like]: '%' + search + '%'
              },
            },
            {
              tmp_lahir: {
                [Op.like]: '%' + search + '%'
              },
            },
            {
              tgl_lahir: {
                [Op.like]: '%' + search + '%'
              },
            },
          ]
        },
        include: [
            {
                model: Raport,
                as: 'raport',
                  where: 
                  {
                    isNaik: false,
                  },
              }
          ]
      });

      res.status(200).json({
        status: 'success',
        result: siswaTdkNaik
      });

    }


  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
}


exports.getAlumni = async (req, res) => {

  const { search } = req.query;

  try {

    if (!search) {

      const alumni = await Siswa.findAll({
        where: {
          isAlumni: {
            [Op.is]: true
          }
        }
      });

      res.status(200).json({
        status: 'success',
        result: alumni,
      });

    } else {

      const alumni = await Siswa.findAll({
        where: {
          isAlumni: {
            [Op.is]: true
          },
          [Op.or]: [
            {
              nis_siswa: {
                [Op.like]: '%' + search + '%',
              },
            },
            {
              nisn_siswa: {
                [Op.like]: '%' + search + '%',
              },
            },
            {
              nama_siswa: {
                [Op.like]: '%' + search + '%',
              },
            },
            {
              jenis_kelamin: {
                [Op.like]: '%' + search + '%',
              },
            },
            {
              KelasId: {
                [Op.like]: '%' + search + '%',
              },
            }
          ]
        }
      });

      res.status(200).json({
        status: 'success',
        result: alumni,
      })

    }

  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
}