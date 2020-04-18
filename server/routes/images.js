const express = require('express');
const ValidationError = require('mongoose').Error.ValidationError;

const auth = require('../middleware/auth');
const upload = require('../multer').uploads;

const Image = require('../models/Image');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    if (req.query.user) {
      const images = await Image.find({user: req.query.user}).populate('user');
      return res.send(images);
    } else {
      const images = await Image.find().populate('user');
      return res.send(images);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).send({message: 'Not found'});
    }

    res.send(image);
  } catch (error) {
    res.status(404).send({message: 'Not found'});
  }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
  try {
    const imageData = req.body;

    if (req.file) {
      imageData.image = req.file.filename;
    } else if (!req.file || !req.body.title) {
      return res.status(400).send({message: 'Please enter either image or title'})
    }

    imageData.user = req.user;
    imageData.title = req.body.title;

    const image = new Image(imageData);

    await image.save();

    return res.send({id: image._id});
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).send(error);
    } else {
      return res.sendStatus(500);
    }
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image.user.equals(req.user._id)) {
      return res.status(401).send({message: 'You cannot do that!'});
    }

    await image.delete();
    return res.send('Successfully deleted');
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;