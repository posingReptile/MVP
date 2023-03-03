const mongoose = require('mongoose');

const scoreBoardSchema = new mongoose.Schema({
  username:{ type: String, require: true },
  level: { type: Number, require: true },
  // score: { type: Number, require: true },
});


const ScoreBoard = mongoose.model('scoreboard', scoreBoardSchema);

module.exports = ScoreBoard;