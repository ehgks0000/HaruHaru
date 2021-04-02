const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const s3 = new AWS.S3();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// const upload = multer({
//   storage: multerS3({
//     bucket: process.env.AWS_BUCKET_NAME,
//     contentType:
//   }),
// });

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: this.configService.get < string > 'aws.[bucketname]',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(null, req.user.id);
    },
  }),
}).array('upload');

module.exports = upload;
