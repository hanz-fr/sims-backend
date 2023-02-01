const Validator = require("fastest-validator");
const { MapelJurusan, Mapel, Jurusan, sequelize } = require("../models");
const { Op, where } = require("sequelize");


const v = new Validator();

// get all mapeljurusan
// exports.getAllMapelJurusan = async (req, res) => {
//     const mapelJurusan = await MapelJurusan.findAll();

//     res.status(200).json(mapelJurusan);
// };


exports.getAllMapelJurusan = async (req, res) => {

    /* Search & Sorting */
    const search = req.query.search || '';
    let sort_by = req.query.sort_by || 'mapelJurusanId';
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
            mapelJurusanId: {
              [Op.like]: '%' + search + '%'
            },
          },
          {
            MapelId: {
              [Op.like]: '%' + search + '%'
            },
          },
          {
            JurusanId: {
              [Op.like]: '%' + search + '%'
            },
          },
        ]
    }

    try {

        let mapelJurusan = await MapelJurusan.findAndCountAll({
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
        path = 'http://127.0.0.1:8000/admin/mapel-jurusan';
        firstPageUrl = `http://127.0.0.1:8000/admin/mapel-jurusan?page=1&perPage=${perPage}`;
        nextPageUrl = `http://127.0.0.1:8000/admin/mapel-jurusan?page=${page + 1}&perPage=${perPage}&search=${search}&sort_by=${sort_by}&sort=${sort}`;

        if (page > 1) {
          prevPageUrl = `http://127.0.0.1:8000/admin/mapel-jurusan?page=${page - 1}&perPage=${perPage}&search=${search}&sort_by=${sort_by}&sort=${sort}`
        } 

        if (page === 1) {
          prevPageUrl = null
        }
    
        res.status(200).json({
          resultId: 1,
          current_page: page,
          data: mapelJurusan,
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


exports.getAllMapelbyJurusan = async (req, res) => {

    const jurusanId = req.params.jurusanId;

    const mapelJurusan = await MapelJurusan.findAll({
        where: {
            JurusanId: jurusanId
        }
    });


    res.status(200).json(mapelJurusan);
}


// get mapeljurusan by id
exports.getMapelJurusan = async (req, res) => {
    const mapelJurusanId = req.params.mapelJurusanId;

    const mapelJurusan = await MapelJurusan.findByPk(mapelJurusanId);

    if (!mapelJurusan) {
        return res.status(404).json({
            status: "error",
            message: `Mapel Jurusan with id ${mapelJurusanId} does not exist`
        });
    }

    res.status(200).json({
        message: `Displaying Mapel Jurusan with id ${mapelJurusanId}`,
        result: mapelJurusan
    });
};

// create mapeljurusan
exports.createMapelJurusan = async (req, res) => {
    try {
        const schema ={
            MapelId: { type: "string" },
            JurusanId: { type: "string" },
        }

        const validate = v.validate(req.body, schema);

        if (validate.length) {
            return res.status(400).json(validate);
        }

        // find if mapel with requested id is exist
        let mapelIdExist = await Mapel.findOne({
            where: { id: req.body.MapelId }
        });

        if (!mapelIdExist) {
            return res.status(400).json({
                status: "error",
                message: `Mapel with id ${req.body.MapelId} does not exist`,
            });
        }

        // find if jurusan with requested id is exist
        let jurusanIdExist = await Jurusan.findOne({
            where: { id: req.body.JurusanId }
        });        

        if (!jurusanIdExist) {
            return res.status(400).json({
                status: "error",
                message: `Jurusan with id ${req.body.JurusanId} does not exist`,
            });
        }


        // find if mapelJurusan already exist
        const id = req.body.JurusanId + '_' + req.body.MapelId;
        
        let mapelJurusanExist = await MapelJurusan.findOne({
            where: {
                mapelJurusanId: id
            }
        })


        if (mapelJurusanExist) {
            return res.status(400).json({
                status: 'error',
                message: `MapelJurusan with id ${id} already exist`
            })
        }


        var mapelJurusan = await MapelJurusan.create({
            mapelJurusanId: req.body.JurusanId + '_' + req.body.MapelId,
            MapelId: req.body.MapelId,
            JurusanId: req.body.JurusanId,
        });

        res.status(200).json({
            status: "success",
            message: "Data added successfully.",
            mapelJurusan
        });
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ status: "error", message: "Something went wrong. :(" });
    }
};

// update mapeljurusan
exports.updateMapelJurusan = async (req, res) => {
    const mapelJurusanId = req.params.mapelJurusanId;

    let mapelJurusanExist = await MapelJurusan.findByPk(mapelJurusanId);

    if (!mapelJurusanExist) {
        return res.status(404).json({ 
            status: 'error',
            message: "Mapel Jurusan does not exist"
          });
    }


    const schema = {
        MapelId: { type: "string", optional: true },
        JurusanId: { type: "string", optional: true },
    }

    if (req.body.MapelId) {
        // find if mapel with requested id is exist
        let mapelIdExist = await Mapel.findOne({
            where: { id: req.body.MapelId }
        });
    
        if (!mapelIdExist) {
            return res.status(400).json({
                status: "error",
                message: `Mapel with id ${req.body.MapelId} does not exist`,
            });
        }
    }

    if (req.body.JurusanId) {
        // find if jurusan with requested id is exist
        let jurusanIdExist = await Jurusan.findOne({
            where: { id: req.body.JurusanId }
        });        
    
        if (!jurusanIdExist) {
            return res.status(400).json({
                status: "error",
                message: `Jurusan with id ${req.body.JurusanId} does not exist`,
            });
        }
    }
    

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json(validate);
    }

    mapelJurusanExist = await mapelJurusanExist.update({
        mapelJurusanId: req.body.JurusanId + '_' + req.body.MapelId,
        MapelId: req.body.MapelId,
        JurusanId: req.body.JurusanId,
    });

    res.status(200).json({
        status: 'success',
        message: `Successfully updated Mapel Jurusan with id ${mapelJurusanId}`,
        result: mapelJurusanExist
    });
};  

// delete mapeljurusan
exports.deleteMapelJurusan = async (req, res) => {
    
    const mapelJurusanId = req.params.mapelJurusanId;

    const mapelJurusanExist = await MapelJurusan.findByPk(mapelJurusanId);

    if (!mapelJurusanExist) {
        return res.status(404).json({ 
            status: 'error',
            message: "Mapel Jurusan does not exist"
          });
    }

    await mapelJurusanExist.destroy();

    res.status(200).json({
        message: "Mapel Jurusan deleted successfully."
    });
};