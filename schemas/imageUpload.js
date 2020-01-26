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
    async singleUpload(_, { file }, { dataSources }) {
      console.log(file)
      const { base64 } = file

      let imageURL = null
      if (base64) {
        const filename =
          generateID() + '-' + new Date().toISOString().slice(0, 10)
        const newFile = bucket.file(filename)

        await new Promise((resolve, reject) => {
          newFile
            .createWriteStream({
              metadata: { contentType: 'image/jpeg' },
            })
            .on('error', err => {
              reject(err)
            })
            .on('finish', () => {
              resolve()
            })
            .end(Buffer.from(base64, 'base64'))
        })
        imageURL = `https://storage.googleapis.com/p2p-lending-marketplace/${filename}`
      } else {
        console.log('masuk sini')
        const test = await file
        console.log(test)
        imageURL = await dataSources.adminAPI.uploadImage(file)
        console.log(imageURL)
      }

      return { imageURL }
    },
  },
}

module.exports = { imageTypeDef, imageResolvers }
