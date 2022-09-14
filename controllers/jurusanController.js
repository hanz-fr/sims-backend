const Validator = require("fastest-validator");
const { Jurusan, sequelize } = require("../models");

const v = new Validator();

// get all jurusan
exports.getAllJurusan = async (req, res) => {
  const jurusan = await sequelize.query("SELECT * FROM jurusan", {
    model: Jurusan,
    mapToModel: true,
  });

  res.status(200).json(jurusan);
};

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
      konsentrasi: { type: "string", max: 100 },
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json(validate);
    }

    var jurusan = await Jurusan.create(req.body);

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
