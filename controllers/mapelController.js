const Validator = require("fastest-validator");
const { MapelJurusan, Mapel, Jurusan, sequelize } = require("../models");
const { Op, where } = require("sequelize");

const v = new Validator();

// exports.getAllMapel = async (req, res) => {
//     const mapel = await sequelize.query("SELECT * FROM mapel", {
//         model: Mapel,
//         mapToModel: true,
//     });

//     res.status(200).json(mapel);
// }


exports.getAllMapel = async (req, res) => {

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
            createdAt: {
              [Op.like]: '%' + search + '%'
            },
          },
          {
            updatedAt: {
              [Op.like]: '%' + search + '%'
            },
          },
        ]
    }

    try {

        let mapel = await Mapel.findAndCountAll({
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
        path = 'http://127.0.0.1:8000/admin/mata-pelajaran';
        firstPageUrl = `http://127.0.0.1:8000/admin/mata-pelajaran?page=1&perPage=${perPage}`;
        nextPageUrl = `http://127.0.0.1:8000/admin/mata-pelajaran?page=${page + 1}&perPage=${perPage}&search=${search}&sort_by=${sort_by}&sort=${sort}`;

        if (page > 1) {
          prevPageUrl = `http://127.0.0.1:8000/admin/mata-pelajaran?page=${page - 1}&perPage=${perPage}&search=${search}&sort_by=${sort_by}&sort=${sort}`
        } 

        if (page === 1) {
          prevPageUrl = null
        }
    
        res.status(200).json({
          resultId: 1,
          current_page: page,
          data: mapel,
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
}


exports.getMapel = async (req, res) => {
    const id = req.params.id;

    const mapelExist = await Mapel.findByPk(id);

    if (!mapelExist) {
        return res.status(404).json({
            status: "error",
            message: `Mapel with id ${id} does not exist`
        });
    }

    res.status(200).json({
        message: `Displaying Mapel with id ${id}`,
        result: mapelExist
    });
}

exports.createMapel = async (req, res) => {

  try {

    const schema = {

      nama: { type: "string" },
      id: { type: "string" },

    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json(validate);
    }

    let mapelExist = await Mapel.findByPk(req.body.id);

    if (mapelExist) {

      return res.status(400).json({
        status: "error",
        message: `Mata pelajaran with Id : '${req.body.id}' already exist`
      });

    }

    var mapel = await Mapel.create(req.body);

    res.status(200).json({
      status: "success",
      message: "Data added successfully.",
      mapel
    });

  } catch (err) {

      console.log(err);
      res.status(500);
      res.send({ status: "error", message: "Something went wrong. :(" });

  }
}


exports.updateMapel = async (req, res) => {
    const id = req.params.id;

    let mapelExist = await Mapel.findByPk(id);

    if (!mapelExist) {
        return res.status(404).json({
            status: "error",
            message: `Mapel with id ${id} does not exist`
        });
    }

    const schema = {
        nama: { type: "string", optional: true }
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json(validate);
    }

    mapelExist = await mapelExist.update(req.body);
    res.status(200).json({
        message: `Successfully updated Mapel with id ${id}`,
        result: mapelExist
    });
}


exports.deleteMapel = async (req, res) => {
    const id = req.params.id;

    let mapelExist = await Mapel.findByPk(id);

    if (!mapelExist) {
        return res.status(404).json({
            status: "error",
            message: `Mapel with id ${id} does not exist`
        });
    }

    await mapelExist.destroy();

    res.status(200).json({
        message: "Mapel deleted successfully."
    });
}