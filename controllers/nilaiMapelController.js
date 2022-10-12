const Validator = require("fastest-validator");
const { NilaiMapel, MapelJurusan, Raport, sequelize } = require("../models");

// import fastest-validator
const v = new Validator();

// get all nilaiMapel
exports.getAllNilaiMapel = async (req, res) => {
  const nilaiMapel = await sequelize.query("SELECT * FROM nilai_mapel", {
    model: NilaiMapel,
    mapToModel: true,
  });

  res.status(200).json(nilaiMapel);
};

// get nilaiMapel
exports.getNilaiMapel = async (req, res) => {
  const id = req.params.id;

  const nilaiMapel = await NilaiMapel.findByPk(id);

  if (!nilaiMapel) {
    return res.status(404).json({
      message: `Nilai mapel with id '${id}' does not exist`,
    });
  }

  res.status(200).json({
    message: `Displaying nilaiMapel with id : ${id}`,
    result: nilaiMapel,
  });
};

// create nilaiMapel
exports.createNilaiMapel = async (req, res) => {
  try {
    const schema = {
      idMapelJurusan: { type: "string" },
      RaportId: { type: "number" },
      nilai_keterampilan: { type: "number", max: 100 },
      nilai_pengetahuan: { type: "number", max: 100 },
      kkm: { type: "number", max: 100 },
    };

    const validate = v.validate(req.body, schema);

    // check if validation is success or not
    if (validate.length) {
      return res.status(400).json(validate);
    }

    // check for existing mapelJurusan
    const mapelJurusanExist = await MapelJurusan.findOne({
      where: { mapelJurusanId: req.body.idMapelJurusan },
    });

    if (!mapelJurusanExist) {
      return res.status(404).json({
        status: "error",
        message: `Mapel Jurusan with id ${req.body.idMapelJurusan} does not exist`,
      });
    }

    // check for existing raport
    const raportExist = await Raport.findOne({
      where: { id: req.body.RaportId },
    });

    if (!raportExist) {
      return res.status(404).json({
        status: "error",
        message: `Raport with id ${req.body.RaportId} does not exist`,
      });
    }

    
    // check if NilaiMapel already exist
    const idmapel =  req.body.idMapelJurusan;
    const idraport = req.body.RaportId;

    const nilaiMapelExist = await NilaiMapel.findOne({
      where: {
        idMapelJurusan: idmapel,
        RaportId: idraport
      }
    });

    if (nilaiMapelExist) {
      return res.status(400).json({
        status: 'error',
        message: `Nilai Mapel '${idmapel}' for raport with id '${idraport}' already exist.`
      });
    }

    var nilaiMapel = await NilaiMapel.create(req.body);

    res.status(200).json({
      status: "Data added successfully.",
      nilaiMapel,
    });
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send({ status: "error", message: "Something went wrong. :(" });
  }
};

// update nilaiMapel
exports.updateNilaiMapel = async (req, res) => {
  const id = req.params.id;

  let nilaiMapel = await NilaiMapel.findByPk(id);

  if (!nilaiMapel) {
    return res.status(404).json({
      message: `Nilai mapel with id '${id}' does not exist`,
    });
  }

  const schema = {
    idMapelJurusan: { type: "string", optional: true },
    RaportId: { type: "number", optional: true },
    nilai_keterampilan: { type: "number", max: 100, optional: true },
    nilai_pengetahuan: { type: "number", max: 100, optional: true },
    kkm: { type: "number", max: 100, optional: true },
  };

  if (req.body.mapelJurusanId) {
    const mapelJurusanExist = await MapelJurusan.findOne({
      where: { mapelJurusanId: req.body.mapelJurusanId },
    });

    if (!mapelJurusanExist) {
      return res.status(404).json({
        status: "error",
        message: `Mapel Jurusan with id '${req.body.mapelJurusanId}' does not exist`,
      });
    }
  }

  if (req.body.RaportId) {
    const raportExist = await Raport.findOne({
      where: { id: req.body.RaportId },
    });

    if (!raportExist) {
      return res.status(404).json({
        status: "error",
        message: `Raport with id '${req.body.RaportId}' does not exist`,
      });
    }
  }

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  nilaiMapel = await nilaiMapel.update(req.body);

  res.status(200).json({
    message: `Successfully updated Nilai Mapel with id '${id}'`,
    result: nilaiMapel,
  });
};

// delete nilaiMapel
exports.deleteNilaiMapel = async (req, res) => {
  const id = req.params.id;

  let nilaiMapel = await NilaiMapel.findByPk(id);

  if (!nilaiMapel) {
    return res.status(404).json({
      message: `Nilai mapel with id ${id} does not exist`,
    });
  }

  await nilaiMapel.destroy();

  res.status(200).json({
    message: 'Nilai mapel deleted successfully'
  });
};
