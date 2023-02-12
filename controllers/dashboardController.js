const Validator = require("fastest-validator");
const { Op } = require("sequelize");
const { Siswa, Raport, Jurusan, sequelize, Mutasi, MapelJurusan, Kelas, } = require("../models");
const v = new Validator();
const kelasController = require('../controllers/kelasController');
const cron = require('node-cron');


/* Update isAlumni automatically */
cron.schedule('*/30 * * * *', function () {

  let date_ob = new Date();
  let year = date_ob.getFullYear();

  console.log(`Updating siswa 'isAlumni' to true every 30 minutes if year of angkatan is lower than ${year}`);

  try {

    const result = Siswa.update(
      { isAlumni: true },
      {
        where: {
          angkatan: {
            [Op.lt]: year,
          },
          isAlumni: {
            [Op.ne]: true
          }
        },
      }
    );

    res.status(200).json({
      message: 'success',
      result: result,
    });

  } catch (err) {

    res.status(404).json({
      message: err.message,
    });

  }

});






exports.getMainDashboardData = async (req, res) => {

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  const jurusan = await Jurusan.findAndCountAll({
    attributes: ['id']
  });
  const siswa = await Siswa.findAndCountAll({
    attributes: ['id'],
    where: {
      isAlumni: {
        [Op.ne]: true
      },
      status_siswa: 'aktif',
      tgl_meninggalkan_sekolah: {
        [Op.is]: null
      },
    },
    include: [
      {
        model: Kelas,
        as: 'kelas',
        attributes: ['JurusanId'],
      }
    ]
  });
  const mutasi = await Mutasi.findAndCountAll({
    attributes: ['nis_siswa'],
    where: {
      pindah_dari: {
        [Op.is]: null
      }
    },
    include: [
      {
        model: Siswa,
        as: 'siswa',
        where: {
          isAlumni: {
            [Op.ne]: true
          },
        }
      }
    ]
  });
  const siswaMasuk = await Mutasi.findAndCountAll({
    attributes: ['nis_siswa'],
    where: {
      pindah_dari: {
        [Op.ne]: null
      }
    },
    include: [
      {
        model: Siswa,
        as: 'siswa',
        where: {
          isAlumni: {
            [Op.ne]: true
          },
        }
      }
    ]
  });
  const siswaKeluar = await Mutasi.findAndCountAll({
    attributes: ['nis_siswa'],
    include: [
      {
        model: Siswa,
        as: 'siswa',
        where: {
          isAlumni: {
            [Op.ne]: true
          },
        }
      }
    ],
    where: {
      keluar_di_kelas: {
        [Op.ne]: null
      }
    }
  });


  const kelas = await Kelas.findAndCountAll({
    attributes: ['id']
  });
  const mapel = await MapelJurusan.findAndCountAll({
    attributes: ['mapelJurusanId']
  });
  const alumni = await Siswa.findAndCountAll({
    attributes: ['nis_siswa'],
    where: {
      isAlumni: {
        [Op.eq]: true
      },
      tgl_meninggalkan_sekolah: {
        [Op.is]: null
      },
    }
  });
  const siswaTdkNaik = await Siswa.findAndCountAll({
    attributes: ['nis_siswa'],
    where: {
      isAlumni: {
        [Op.ne]: true
      },
      tgl_meninggalkan_sekolah: {
        [Op.is]: null
      },
    },
    include: [
      {
        model: Raport,
        as: 'raport',
        where:
        {
          isNaik: false,
        }
      }
    ]
  });
  const jumlahSiswaX = await Siswa.findAndCountAll({
    attributes: [],
    where: {
      isAlumni: {
        [Op.ne]: true
      },
      status_siswa: 'aktif',
      tgl_meninggalkan_sekolah: {
        [Op.is]: null
      },
    },
    include: [{
      model: Kelas,
      as: 'kelas',
      attributes: ['id'],
      where: {
        kelas: {
          [Op.eq]: '10',
        }
      }
    }]
  });

  const jumlahSiswaXI = await Siswa.findAndCountAll({
    attributes: [],
    where: {
      isAlumni: {
        [Op.ne]: true
      },
      status_siswa: 'aktif',
      tgl_meninggalkan_sekolah: {
        [Op.is]: null
      },
    },
    include: [{
      model: Kelas,
      as: 'kelas',
      attributes: ['id'],
      where: {
        kelas: {
          [Op.eq]: '11'
        }
      }
    }]
  });

  const jumlahSiswaXII = await Siswa.findAndCountAll({
    attributes: [],
    where: {
      isAlumni: {
        [Op.ne]: true
      },
      status_siswa: 'aktif',
      tgl_meninggalkan_sekolah: {
        [Op.is]: null
      },
    },
    include: [{
      model: Kelas,
      as: 'kelas',
      attributes: ['id'],
      where: {
        kelas: {
          [Op.eq]: '12'
        }
      }
    }]
  });

  const jumlahSiswaAKL = await Siswa.findAndCountAll({
    attributes: [],
    where: {
      isAlumni: {
        [Op.ne]: true
      },
      status_siswa: 'aktif',
      tgl_meninggalkan_sekolah: {
        [Op.is]: null
      },
    },
    include: [{
      model: Kelas,
      as: 'kelas',
      attributes: ['id'],
      where: {
        jurusan: 'AKL'
      }
    }]
  });

  const jumlahSiswaDKV = await Siswa.findAndCountAll({
    attributes: [],
    where: {
      isAlumni: {
        [Op.ne]: true
      },
      status_siswa: 'aktif',
      tgl_meninggalkan_sekolah: {
        [Op.is]: null
      },
    },
    include: [{
      model: Kelas,
      as: 'kelas',
      attributes: ['id'],
      where: {
        jurusan: 'DKV'
      }
    }]
  });

  const jumlahSiswaMPLB = await Siswa.findAndCountAll({
    attributes: [],
    where: {
      isAlumni: {
        [Op.ne]: true
      },
      status_siswa: 'aktif',
      tgl_meninggalkan_sekolah: {
        [Op.is]: null
      },
    },
    include: [{
      model: Kelas,
      as: 'kelas',
      attributes: ['id'],
      where: {
        jurusan: 'MPLB'
      }
    }]
  });

  const jumlahSiswaPM = await Siswa.findAndCountAll({
    attributes: [],
    where: {
      isAlumni: {
        [Op.ne]: true
      },
      status_siswa: 'aktif',
      tgl_meninggalkan_sekolah: {
        [Op.is]: null
      },
    },
    include: [{
      model: Kelas,
      as: 'kelas',
      attributes: ['id'],
      where: {
        jurusan: 'PM'
      }
    }]
  });

  const jumlahSiswaPPLG = await Siswa.findAndCountAll({
    attributes: [],
    where: {
      isAlumni: {
        [Op.ne]: true
      },
      status_siswa: 'aktif',
      tgl_meninggalkan_sekolah: {
        [Op.is]: null
      },
    },
    include: [{
      model: Kelas,
      as: 'kelas',
      attributes: ['id'],
      where: {
        jurusan: 'PPLG'
      }
    }]
  });

  const jumlahSiswaTJKT = await Siswa.findAndCountAll({
    attributes: [],
    where: {
      isAlumni: {
        [Op.ne]: true
      },
      status_siswa: 'aktif',
      tgl_meninggalkan_sekolah: {
        [Op.is]: null
      },
    },
    include: [{
      model: Kelas,
      as: 'kelas',
      attributes: ['id'],
      where: {
        jurusan: 'TJKT'
      }
    }]
  });


  const jumlahSiswaMLOG = await Siswa.findAndCountAll({
    attributes: [],
    where: {
      isAlumni: {
        [Op.ne]: true
      },
      status_siswa: 'aktif',
      tgl_meninggalkan_sekolah: {
        [Op.is]: null
      },
    },
    include: [{
      model: Kelas,
      as: 'kelas',
      attributes: ['id'],
      where: {
        jurusan: 'MLOG'
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
    jumlahSiswaMLOG: jumlahSiswaMLOG,
    siswaMasuk: siswaMasuk,
    siswaKeluar: siswaKeluar,
    siswaTdkNaik: siswaTdkNaik,
  });
}


exports.getSiswaMasukByMonth = async (req, res) => {

  let fromDate = req.params.fromDate;
  let toDate = req.params.toDate;

  const siswaMasuk = await Mutasi.findAndCountAll({
    where: {
      pindah_dari: {
        [Op.ne]: null
      },
      tgl_mutasi: {
        [Op.between]: [fromDate, toDate],
      }
    }
  });

  res.status(200).json(siswaMasuk);

}


exports.getSiswaKeluarByMonth = async (req, res) => {

  let fromDate = req.params.fromDate;
  let toDate = req.params.toDate;

  const siswaMasuk = await Mutasi.findAndCountAll({
    where: {
      keluar_di_kelas: {
        [Op.ne]: null
      },
      tgl_mutasi: {
        [Op.between]: [fromDate, toDate],
      }
    }
  });

  res.status(200).json(siswaMasuk);

}


exports.getSiswaTidakNaik = async (req, res) => {

  const { search } = req.query;
  let fromDate = req.query.dibuatTglDari || "";
  let toDate = req.query.dibuatTglKe || "";
  let sort_by = req.query.sort_by || "id";
  let sort = req.query.sort || "ASC";


  let nama_siswa = req.query.nama_siswa || '';
  let tinggal_di_Kelas = req.query.tinggal_di_Kelas || '';
  let alasan_tidak_naik = req.query.alasan_tidak_naik || '';
  let tmp_lahir = req.query.tmp_lahir || '';
  let tgl_lahir = req.query.tgl_lahir || '';

  /* Pagination */
  const pageAsNumber = Number.parseInt(req.query.page);
  const perPageAsNumber = Number.parseInt(req.query.perPage);

  let page = 1;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber
  }


  let perPage = 10;

  if (!Number.isNaN(perPageAsNumber) && perPageAsNumber > 0) {
    perPage = perPageAsNumber;
  }


  try {

    if (!search) {

      if (fromDate != "" || toDate != "") {

        let siswaTdkNaik = await Raport.findAndCountAll({
          limit: perPage,
          offset: (page - 1) * perPage,
          order: [
            ['siswa', sort_by, sort]
          ],
          where: {
            isNaik: {
              [Op.ne]: true
            },
            [Op.or]: [{
              createdAt: {
                [Op.between]: [fromDate, toDate]
              }
            }]
          },
          include: [
            {
              model: Siswa,
              as: 'siswa',
            }
          ]
        });

        let from = ((page - 1) * perPage) + 1;

        let to = page * perPage;

        // pagination params
        path = 'http://127.0.0.1:8000/data-tidak-naik';
        firstPageUrl = `http://127.0.0.1:8000/data-tidak-naik?page=1&perPage=${perPage}`;
        nextPageUrl = `http://127.0.0.1:8000/data-tidak-naik?page=${page + 1}&perPage=${perPage}&search=${search}&nama_siswa=${nama_siswa}&tinggal_di_Kelas=${tinggal_di_Kelas}&alasan_tidak_naik=${alasan_tidak_naik}&tmp_lahir=${tmp_lahir}&tgl_lahir=${tgl_lahir}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe=${toDate}`;

        if (page > 1) {
          prevPageUrl = `http://127.0.0.1:8000/data-tidak-naik?page=${page - 1}&perPage=${perPage}&search=${search}&nama_siswa=${nama_siswa}&tinggal_di_Kelas=${tinggal_di_Kelas}&alasan_tidak_naik=${alasan_tidak_naik}&tmp_lahir=${tmp_lahir}&tgl_lahir=${tgl_lahir}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe=${toDatee}`
        }

        if (page === 1) {
          prevPageUrl = null
        }


        res.status(200).json({
          resultId: 1,
          current_page: page,
          data: siswaTdkNaik,
          first_page_url: firstPageUrl,
          from: from,
          next_page_url: nextPageUrl,
          path: path,
          per_page: perPage,
          prev_page_url: prevPageUrl,
          to: to,
        });


      } else {


        let siswaTdkNaik = await Raport.findAndCountAll({
          limit: perPage,
          offset: (page - 1) * perPage,
          order: [
            ['siswa', sort_by, sort]
          ],
          where: {
            isNaik: {
              [Op.ne]: true
            },
          },
          include: [
            {
              model: Siswa,
              as: 'siswa',
            }
          ]
        });

        let from = ((page - 1) * perPage) + 1;

        let to = page * perPage;

        // pagination params
        path = 'http://127.0.0.1:8000/data-tidak-naik';
        firstPageUrl = `http://127.0.0.1:8000/data-tidak-naik?page=1&perPage=${perPage}`;
        nextPageUrl = `http://127.0.0.1:8000/data-tidak-naik?page=${page + 1}&perPage=${perPage}&search=${search}&nama_siswa=${nama_siswa}&tinggal_di_Kelas=${tinggal_di_Kelas}&alasan_tidak_naik=${alasan_tidak_naik}&tmp_lahir=${tmp_lahir}&tgl_lahir=${tgl_lahir}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe=${toDate}`;

        if (page > 1) {
          prevPageUrl = `http://127.0.0.1:8000/data-tidak-naik?page=${page - 1}&perPage=${perPage}&search=${search}&nama_siswa=${nama_siswa}&tinggal_di_Kelas=${tinggal_di_Kelas}&alasan_tidak_naik=${alasan_tidak_naik}&tmp_lahir=${tmp_lahir}&tgl_lahir=${tgl_lahir}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe=${toDate}`;
        }

        if (page === 1) {
          prevPageUrl = null
        }


        res.status(200).json({
          resultId: 2,
          current_page: page,
          data: siswaTdkNaik,
          first_page_url: firstPageUrl,
          from: from,
          next_page_url: nextPageUrl,
          path: path,
          per_page: perPage,
          prev_page_url: prevPageUrl,
          to: to,
        });

      }


    } else {

      let searchByNama = '+?+';
      let searchByTinggalDiKelas = '+?+';
      let searchByAlasan = '+?+';
      let searchByTempatLahir = '+?+';
      let searchByTanggalLahir = '+?+';

      if (nama_siswa === "true") {
        searchByNama = search;
      }

      if (tinggal_di_Kelas === "true") {
        searchByTinggalDiKelas = search;
      }

      if (alasan_tidak_naik === "true") {
        searchByAlasan = search;
      }

      if (tmp_lahir === "true") {
        searchByTempatLahir = search;
      }

      if (tgl_lahir === "true") {
        searchByTanggalLahir = search;
      }

      if (!req.query.nama_siswa && !req.query.tinggal_di_Kelas && !req.query.alasan_tidak_naik && !req.query.tmp_lahir && !req.query.tgl_lahir) {
        searchByNama = search;
        searchByTempatLahir = search;
        searchByTanggalLahir = search;
        searchByTinggalDiKelas = search;
        searchByAlasan = search;
      }

      if (fromDate != "" || toDate != "") {


        let siswaTdkNaik = await Raport.findAndCountAll({
          limit: perPage,
          offset: (page - 1) * perPage,
          order: [
            ['siswa', sort_by, sort]
          ],
          where: {
            isNaik: {
              [Op.ne]: true
            },
            createdAt: {
              [Op.between]: [fromDate, toDate]
            },
            [Op.or]: [
              {
                tinggal_di_Kelas: {
                  [Op.like]: '%' + searchByTinggalDiKelas + '%'
                },
              },
              {
                alasan_tidak_naik: {
                  [Op.like]: '%' + searchByAlasan + '%'
                }
              },
              {
                '$siswa.nama_siswa$': {
                  [Op.like]: '%' + searchByNama + '%'
                }
              },
              {
                '$siswa.tmp_lahir$': {
                  [Op.like]: '%' + searchByTempatLahir + '%'
                }
              },
              {
                '$siswa.tgl_lahir$': {
                  [Op.like]: '%' + searchByTanggalLahir + '%'
                }
              },
            ],
          },
          include: [
            {
              model: Siswa,
              as: 'siswa',
            }
          ]
        });

        let from = ((page - 1) * perPage) + 1;

        let to = page * perPage;

        // pagination params
        path = 'http://127.0.0.1:8000/data-tidak-naik';
        firstPageUrl = `http://127.0.0.1:8000/data-tidak-naik?page=1&perPage=${perPage}`;
        nextPageUrl = `http://127.0.0.1:8000/data-tidak-naik?page=${page + 1}&perPage=${perPage}&search=${search}&nama_siswa=${nama_siswa}&tinggal_di_Kelas=${tinggal_di_Kelas}&alasan_tidak_naik=${alasan_tidak_naik}&tmp_lahir=${tmp_lahir}&tgl_lahir=${tgl_lahir}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe=${toDate}`;

        if (page > 1) {
          prevPageUrl = `http://127.0.0.1:8000/data-tidak-naik?page=${page - 1}&perPage=${perPage}&search=${search}&nama_siswa=${nama_siswa}&tinggal_di_Kelas=${tinggal_di_Kelas}&alasan_tidak_naik=${alasan_tidak_naik}&tmp_lahir=${tmp_lahir}&tgl_lahir=${tgl_lahir}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe=${toDate}`;
        }

        if (page === 1) {
          prevPageUrl = null
        }


        res.status(200).json({
          resultId: 3,
          current_page: page,
          data: siswaTdkNaik,
          first_page_url: firstPageUrl,
          from: from,
          next_page_url: nextPageUrl,
          path: path,
          per_page: perPage,
          prev_page_url: prevPageUrl,
          to: to,
        });


      } else {


        let siswaTdkNaik = await Raport.findAndCountAll({
          limit: perPage,
          offset: (page - 1) * perPage,
          order: [
            ['siswa', sort_by, sort]
          ],
          where: {
            isNaik: {
              [Op.ne]: true
            },
            [Op.or]: [
              {
                tinggal_di_Kelas: {
                  [Op.like]: '%' + searchByTinggalDiKelas + '%'
                },
              },
              {
                alasan_tidak_naik: {
                  [Op.like]: '%' + searchByAlasan + '%'
                }
              },
              {
                '$siswa.nama_siswa$': {
                  [Op.like]: '%' + searchByNama + '%'
                }
              },
              {
                '$siswa.tmp_lahir$': {
                  [Op.like]: '%' + searchByTempatLahir + '%'
                }
              },
              {
                '$siswa.tgl_lahir$': {
                  [Op.like]: '%' + searchByTanggalLahir + '%'
                }
              },
            ],
          },
          include: [
            {
              model: Siswa,
              as: 'siswa',
            }
          ]
        });


        let from = ((page - 1) * perPage) + 1;

        let to = page * perPage;

        // pagination params
        path = 'http://127.0.0.1:8000/data-tidak-naik';
        firstPageUrl = `http://127.0.0.1:8000/data-tidak-naik?page=1&perPage=${perPage}`;
        nextPageUrl = `http://127.0.0.1:8000/data-tidak-naik?page=${page + 1}&perPage=${perPage}&search=${search}&nama_siswa=${nama_siswa}&tinggal_di_Kelas=${tinggal_di_Kelas}&alasan_tidak_naik=${alasan_tidak_naik}&tmp_lahir=${tmp_lahir}&tgl_lahir=${tgl_lahir}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe=${toDate}`;

        if (page > 1) {
          prevPageUrl = `http://127.0.0.1:8000/data-tidak-naik?page=${page - 1}&perPage=${perPage}&search=${search}&nama_siswa=${nama_siswa}&tinggal_di_Kelas=${tinggal_di_Kelas}&alasan_tidak_naik=${alasan_tidak_naik}&tmp_lahir=${tmp_lahir}&tgl_lahir=${tgl_lahir}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe=${toDate}`;
        }

        if (page === 1) {
          prevPageUrl = null
        }


        res.status(200).json({
          resultId: 4,
          current_page: page,
          data: siswaTdkNaik,
          first_page_url: firstPageUrl,
          from: from,
          next_page_url: nextPageUrl,
          path: path,
          per_page: perPage,
          prev_page_url: prevPageUrl,
          to: to,
        });

      }

    }


  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
}


exports.getSiswaTidakNaikSearchRaport = async (req, res) => {

  let search = req.query.search;

  if (!search) {
    search = '';
  }


  let raport = await Raport.findAndCountAll({
    where: {
      isNaik: {
        [Op.ne]: true
      },
      [Op.or]: [
        {
          tinggal_di_Kelas: {
            [Op.like]: '%' + search + '%'
          },
        },
        {
          alasan_tidak_naik: {
            [Op.like]: '%' + search + '%'
          }
        },
        {
          '$siswa.nama_siswa$': {
            [Op.like]: '%' + search + '%'
          }
        },
        {
          '$siswa.tmp_lahir$': {
            [Op.like]: '%' + search + '%'
          }
        },
        {
          '$siswa.tgl_lahir$': {
            [Op.like]: '%' + search + '%'
          }
        },
      ],
    },
    include: [
      {
        model: Siswa,
        as: 'siswa',
      }
    ]
  });


  res.status(200).json(raport);

}


exports.getAlumni = async (req, res) => {

  const { search } = req.query;
  let fromDate = req.query.dibuatTglDari || "";
  let toDate = req.query.dibuatTglKe || "";
  let sort_by = req.query.sort_by || "nama_siswa";
  let sort = req.query.sort || "ASC";

  let id = req.query.id || '';
  let nis_siswa = req.query.nis_siswa || '';
  let nisn_siswa = req.query.nisn_siswa || '';
  let nama_siswa = req.query.nama_siswa || '';
  let jenis_kelamin = req.query.jenis_kelamin || '';
  let KelasId = req.query.KelasId || '';

  let angkatan = req.params.angkatan || '';
  let jurusan = req.params.jurusan || '';

  /* CONDITIONAL WHERE QUERY */
  let where = {
    isAlumni: {
      [Op.is]: true
    },
  };


  // kalau gaada search
  if (!search) {


    // kalau ada thn_ajaran
    if (angkatan) {


      // kalau ada angkatan, fromDate & toDate
      if (fromDate != "" || toDate != "") {

        where = {
          isAlumni: {
            [Op.is]: true
          },
          angkatan: angkatan,
          [Op.or]: [{
            createdAt: {
              [Op.between]: [fromDate, toDate]
            }
          }],
        }

        // kalau ada angkatan, tp gaada fromDate & toDate
      } else {

        where = {
          isAlumni: {
            [Op.is]: true
          },
          angkatan: angkatan,
        }

      }

    } else {


      // kalau gaada angkatan, tapi ada fromDate & toDate
      if (fromDate != "" || toDate != "") {

        where = {
          isAlumni: {
            [Op.is]: true
          },
          [Op.or]: [{
            createdAt: {
              [Op.between]: [fromDate, toDate]
            }
          }]
        }
      } else if (!fromDate || !toDate) {

        where = {

          isAlumni: {
            [Op.is]: true
          },

        }

      }

    }



    // kalau ada search
  } else {

    /* 
      Initialize variable with +?+ so there wont
      be any results of the following parameters.
      */

    let searchById = '+?+';
    let searchByNis = '+?+';
    let searchByNisn = '+?+';
    let searchByNama = '+?+';
    let searchByGender = '+?+';
    let searchByKelas = '+?+';

    /*
    If there's any parameters with search query is enabled,
    the previous value of variable will be replaced with search.
    */

    if (id === "true") {
      searchById = search;
    }

    if (nis_siswa === "true") {
      searchByNis = search;
    }

    if (nisn_siswa === "true") {
      searchByNisn = search;
    }

    if (nama_siswa === "true") {
      searchByNama = search;
    }

    if (jenis_kelamin === "true") {
      searchByGender = search;
    }

    if (KelasId === "true") {
      searchByKelas = search;
    }

    /* 
    If there are no parameters set to true,
    All parameters will have the same value as search.
    */

    if (!req.query.nis_siswa && !req.query.nisn_siswa && !req.query.nama_siswa && !req.query.jenis_kelamin && !req.query.KelasId) {
      searchById = search;
      searchByNis = search;
      searchByNisn = search;
      searchByNama = search;
      searchByGender = search;
      searchByKelas = search;
    }

    // kalau ada angkatan
    if (angkatan) {


      // kalau ada angkatan, fromDate & toDate
      if (fromDate != "" || toDate != "") {

        where = {
          isAlumni: {
            [Op.is]: true
          },
          angkatan: angkatan,
          createdAt: {
            [Op.between]: [fromDate, toDate]
          },
          [Op.or]: [
            {
              id: {
                [Op.like]: '%' + searchById + '%'
              }
            },
            {
              nis_siswa: {
                [Op.like]: '%' + searchByNis + '%'
              }
            },
            {
              nisn_siswa: {
                [Op.like]: '%' + searchByNisn + '%'
              }
            },
            {
              nama_siswa: {
                [Op.like]: '%' + searchByNama + '%'
              }
            },
            {
              jenis_kelamin: {
                [Op.like]: '%' + searchByGender + '%'
              }
            },
            {
              KelasId: {
                [Op.like]: '%' + searchByKelas + '%'
              }
            },
          ]
        }

        // kalau ada angkatan, tp gaada fromDate & toDate
      } else {

        where = {
          isAlumni: {
            [Op.is]: true
          },
          angkatan: angkatan,
          [Op.or]: [
            {
              id: {
                [Op.like]: '%' + searchById + '%'
              }
            },
            {
              nis_siswa: {
                [Op.like]: '%' + searchByNis + '%'
              }
            },
            {
              nisn_siswa: {
                [Op.like]: '%' + searchByNisn + '%'
              }
            },
            {
              nama_siswa: {
                [Op.like]: '%' + searchByNama + '%'
              }
            },
            {
              jenis_kelamin: {
                [Op.like]: '%' + searchByGender + '%'
              }
            },
            {
              KelasId: {
                [Op.like]: '%' + searchByKelas + '%'
              }
            },
          ]
        }

      }

    } else {


      // kalau gaada angkatan, tapi ada fromDate & toDate
      if (fromDate != "" || toDate != "") {

        where = {
          isAlumni: {
            [Op.is]: true
          },
          createdAt: {
            [Op.between]: [fromDate, toDate]
          },
          [Op.or]: [
            {
              id: {
                [Op.like]: '%' + searchById + '%'
              }
            },
            {
              nis_siswa: {
                [Op.like]: '%' + searchByNis + '%'
              }
            },
            {
              nisn_siswa: {
                [Op.like]: '%' + searchByNisn + '%'
              }
            },
            {
              nama_siswa: {
                [Op.like]: '%' + searchByNama + '%'
              }
            },
            {
              jenis_kelamin: {
                [Op.like]: '%' + searchByGender + '%'
              }
            },
            {
              KelasId: {
                [Op.like]: '%' + searchByKelas + '%'
              }
            },
          ]
        }
      } else if (!fromDate || !toDate) {

        where = {

          isAlumni: {
            [Op.is]: true
          },
          [Op.or]: [
            {
              id: {
                [Op.like]: '%' + searchById + '%'
              }
            },
            {
              nis_siswa: {
                [Op.like]: '%' + searchByNis + '%'
              }
            },
            {
              nisn_siswa: {
                [Op.like]: '%' + searchByNisn + '%'
              }
            },
            {
              nama_siswa: {
                [Op.like]: '%' + searchByNama + '%'
              }
            },
            {
              jenis_kelamin: {
                [Op.like]: '%' + searchByGender + '%'
              }
            },
            {
              KelasId: {
                [Op.like]: '%' + searchByKelas + '%'
              }
            },
          ]

        }

      }

    }

  }


  /* Pagination */
  const pageAsNumber = Number.parseInt(req.query.page);
  const perPageAsNumber = Number.parseInt(req.query.perPage);

  let page = 1;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber
  }


  let perPage = 10;

  if (!Number.isNaN(perPageAsNumber) && perPageAsNumber > 0) {
    perPage = perPageAsNumber;
  }

  try {

    let alumni = await Siswa.findAndCountAll({
      limit: perPage,
      offset: (page - 1) * perPage,
      order: [
        [sort_by, sort]
      ],
      where,
      include: {
        model: Kelas,
        as: 'kelas',
        where: {
          JurusanId: jurusan,
        }
      }
    });

    let from = ((page - 1) * perPage) + 1;

    let to = page * perPage;

    // pagination params
    path = 'http://127.0.0.1:8000/data-alumni';
    firstPageUrl = `http://127.0.0.1:8000/data-alumni?jurusan=${jurusan}&angkatan=${angkatan}&page=1&perPage=${perPage}`;
    nextPageUrl = `http://127.0.0.1:8000/data-alumni?jurusan=${jurusan}&angkatan=${angkatan}&page=${page + 1}&perPage=${perPage}&search=${search}&id=${id}&nis_siswa=${nis_siswa}&nisn_siswa=${nisn_siswa}&nama_siswa=${nama_siswa}&jenis_kelamin=${jenis_kelamin}&KelasId=${KelasId}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe=${toDate}`;

    if (page > 1) {
      prevPageUrl = `http://127.0.0.1:8000/data-alumni?jurusan=${jurusan}&angkatan=${angkatan}&page=${page - 1}&perPage=${perPage}&search=${search}&id=${id}&nis_siswa=${nis_siswa}&nisn_siswa=${nisn_siswa}&nama_siswa=${nama_siswa}&jenis_kelamin=${jenis_kelamin}&KelasId=${KelasId}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe=${toDate}`;
    }

    if (page === 1) {
      prevPageUrl = null
    }


    res.status(200).json({
      resultId: 1,
      current_page: page,
      data: alumni,
      first_page_url: firstPageUrl,
      from: from,
      next_page_url: nextPageUrl,
      path: path,
      per_page: perPage,
      prev_page_url: prevPageUrl,
      to: to,
    });


  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
}






/* get all alumni */
exports.getAllAlumni = async (req, res) => {

  const { search } = req.query;
  let fromDate = req.query.dibuatTglDari || "";
  let toDate = req.query.dibuatTglKe || "";
  let sort_by = req.query.sort_by || "nama_siswa";
  let sort = req.query.sort || "ASC";

  let id = req.query.id || '';
  let nis_siswa = req.query.nis_siswa || '';
  let nisn_siswa = req.query.nisn_siswa || '';
  let nama_siswa = req.query.nama_siswa || '';
  let jenis_kelamin = req.query.jenis_kelamin || '';
  let KelasId = req.query.KelasId || '';
  let angkatan = req.query.angkatan || '';

  /* CONDITIONAL WHERE QUERY */
  let where = {
    isAlumni: {
      [Op.is]: true
    },
  };


  if (!search) {


    // kalau ada thn_ajaran
    if (angkatan) {


      // kalau ada angkatan, fromDate & toDate
      if (fromDate != "" || toDate != "") {

        where = {
          isAlumni: {
            [Op.is]: true
          },
          angkatan: angkatan,
          [Op.or]: [{
            createdAt: {
              [Op.between]: [fromDate, toDate]
            }
          }],
        }

        // kalau ada angkatan, tp gaada fromDate & toDate
      } else {

        where = {
          isAlumni: {
            [Op.is]: true
          },
          angkatan: angkatan,
        }

      }

    } else {


      // kalau gaada angkatan, tapi ada fromDate & toDate
      if (fromDate != "" || toDate != "") {

        where = {
          isAlumni: {
            [Op.is]: true
          },
          [Op.or]: [{
            createdAt: {
              [Op.between]: [fromDate, toDate]
            }
          }]
        }
      } else if (!fromDate || !toDate) {

        where = {

          isAlumni: {
            [Op.is]: true
          },

        }

      }

    }



    // kalau ada search
  } else {

    /* 
      Initialize variable with +?+ so there wont
      be any results of the following parameters.
      */

    let searchById = '+?+';
    let searchByNis = '+?+';
    let searchByNisn = '+?+';
    let searchByNama = '+?+';
    let searchByGender = '+?+';
    let searchByKelas = '+?+';

    /*
    If there's any parameters with search query is enabled,
    the previous value of variable will be replaced with search.
    */

    if (id === "true") {
      searchById = search;
    }

    if (nis_siswa === "true") {
      searchByNis = search;
    }

    if (nisn_siswa === "true") {
      searchByNisn = search;
    }

    if (nama_siswa === "true") {
      searchByNama = search;
    }

    if (jenis_kelamin === "true") {
      searchByGender = search;
    }

    if (KelasId === "true") {
      searchByKelas = search;
    }

    /* 
    If there are no parameters set to true,
    All parameters will have the same value as search.
    */

    if (!req.query.nis_siswa && !req.query.nisn_siswa && !req.query.nama_siswa && !req.query.jenis_kelamin && !req.query.KelasId) {
      searchById = search;
      searchByNis = search;
      searchByNisn = search;
      searchByNama = search;
      searchByGender = search;
      searchByKelas = search;
    }

    // kalau ada angkatan
    if (angkatan) {


      // kalau ada angkatan, fromDate & toDate
      if (fromDate != "" || toDate != "") {

        where = {
          isAlumni: {
            [Op.is]: true
          },
          angkatan: angkatan,
          createdAt: {
            [Op.between]: [fromDate, toDate]
          },
          [Op.or]: [
            {
              id: {
                [Op.like]: '%' + searchById + '%'
              }
            },
            {
              nis_siswa: {
                [Op.like]: '%' + searchByNis + '%'
              }
            },
            {
              nisn_siswa: {
                [Op.like]: '%' + searchByNisn + '%'
              }
            },
            {
              nama_siswa: {
                [Op.like]: '%' + searchByNama + '%'
              }
            },
            {
              jenis_kelamin: {
                [Op.like]: '%' + searchByGender + '%'
              }
            },
            {
              KelasId: {
                [Op.like]: '%' + searchByKelas + '%'
              }
            },
          ]
        }

        // kalau ada angkatan, tp gaada fromDate & toDate
      } else {

        where = {
          isAlumni: {
            [Op.is]: true
          },
          angkatan: angkatan,
          [Op.or]: [
            {
              id: {
                [Op.like]: '%' + searchById + '%'
              }
            },
            {
              nis_siswa: {
                [Op.like]: '%' + searchByNis + '%'
              }
            },
            {
              nisn_siswa: {
                [Op.like]: '%' + searchByNisn + '%'
              }
            },
            {
              nama_siswa: {
                [Op.like]: '%' + searchByNama + '%'
              }
            },
            {
              jenis_kelamin: {
                [Op.like]: '%' + searchByGender + '%'
              }
            },
            {
              KelasId: {
                [Op.like]: '%' + searchByKelas + '%'
              }
            },
          ]
        }

      }

    } else {


      // kalau gaada angkatan, tapi ada fromDate & toDate
      if (fromDate != "" || toDate != "") {

        where = {
          isAlumni: {
            [Op.is]: true
          },
          createdAt: {
            [Op.between]: [fromDate, toDate]
          },
          [Op.or]: [
            {
              id: {
                [Op.like]: '%' + searchById + '%'
              }
            },
            {
              nis_siswa: {
                [Op.like]: '%' + searchByNis + '%'
              }
            },
            {
              nisn_siswa: {
                [Op.like]: '%' + searchByNisn + '%'
              }
            },
            {
              nama_siswa: {
                [Op.like]: '%' + searchByNama + '%'
              }
            },
            {
              jenis_kelamin: {
                [Op.like]: '%' + searchByGender + '%'
              }
            },
            {
              KelasId: {
                [Op.like]: '%' + searchByKelas + '%'
              }
            },
          ]
        }
      } else if (!fromDate || !toDate) {

        where = {

          isAlumni: {
            [Op.is]: true
          },
          [Op.or]: [
            {
              id: {
                [Op.like]: '%' + searchById + '%'
              }
            },
            {
              nis_siswa: {
                [Op.like]: '%' + searchByNis + '%'
              }
            },
            {
              nisn_siswa: {
                [Op.like]: '%' + searchByNisn + '%'
              }
            },
            {
              nama_siswa: {
                [Op.like]: '%' + searchByNama + '%'
              }
            },
            {
              jenis_kelamin: {
                [Op.like]: '%' + searchByGender + '%'
              }
            },
            {
              KelasId: {
                [Op.like]: '%' + searchByKelas + '%'
              }
            },
          ]

        }

      }

    }

  }


  /* Pagination */
  const pageAsNumber = Number.parseInt(req.query.page);
  const perPageAsNumber = Number.parseInt(req.query.perPage);

  let page = 1;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber
  }


  let perPage = 10;

  if (!Number.isNaN(perPageAsNumber) && perPageAsNumber > 0) {
    perPage = perPageAsNumber;
  }

  try {

    let alumni = await Siswa.findAndCountAll({
      limit: perPage,
      offset: (page - 1) * perPage,
      order: [
        [sort_by, sort]
      ],
      where,
    });

    let from = ((page - 1) * perPage) + 1;

    let to = page * perPage;

    // pagination params
    path = 'http://127.0.0.1:8000/data-alumni/all';
    firstPageUrl = `http://127.0.0.1:8000/data-alumni/all?page=1&perPage=${perPage}&angkatan=${angkatan}`;
    nextPageUrl = `http://127.0.0.1:8000/data-alumni/all?page=${page + 1}&perPage=${perPage}&search=${search}&id=${id}&nis_siswa=${nis_siswa}&nisn_siswa=${nisn_siswa}&nama_siswa=${nama_siswa}&jenis_kelamin=${jenis_kelamin}&KelasId=${KelasId}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe=${toDate}&angkatan=${angkatan}`;

    if (page > 1) {
      prevPageUrl = `http://127.0.0.1:8000/data-alumni/all?page=${page - 1}&perPage=${perPage}&search=${search}&id=${id}&nis_siswa=${nis_siswa}&nisn_siswa=${nisn_siswa}&nama_siswa=${nama_siswa}&jenis_kelamin=${jenis_kelamin}&KelasId=${KelasId}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe=${toDate}&angkatan=${angkatan}`;
    }

    if (page === 1) {
      prevPageUrl = null
    }


    res.status(200).json({
      resultId: 1,
      current_page: page,
      data: alumni,
      first_page_url: firstPageUrl,
      from: from,
      next_page_url: nextPageUrl,
      path: path,
      per_page: perPage,
      prev_page_url: prevPageUrl,
      to: to,
    });


  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
}