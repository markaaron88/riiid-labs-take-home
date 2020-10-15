const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Attendee = require("../models/attendee");
const Room = require("../models/room");

//Routes

//Gets the list of all attendees
router.get("/", async (req, res) => {
  try {
    const attendees = await Attendee.find();
    res.json(attendees);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// TODO: Add status 200 to successful calls

// Add an attendee
router.post("/add", async (req, res) => {
  const attendee = new Attendee({
    name: req.body.name,
    company: req.body.company,
    email: req.body.email,
  });
  try {
    const savedAttendee = await attendee.save();
    res.status(200).json(savedAttendee);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

//GET specific attendee by Id
router.get("/:attendeeId", async (req, res) => {
  try {
    const attendee = await Attendee.findById(req.params.attendeeId);
    res.status(200).json(attendee);
    // res.status(200).json(doc);
  } catch (err) {
    res.json({ message: err });
    res.status(500).json({ error: err });
  }
});

module.exports = router;
