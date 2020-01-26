const { gql } = require('apollo-server')
const { Storage } = require('@google-cloud/storage')
const storage = new Storage({ keyFilename: process.env.GCP_KEYFILE_PATH })
const bucket = storage.bucket('p2p-lending-marketplace')
const generateID = require('uuid/v4')

const imageTypeDef = gql`
  type File {
    # filename: String!
    # mimetype: String!
    # encoding: String!
    imageURL: String!
  }

  extend type Query {
    uploads: [File]
  }

  extend type Mutation {
    singleUpload(file: Upload!): File!
  }

  scalar Upload
`

const imageResolvers = {
  Mutation: {
    async singleUpload(_, { file }) {
      const { base64, createReadStream } = await file
      let imageURL = null
      const filename =
        generateID() + '-' + new Date().toISOString().slice(0, 10)

      const newFile = bucket.file(filename)

      if (base64) {
        await new Promise((resolve, reject) => {
          newFile
            .createWriteStream({
              metadata: {
                contentType: 'image/jpeg',
              },
            })
            .on('error', err => {
              reject(err)
            })
            .on('finish', () => {
              resolve()
            })
            .end(Buffer.from(base64, 'base64'))
        })
      } else {
        await new Promise((resolve, reject) => {
          createReadStream().pipe(
            newFile
              .createWriteStream({
                metadata: {
                  contentType: 'image/jpeg',
                },
              })
              .on('error', err => {
                reject(err)
              })
              .on('finish', () => {
                resolve()
              })
          )
        })
      }
      imageURL = `https://storage.googleapis.com/p2p-lending-marketplace/${filename}`

      return { imageURL }
    },
  },
}

module.exports = { imageTypeDef, imageResolvers }
