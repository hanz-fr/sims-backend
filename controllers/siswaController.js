const { json } = require("body-parser");
const Validator = require("fastest-validator");
const { Siswa, Ortu, Kelas, Raport, Mutasi, NilaiMapel, MapelJurusan, Jurusan, sequelize } = require("../models");
const { Op } = require("sequelize");
const models = require('../models');
const searchBuilder = require('sequelize-search-builder');

// import fastest-validator
const v = new Validator();


exports.getAllSiswa = async (req, res) => {

  const search = req.query.search || "";
  let fromDate = req.query.dibuatTglDari || "";
  let toDate = req.query.dibuatTglKe || "";
  let sort_by = req.query.sort_by || "nama_siswa";
  let sort = req.query.sort || "ASC";
  let angkatan = req.query.angkatan || '';

  let id = req.query.id || '';
  let nis_siswa = req.query.nis_siswa || '';
  let nisn_siswa = req.query.nisn_siswa || '';
  let nama_siswa = req.query.nama_siswa || '';
  let jenis_kelamin = req.query.jenis_kelamin || '';
  let KelasId = req.query.KelasId || '';


  /* CONDITIONAL WHERE QUERY */
  let where = {
    isAlumni: {
      [Op.ne]: true,
    },
    status_siswa: 'aktif',
  };


  // kalau gaada search
  if (!search) { 


    // kalau ada angkatan
    if (angkatan) { 
  

      // kalau ada angkatan, fromDate & toDate
      if (fromDate != "" || toDate != "") {
      
        where = {
          isAlumni: {
            [Op.ne]: true,
          },
          status_siswa: 'aktif',
          angkatan: angkatan,
          [Op.or]: [{
            createdAt: {
              [Op.between]: [fromDate, toDate]
            }
          }]
        }
      
      // kalau ada angkatan, tp gaada fromDate & toDate
      } else {

        where = {
          isAlumni: {
            [Op.ne]: true,
          },
          status_siswa: 'aktif',
          angkatan: angkatan,
        }

      }
  
    } else {


      // kalau gaada angkatan, tapi ada fromDate & toDate
      if (fromDate != "" || toDate != "") {

        where = {
          isAlumni: {
            [Op.ne]: true,
          },
          status_siswa: 'aktif',
          [Op.or]: [{
            createdAt: {
              [Op.between]: [fromDate, toDate]
            }
          }]
        }
      } else if (!fromDate || !toDate) {

        where = {

          isAlumni: {
            [Op.ne]: true,
          },
          status_siswa: 'aktif',

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
            [Op.ne]: true,
          },
          status_siswa: 'aktif',
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
            [Op.ne]: true,
          },
          status_siswa: 'aktif',
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
            [Op.ne]: true,
          },
          status_siswa: 'aktif',
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
            [Op.ne]: true,
          },
          status_siswa: 'aktif',
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
  if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
    page = pageAsNumber
  }


  let perPage = 10;
  
  if (!Number.isNaN(perPageAsNumber) && perPageAsNumber > 0) {
    perPage = perPageAsNumber;
  }
    

  try {
    
    let siswa = await Siswa.findAndCountAll({
      limit: perPage,
      offset: ( page-1 ) * perPage,
      order: [
        [sort_by, sort]
      ],
      where,
      include: [
        {
          model: Ortu,
          as: 'ortu'
        },
        {
          model: Raport,
          as: 'raport'
        },
        {
          model: Kelas,
          as: 'kelas',
        },
        {
          model: Mutasi,
          as: 'mutasi',
        }
      ],
    });

    let from = ((page - 1) * perPage) + 1;

    let to = page * perPage;

    // pagination params
    path = 'http://127.0.0.1:8000/data-induk-siswa';
    firstPageUrl = `http://127.0.0.1:8000/data-induk-siswa?page=1&perPage=${perPage}`;
    nextPageUrl = `http://127.0.0.1:8000/data-induk-siswa?page=${page + 1}&perPage=${perPage}&search=${search}&id=${id}&nis_siswa=${nis_siswa}&nisn_siswa=${nisn_siswa}&nama_siswa=${nama_siswa}&jenis_kelamin=${jenis_kelamin}&KelasId=${KelasId}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe=${toDate}&angkatan=${angkatan}`;

    if (page > 1) {
      prevPageUrl = `http://127.0.0.1:8000/data-induk-siswa?page=${page - 1}&perPage=${perPage}&search=${search}&id=${id}&nis_siswa=${nis_siswa}&nisn_siswa=${nisn_siswa}&nama_siswa=${nama_siswa}&jenis_kelamin=${jenis_kelamin}&KelasId=${KelasId}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe=${toDate}&angkatan=${angkatan}`
    } 

    if (page === 1) {
      prevPageUrl = null
    }

    res.status(200).json({
      resultId: 1,
      current_page: page,
      data: siswa,
      first_page_url: firstPageUrl,
      from: from,
      next_page_url: nextPageUrl,
      path: path,
      per_page: perPage,
      prev_page_url: prevPageUrl,
      to: to,
      fromDate: fromDate,
      toDate: toDate,
    });

  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }


} 


