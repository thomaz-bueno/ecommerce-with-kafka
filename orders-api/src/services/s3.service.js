const { GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const s3Client = require('../config/s3.js');

const getSignedUrlByKey = async (key) => {
    const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
    });

    return getSignedUrl(s3Client, command, { expiresIn: 300 });
};

module.exports = { getSignedUrlByKey };