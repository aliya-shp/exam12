const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Image = require('./models/Image');
const {nanoid} = require("nanoid");

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (let coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [user1, user2] = await User.create({
    username: 'user',
    password: '123',
    token: nanoid(),
  }, {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    token: nanoid(),
  });

  await Image.create(
    {
      title: 'Mountain Fuji',
      image: 'uploads/fixtures/mountain_fuji.jpg',
      user: user1._id,
    },
    {
      title: 'Imperial palace in Tokyo',
      image: 'uploads/fixtures/imperial_palace.jpg',
      user: user1._id,
    },
    {
      title: 'Osaka Temple',
      image: 'uploads/fixtures/osaka_castle.jpeg',
      user: user1._id,
    },
    {
      title: 'Golden Temple in Kyoto',
      image: 'uploads/fixtures/golden_temple.jpg',
      user: user1._id,
    },
    {
      title: 'Byodo-in temple in Uji',
      image: 'uploads/fixtures/byodo_in_temple.jpg',
      user: user1._id,
    },
    {
      title: 'Aiya Sofia',
      image: 'uploads/fixtures/aiya_sofia.jpg',
      user: user2._id,
    },
    {
      title: 'Blue mosque',
      image: 'uploads/fixtures/blue_mosque.jpeg',
      user: user2._id,
    },
    {
      title: 'Galata tower',
      image: 'uploads/fixtures/galata_tower.jpg',
      user: user2._id,
    },
    {
      title: 'Dolmabahce palace',
      image: 'uploads/fixtures/dolmabahce_palace.jpg',
      user: user2._id,
    },
  );

  mongoose.connection.close();
};

run().catch(error => {
  mongoose.connection.close();
  throw error;
});