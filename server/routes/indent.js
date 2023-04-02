const express = require("express");
const router = express.Router();
const counterSchema = require("../models/counter");
const mongoose = require("mongoose");
const indentSchema = require("../models/indent");
const Long = require("mongodb").Long;
const workorderSchema = require("../models/workorder");
const workorder = require("../models/workorder");

router.post("/add", async (req, res) => {
  const indent = req.body;

  counterSchema.findOneAndUpdate(
    { identifier: indent.workorder },
    { $inc: { seq: 1 } },
    { new: true },
    (error, doc) => {
      let seqId;
      if (doc == null) {
        counterSchema.create({
          identifier: indent.workorder,
          seq: 1,
        });
        seqId = 1;
      } else {
        seqId = doc.seq;
      }
      const his = {
        who: indent.requestor,
        when: Long.fromNumber(new Date().getTime()),
        description: "New Indent requested",
        statusCode: 1,
      };

      const neededFor = new Date();

      const request = {
        ...indent,
        indentNo: `${indent.name}#MI#${seqId}`,
        history: [his],
        status: "New Indent requested",
        statusCode: 1,
        approved: false,
        neededFor: Long.fromNumber(neededFor.getTime()),
      };
      indentSchema.create(request).then(
        (result) => {
          res
            .status(201)
            .json({ indentNo: result.indentNo, workorder: indent.name });
        },
        (error) => {
          res.status(400).json({ message: error.message });
        }
      );
    }
  );
});

router.post("/getIndentsByWorkorder", async (req, res) => {
  const { workorder, requestor } = req.body;
  const result = await indentSchema.find({
    workorder: workorder,
    requestor: requestor,
  });
  res.status(200).json(result);
});

router.post("/getIndentsByDate", async (req, res) => {
  const { date } = req.body;
  const startTimeStamp = new Date(
    new Date(date).setHours(0, 0, 0, 0)
  ).getTime();
  const endTimeStamp = new Date(
    new Date(date).setHours(23, 59, 59, 999)
  ).getTime();
  const result = await indentSchema
    .find(
      { neededFor: { $gte: startTimeStamp, $lte: endTimeStamp } },
      {
        _id: 1,
        status: 1,
        approved: 1,
        statusCode: 1,
        indentNo: 1,
        vehicle: 1,
        location: 1,
      }
    )
    .lean();
  res.status(200).json(result);
});

router.post("/operator-update", async (req, res) => {
  const { indentId, stocks, updatedBy } = req.body.request;
  const result = await indentSchema
    .findOne({ _id: mongoose.Types.ObjectId(indentId) })
    .lean();
  const his = {
    who: updatedBy,
    when: Long.fromNumber(new Date().getTime()),
    description: "The Indent has been updated by the operator",
    statusCode: 3,
  };
  const request = {
    ...result,
    statusCode: 3,
    status: "The Indent has been updated by the operator",
    history: [...result.history, his],
    requestedStocks: result.requestedStocks.map((stock) => {
      const requestedStock = stocks.find(
        (reqStock) => reqStock.stockId == stock.stockId
      );
      return {
        ...stock,
        approvedQuantity: requestedStock
          ? requestedStock.quantity
          : stock.approvedQuantity,
      };
    }),
  };
  indentSchema
    .findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(indentId) },
      { $set: request },
      { new: true }
    )
    .lean()
    .then(async (resp) => {
      const workorderId = resp?.workorder;

      const workorderResp = await workorderSchema
        .findOne({ _id: mongoose.Types.ObjectId(workorderId) })
        .lean();

      const workOrderRequest = {
        ...workorderResp,
        stocks: workorderResp.stocks?.map((stock) => {
          const stockFound = stocks.find(
            (_stock) => _stock.stockId == stock.stockId
          );

          if (stockFound) {
            return {
              ...stock,
              stock:
                stock.stock - stockFound?.quantity < 0
                  ? 0
                  : stock.stock - stockFound?.quantity,
            };
          } else {
            return stock;
          }
        }),
      };
      workorderSchema
        .findOneAndUpdate(
          { _id: mongoose.Types.ObjectId(workorderId) },
          { $set: workOrderRequest }
        )
        .then(() => {
          res.status(200).json(resp);
        });
    });
});

router.post("/approver-update", async (req, res) => {
  const { indentId, updatedBy, approved } = req.body.request;
  const result = await indentSchema
    .findOne({ _id: mongoose.Types.ObjectId(indentId) })
    .lean();
  const his = {
    who: updatedBy,
    when: Long.fromNumber(new Date().getTime()),
    description: approved
      ? "The Indent has been approved"
      : "The Indent has been rejected",
    statusCode: 2,
  };
  const request = {
    ...result,
    statusCode: 2,
    approved: approved,
    status: approved
      ? "The Indent has been approved"
      : "The Indent has been rejected",
    history: [...result.history, his],
  };
  const resp = await indentSchema
    .findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(indentId) },
      { $set: request },
      { new: true }
    )
    .lean();
  res.status(200).json(resp);
});

router.post("/getIndentDetails", async (req, res) => {
  const { id } = req.body;
  const indent = await indentSchema
    .findOne({ _id: mongoose.Types.ObjectId(id) })
    .lean();

  res.status(200).json(indent);
});

module.exports = router;
