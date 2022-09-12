var express = require("express");
var router = express.Router();

const Validator = require("fastest-validator");
const { Ortu, sequelize } = require("../models");

const v = new Validator();



// get all ortu
router.get('/', async (req, res) => {
  const ortu = await sequelize.query("SELECT * FROM ortu", {
    model: Ortu,
    mapToModel: true,
  });
  res.status(200).json(ortu);
});

// get ortu by id
router.get('/:id', async (req, res) => {
    
    const id = req.params.id;

    const ortu = await Ortu.findByPk(id);
    
    if (!ortu) {
        return res.json({
            message: "Ortu does not exist",
        });
    }

    res.status(200).json({
        message: `Displaying ortu with id : ${id}`,
        result: ortu
    });
});


// create route
router.post('/', async (req, res) => {
    try {
      // validate incoming request
      const schema = {
        nik_ortu: { type: "string", max: 16 },
        nama: { type: "string", max: 100 },
        hubungan: { type: "enum", values: ["Ibu", "Ayah", "Wali"] },
        alamat: { type: "string" },
        no_telp: { type: "string", max: 20 },
        pekerjaan: { type: "string", max: 50 },
        email: { type: "string", max: 100, optional: true },
      };
  
      const validate = v.validate(req.body, schema);
  
      if (validate.length) {
        return res.status(400).json(validate);
      }
  
      // find Ortu where nik already exist
      const ortuExist = await Ortu.findOne({
        where: { nik_ortu: req.body.nik_ortu },
      });
  
      if (ortuExist) {
        return res.status(409).json({
          status: "error",
          message: "NIK already exist",
        });
      }
  
      // find Ortu where email already exist
      /* const ortuEmailExist = await Ortu.findOne({
              where: { email: req.body.email },
          });
  
          if (ortuEmailExist) {
              return res.status(409).json({
                  status: "error",
                  message: "Email already exist"
              })
          } 
        */
  
      /* 
          If there's no ortu with nik, and email already exist,
          this code below will be executed. 
        */
      var ortu = await Ortu.create(req.body);
  
      res.status(200).json({
        status: "Data added successfully.",
        ortu,
      });
    } catch (err) {
      console.log(err);
      res.status(500);
      res.send({ status: "error", message: "Something went wrong. :(" });
    }
});


// update route
router.put('/:id', async (req, res) => {
  
  const id = req.params.id; // get id from req params

  
  let ortuExist = await Ortu.findByPk(id); // check if ortu is exist

  if (!ortuExist) {
    return res.json({ message: "Ortu does not exist" });
  }

  const schema = {
    nik_ortu: { type: "string", max: 16, optional: true },
    nama: { type: "string", max: 100, optional: true },
    hubungan: { type: "enum", values: ["Ibu", "Ayah", "Wali"], optional: true },
    alamat: { type: "string", optional: true },
    no_telp: { type: "string", max: 20, optional: true },
    pekerjaan: { type: "string", max: 50, optional: true },
    email: { type: "string", max: 100, optional: true },
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  ortuExist = await ortuExist.update(req.body);

  res.status(200).json({
    message: `Successfully updated Ortu with id : ${id}`,
    result: ortuExist
  });

});


// delete route
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    
    let ortu = await Ortu.findByPk(id);

    if (!ortu) {
        return res.json({
            message: "Ortu does not exist"
        });
    }

    await ortu.destroy();

    res.json({
        message: "Ortu deleted successfully"
    });
}); 

module.exports = router;
