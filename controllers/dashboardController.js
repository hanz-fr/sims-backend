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

    /* Rekap kelas 10 */
    const rekapKelas10 = await Kelas.findAll({
        where: {
          kelas: '10'
        },
        order: [
          ['id', 'ASC']
        ],
        attributes: [
          'id',
          [sequelize.fn("COUNT", sequelize.col("siswa.KelasId")), "jumlahSiswa"],
    
          // jumlahSiswaLaki
          [
            sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM siswa AS s
                            WHERE
                                s.KelasId = Kelas.id
                                AND
                                s.jenis_kelamin = "L"
                        )`),
            "jumlahSiswaLaki",
          ],
    
          // jumlahSiswaPerempuan
          [
            sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM siswa AS s
                            WHERE
                                s.KelasId = Kelas.id
                                AND
                                s.jenis_kelamin = "P"
                        )`),
            "jumlahSiswaPerempuan",
          ],
    
          [
            sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM mutasi AS m
                    WHERE
                        m.keluar_di_kelas = Kelas.id
                        AND
                        m.jenis_kelamin = 'L'
            )`),
            'siswaLakiKeluar'
          ],
          
          [
            sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM mutasi AS m
                    WHERE
                        m.keluar_di_kelas = Kelas.id
                        AND
                        m.jenis_kelamin = 'P'
            )`),
            'siswaPerempuanKeluar'
          ],
    
    
          [
            sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM mutasi AS m
                    WHERE
                        m.keluar_di_kelas = Kelas.id
            )`),
            'jumlahSiswaKeluar'
          ],
    
    
          [
            sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM mutasi AS m
                    WHERE
                        m.diterima_di_kelas = Kelas.id
                        AND
                        m.jenis_kelamin = 'L'
            )`),
            'siswaLakiMasuk'
          ],
    
          [
            sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM mutasi AS m
                    WHERE
                        m.diterima_di_kelas = Kelas.id
                        AND
                        m.jenis_kelamin = 'P'
            )`),
            'siswaPerempuanMasuk'
          ],
    
          [
            sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM mutasi AS m
                    WHERE
                        m.diterima_di_kelas = Kelas.id
            )`),
            'jumlahSiswaMasuk'
          ],
          
        ],
        include: [
          {
            model: Siswa,
            as: "siswa",
            attributes: [],
          },
        ],
        group: ["siswa.KelasId"],
    });


    /* Rekap Kelas 11 */
    const rekapKelas11 = await Kelas.findAll({
        where: {
          kelas: '11'
        },
        order: [
          ['id', 'ASC']
        ],
        attributes: [
          'id',
          [sequelize.fn("COUNT", sequelize.col("siswa.KelasId")), "jumlahSiswa"],
    
          // jumlahSiswaLaki
          [
            sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM siswa AS s
                            WHERE
                                s.KelasId = Kelas.id
                                AND
                                s.jenis_kelamin = "L"
                        )`),
            "jumlahSiswaLaki",
          ],
    
          // jumlahSiswaPerempuan
          [
            sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM siswa AS s
                            WHERE
                                s.KelasId = Kelas.id
                                AND
                                s.jenis_kelamin = "P"
                        )`),
            "jumlahSiswaPerempuan",
          ],
    
          [
            sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM mutasi AS m
                    WHERE
                        m.keluar_di_kelas = Kelas.id
                        AND
                        m.jenis_kelamin = 'L'
            )`),
            'siswaLakiKeluar'
          ],
          
          [
            sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM mutasi AS m
                    WHERE
                        m.keluar_di_kelas = Kelas.id
                        AND
                        m.jenis_kelamin = 'P'
            )`),
            'siswaPerempuanKeluar'
          ],
    
    
          [
            sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM mutasi AS m
                    WHERE
                        m.keluar_di_kelas = Kelas.id
            )`),
            'jumlahSiswaKeluar'
          ],
    
    
          [
            sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM mutasi AS m
                    WHERE
                        m.diterima_di_kelas = Kelas.id
                        AND
                        m.jenis_kelamin = 'L'
            )`),
            'siswaLakiMasuk'
          ],
    
          [
            sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM mutasi AS m
                    WHERE
                        m.diterima_di_kelas = Kelas.id
                        AND
                        m.jenis_kelamin = 'P'
            )`),
            'siswaPerempuanMasuk'
          ],
    
          [
            sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM mutasi AS m
                    WHERE
                        m.diterima_di_kelas = Kelas.id
            )`),
            'jumlahSiswaMasuk'
          ],
          
        ],
        include: [
          {
            model: Siswa,
            as: "siswa",
            attributes: [],
          },
        ],
        group: ["siswa.KelasId"],
    });


    /* Rekap Kelas 12 */
    const rekapKelas12 = await Kelas.findAll({
        where: {
          kelas: '12'
        },
        order: [
          ['id', 'ASC']
        ],
        attributes: [
          'id',
          [sequelize.fn("COUNT", sequelize.col("siswa.KelasId")), "jumlahSiswa"],
    
          // jumlahSiswaLaki
          [
            sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM siswa AS s
                            WHERE
                                s.KelasId = Kelas.id
                                AND
                                s.jenis_kelamin = "L"
                        )`),
            "jumlahSiswaLaki",
          ],
    
          // jumlahSiswaPerempuan
          [
            sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM siswa AS s
                            WHERE
                                s.KelasId = Kelas.id
                                AND
                                s.jenis_kelamin = "P"
                        )`),
            "jumlahSiswaPerempuan",
          ],
    
          [
            sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM mutasi AS m
                    WHERE
                        m.keluar_di_kelas = Kelas.id
                        AND
                        m.jenis_kelamin = 'L'
            )`),
            'siswaLakiKeluar'
          ],
          
          [
            sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM mutasi AS m
                    WHERE
                        m.keluar_di_kelas = Kelas.id
                        AND
                        m.jenis_kelamin = 'P'
            )`),
            'siswaPerempuanKeluar'
          ],
    
    
          [
            sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM mutasi AS m
                    WHERE
                        m.keluar_di_kelas = Kelas.id
            )`),
            'jumlahSiswaKeluar'
          ],
    
    
          [
            sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM mutasi AS m
                    WHERE
                        m.diterima_di_kelas = Kelas.id
                        AND
                        m.jenis_kelamin = 'L'
            )`),
            'siswaLakiMasuk'
          ],
    
          [
            sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM mutasi AS m
                    WHERE
                        m.diterima_di_kelas = Kelas.id
                        AND
                        m.jenis_kelamin = 'P'
            )`),
            'siswaPerempuanMasuk'
          ],
    
          [
            sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM mutasi AS m
                    WHERE
                        m.diterima_di_kelas = Kelas.id
            )`),
            'jumlahSiswaMasuk'
          ],
          
        ],
        include: [
          {
            model: Siswa,
            as: "siswa",
            attributes: [],
          },
        ],
        group: ["siswa.KelasId"],
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
        rekapKelas10: rekapKelas10,
        rekapKelas11: rekapKelas11,
        rekapKelas12: rekapKelas12,
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