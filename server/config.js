const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public'),
  database: 'mongodb://localhost/gallery-app',
  databaseOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  facebook: {
    appId: '3727489257323792',
    appSecret: '4c09634d8715fb08d453c5f8bb83a0d6'
  }
};