exports.getAllSiswaByJurusanKelas = async (req, res) => {

  const search = req.query.search || "";
  let fromDate = req.query.dibuatTglDari || "";
  let toDate = req.query.dibuatTglKe || "";
  let sort_by = req.query.sort_by || "nama_siswa";
  let sort = req.query.sort || "ASC";
  let angkatan = req.query.angkatan || '';
  let rombel = req.query.rombel || '';

  let id = req.query.id || '';
  let nis_siswa = req.query.nis_siswa || '';
  let nisn_siswa = req.query.nisn_siswa || '';
  let nama_siswa = req.query.nama_siswa || '';
  let jenis_kelamin = req.query.jenis_kelamin || '';
  let KelasId = req.query.KelasId || ''; 

  const jurusan = req.params.jurusan;
  const kelas = req.params.kelas;

  /* CONDITIONAL WHERE QUERY */
  let where = {
    isAlumni: {
      [Op.ne]: true,
    },
    tgl_meninggalkan_sekolah: {
      [Op.is]: null
    },
    status_siswa: 'aktif',
  };

  let where_kelas = {
    kelas: kelas,
    JurusanId: jurusan,
  }

  if(rombel){

    where_kelas = {
      kelas: kelas,
      JurusanId: jurusan,
      rombel: rombel,
    }

  } 
  /* END OF CONDITIONAL WHERE QUERY */



  // kalau gaada search
  if (!search) { 


    // kalau ada angkatan
    if (angkatan) { 
  

      // kalau ada angkatan, fromDate & toDate
      if (fromDate != "" || toDate != "") {
      
        where = {
          isAlumni: {
            [Op.ne]: true,
          },
          tgl_meninggalkan_sekolah: {
            [Op.is]: null
          },
          status_siswa: 'aktif',
          angkatan: angkatan,
          [Op.or]: [{
            createdAt: {
              [Op.between]: [fromDate, toDate]
            }
          }]
        }
      
      // kalau ada angkatan, tp gaada fromDate & toDate
      } else {

        where = {
          isAlumni: {
            [Op.ne]: true,
          },
          tgl_meninggalkan_sekolah: {
            [Op.is]: null
          },
          status_siswa: 'aktif',
          angkatan: angkatan,
        }

      }
  
    } else {


      // kalau gaada angkatan, tapi ada fromDate & toDate
      if (fromDate != "" || toDate != "") {

        where = {
          isAlumni: {
            [Op.ne]: true,
          },
          tgl_meninggalkan_sekolah: {
            [Op.is]: null
          },
          status_siswa: 'aktif',
          [Op.or]: [{
            createdAt: {
              [Op.between]: [fromDate, toDate]
            }
          }]
        }
      } else if (!fromDate || !toDate) {

        where = {

          isAlumni: {
            [Op.ne]: true,
          },
          tgl_meninggalkan_sekolah: {
            [Op.is]: null
          },
          status_siswa: 'aktif',

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
            [Op.ne]: true,
          },
          tgl_meninggalkan_sekolah: {
            [Op.is]: null
          },
          status_siswa: 'aktif',
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
            [Op.ne]: true,
          },
          tgl_meninggalkan_sekolah: {
            [Op.is]: null
          },
          status_siswa: 'aktif',
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
            [Op.ne]: true,
          },
          tgl_meninggalkan_sekolah: {
            [Op.is]: null
          },
          status_siswa: 'aktif',
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
            [Op.ne]: true,
          },
          tgl_meninggalkan_sekolah: {
            [Op.is]: null
          },
          status_siswa: 'aktif',
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
  if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
    page = pageAsNumber
  }

  let perPage = 10;
  if (!Number.isNaN(perPageAsNumber) && perPageAsNumber > 0) {
    perPage = perPageAsNumber;
  }

  try {

    if (!search) {

      if (fromDate != "" || toDate != "") {
      
        const siswa = await Siswa.findAndCountAll({
          limit: perPage,
          offset: ( page-1 ) * perPage,
          order: [
            [sort_by, sort]
          ],
          where,
          include: [
            {
              model: Ortu,
              as: 'ortu'
            },
            {
              model: Raport,
              as: 'raport'
            },
            {
              model: Kelas,
              as: 'kelas',
              where: where_kelas
            },
            {
              model: Mutasi,
              as: 'mutasi',
            }
          ]
        });
  
        let from = ((page - 1) * perPage) + 1;
  
        let to = page * perPage;
  
        // pagination params
        path = `http://127.0.0.1:8000/data-induk-siswa/${jurusan}/${kelas}`;
        firstPageUrl = `http://127.0.0.1:8000/data-induk-siswa/${jurusan}/${kelas}?page=1&perPage=${perPage}`;
        nextPageUrl = `http://127.0.0.1:8000/data-induk-siswa/${jurusan}/${kelas}?page=${page + 1}&perPage=${perPage}&search=${search}&id=${id}&nis_siswa=${nis_siswa}&nisn_siswa=${nisn_siswa}&nama_siswa=${nama_siswa}&jenis_kelamin=${jenis_kelamin}&KelasId=${KelasId}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe=${toDate}&angkatan=${angkatan}&rombel=${rombel}`;
  
        if (page > 1) {
          prevPageUrl = `http://127.0.0.1:8000/data-induk-siswa/${jurusan}/${kelas}?page=${page - 1}&perPage=${perPage}&search=${search}&id=${id}&nis_siswa=${nis_siswa}&nisn_siswa=${nisn_siswa}&nama_siswa=${nama_siswa}&jenis_kelamin=${jenis_kelamin}&KelasId=${KelasId}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe=${toDate}&angkatan=${angkatan}&rombel=${rombel}`;
        } 
      
        if (page === 1) {
          prevPageUrl = null
        }
      
        res.status(200).json({
          resultId: 1,
          current_page: page,
          data: siswa,
          first_page_url: firstPageUrl,
          from: from,
          next_page_url: nextPageUrl,
          path: path,
          per_page: perPage,
          prev_page_url: prevPageUrl,
          to: to,
        });
      
      } else {

        const siswa = await Siswa.findAndCountAll({
          limit: perPage,
          offset: ( page-1 ) * perPage,
          order: [
            [sort_by, sort]
          ],
          where,
          include: [
            {
              model: Ortu,
              as: 'ortu'
            },
            {
              model: Raport,
              as: 'raport'
            },
            {
              model: Kelas,
              as: 'kelas',
              where: where_kelas
            },
            {
              model: Mutasi,
              as: 'mutasi',
            }
          ]
        });
  
        let from = ((page - 1) * perPage) + 1;
  
        let to = page * perPage;
  
        // pagination params
        path = `http://127.0.0.1:8000/data-induk-siswa/${jurusan}/${kelas}`;
        firstPageUrl = `http://127.0.0.1:8000/data-induk-siswa/${jurusan}/${kelas}?page=1&perPage=${perPage}`;
        nextPageUrl = `http://127.0.0.1:8000/data-induk-siswa/${jurusan}/${kelas}?page=${page + 1}&perPage=${perPage}&search=${search}&id=${id}&nis_siswa=${nis_siswa}&nisn_siswa=${nisn_siswa}&nama_siswa=${nama_siswa}&jenis_kelamin=${jenis_kelamin}&KelasId=${KelasId}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe=${toDate}&angkatan=${angkatan}&rombel=${rombel}`;
  
        if (page > 1) {
          prevPageUrl = `http://127.0.0.1:8000/data-induk-siswa/${jurusan}/${kelas}?page=${page - 1}&perPage=${perPage}&search=${search}&id=${id}&nis_siswa=${nis_siswa}&nisn_siswa=${nisn_siswa}&nama_siswa=${nama_siswa}&jenis_kelamin=${jenis_kelamin}&KelasId=${KelasId}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe=${toDate}&angkatan=${angkatan}&rombel=${rombel}`;
        } 
      
        if (page === 1) {
          prevPageUrl = null
        }
      
        res.status(200).json({
          resultId: 2,
          current_page: page,
          data: siswa,
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

    if (fromDate != "" || toDate != "") {

      let siswa = await Siswa.findAndCountAll({
        limit: perPage,
        offset: ( page-1 ) * perPage,
        order: [
          [sort_by, sort]
        ],
        where,
        include: [
          {
            model: Ortu,
            as: 'ortu'
          },
          {
            model: Raport,
            as: 'raport'
          },
          {
            model: Kelas,
            as: 'kelas',
            where: where_kelas
          },
          {
            model: Mutasi,
            as: 'mutasi',
          }
        ]
      });


      let from = ((page - 1) * perPage) + 1;
  
      let to = page * perPage;
  
      // pagination params
      path = `http://127.0.0.1:8000/data-induk-siswa/${jurusan}/${kelas}`;
      firstPageUrl = `http://127.0.0.1:8000/data-induk-siswa/${jurusan}/${kelas}?page=1&perPage=${perPage}`;
      nextPageUrl = `http://127.0.0.1:8000/data-induk-siswa/${jurusan}/${kelas}?page=${page + 1}&perPage=${perPage}&search=${search}&id=${id}&nis_siswa=${nis_siswa}&nisn_siswa=${nisn_siswa}&nama_siswa=${nama_siswa}&jenis_kelamin=${jenis_kelamin}&KelasId=${KelasId}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe=${toDate}&angkatan=${angkatan}&rombel=${rombel}`;
  
      if (page > 1) {
        prevPageUrl = `http://127.0.0.1:8000/data-induk-siswa/${jurusan}/${kelas}?page=${page - 1}&perPage=${perPage}&search=${search}&id=${id}&nis_siswa=${nis_siswa}&nisn_siswa=${nisn_siswa}&nama_siswa=${nama_siswa}&jenis_kelamin=${jenis_kelamin}&KelasId=${KelasId}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe=${toDate}&angkatan=${angkatan}&rombel=${rombel}`;
      } 
    
      if (page === 1) {
        prevPageUrl = null
      }
    
      res.status(200).json({
        resultId: 3,
        current_page: page,
        data: siswa,
        first_page_url: firstPageUrl,
        from: from,
        next_page_url: nextPageUrl,
        path: path,
        per_page: perPage,
        prev_page_url: prevPageUrl,
        to: to,
      });

    } else {

       let siswa = await Siswa.findAndCountAll({
         limit: perPage,
         offset: ( page-1 ) * perPage,
         order: [
           [sort_by, sort]
         ],
         where,
         include: [
          {
            model: Ortu,
            as: 'ortu'
          },
           {
             model: Raport,
             as: 'raport'
           },
           {
             model: Kelas,
             as: 'kelas',
             where: where_kelas
           },
           {
             model: Mutasi,
             as: 'mutasi',
           }
         ]
       });


       let from = ((page - 1) * perPage) + 1;
   
       let to = page * perPage;
   
       // pagination params
       path = `http://127.0.0.1:8000/data-induk-siswa/${jurusan}/${kelas}`;
       firstPageUrl = `http://127.0.0.1:8000/data-induk-siswa/${jurusan}/${kelas}?page=1&perPage=${perPage}`;
       nextPageUrl = `http://127.0.0.1:8000/data-induk-siswa/${jurusan}/${kelas}?page=${page + 1}&perPage=${perPage}&search=${search}&id=${id}&nis_siswa=${nis_siswa}&nisn_siswa=${nisn_siswa}&nama_siswa=${nama_siswa}&jenis_kelamin=${jenis_kelamin}&KelasId=${KelasId}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe=${toDate}&angkatan=${angkatan}&rombel=${rombel}`;
   
       if (page > 1) {
         prevPageUrl = `http://127.0.0.1:8000/data-induk-siswa/${jurusan}/${kelas}?page=${page - 1}&perPage=${perPage}&search=${search}&id=${id}&nis_siswa=${nis_siswa}&nisn_siswa=${nisn_siswa}&nama_siswa=${nama_siswa}&jenis_kelamin=${jenis_kelamin}&KelasId=${KelasId}&sort_by=${sort_by}&sort=${sort}&dibuatTglDari=${fromDate}&dibuatTglKe=${toDate}&angkatan=${angkatan}&rombel=${rombel}`;
       } 
     
       if (page === 1) {
         prevPageUrl = null
       }
     
       res.status(200).json({
        resultId: 4,
         current_page: page,
         data: siswa,
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



// get siswa
exports.getSiswa = async (req, res) => {
  const nis = req.params.nis_siswa;

  // check if siswa exist
  const siswa = await Siswa.findOne({
    include: [
      {
        model: Ortu,
        as: 'ortu'
      },
      {
        model: Raport,
        as: 'raport',
        include: [
          {
            model: NilaiMapel,
            as: 'NilaiMapel',
            include: [
              {
                model: MapelJurusan
              },
            ],
          },
        ],
      },
      {
        model: Kelas,
        as: 'kelas'
      },
      {
        model: Mutasi,
        as: 'mutasi',
      }
    ],
    where: {
      nis_siswa: {
        [Op.eq]: nis 
      }
    },
    order: [
      [{model: Raport, as: 'raport'}, {model: NilaiMapel, as: 'NilaiMapel'}, 'idMapelJurusan', 'ASC']
    ],
  });

  if (!siswa) {
    return res.status(404).json({
      message: "Siswa does not exist",
    });
  }

  /* res.status(200).json(siswa); */

  res.status(200).json({
    message: `Displaying siswa with nis : ${nis}`,
    result: siswa,
  });
};


// create siswa
exports.createSiswa = async (req, res) => {
  try {
    // validate incoming request using fastest-validator
    const schema = {
      nis_siswa: { type: "string", max: 10 },
      KelasId: { type: "string", optional: true },
      nisn_siswa: { type: "string", max: 10 },
      nama_siswa: { type: "string" },
      tmp_lahir: { type: "string" },
      tgl_lahir: { type: "date", convert: true },
      jenis_kelamin: { type: "enum", values: ["L", "P"] },
      agama: { type: "string" },
      anak_ke: { type: "number", optional: true },
      status: { type: "enum", values: ["AA", "AK", "AT"], optional: true },
      alamat_siswa: { type: "string" },
      email_siswa: { type: "string", optional: true },
      no_telp_siswa: { type: "string", max: 20 },
      tgl_diterima: { type: "date", convert: true, optional: true },
      semester_diterima: { type: "number", optional: true },
      diterima_di_kelas: { type: "string", optional: false },
      status_siswa: { type: "enum", values: ["aktif", "non-aktif"], optional: false },
      angkatan: { type: "string", optional: true },
      angkatan: { type: "number", optional: true, },
      sekolah_asal: { type: "string" },
      alamat_sekolah_asal: { type: "string", optional: true },
      thn_ijazah_smp: { type: "string", optional: true },
      no_ijazah_smp: { type: "string", max: 100, optional: true },
      thn_skhun_smp: { type: "string", optional: true },
      no_skhun_smp: { type: "string", optional: true },
      tgl_meninggalkan_sekolah: { type: "date", convert: true, optional: true },
      alasan_meninggalkan_sekolah: { type: "string", optional: true },
      no_ijazah_smk: { type: "string", optional: true },
      foto: { type: "string", optional: true },
      tgl_ijazah_smk: { type: "date", convert: true, optional: true },
      keterangan_lain: { type: "string", optional: true },
      berat_badan: { type: "number", optional: true },
      tinggi_badan: { type: "number", optional: true },
      lingkar_kepala: { type: "number", optional: true },
      golongan_darah: { type: "string", optional: true },
      isAlumni: { type: "boolean" },
    };

    const schema2 = {
      nis_siswa: { type: "string" },
      nama_ayah: { type: "string", optional: true },
      nama_ibu: { type: "string", optional: true },
      alamat_ortu: { type: "string", optional: true },
      no_telp_ortu: { type: "string", optional: true, max: 20 },
      email_ortu: { type: "string", optional: true },
      nama_wali: { type: "string", optional: true },
      alamat_wali: { type: "string", optional: true },
      no_telp_wali: { type: "string", optional: true },
      pekerjaan_wali: { type: "string", optional: true },
    }

    const validate = v.validate(req.body, schema);

    const validate_ortu = v.validate([
      req.body.nis_siswa,
      req.body.nama_ayah,
      req.body.nama_ibu,
      req.body.alamat_ortu,
      req.body.no_telp_ortu,
      req.body.email_ortu,
      req.body.nama_wali,
      req.body.alamat_wali,
      req.body.no_telp_wali,
      req.body.pekerjaan_wali,
    ], schema2);

    // check if validation is success or not
    if (validate.length && validate_ortu.length) {
      return res.status(400).json(validate);
    };

    // find Siswa where nis already exist.
    const siswaIsExist = await Siswa.findOne({
      where: { nis_siswa: req.body.nis_siswa },
    });

    // return error message to client if siswa already exist.
    if (siswaIsExist) {
      return res.status(400).json({
        status: "error",
        message: `Siswa with nis:'${req.body.nis_siswa}' already exist`,
      });
    }

    // if KelasId is not empty, check if the id exist
    if (req.body.KelasId) {
      let kelas = await Kelas.findOne({
        where: { id: req.body.KelasId },
      });

      if (!kelas) {
        return res.status(404).json({
          status: "error",
          message: `Kelas with id ${req.body.KelasId} does not exist`,
        });
      }
    }

    var siswa = await Siswa.create(req.body);
    var ortu = await Ortu.create({
      nis_siswa: req.body.nis_siswa,
      nama_ayah: req.body.nama_ayah,
      nama_ibu: req.body.nama_ibu,
      alamat_ortu: req.body.alamat_ortu,
      no_telp_ortu: req.body.no_telp_ortu,
      email_ortu: req.body.email_ortu,
      nama_wali: req.body.nama_wali,
      alamat_wali: req.body.alamat_wali,
      no_telp_wali: req.body.no_telp_wali,
      pekerjaan_wali: req.body.pekerjaan_wali,
    });

    res.status(200).json({
      status: "Data added successfully.",
      siswa,
      ortu,
    });
  } catch (error) {
    if (error.errno === 1452) {
      return res.status(500).json({
        message: "Id of Kelas is invalid or does not exist",
      });
    } else {
      console.log(error);
      res.status(500);
      res.send({ status: "error", message: "Something went wrong. :(" });
    }
  }
};

// update siswa
exports.updateSiswa = async (req, res) => {
  // get nis from req params
  const nis = req.params.nis_siswa;

  // check if siswa exist in db or not.
  let siswaExist = await Siswa.findByPk(nis);

  let ortuExist = await Ortu.findOne({
    where: {
      nis_siswa: req.params.nis_siswa
    }
  });
  
  if (!siswaExist) {
    return res.status(404).json({ message: "Siswa does not exist" });
  }

  // validate incoming request
  const schema = {
    nis_siswa: { type: "string", max: 10, optional: true },
    KelasId: { type: "string", optional: true },
    nisn_siswa: { type: "string", max: 10, optional: true },
    nama_siswa: { type: "string", optional: true },
    tmp_lahir: { type: "string", optional: true },
    tgl_lahir: { type: "date", convert: true, optional: true },
    jenis_kelamin: { type: "enum", values: ["L", "P"], optional: true },
    agama: { type: "string", optional: true },
    anak_ke: { type: "number", optional: true },
    status: { type: "enum", values: ["AA", "AK", "AT"], optional: true },
    alamat_siswa: { type: "string", optional: true },
    email_siswa: { type: "string", optional: true },
    no_telp_siswa: { type: "string", max: 20, optional: true },
    tgl_diterima: { type: "date", convert: true, optional: true },
    semester_diterima: { type: "number", optional: true },
    diterima_di_kelas: { type: "string", optional: true },
    status_siswa: { type: "enum", values: ["aktif", "non-aktif"], optional: true },
    angkatan: { type: "string", optional: true },
    angkatan: { type: "number", optional: true, },
    sekolah_asal: { type: "string", optional: true },
    alamat_sekolah_asal: { type: "string", optional: true },
    thn_ijazah_smp: { type: "string", optional: true },
    no_ijazah_smp: { type: "string", optional: true },
    thn_skhun_smp: { type: "string", optional: true },
    no_skhun_smp: { type: "string", optional: true },
    tgl_meninggalkan_sekolah: { type: "date", convert: true, optional: true },
    alasan_meninggalkan_sekolah: { type: "string", optional: true },
    no_ijazah_smk: { type: "string", optional: true },
    foto: { type: "string", optional: true },
    tgl_ijazah_smk: { type: "date", convert: true, optional: true },
    keterangan_lain: { type: "string", optional: true },
    berat_badan: { type: "number", optional: true },
    tinggi_badan: { type: "number", optional: true },
    lingkar_kepala: { type: "number", optional: true },
    golongan_darah: { type: "string", optional: true },
    isAlumni: { type: "boolean", optional: true },
  };

  const schema2 = {
    nis_siswa: { type: "string", optional: true },
    nama_ayah: { type: "string", optional: true },
    nama_ibu: { type: "string", optional: true },
    alamat_ortu: { type: "string", optional: true },
    no_telp_ortu: { type: "string", optional: true, max: 20 },
    email_ortu: { type: "string", optional: true },
    nama_wali: { type: "string", optional: true },
    alamat_wali: { type: "string", optional: true },
    no_telp_wali: { type: "string", optional: true },
    pekerjaan_wali: { type: "string", optional: true },
  }

  // validate schema
  const validate = v.validate(req.body, schema);
  
  const validate_ortu = v.validate([
    req.body.nis_siswa,
    req.body.nama_ayah,
    req.body.nama_ibu,
    req.body.alamat_ortu,
    req.body.no_telp_ortu,
    req.body.email_ortu,
    req.body.nama_wali,
    req.body.alamat_wali,
    req.body.no_telp_wali,
    req.body.pekerjaan_wali,
  ], schema2);

  // check if validation is success or not
  if (validate.length && validate_ortu.length) {
    return res.status(400).json(validate);
  };

  // if KelasId is not empty, check if the id exist
  if (req.body.KelasId) {
    let kelas = await Kelas.findOne({
      where: { id: req.body.KelasId },
    });

    if (!kelas) {
      return res.status(404).json({
        status: "error",
        message: `Kelas with id ${req.body.KelasId} does not exist`,
      });
    }
  }

  // update siswa
  siswaExist = await siswaExist.update(req.body);

  if (ortuExist) {
    ortuExist = await ortuExist.update({
      nama_ayah: req.body.nama_ayah,
      nama_ibu: req.body.nama_ibu,
      alamat_ortu: req.body.alamat_ortu,
      no_telp_ortu: req.body.no_telp_ortu,
      email_ortu: req.body.email_ortu,
      nama_wali: req.body.nama_wali,
      alamat_wali: req.body.alamat_wali,
      no_telp_wali: req.body.no_telp_wali,
      pekerjaan_wali: req.body.pekerjaan_wali,
    });
  } else {
    ortuExist = await Ortu.create({
      nis_siswa: req.body.nis_siswa,
      nama_ayah: req.body.nama_ayah,
      nama_ibu: req.body.nama_ibu,
      alamat_ortu: req.body.alamat_ortu,
      no_telp_ortu: req.body.no_telp_ortu,
      email_ortu: req.body.email_ortu,
      nama_wali: req.body.nama_wali,
      alamat_wali: req.body.alamat_wali,
      no_telp_wali: req.body.no_telp_wali,
      pekerjaan_wali: req.body.pekerjaan_wali,
    });
  }

  res.status(200).json({
    message: `Successfully updated Siswa with nis : ${siswaExist.nis}`,
    result: [siswaExist, ortuExist],
  });
};


// delete siswa
exports.deleteSiswa = async (req, res) => {
  const nis = req.params.nis_siswa; // get nis from req params

  const siswa = await Siswa.findByPk(nis); // find siswa by nis

  // return error if siswa doesn't exist
  if (!siswa) {
    return res.json({
      status: "error",
      message: "Siswa does not exist",
    });
  }

  await siswa.destroy();

  res.status(200).json({
    message: "Siswa deleted successfully",
  });
};

