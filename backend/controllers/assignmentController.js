// assignmentController.js
import validator from "validator";
import { Assignment } from "../models/assignmentSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createAssignment = async (req, res, next) => {
  console.log(req.body);
  const { title, description, grade, deadline } = req.body;
  try {
    if (!title || !description || !grade || !deadline) {
      return res.status(400).json({ success: false, message: "Please Fill Full Form!" });
    }
    if (!validator.isISO8601(deadline)) {
      return res.status(400).json({ success: false, message: "Invalid deadline format!" });
    }
    await Assignment.create({ title, description, grade, deadline });
    res.status(201).json({
      success: true,
      message: "Assignment Created!",
    });
  } catch (err) {
    next(err);
  } 
};

export const getAllAssignments = async (req, res, next) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json({
      success: true,
      assignments,
    });
  } catch (err) {
    next(err);
  }
}; 

export const deleteAssignment = async (req, res, next) => {
  const { id } = req.params;

  try {
    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({ success: false, message: "Assignment not found!" });
    }

    await assignment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Assignment deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};
