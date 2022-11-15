const Validator = require("fastest-validator");
const { Op } = require("sequelize");
const { Siswa, Raport, Jurusan, sequelize, Mutasi, MapelJurusan, Kelas,  } = require("../models");
const v = new Validator();
const kelasController = require('../controllers/kelasController');


exports.getMainDashboardData = async (req, res) => {

    const jurusan = await Jurusan.findAndCountAll({
      attributes: ['id']
    });
    const siswa = await Siswa.findAndCountAll({
      attributes: ['id']
    });
    const mutasi = await Mutasi.findAndCountAll({
      attributes: ['nis_siswa'],
      where: {
          pindah_dari: {
              [Op.is]: null
          }
      },
    });
    const siswaMasuk = await Mutasi.findAndCountAll({
      attributes: ['nis_siswa'],
      where: {
          pindah_dari: {
              [Op.ne]: null
          }
      }
    });
    const siswaKeluar = await Mutasi.findAndCountAll({
      attributes: ['nis_siswa'],
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
          }
      }
    });
    const siswaTdkNaik = await Siswa.findAndCountAll({
      attributes: ['nis_siswa'],
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
      include:[{
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
      include:[{
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
      include:[{
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
      include:[{
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
      include:[{
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
      include:[{
        model: Kelas,
        as: 'kelas',
        attributes: ['id'],
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
        siswaKeluar: siswaKeluar,
        siswaTdkNaik: siswaTdkNaik,
    });
}


exports.getSiswaTidakNaik = async (req, res) => { 

  const { search } = req.query;

  /* Pagination */
  const pageAsNumber = Number.parseInt(req.query.page);
  const perPageAsNumber = Number.parseInt(req.query.perPage);
  const searchParams = req.query.search;

  let page = 1;
  if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
    page = pageAsNumber
  }


  let perPage = 10;
  
  if (!Number.isNaN(perPageAsNumber) && perPageAsNumber > 0) {
    perPage = perPageAsNumber;
  }
  

  try {

    if (!search) {

      let siswaTdkNaik = await Siswa.findAndCountAll({
        limit: perPage,
        offset: ( page-1 ) * perPage,
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

      let from = ((page - 1) * perPage) + 1;

      let to = page * perPage;

      // pagination params
      path = 'http://127.0.0.1:8000/data-tidak-naik';
      firstPageUrl = `http://127.0.0.1:8000/data-tidak-naik?page=1&perPage=${perPage}`;
      nextPageUrl = `http://127.0.0.1:8000/data-tidak-naik?page=${page + 1}&perPage=${perPage}&search=${searchParams}`;

      if (page > 1) {
        prevPageUrl = `http://127.0.0.1:8000/data-tidak-naik?page=${page - 1}&perPage=${perPage}&search=${searchParams}`
      } 

      if (page === 1) {
        prevPageUrl = null
      }


      res.status(200).json({
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

      let siswaTdkNaik = await Siswa.findAndCountAll({
        limit: perPage,
        offset: ( page-1 ) * perPage,
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

      let from = ((page - 1) * perPage) + 1;

      let to = page * perPage;

      // pagination params
      path = 'http://127.0.0.1:8000/data-tidak-naik';
      firstPageUrl = `http://127.0.0.1:8000/data-tidak-naik?page=1&perPage=${perPage}`;
      nextPageUrl = `http://127.0.0.1:8000/data-tidak-naik?page=${page + 1}&perPage=${perPage}&search=${searchParams}`;

      if (page > 1) {
        prevPageUrl = `http://127.0.0.1:8000/data-tidak-naik?page=${page - 1}&perPage=${perPage}&search=${searchParams}`
      } 

      if (page === 1) {
        prevPageUrl = null
      }


      res.status(200).json({
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


  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
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

  /* Pagination */
  const pageAsNumber = Number.parseInt(req.query.page);
  const perPageAsNumber = Number.parseInt(req.query.perPage);
  const searchParams = req.query.search;

  let page = 1;
  if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
    page = pageAsNumber
  }


  let perPage = 10;
  
  if (!Number.isNaN(perPageAsNumber) && perPageAsNumber > 0) {
    perPage = perPageAsNumber;
  }

  try {

    if (!search) {

      let alumni = await Siswa.findAndCountAll({
        limit: perPage,
        offset: ( page-1 ) * perPage,
        order: [
          [sort_by, sort]
        ],
        where: {
          isAlumni: {
            [Op.is]: true
          }
        }
      });

      let from = ((page - 1) * perPage) + 1;

      let to = page * perPage;

      // pagination params
      path = 'http://127.0.0.1:8000/data-alumni';
      firstPageUrl = `http://127.0.0.1:8000/data-alumni?page=1&perPage=${perPage}`;
      nextPageUrl = `http://127.0.0.1:8000/data-alumni?page=${page + 1}&perPage=${perPage}&search=${search}&id=${id}&nis_siswa=${nis_siswa}&nisn_siswa=${nisn_siswa}&nama_siswa=${nama_siswa}&jenis_kelamin=${jenis_kelamin}&KelasId=${KelasId}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe${toDate}`;

      if (page > 1) {
        prevPageUrl = `http://127.0.0.1:8000/data-alumni?page=${page - 1}&perPage=${perPage}&search=${search}&id=${id}&nis_siswa=${nis_siswa}&nisn_siswa=${nisn_siswa}&nama_siswa=${nama_siswa}&jenis_kelamin=${jenis_kelamin}&KelasId=${KelasId}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe${toDate}`;
      } 

      if (page === 1) {
        prevPageUrl = null
      }


      res.status(200).json({
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

      let alumni = await Siswa.findAndCountAll({
        limit: perPage,
        offset: ( page-1 ) * perPage,
        where: {
          isAlumni: {
            [Op.is]: true
          },
          [Op.or]: [
            {
              id: {
                [Op.like]: '%' + searchById + '%',
              },
            },
            {
              nis_siswa: {
                [Op.like]: '%' + searchByNis + '%',
              },
            },
            {
              nisn_siswa: {
                [Op.like]: '%' + searchByNisn + '%',
              },
            },
            {
              nama_siswa: {
                [Op.like]: '%' + searchByNama + '%',
              },
            },
            {
              jenis_kelamin: {
                [Op.like]: '%' + searchByGender + '%',
              },
            },
            {
              KelasId: {
                [Op.like]: '%' + searchByKelas + '%',
              },
            },
          ]
        }
      });

      let from = ((page - 1) * perPage) + 1;

      let to = page * perPage;

      // pagination params
      path = 'http://127.0.0.1:8000/data-alumni';
      firstPageUrl = `http://127.0.0.1:8000/data-alumni?page=1&perPage=${perPage}`;
      nextPageUrl = `http://127.0.0.1:8000/data-alumni?page=${page + 1}&perPage=${perPage}&search=${search}&id=${id}&nis_siswa=${nis_siswa}&nisn_siswa=${nisn_siswa}&nama_siswa=${nama_siswa}&jenis_kelamin=${jenis_kelamin}&KelasId=${KelasId}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe${toDate}`;

      if (page > 1) {
        prevPageUrl = `http://127.0.0.1:8000/data-alumni?page=${page - 1}&perPage=${perPage}&search=${search}&id=${id}&nis_siswa=${nis_siswa}&nisn_siswa=${nisn_siswa}&nama_siswa=${nama_siswa}&jenis_kelamin=${jenis_kelamin}&KelasId=${KelasId}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe${toDate}`;
      } 

      if (page === 1) {
        prevPageUrl = null
      }


      res.status(200).json({
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
    }

  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
}