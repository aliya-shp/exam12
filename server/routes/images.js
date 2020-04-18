const express = require('express');
const ValidationError = require('mongoose').Error.ValidationError;

const auth = require('../middleware/auth');
const upload = require('../multer').uploads;

const Image = require('../models/Image');

const router = express.Router();

router.get('/', async (req, res) => {
  const images = await Image.find().populate('user');
  res.send(images);
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
    const imageData = {
      title: req.body.title,
    };

    if (req.file) {
      imageData.image = req.file.filename;
    }

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