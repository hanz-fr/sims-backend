const Validator = require("fastest-validator");
const { Jurusan, Siswa, Kelas, sequelize } = require("../models");
const { Op, where } = require("sequelize");

const v = new Validator();

// get all jurusan
exports.getAllJurusan = async (req, res) => {

  /* Search & Sorting */
  const search = req.query.search || '';
  let sort_by = req.query.sort_by || 'nama';
  let sort = req.query.sort || 'ASC';

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

  let where = {
    [Op.or]: [
      {
        id: {
          [Op.like]: '%' + search + '%'
        },
      },
      {
        nama: {
          [Op.like]: '%' + search + '%'
        },
      },
      {
        konsentrasi: {
          [Op.like]: '%' + search + '%'
        },
      },
      {
        desc: {
          [Op.like]: '%' + search + '%'
        },
      }
    ]
  }

  try {

    let jurusan = await Jurusan.findAndCountAll({
      limit: perPage,
      order: [
        [sort_by, sort]
      ],
      offset: ( page-1 ) * perPage,
      where: where,
    });

    let from = ((page - 1) * perPage) + 1;

    let to = page * perPage;

    // pagination params
    path = 'http://127.0.0.1:8000/admin/jurusan';
    firstPageUrl = `http://127.0.0.1:8000/admin/jurusan?page=1&perPage=${perPage}`;
    nextPageUrl = `http://127.0.0.1:8000/admin/jurusan?page=${page + 1}&perPage=${perPage}&search=${search}&sort_by=${sort_by}&sort=${sort}`;

    if (page > 1) {
      prevPageUrl = `http://127.0.0.1:8000/admin/jurusan?page=${page - 1}&perPage=${perPage}&search=${search}&sort_by=${sort_by}&sort=${sort}`
    } 

    if (page === 1) {
      prevPageUrl = null
    }
  
    res.status(200).json({
      resultId: 1,
      current_page: page,
      data: jurusan,
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
      message: error.message
    })
  }

};

// get all jurusan and count it
exports.findAndCountAllJurusan = async (req, res) => {
  const jurusan = await Jurusan.findAndCountAll();

  res.status(200).json(jurusan);
}

// get jurusan by id
exports.getJurusan = async (req, res) => {
  const id = req.params.id;

  const jurusan = await Jurusan.findByPk(id);

  if (!jurusan) {
    return res.status(404).json({
      status: "error",
      message: `Jurusan with id ${id}  does not exist`,
    });
  }

  res.status(200).json({
    message: `Displaying jurusan with id : ${id}`,
    result: jurusan,
  });
};


// create jurusan
exports.createJurusan = async (req, res) => {
  try {
    const schema = {
      nama: { type: "string", max: 50 },
      desc: { type: "string", optional: true },
      konsentrasi: { type: "string", max: 100, },
      id: { type: "string", max: 50, optional: true },
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json(validate);
    }

    let jurusanIdExist = await Jurusan.findOne({
      where: { id: req.body.nama+req.body.konsentrasi }
    });

    if (jurusanIdExist) {
      return res.status(400).json({
        status: 'error',
        message: `Jurusan with Id : '${jurusanIdExist.id}' already exist`
      })
    }

    var jurusan = await Jurusan.create({
      id: req.body.nama + '-' + req.body.konsentrasi,
      konsentrasi: req.body.konsentrasi,
      nama: req.body.nama,
      desc: req.body.desc,
    });

    res.status(200).json({
      status: "Data added successfully.",
      jurusan,
    });
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send({ status: "error", message: "Something went wrong. :(" });
  }
};

// update jurusan
exports.updateJurusan = async (req, res) => {
  const id = req.params.id;

  let jurusanExist = await Jurusan.findByPk(id);

  if (!jurusanExist) {
    return res.status(404).json({ 
      status: 'error',
      message: "Jurusan does not exist"
    });
  }

  const schema = {
    id: { type: "string", max: 50, optional: true },
    nama: { type: "string", max: 50, optional: true },
    desc: { type: "string", optional: true },
    konsentrasi: { type: "string", max: 100, optional: true },
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  jurusanExist = await jurusanExist.update(req.body);

  res.status(200).json({
    message: `Successfully updated jurusan with id : ${id}`,
    result: jurusanExist,
  });
};

// delete jurusan
exports.deleteJurusan = async (req, res) => {
  const id = req.params.id;

  let jurusan = await Jurusan.findByPk(id);

  if (!jurusan) {
    return res.status(409).json({
      message: "Jurusan does not exist",
    });
  }

  await jurusan.destroy();

  res.status(200).json({
    message: "Jurusan deleted successfully.",
  });
};
