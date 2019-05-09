const Jimp = require("jimp");
const AWS = require("aws-sdk");
const fs = require("fs");

let s3bucket = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_KEY,
  Bucket: process.env.AWS_BUCKET
});

const handleUploadImage = (req, res, db) => {
  uploadImage(req.file.path, `fullSize/${req.body.title}`);
  Jimp.read(req.file.path)
    .then(image => {
      image.quality(50).write(`optimized/${req.file.filename}.jpg`, () => {
        uploadImage(
          `optimized/${req.file.filename}.jpg`,
          `quality/${req.body.title}`
        );
      });

      image
        .resize(256, 256)
        .quality(50)
        .write(`optimized/resized/${req.file.filename}.jpg`, () => {
          uploadImage(
            `optimized/resized/${req.file.filename}.jpg`,
            `resized/${req.body.title}`
          );
        });
    })
    .catch(err => {
      console.error(err);
    });

  return res.status(200);
};

const uploadImage = (file, key) => {
  var params = {
    Bucket: process.env.AWS_BUCKET,
    Body: fs.createReadStream(file),
    Key: key + ".jpg"
  };

  console.log(params);

  s3bucket.upload(params, function(err, data) {
    if (err) {
      console.log("error in callback");
      console.log(err);
    }
    fs.unlinkSync(file);
    console.log("success");
    console.log(data);
  });
};

module.exports = {
  handleUploadImage
};
