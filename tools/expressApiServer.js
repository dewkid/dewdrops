const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const formidable = require('formidable');

const baseImagePath = './tools/imageData/';
const server = express();

const { setPassword } = require('./argParser');

setPassword(process.argv);

const { Dewdrop, User, Comment } = require('./dbModels');

server.use(bodyParser.json());
server.use(express.static('app/public'));

server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Image uploads
server.post('/upload', function(req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    const file = files.file;
    const filename = fields.filename;

    // oldpath : temporary folder to which file is saved to
    var oldpath = file.path;
    var newpath = baseImagePath + filename;

    console.log('Copy from ' + oldpath + ' to ' + newpath);
    // copy the file to a new location (mv is probably a better choice)
    fs.copyFile(oldpath, newpath, function(err) {
      if (err) {
        res.status(400).send(err);
      } else {
        console.log('File uploaded and moved!');
        res.status(200).send('good');
        next();
      }
    });
  });
});

// Dewdrops

server.get('/dewdrops', (req, res) =>
  Dewdrop.findAll().then(result => res.json(result))
);

server.get('/dewdrops/:id', (req, res) =>
  Dewdrop.findByPk(req.params.id).then(result => {
    Dewdrop.max('id').then(max => {
      let dewdrop = result.toJSON();
      dewdrop.previd = dewdrop.id - 1;
      dewdrop.nextid = dewdrop.id < max ? dewdrop.id + 1 : 0;
      return res.json(dewdrop);
    });
  })
);

server.post('/dewdrops', (req, res) =>
  Dewdrop.create({ ...req.body }).then(result => res.json(result))
);

server.put('/dewdrops/:id', (req, res) =>
  Dewdrop.update(
    {
      ...req.body
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(result => res.json(result))
);

server.delete('/dewdrops/:id', (req, res) =>
  Dewdrop.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => res.json(result))
);

// Comments
server.get('/comments', (req, res) =>
  Comment.findAll().then(result => res.json(result))
);

server.get('/comments/:dewdropid', (req, res) =>
  // Actually loading all comments for a specified dewdrop
  Comment.findAll({
    where: { dewdropid: req.params.dewdropid }
  }).then(result => res.json(result))
);

server.post('/comments', (req, res) => {
  Comment.create({ ...req.body }).then(result => res.json(result));
});

// Users

server.get('/users', (req, res) =>
  User.findAll().then(result => res.json(result))
);

server.get('/users/:id', (req, res) =>
  User.findByPk(req.params.id).then(result => res.json(result))
);

server.listen(3001, () =>
  console.log('Express server listening on port 3001!')
);
