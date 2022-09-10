const express = require("express");
const router = express.Router();
const verifyAuth = require("../middleware/auth");
const ProjectSchema = require("../models/project");
const mongoose = require("mongoose");

router.get("/", verifyAuth, async (req, res) => {
  const data = await ProjectSchema.find();
  const result = data.map((project) => {
    return {
      name: project.name,
      id: mongoose.Types.ObjectId(project._id),
      divisions: project.divisions.map((division) => {
        return {
          id: mongoose.Types.ObjectId(division._id),
          name: division.name,
          subdivisions: division.subdivisions.map((subdivision) => {
            return {
              id: mongoose.Types.ObjectId(subdivision._id),
              name: subdivision.name,
            };
          }),
        };
      }),
    };
  });
  res.status(201).json(result);
});

router.post("/add", verifyAuth, async (req, res) => {
  const operation = req.body;

  switch (true) {
    case operation.operationType === "projects":
      const result = await ProjectSchema.create(operation.operationEl);
      res
        .status(201)
        .json({ name: result.name, id: mongoose.Types.ObjectId(result._id) });
      break;

    case operation.operationType === "divisions":
      const projectid = operation.selected.projectId;
      const division = operation.operationEl;
      console.log(projectid, division);
      const resultDiv = await ProjectSchema.updateOne(
        { _id: mongoose.Types.ObjectId(projectid.trim()) },
        { $push: { divisions: division } }
      );
      res.status(201).json({
        name: resultDiv.name,
        id: mongoose.Types.ObjectId(resultDiv._id),
      });
      break;

    case operation.operationType === "subdivisions":
      const _operation = req.body;
      const _projectId = _operation.selected.projectId;
      const _divisionId = _operation.selected.divisionId;
      const subdivision = _operation.operationEl;
      try {
        const result = await ProjectSchema.updateOne(
          { _id: _projectId, "divsions._id": _divisionId },
          { $push: { "divisions.$[elem].subdivisions": subdivision } },
          { arrayFilters: [{ "elem._id": _divisionId }] }
        );
        res
          .status(201)
          .json({ name: result.name, id: mongoose.Types.ObjectId(result._id) });
        break;
      } catch (e) {
        console.log(e);
      }
  }
});

router.post("/update", verifyAuth, async (req, res) => {
  const operation = req.body;
  const projectId = operation.selected.projectId || "";
  const divisionId = operation.selected.divisionId || "";
  const element = operation.operationEl;

  switch (true) {
    case operation.operationType === "projects":
      const result = await ProjectSchema.updateOne(
        { _id: mongoose.Types.ObjectId(projectId) },
        { $set: { name: element.name } }
      );
      res.status(201).json({ message: "success" });
      break;

    case operation.operationType === "divisions":
      const resultDiv = await ProjectSchema.updateOne(
        { _id: mongoose.Types.ObjectId(projectId.trim()) },
        { $set: { "divisions.$[elem].name": element.name } },
        { arrayFilters: [{ "elem._id": element.id }] }
      );
      res.status(201).json({
        name: resultDiv.name,
        id: mongoose.Types.ObjectId(resultDiv._id),
      });
      break;

    case operation.operationType === "subdivisions":
      try {
        const result = await ProjectSchema.updateOne(
          { _id: projectId, "divsions._id": divisionId },
          {
            $set: {
              "divisions.$[elem].subdivisions.$[elem1].name": element.name,
            },
          },
          {
            arrayFilters: [
              { "elem._id": divisionId },
              { "elem1._id": element.id },
            ],
          }
        );
        res
          .status(201)
          .json({ name: result.name, id: mongoose.Types.ObjectId(result._id) });
        break;
      } catch (e) {
        console.log(e);
      }
  }
});

router.post("/delete", verifyAuth, async (req, res) => {
  const operation = req.body;
  const projectId = operation.selected.projectId || "";
  const divisionId = operation.selected.divisionId || "";
  const element = operation.operationEl;
  let result;

  switch (true) {
    case operation.operationType === "projects":
      result = null;
      result = await ProjectSchema.deleteOne({ _id: element.id });
      if (result?.acknowledged) {
        res.status(201).json({ status: "success", message: "Delete success" });
      } else {
        res.status(400).json({ status: "error", message: "error updating" });
      }
      break;
    case operation.operationType === "divisions":
      result = null;
      result = await ProjectSchema.updateOne(
        { _id: projectId },
        { $pull: { divisions: { _id: element.id } } }
      );
      if (result?.acknowledged) {
        res.status(201).json({ status: "success", message: "Delete success" });
      } else {
        res.status(400).json({ status: "error", message: "error updating" });
      }
      break;
    case operation.operationType === "subdivisions":
      result = null;
      result = await ProjectSchema.updateOne(
        { _id: projectId },
        { $pull: { "divisions.$[elem].subdivisions": { _id: element.id } } },
        { arrayFilters: [{ "elem._id": divisionId }] }
      );
      if (result?.acknowledged) {
        res.status(201).json({ status: "success", message: "Delete success" });
      } else {
        res.status(400).json({ status: "error", message: "error updating" });
      }
      break;
  }
});

module.exports = router;
