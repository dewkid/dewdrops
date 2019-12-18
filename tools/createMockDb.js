/* eslint-disable no-console */
const util = require('util');
const fs = require('fs');
const rimraf = require('rimraf');
const path = require('path');
const { dewdrops, comments, users } = require('./mockData');
const copyFilePromise = util.promisify(fs.copyFile);
const { setPassword } = require('./argParser');

setPassword(process.argv);

const { User, Dewdrop, Comment, connection } = require('./dbModels');

function copyFiles(srcDir, destDir, files) {
  return Promise.all(
    files.map(f => {
      return copyFilePromise(path.join(srcDir, f), path.join(destDir, f));
    })
  );
}

const imageDataPath = path.join(__dirname, 'imageData');
const mockImageDataPath = path.join(__dirname, 'mockImages');

// remove the image directory
rimraf.sync(imageDataPath);

// recreate image directory and copy mock images
if (!fs.existsSync(imageDataPath)) fs.mkdirSync(imageDataPath);
copyFiles(mockImageDataPath, imageDataPath, [
  'bob.jpg',
  'character.jpg',
  'ski.jpg',
  'sunset.jpg',
  'void.jpg'
])
  .then(() => {
    console.log('done');
    setupPostgresTables();
  })
  .catch(err => {
    console.log(err);
  });

// Testing

function testConnection() {
  connection
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
}

async function createTableData() {
  await Promise.all(
    users.map(user => {
      delete user.id;
      User.create(user);
    })
  );
  await Promise.all(
    dewdrops.map(dewdrop => {
      delete dewdrop.id;
      Dewdrop.create(dewdrop);
    })
  );
  await Promise.all(
    comments.map(comment => {
      delete comment.id;
      Comment.create(comment);
    })
  );
}

function setupPostgresTables() {
  testConnection();
  connection.sync({ force: true }).then(() => {
    console.log('db tables created');
    createTableData().then(() => {
      console.log('Mock records created');

      Dewdrop.findAll().then(dewdrops => {
        dewdrops.map(dewdrop => console.log(dewdrop.imageName));
      });
    });
  });
}
