const mongoose = require('mongoose');

const ScoreBoard = require('../../db/models/scoreBoard');


exports.getAll = (req, res) => {
  // your code here
  console.log('started getall')
  ScoreBoard.find({}, (err,data) => {
    if (err) {
      console.error(err);
    } else {
      console.log('from get', data);
      res.json(data);
    }
  })
};

exports.add = (req, res) => {
  let result = req.body;
  var newScore = new ScoreBoard(result);
  newScore.save(function (err, score) {
    if (err) {
      return console.error(err);
    } else {
      console.log(score.username + " saved to collection.");
      res.end();
    }
  });
};
