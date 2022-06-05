const Answer = require("../models/Answer");
const Question = require("../models/Question");
const { validateObjectId } = require("../utils/validation");


exports.getAnswersByQuestion = async (req, res) => {
  try {
    const questionId = req.params.qid;

    if (!validateObjectId(questionId)) {
      return res.status(400).json({ msg: "Question id not valid" });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(400).json({ msg: "No question found.." });
    }

    const answers = await Answer.find({ question: questionId }).populate("answerer", "-password");
    res.status(200).json({ answers, msg: "Answers found successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}



exports.postAnswer = async (req, res) => {
  try {
    const questionId = req.params.qid;
    const { text } = req.body;
    const userId = req.user.id;
    if (!text) {
      return res.status(400).json({ msg: "Answer can't be empty" });
    }

    if (!validateObjectId(questionId)) {
      return res.status(400).json({ msg: "invalid Question id" });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(400).json({ msg: "No question found.." });
    }

    const answer = await Answer.create({ question: questionId, answerer: userId, text });
    res.status(200).json({ answer, msg: "Answer posted successfully" });

  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}



exports.updateAnswerById = async (req, res) => {
  try {

    const answerId = req.params.ansid;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ msg: "Answer can't be empty" });
    }

    if (!validateObjectId(answerId)) {
      return res.status(400).json({ msg: "Invalid Answer id" });
    }

    let answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(400).json({ msg: "No answer found.." });
    }

    if (answer.answerer != req.user.id) {
      return res.status(400).json({ msg: "Invalid Answer id.." });
    }

    answer = await Answer.findByIdAndUpdate(answerId, { text }, { new: true });
    res.status(200).json({ answer, msg: "Answer updated successfully" });

  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}



exports.deleteAnswerById = async (req, res) => {
  try {
    const answerId = req.params.ansid;

    if (!validateObjectId(answerId)) {
      return res.status(400).json({ msg: "Invalid Answer id" });
    }

    let answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(400).json({ msg: "No answer found.." });
    }

    if (answer.answerer != req.user.id) {
      return res.status(400).json({ msg: "Invalid Answer id.." });
    }

    await Answer.findByIdAndDelete(answerId);
    res.status(200).json({ msg: "Answer deleted successfully" });

  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}



exports.getAnswersOfCurrentUser = async (req, res) => {
  try {
    const answers = await Answer.find({ answerer: req.user.id }).populate("question").sort("-createdAt");
    res.status(200).json({ answers, msg: "Answers found successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}