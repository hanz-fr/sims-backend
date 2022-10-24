const Validator = require("fastest-validator");
const { Op } = require("sequelize");
const { Siswa, Jurusan, Mutasi, MapelJurusan, Kelas,  } = require("../models");
const v = new Validator();

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
    })

    res.status(200).json({
        status: 'success',
        jurusan: jurusan,
        siswa: siswa,
        mutasi: mutasi,
        kelas: kelas,
        mapel: mapel,
        alumni: alumni,
        siswaMasuk: siswaMasuk,
    });
}