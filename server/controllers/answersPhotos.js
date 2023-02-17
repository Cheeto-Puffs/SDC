const {answersPhotos} = require('../models');

module.exports = {

  getPhotos: (req, res) => {
    questions.listPhotos(req.query)
    .then((result) => {
      console.log(result);
      res.status(200).send(result.data)
    })
    .catch(err => console.log('Error getting photos: ', err))
  },
  postPhotos: (req, res) => {
    questions.addPhotos(req.body)
    .then((result) => {
      console.log(result);
      res.status(201).send()
    })
    .catch(err => console.log('Error adding photos: ', err))
  }
}