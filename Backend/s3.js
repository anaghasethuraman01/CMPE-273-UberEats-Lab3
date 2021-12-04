require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = "ubereatsimagebucket"
const region = "us-west-1"
const accessKeyId = "AKIAZZWDMJIONBW2DJGK"
const secretAccessKey = "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"

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})
// uploads a file to s3
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)
  
    const uploadParams = {
      Bucket: bucketName,
      Body: fileStream,
      Key: file.filename
    }
  
    return s3.upload(uploadParams).promise()
  }
exports.uploadFile = uploadFile

// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream