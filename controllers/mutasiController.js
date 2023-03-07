const { json } = require("body-parser");
const Validator = require("fastest-validator");
const { Mutasi, Siswa, sequelize } = require("../models");
const { Op } = require("sequelize");

// import fastest-validator
const v = new Validator();


// get all mutasi
exports.getAllMutasi = async (req, res) => {

    const { search } = req.query;
    let fromDate = req.query.tgl_keluar_dari || "";
    let toDate = req.query.tgl_keluar_ke || "";
    let sort_by = req.query.sort_by || "nama_siswa";
    let sort = req.query.sort || "ASC"; 

    let nama_siswa = req.query.nama_siswa || '';
    let nis_siswa = req.query.nis_siswa || '';
    let keluar_di_kelas = req.query.keluar_di_kelas || '';
    let tgl_mutasi = req.query.tgl_mutasi || '';
    let sk_mutasi = req.query.sk_mutasi || '';
    let alasan_mutasi = req.query.alasan_mutasi || '';

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

                let mutasi = await Mutasi.findAndCountAll({
                    limit: perPage,
                    offset: ( page-1 ) * perPage,
                    order: [
                        [sort_by, sort]
                    ],
                    where: {
                        pindah_dari: {
                            [Op.is]: null
                        },
                        [Op.or]: [{
                            tgl_mutasi: {
                              [Op.between]: [fromDate, toDate]
                            }
                        }]
                    },
                });
            
            
                let from = ((page -1) * perPage) + 1;
            
                let to = page * perPage;
            
                // pagination params
                path = 'http://127.0.0.1:8000/siswa-keluar';
                firstPageUrl = `http://127.0.0.1:8000/siswa-keluar?page=1&perPage=${perPage}`;
                nextPageUrl = `http://127.0.0.1:8000/siswa-keluar?page=${page + 1}&perPage=${perPage}&search=${search}&nama_siswa=${nama_siswa}&nis_siswa=${nis_siswa}&keluar_di_kelas=${keluar_di_kelas}&tgl_mutasi=${tgl_mutasi}&sk_mutasi=${sk_mutasi}&alasan_mutasi=${alasan_mutasi}&sort_by=${sort_by}&sort=${sort}&tgl_keluar_dari=${fromDate}&tgl_keluar_ke=${toDate}`;
            
                if (page > 1) {
                    prevPageUrl = `http://127.0.0.1:8000/siswa-keluar?page=${page - 1}&perPage=${perPage}&search=${search}&nama_siswa=${nama_siswa}&nis_siswa=${nis_siswa}&keluar_di_kelas=${keluar_di_kelas}&tgl_mutasi=${tgl_mutasi}&sk_mutasi=${sk_mutasi}&alasan_mutasi=${alasan_mutasi}&sort_by=${sort_by}&sort=${sort}&tgl_keluar_dari=${fromDate}&tgl_keluar_ke=${toDate}`;
                } 
            
                if (page === 1) {
                    prevPageUrl = null
                }
            
                res.status(200).json({
                    resultId: 1,
                    current_page: page,
                    data: mutasi,
                    first_page_url: firstPageUrl,
                    from: from,
                    next_page_url: nextPageUrl,
                    path: path,
                    per_page: perPage,
                    prev_page_url: prevPageUrl,
                    to: to,
                });

            } else {

                let mutasi = await Mutasi.findAndCountAll({
                    limit: perPage,
                    offset: ( page-1 ) * perPage,
                    order: [
                        [sort_by, sort]
                    ],
                    where: {
                        pindah_dari: {
                            [Op.is]: null
                        },
                    },
                });
            
            
                let from = ((page -1) * perPage) + 1;
            
                let to = page * perPage;
            
                // pagination params
                path = 'http://127.0.0.1:8000/siswa-keluar';
                firstPageUrl = `http://127.0.0.1:8000/siswa-keluar?page=1&perPage=${perPage}`;
                nextPageUrl = `http://127.0.0.1:8000/siswa-keluar?page=${page + 1}&perPage=${perPage}&search=${search}&nama_siswa=${nama_siswa}&nis_siswa=${nis_siswa}&keluar_di_kelas=${keluar_di_kelas}&tgl_mutasi=${tgl_mutasi}&sk_mutasi=${sk_mutasi}&alasan_mutasi=${alasan_mutasi}&sort_by=${sort_by}&sort=${sort}&tgl_keluar_dari=${fromDate}&tgl_keluar_ke=${toDate}`;
            
                if (page > 1) {
                    prevPageUrl = `http://127.0.0.1:8000/siswa-keluar?page=${page - 1}&perPage=${perPage}&search=${search}&nama_siswa=${nama_siswa}&nis_siswa=${nis_siswa}&keluar_di_kelas=${keluar_di_kelas}&tgl_mutasi=${tgl_mutasi}&sk_mutasi=${sk_mutasi}&alasan_mutasi=${alasan_mutasi}&sort_by=${sort_by}&sort=${sort}&tgl_keluar_dari=${fromDate}&tgl_keluar_ke=${toDate}`;
                } 
            
                if (page === 1) {
                    prevPageUrl = null
                }
            
                res.status(200).json({
                    resultId: 2,
                    current_page: page,
                    data: mutasi,
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
            let searchByNis = '+?+'; 
            let searchByKeluarDiKelas = '+?+'; 
            let searchByTglMutasi = '+?+'; 
            let searchBySkMutasi = '+?+'; 
            let searchByAlasan = '+?+'; 

            if (nama_siswa === "true") {
                searchByNama = search;
            }

            if (nis_siswa === "true") {
                searchByNis = search;
            }

            if (keluar_di_kelas === "true") {
                searchByKeluarDiKelas = search;
            }

            if (tgl_mutasi === "true") {
                searchByTglMutasi = search;
            }

            if (sk_mutasi === "true") {
                searchBySkMutasi = search;
            }

            if (alasan_mutasi === "true") {
                searchByAlasan = search;
            }
            
           
            if (!req.query.nama_siswa && !req.query.nis_siswa && !req.query.keluar_di_kelas && !req.query.tgl_mutasi && !req.query.sk_mutasi && !req.query.alasan_mutasi) {
                searchByNama = search;
                searchByNis = search;
                searchByKeluarDiKelas = search;
                searchByTglMutasi = search;
                searchBySkMutasi = search;
                searchByAlasan = search;
            }

            if (fromDate != "" || toDate != "") {

                let mutasi = await Mutasi.findAndCountAll({
                    limit: perPage,
                    offset: ( page-1 ) * perPage,
                    order: [
                        [sort_by, sort]
                    ],
                    where: {
                        pindah_dari: {
                            [Op.is]: null
                        },
                        tgl_mutasi: {
                            [Op.between]: [fromDate, toDate]  
                        },
                        [Op.or]: [
                            {
                                nama_siswa: {
                                    [Op.like]: '%' + searchByNama + '%'
                                }
                            },
                            {
                                nis_siswa: {
                                    [Op.like]: '%' + searchByNis + '%'
                                }
                            },
                            {
                                keluar_di_kelas: {
                                    [Op.like]: '%' + searchByKeluarDiKelas + '%'
                                }
                            },
                            {
                                tgl_mutasi: {
                                    [Op.like]: '%' + searchByTglMutasi + '%'
                                }
                            },
                            {
                                sk_mutasi: {
                                    [Op.like]: '%' + searchBySkMutasi + '%'
                                }
                            },
                            {
                                alasan_mutasi: {
                                    [Op.like]: '%' + searchByAlasan + '%'
                                }
                            },
                        ]
                    },
                });
            
            
                let from = ((page -1) * perPage) + 1;
            
                let to = page * perPage;
            
                // pagination params
                path = 'http://127.0.0.1:8000/siswa-keluar';
                firstPageUrl = `http://127.0.0.1:8000/siswa-keluar?page=1`;
                nextPageUrl = `http://127.0.0.1:8000/siswa-keluar?page=${page + 1}&perPage=${perPage}&search=${search}&nama_siswa=${nama_siswa}&nis_siswa=${nis_siswa}&keluar_di_kelas=${keluar_di_kelas}&tgl_mutasi=${tgl_mutasi}&sk_mutasi=${sk_mutasi}&alasan_mutasi=${alasan_mutasi}&sort_by=${sort_by}&sort=${sort}&tgl_keluar_dari=${fromDate}&tgl_keluar_ke=${toDate}`;
            
                if (page > 1) {
                    prevPageUrl = `http://127.0.0.1:8000/siswa-keluar?page=${page - 1}&perPage=${perPage}&search=${search}&nama_siswa=${nama_siswa}&nis_siswa=${nis_siswa}&keluar_di_kelas=${keluar_di_kelas}&tgl_mutasi=${tgl_mutasi}&sk_mutasi=${sk_mutasi}&alasan_mutasi=${alasan_mutasi}&sort_by=${sort_by}&sort=${sort}&tgl_keluar_dari=${fromDate}&tgl_keluar_ke=${toDate}`;
                } 
            
                if (page === 1) {
                    prevPageUrl = null
                }
            
                res.status(200).json({
                    resultId: 3,
                    current_page: page,
                    data: mutasi,
                    first_page_url: firstPageUrl,
                    from: from,
                    next_page_url: nextPageUrl,
                    path: path,
                    per_page: perPage,
                    prev_page_url: prevPageUrl,
                    to: to,
                });

            } else {

                let mutasi = await Mutasi.findAndCountAll({
                    limit: perPage,
                    offset: ( page-1 ) * perPage,
                    order: [
                        [sort_by, sort]
                    ],
                    where: {
                        pindah_dari: {
                            [Op.is]: null
                        },
                        [Op.or]: [
                            {
                                nama_siswa: {
                                    [Op.like]: '%' + searchByNama + '%'
                                }
                            },
                            {
                                nis_siswa: {
                                    [Op.like]: '%' + searchByNis + '%'
                                }
                            },
                            {
                                keluar_di_kelas: {
                                    [Op.like]: '%' + searchByKeluarDiKelas + '%'
                                }
                            },
                            {
                                tgl_mutasi: {
                                    [Op.like]: '%' + searchByTglMutasi + '%'
                                }
                            },
                            {
                                sk_mutasi: {
                                    [Op.like]: '%' + searchBySkMutasi + '%'
                                }
                            },
                            {
                                alasan_mutasi: {
                                    [Op.like]: '%' + searchByAlasan + '%'
                                }
                            },
                        ]
                    },
                });
                
                let from = ((page -1) * perPage) + 1;
            
                let to = page * perPage;
            
                // pagination params
                path = 'http://127.0.0.1:8000/siswa-keluar';
                firstPageUrl = `http://127.0.0.1:8000/siswa-keluar?page=1`;
                nextPageUrl = `http://127.0.0.1:8000/siswa-keluar?page=${page + 1}&perPage=${perPage}&search=${search}&nama_siswa=${nama_siswa}&nis_siswa=${nis_siswa}&keluar_di_kelas=${keluar_di_kelas}&tgl_mutasi=${tgl_mutasi}&sk_mutasi=${sk_mutasi}&alasan_mutasi=${alasan_mutasi}&sort_by=${sort_by}&sort=${sort}&tgl_keluar_dari=${fromDate}&tgl_keluar_ke=${toDate}`;
            
                if (page > 1) {
                    prevPageUrl = `http://127.0.0.1:8000/siswa-keluar?page=${page - 1}&perPage=${perPage}&search=${search}&nama_siswa=${nama_siswa}&nis_siswa=${nis_siswa}&keluar_di_kelas=${keluar_di_kelas}&tgl_mutasi=${tgl_mutasi}&sk_mutasi=${sk_mutasi}&alasan_mutasi=${alasan_mutasi}&sort_by=${sort_by}&sort=${sort}&tgl_keluar_dari=${fromDate}&tgl_keluar_ke=${toDate}`;
                } 
            
                if (page === 1) {
                    prevPageUrl = null
                }
            
                res.status(200).json({
                    resultId: 4,
                    current_page: page,
                    data: mutasi,
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


exports.getAllMutasiMasuk = async (req, res) => {

    const { search } = req.query;
    let fromDate = req.query.tgl_masuk_dari || "";
    let toDate = req.query.tgl_masuk_ke || "";
    let sort_by = req.query.sort_by || "nama_siswa";
    let sort = req.query.sort || "ASC"; 

    let nama_siswa = req.query.nama_siswa || '';
    let nis_siswa = req.query.nis_siswa || '';
    let jenis_kelamin    = req.query.jenis_kelamin  || '';
    let tgl_mutasi = req.query.tgl_mutasi || '';
    let diterima_di_kelas = req.query.diterima_di_kelas || '';
    let pindah_dari = req.query.pindah_dari || '';
    let alasan_mutasi = req.query.alasan_mutasi || '';

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
            
                let mutasi = await Mutasi.findAndCountAll({
                    limit: perPage,
                    offset: ( page-1 ) * perPage,
                    order: [
                        [sort_by, sort]
                    ],
                    where: {
                        pindah_dari: {
                            [Op.ne]: null
                        },
                        [Op.or]: [{
                            tgl_mutasi: {
                              [Op.between]: [fromDate, toDate]
                            }
                        }]
                    },
                });
            
                let from = ((page -1) * perPage) + 1;
            
                let to = page * perPage;
            
                // pagination params
                path = 'http://127.0.0.1:8000/siswa-masuk';
                firstPageUrl = `http://127.0.0.1:8000/siswa-masuk?page=1&perPage=${perPage}`;
                nextPageUrl = `http://127.0.0.1:8000/siswa-masuk?page=${page + 1}&perPage=${perPage}&search=${search}&nama_siswa=${nama_siswa}&nis_siswa=${nis_siswa}&jenis_kelamin=${jenis_kelamin}&tgl_mutasi=${tgl_mutasi}&diterima_di_kelas=${diterima_di_kelas}&pindah_dari=${pindah_dari}&alasan_mutasi=${alasan_mutasi}&sort_by=${sort_by}&sort=${sort}&tgl_masuk_dari=${fromDate}&tgl_masuk_ke=${toDate}`;
            
                if (page > 1) {
                    prevPageUrl = `http://127.0.0.1:8000/siswa-masuk?page=${page - 1}&perPage=${perPage}&search=${search}&nama_siswa=${nama_siswa}&nis_siswa=${nis_siswa}&jenis_kelamin=${jenis_kelamin}&tgl_mutasi=${tgl_mutasi}&diterima_di_kelas=${diterima_di_kelas}&pindah_dari=${pindah_dari}&alasan_mutasi=${alasan_mutasi}&sort_by=${sort_by}&sort=${sort}&tgl_masuk_dari=${fromDate}&tgl_masuk_ke=${toDate}`
                } 
            
                if (page === 1) {
                    prevPageUrl = null
                }
            
                res.status(200).json({
                    resultId: 1,
                    current_page: page,
                    data: mutasi,
                    first_page_url: firstPageUrl,
                    from: from,
                    next_page_url: nextPageUrl,
                    path: path,
                    per_page: perPage,
                    prev_page_url: prevPageUrl,
                    to: to,
                }); 

            } else {

                let mutasi = await Mutasi.findAndCountAll({
                    limit: perPage,
                    offset: ( page-1 ) * perPage,
                    order: [
                        [sort_by, sort]
                    ],
                    where: {
                        pindah_dari: {
                            [Op.ne]: null
                        },
                    },
                });
            
                let from = ((page -1) * perPage) + 1;
            
                let to = page * perPage;
            
                // pagination params
                path = 'http://127.0.0.1:8000/siswa-masuk';
                firstPageUrl = `http://127.0.0.1:8000/siswa-masuk?page=1&perPage=${perPage}`;
                nextPageUrl = `http://127.0.0.1:8000/siswa-masuk?page=${page + 1}&perPage=${perPage}&search=${search}&nama_siswa=${nama_siswa}&nis_siswa=${nis_siswa}&jenis_kelamin=${jenis_kelamin}&tgl_mutasi=${tgl_mutasi}&diterima_di_kelas=${diterima_di_kelas}&pindah_dari=${pindah_dari}&alasan_mutasi=${alasan_mutasi}&sort_by=${sort_by}&sort=${sort}&tgl_masuk_dari=${fromDate}&tgl_masuk_ke=${toDate}`;
            
                if (page > 1) {
                    prevPageUrl = `http://127.0.0.1:8000/siswa-masuk?page=${page - 1}&perPage=${perPage}&search=${search}&nama_siswa=${nama_siswa}&nis_siswa=${nis_siswa}&jenis_kelamin=${jenis_kelamin}&tgl_mutasi=${tgl_mutasi}&diterima_di_kelas=${diterima_di_kelas}&pindah_dari=${pindah_dari}&alasan_mutasi=${alasan_mutasi}&sort_by=${sort_by}&sort=${sort}&tgl_masuk_dari=${fromDate}&tgl_masuk_ke=${toDate}`
                } 
            
                if (page === 1) {
                    prevPageUrl = null
                }
            
                res.status(200).json({
                    resultId: 2,
                    current_page: page,
                    data: mutasi,
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
            let searchByNis = '+?+';
            let searchByGender = '+?+';
            let searchByTanggalMasuk = '+?+';
            let searchByDiterimaDiKelas = '+?+';
            let searchByPindahDari = '+?+';
            let searchByAlasan = '+?+';


            if (nama_siswa === "true") {
                searchByNama = search;
            }

            if (nis_siswa === "true") {
                searchByNis = search;
            }

            if (jenis_kelamin === "true") {
                searchByGender = search;
            }

            if (tgl_mutasi === "true") {
                searchByTanggalMasuk = search;
            }

            if (diterima_di_kelas === "true") {
                searchByDiterimaDiKelas = search;
            }

            if (pindah_dari === "true") {
                searchByPindahDari = search;
            }
            
            if (alasan_mutasi === "true") {
                searchByAlasan = search;
            }
    
            
            if (!req.query.nama_siswa && !req.query.nis_siswa && !req.query.jenis_kelamin && !req.query.tgl_mutasi && !req.query.diterima_di_kelas && !req.query.pindah_dari && !req.query.alasan_mutasi ) {
                searchByNama = search;
                searchByNis = search;
                searchByGender = search;
                searchByTanggalMasuk = search;
                searchByDiterimaDiKelas = search;
                searchByPindahDari = search;
                searchByAlasan = search;
            }


            if (fromDate != "" || toDate != "") {

                let mutasi = await Mutasi.findAndCountAll({
                    limit: perPage,
                    offset: ( page-1 ) * perPage,
                    order: [
                        [sort_by, sort]
                    ],
                    where: {
                        pindah_dari: {
                            [Op.ne]: null
                        },
                        tgl_mutasi: {
                            [Op.between]: [fromDate, toDate]
                        },
                        [Op.or]: [
                            {
                                nama_siswa: {
                                    [Op.like]: '%' + searchByNama + '%'
                                }
                            },
                            {
                                nis_siswa: {
                                    [Op.like]: '%' + searchByNis + '%'
                                }
                            },
                            {
                                jenis_kelamin: {
                                    [Op.like]: '%' + searchByGender + '%'
                                }
                            },
                            {
                                tgl_mutasi: {
                                    [Op.like]: '%' + searchByTanggalMasuk + '%'
                                }
                            },
                            {
                                alasan_mutasi: {
                                    [Op.like]: '%' + searchByAlasan + '%'
                                }
                            },
                            {
                                diterima_di_kelas: {
                                    [Op.like]: '%' + searchByDiterimaDiKelas + '%'
                                }
                            },
                            {
                                pindah_dari: {
                                    [Op.like]: '%' + searchByPindahDari + '%'
                                }
                            },
                        ]
                    },
                });
            
                let from = ((page -1) * perPage) + 1;
            
                let to = page * perPage;
            
                // pagination params
                path = 'http://127.0.0.1:8000/siswa-masuk';
                firstPageUrl = `http://127.0.0.1:8000/siswa-masuk?page=1&perPage=${perPage}`;
                nextPageUrl = `http://127.0.0.1:8000/siswa-masuk?page=${page + 1}&perPage=${perPage}&search=${search}&nama_siswa=${nama_siswa}&nis_siswa=${nis_siswa}&jenis_kelamin=${jenis_kelamin}&tgl_mutasi=${tgl_mutasi}&diterima_di_kelas=${diterima_di_kelas}&pindah_dari=${pindah_dari}&alasan_mutasi=${alasan_mutasi}&sort_by=${sort_by}&sort=${sort}&tgl_masuk_dari=${fromDate}&tgl_masuk_ke=${toDate}`;
            
                if (page > 1) {
                    prevPageUrl = `http://127.0.0.1:8000/siswa-masuk?page=${page - 1}&perPage=${perPage}&search=${search}&nama_siswa=${nama_siswa}&nis_siswa=${nis_siswa}&jenis_kelamin=${jenis_kelamin}&tgl_mutasi=${tgl_mutasi}&diterima_di_kelas=${diterima_di_kelas}&pindah_dari=${pindah_dari}&alasan_mutasi=${alasan_mutasi}&sort_by=${sort_by}&sort=${sort}&tgl_masuk_dari=${fromDate}&tgl_masuk_ke=${toDate}`
                } 
            
                if (page === 1) {
                    prevPageUrl = null
                }
            
                res.status(200).json({
                    resultId: 3,
                    current_page: page,
                    data: mutasi,
                    first_page_url: firstPageUrl,
                    from: from,
                    next_page_url: nextPageUrl,
                    path: path,
                    per_page: perPage,
                    prev_page_url: prevPageUrl,
                    to: to,
                });

            } else {

                let mutasi = await Mutasi.findAndCountAll({
                    limit: perPage,
                    offset: ( page-1 ) * perPage,
                    order: [
                        [sort_by, sort]
                    ],
                    where: {
                        pindah_dari: {
                            [Op.ne]: null
                        },
                        [Op.or]: [
                            {
                                nama_siswa: {
                                    [Op.like]: '%' + searchByNama + '%'
                                }
                            },
                            {
                                nis_siswa: {
                                    [Op.like]: '%' + searchByNis + '%'
                                }
                            },
                            {
                                jenis_kelamin: {
                                    [Op.like]: '%' + searchByGender + '%'
                                }
                            },
                            {
                                tgl_mutasi: {
                                    [Op.like]: '%' + searchByTanggalMasuk + '%'
                                }
                            },
                            {
                                alasan_mutasi: {
                                    [Op.like]: '%' + searchByAlasan + '%'
                                }
                            },
                            {
                                diterima_di_kelas: {
                                    [Op.like]: '%' + searchByDiterimaDiKelas + '%'
                                }
                            },
                            {
                                pindah_dari: {
                                    [Op.like]: '%' + searchByPindahDari + '%'
                                }
                            },
                        ]
                    },
                });
            
                let from = ((page -1) * perPage) + 1;
            
                let to = page * perPage;
            
                // pagination params
                path = 'http://127.0.0.1:8000/siswa-masuk';
                firstPageUrl = `http://127.0.0.1:8000/siswa-masuk?page=1&perPage=${perPage}`;
                nextPageUrl = `http://127.0.0.1:8000/siswa-masuk?page=${page + 1}&perPage=${perPage}&search=${search}&nama_siswa=${nama_siswa}&nis_siswa=${nis_siswa}&jenis_kelamin=${jenis_kelamin}&tgl_mutasi=${tgl_mutasi}&diterima_di_kelas=${diterima_di_kelas}&pindah_dari=${pindah_dari}&alasan_mutasi=${alasan_mutasi}&sort_by=${sort_by}&sort=${sort}&tgl_masuk_dari=${fromDate}&tgl_masuk_ke=${toDate}`;
            
                if (page > 1) {
                    prevPageUrl = `http://127.0.0.1:8000/siswa-masuk?page=${page - 1}&perPage=${perPage}&search=${search}&nama_siswa=${nama_siswa}&nis_siswa=${nis_siswa}&jenis_kelamin=${jenis_kelamin}&tgl_mutasi=${tgl_mutasi}&diterima_di_kelas=${diterima_di_kelas}&pindah_dari=${pindah_dari}&alasan_mutasi=${alasan_mutasi}&sort_by=${sort_by}&sort=${sort}&tgl_masuk_dari=${fromDate}&tgl_masuk_ke=${toDate}`
                } 
            
                if (page === 1) {
                    prevPageUrl = null
                }
            
                res.status(200).json({
                    resultId: 4,
                    current_page: page,
                    data: mutasi,
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


// get mutasi
exports.getMutasi = async (req, res) => {
    const id = req.params.id;

    const mutasi = await Mutasi.findByPk(id);

    if (!mutasi) {
        return res.status(404).json({
            message: `Mutasi with id ${id} does not exist`
        });
    }

    res.status(200).json({
        message: `Displaying mutasi with id ${id}`,
        result: mutasi
    });
}


// create mutasi
exports.createMutasi = async (req, res) => {
    try {
        const schema = {
            nis_siswa: { type: "string" },
            nama_siswa: { type: "string" },
            jenis_kelamin: { type: "enum", values: ["L", "P"], optional: true },
            alasan_mutasi: { type: "string", optional: true },
            keluar_di_kelas: { type: "string", optional: true },
            diterima_di_kelas: { type: "string", optional: true },
            pindah_dari: { type: "string", optional: true },
            pindah_ke: { type: "string", optional: true },
            tgl_mutasi: { type: "date", convert: true },
            sk_mutasi: { type: "string", optional: true },
        }

        const validate = v.validate(req.body, schema);

        // check if validation is success or not
        if (validate.length) {
            return res.status(400).json(validate);
        }

        const siswaExist = await Siswa.findOne({
            where: { nis_siswa: req.body.nis_siswa }
        });

        if (!siswaExist) {
            return res.status(409).json({
                status: 'error',
                message: `Siswa with nis ${req.body.nis_siswa} does not exist`,
            });
        }
        
        var mutasi = await Mutasi.create(req.body);

        res.status(200).json({
            status: "Data added successfully.",
            mutasi
        })

    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ status: "error", message: "Something went wrong. :(" });
    }
}

exports.updateMutasi = async (req, res) => {
    const id = req.params.id;

    let mutasi = await Mutasi.findByPk(id);

    if (!mutasi) {
        return res.status(404).json({
            message: `Mutasi with id ${id} does not exist`
        });
    }

    const schema = {
        nis_siswa: { type: "string", optional: true },
        nama_siswa: { type: "string", optional: true },
        jenis_kelamin: { type: "enum", values: ["L", "P"], optional: true },
        alasan_mutasi: { type: "string", optional: true },
        keluar_di_kelas: { type: "string", optional: true },
        diterima_di_kelas: { type: "string", optional: true },
        pindah_dari: { type: "string", optional: true },
        pindah_ke: { type: "string", optional: true },
        tgl_mutasi: { type: "date", optional: true, convert: true },
        sk_mutasi: { type: "string", optional: true },
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json(validate);
    }

    if (req.body.nis_siswa) {
        const siswaExist = await Siswa.findOne({
            where: { nis_siswa: req.body.nis_siswa }
        });

        if (!siswaExist) {
            return res.status(409).json({
                status: 'error',
                message: `Siswa with nis ${req.body.nis_siswa} does not exist`,
            });
        }
    }

    mutasi = await mutasi.update(req.body);
    res.status(200).json({
        message: `Successfully updated mutasi with id '${id}'`,
        result: mutasi
    });
}

// delete mutasi
exports.deleteMutasi = async (req, res) => {
    const id = req.params.id;

    const mutasi = await Mutasi.findByPk(id);

    if (!mutasi) {
        return res.status(404).json({
            message: `Mutasi with id ${id} does not exist`
        });
    }

    await mutasi.destroy();

    res.status(200).json({
        message: "Mutasi deleted successfully"
    });
}
