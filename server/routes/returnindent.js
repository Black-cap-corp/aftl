const express = require("express");
const router = express.Router();
const counterSchema = require("../models/counter");
const mongoose = require("mongoose");
const returnIndentSchema = require("../models/returnindent");
const Long = require("mongodb").Long;
const workorderSchema = require("../models/workorder");

router.post("/add", async (req, res) => {
  const returnIndent = req.body;

  counterSchema.findOneAndUpdate(
    { identifier: returnIndent.indentId },
    { $inc: { seq: 1 } },
    { new: true },
    (error, doc) => {
      let seqId;
      if (doc == null) {
        counterSchema.create({
          identifier: returnIndent.indentId,
          seq: 1,
        });
        seqId = 1;
      } else {
        seqId = doc.seq;
      }
      const his = {
        who: returnIndent.requestor,
        when: Long.fromNumber(new Date().getTime()),
        description: "New return requested",
        statusCode: 1,
      };

      const neededFor = new Date();
      neededFor.setDate(neededFor.getDate());

      const request = {
        ...returnIndent,
        indentNo: `${returnIndent.name}-RI#${seqId}`,
        history: [his],
        status: "New Return requested",
        statusCode: 1,
        approved: false,
        NeededFor: Long.fromNumber(neededFor.getTime()),
      };
      returnIndentSchema.create(request).then(
        (result) => {
          res
            .status(201)
            .json({ returnNo: result.indentNo, indentNo: returnIndent.name });
        },
        (error) => {
          res.status(400).json({ message: error.message });
        }
      );
    }
  );
});

router.post("/getReturnsByIndent", async (req, res) => {
  const { indent, requestor } = req.body;
  const result = await returnIndentSchema.find({
    indentId: indent,
    requestor: requestor,
  });
  res.status(200).json(result);
});

router.post("/operator-update", async (req, res) => {
  const { indentId, stocks, updatedBy } = req.body.request;
  const result = await returnIndentSchema
    .findOne({ _id: mongoose.Types.ObjectId(indentId) })
    .lean();
  const his = {
    who: updatedBy,
    when: Long.fromNumber(new Date().getTime()),
    description: "The Return has been updated by the operator",
    statusCode: 2,
  };
  const request = {
    ...result,
    statusCode: 2,
    status: "The Return has been updated by the operator",
    history: [...result?.history, his],
    returnStocks: result.returnStocks.map((stock) => {
      const requestedStock = stocks.find(
        (reqStock) => reqStock.stockId == stock.stockId
      );
      return {
        ...stock,
        acceptedQuantity: requestedStock
          ? requestedStock.quantity
          : stock.acceptedQuantity,
      };
    }),
  };
  returnIndentSchema
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
                stock.stock + stockFound?.quantity < 0
                  ? 0
                  : stock.stock + stockFound?.quantity,
            };
          } else {
            return stock;
          }
        }),
      };
      console.log(JSON.stringify(workOrderRequest, null, 4));

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
  const { indentId, stocks, updatedBy, approved } = req.body;
  const result = await returnIndentSchema
    .findOne({ _id: mongoose.Types.ObjectId(indentId) })
    .lean();
  const his = {
    who: updatedBy,
    when: Long.fromNumber(new Date().getTime()),
    description: `${approved} ?'The Return has been approved' ? 'The Return has been rejected'`,
  };
  const request = {
    ...result,
    statusCode: 3,
    approved: approved,
    status: `${approved} ?'The Return has been approved' ? 'The Return has been rejected'`,
    history: [...result.history, his],
    returnStocks: result.returnStocks.map((stock) => {
      const requestedStock = stocks.find(
        (reqStock) => reqStock.stockId == stock.stockId
      );
      return {
        ...stock,
        acceptedQuantity: requestedStock
          ? requestedStock.quantity
          : stock.acceptedQuantity,
      };
    }),
  };
  const resp = await returnIndentSchema
    .findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(indentId) },
      { $set: request }
    )
    .lean();
  res.status(200).json(resp);
});

router.post("/getReturnsByDate", async (req, res) => {
  const { date } = req.body;
  const startTimeStamp = new Date(
    new Date(date).setHours(0, 0, 0, 0)
  ).getTime();
  const endTimeStamp = new Date(
    new Date(date).setHours(23, 59, 59, 999)
  ).getTime();
  const result = await returnIndentSchema
    .find(
      {
        NeededFor: {
          $gte: startTimeStamp,
          $lte: endTimeStamp,
        },
      },
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

router.post("/getReturnsByDateAndDivision", async (req, res) => {
  const { date, division } = req.body;
  const startTimeStamp = new Date(
    new Date(date).setHours(0, 0, 0, 0)
  ).getTime();
  const endTimeStamp = new Date(
    new Date(date).setHours(23, 59, 59, 999)
  ).getTime();
  console.log("uuuu", division);
  const workorders = await workorderSchema.find({
    "division.id": division,
  });
  console.log(workorders);
  if (workorders.length < 1) {
    res.status(200).json([]);
  } else {
    const workorderIds = workorders.map((workorder) => workorder._id);
    const result = await returnIndentSchema
      .find(
        {
          NeededFor: {
            $gte: startTimeStamp,
            $lte: endTimeStamp,
          },
          workorder: {
            $in: workorderIds,
          },
        },
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
  }
});

router.post("/getReturnIndentDetails", async (req, res) => {
  const { id } = req.body;
  const indent = await returnIndentSchema
    .findOne({ _id: mongoose.Types.ObjectId(id) })
    .lean();

  res.status(200).json(indent);
});

module.exports = router;
