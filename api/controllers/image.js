var Jimp = require("jimp");

const handleUploadImage = (req, res, db, tinify) => {
  console.log(req.file);
  Jimp.read(req.file.path)
    .then(image => {
      image.quality(50).write(`optimized/${req.file.filename}.jpg`);

      image
        .resize(256, 256)
        .quality(50)
        .write(`optimized/resized/${req.file.filename}.jpg`);
    })
    .catch(err => {
      console.error(err);
    });

  return res.status(200);
};

module.exports = {
  handleUploadImage
};
