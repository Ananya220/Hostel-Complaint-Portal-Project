const express = require("express");
const router = express.Router();

const Complaint = require("../models/Complaint");


// ==============================
// SUBMIT COMPLAINT
// ==============================
router.post("/submit", async (req, res) => {

  try {

    const {
      studentName,
      roomNumber,
      category,
      description
    } = req.body;

    const newComplaint = new Complaint({
      studentName,
      roomNumber,
      category,
      description
    });

    await newComplaint.save();

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint: newComplaint
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// ==============================
// GET ALL COMPLAINTS
// ==============================
router.get("/all", async (req, res) => {

  try {

    const complaints = await Complaint.find();

    res.status(200).json(complaints);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// ==============================
// UPDATE COMPLAINT STATUS
// ==============================
router.put("/update/:id", async (req, res) => {

  try {

    const { status } = req.body;

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedComplaint) {

      return res.status(404).json({
        message: "Complaint not found"
      });

    }

    res.status(200).json({
      message: "Complaint status updated successfully",
      complaint: updatedComplaint
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// ==============================
// DELETE COMPLAINT
// ==============================
router.delete("/delete/:id", async (req, res) => {

  try {

    const deletedComplaint = await Complaint.findByIdAndDelete(
      req.params.id
    );

    if (!deletedComplaint) {

      return res.status(404).json({
        message: "Complaint not found"
      });

    }

    res.status(200).json({
      message: "Complaint deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;