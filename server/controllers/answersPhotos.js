const {answersPhotos} = require('../models');

module.exports = {

  getPhotos: (req, res) => {
    answersPhotos.listPhotos(req.params.answer_id)
    .then((result) => {
      console.log(result);
      res.status(200).send(result)
    })
    .catch(err => console.log('Error getting photos: ', err))
  },
  postPhotos: (req, res) => {
    answersPhotos.addPhotos(req.params.answer_id, req.body)
    .then((result) => {
      res.status(201).send()
    })
    .catch(err => console.log('Error adding photos: ', err))
  }
}