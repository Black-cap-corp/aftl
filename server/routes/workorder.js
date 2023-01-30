const mongoose = require("mongoose");
const router = require("express").Router();
const verifyAuth = require("../middleware/auth");
const workOrderModel = require("../models/workorder");
const stockSchema = require("../models/stock");
const counterSchema = require("../models/counter");
const projectShema = require("../models/project");
const IndentSchema = require("../models/indent");
const ReturnsSchema = require("../models/returnindent");
const ExcelJS = require("exceljs");

const exportData = (indents, returnIndents, stocks, workorder) => {
  const indentsId = indents.map((indent) => indent._id);

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(`${workorder?.workorder}`, {
    properties: { tabColor: { argb: "FFC000" } },
  });

  const titleRow = worksheet.addRow(["Asian Fab Tec Limited"]);
  titleRow.font = { size: 16, bold: true };

  // Blank Row
  worksheet.addRow([]);

  let projectRow = worksheet.addRow([`${workorder?.project?.name}`]);

  // Set font, size and style in title row.
  projectRow.font = { size: 14, bold: true };

  // Blank Row
  worksheet.addRow([]);

  let workOrderRow = worksheet.addRow([
    `${workorder?.workorder} work order details`,
  ]);

  // Set font, size and style in title row.
  workOrderRow.font = { size: 14, bold: true };

  // Blank Row
  worksheet.addRow([]);

  const returnIndentsIds = returnIndents.map(
    (returnIndent) => returnIndent._id
  );

  const columns = [
    {
      header: "",
      key: "no",
      width: 20,
    },
    {
      header: "",
      key: "name",
      width: 20,
    },
    {
      header: "",
      key: "code",
      width: 10,
    },
    {
      header: "",
      key: "unit",
      width: 10,
    },
  ];

  worksheet.columns = [
    ...columns,
    ...[...indentsId, ...returnIndentsIds].map((id) => {
      return {
        header: "",
        key: id.toString(),
        width: 20,
      };
    }),
  ];

  const dataRows = [];
  let vehicledataRow = { name: "Vehicle" };

  vehicledataRow = {
    ...vehicledataRow,
    ...indents.reduce((completeRow, ind) => {
      const colKey = ind._id?.toString();
      return {
        ...completeRow,
        [colKey]: ind.vehicle,
      };
    }, {}),
    ...returnIndents.reduce((completeRow, ind) => {
      const colKey = ind._id?.toString();
      return {
        ...completeRow,
        [colKey]: ind.vehicle,
      };
    }, {}),
  };

  let nameRow = { name: "Name" };

  nameRow = {
    ...nameRow,
    ...indents.reduce((completeRow, ind) => {
      const colKey = ind._id?.toString();
      return {
        ...completeRow,
        [colKey]: "Issue",
      };
    }, {}),
    ...returnIndents.reduce((completeRow, ind) => {
      const colKey = ind._id?.toString();
      return {
        ...completeRow,
        [colKey]: "Return",
      };
    }, {}),
  };

  let idRow = { name: "Indent No" };

  idRow = {
    ...idRow,
    ...indents.reduce((completeRow, ind) => {
      const colKey = ind._id?.toString();
      return {
        ...completeRow,
        [colKey]: ind?.indentNo,
      };
    }, {}),
    ...returnIndents.reduce((completeRow, ind) => {
      const colKey = ind._id?.toString();
      return {
        ...completeRow,
        [colKey]: ind?.indentNo,
      };
    }, {}),
  };

  dataRows.push(nameRow);
  dataRows.push(idRow);
  dataRows.push(vehicledataRow);

  stocks.forEach((stock, index) => {
    let stockRow = {
      no: index + 1,
      name: stock.name,
      unit: stock.unit,
      code: stock.code,
    };

    stockRow = {
      ...stockRow,
      ...indents.reduce((completeRow, ind) => {
        const colKey = ind._id?.toString();
        const selStock = ind.requestedStocks.find(
          (st) => st.stockId == stock._id.toString()
        );
        return {
          ...completeRow,
          [colKey]: selStock?.approvedQuantity || 0,
        };
      }, {}),
      ...returnIndents.reduce((completeRow, ind) => {
        const colKey = ind._id?.toString();
        const selStock = ind.returnStocks.find(
          (st) => st.stockId == stock._id.toString()
        );
        return {
          ...completeRow,
          [colKey]: selStock?.acceptedQuantity || 0,
        };
      }, {}),
    };

    dataRows.push(stockRow);
  });

  dataRows.forEach((dataRow, index) => {
    let row = worksheet.addRow(dataRow);

    row.eachCell((cell, index) => {
      cell.border = { right: { style: "thin" } };
    });
    if (index < 3) {
      row.font = { family: 4, size: 12, bold: true };

      row.eachCell((cell, index) => {
        if (index === 2) {
          cell.alignment = {
            horizontal: "right",
          };
        } else {
          cell.alignment = {
            horizontal: "center",
          };
        }

        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    } else {
      row.eachCell((cell, index) => {
        cell.alignment = {
          horizontal: "right",
        };
      });
    }
  });

  return workbook;
};

router.post("/", verifyAuth, async (req, res) => {
  const { filter } = req.body;
  let result = [];
  if (filter.subdivision == "all") {
    result = await workOrderModel.find({
      "division.id": filter.division,
      "project.id": filter.project,
    });
  } else {
    result = await workOrderModel.find({
      "division.id": filter.division,
      "project.id": filter.project,
      "subdivision.id": filter.subdivision,
    });
  }

  console.log(result);

  const result_data = result.map((work) => {
    return { ...work._doc, id: mongoose.Types.ObjectId(work._id) };
  });
  res.status(201).json(result_data);
});

router.post("/add", verifyAuth, async (req, res) => {
  let workorder = req.body;

  projectShema
    .findOne({
      _id: mongoose.Types.ObjectId(workorder.project.id),
    })
    .then((project) => {
      const division = project.divisions.find(
        (div) => div._id == workorder.division.id
      );

      counterSchema.findOneAndUpdate(
        { identifier: mongoose.Types.ObjectId(division._id) },
        { $inc: { seq: 1 } },
        { new: true },
        (error, doc) => {
          let seqId;
          if (doc == null) {
            counterSchema.create({
              identifier: division._id,
              seq: 1,
            });
            seqId = 1;
          } else {
            seqId = doc.seq;
          }

          workorder = {
            ...workorder,
            displayName: `AFTL/${division.code}/${seqId}`,
          };
          workOrderModel.create(workorder).then((result) => {
            console.log(result);
            const id = result._id.toString();
            console.log(id);
            res.status(201).json({ ...result, id: String(id) });
          });
        }
      );
    });
});

router.post("/update", verifyAuth, async (req, res) => {
  const workorder = req.body;
  console.log(workorder);
  const result = await workOrderModel.updateOne(
    { _id: mongoose.Types.ObjectId(workorder.id) },
    { $set: workorder }
  );

  if (result.acknowledged) {
    res.status(201).json({ status: "success", message: "updated success" });
  } else {
    res.status(400).json({ status: "error", message: "error updating" });
  }
});

router.post("/delete", verifyAuth, async (req, res) => {
  const { id } = req.body;
  const result = await workOrderModel.deleteOne({ _id: id });
  if (result.acknowledged) {
    res.status(201).json({ status: "success", message: "Delete success" });
  } else {
    res.status(400).json({ status: "error", message: "error updating" });
  }
});

router.post("/getWorkorderByQuery", async (req, res) => {
  const { filter } = req.body;
  const result = await workOrderModel.find(
    { displayName: { $regex: filter, $options: "i" }, status: "open" },
    { _id: 1, displayName: 1, contractors: 1, stocks: 1 }
  );
  res.status(200).json(result);
});

router.post("/getStocksForOrder", async (req, res) => {
  const { workorderId } = req.body;
  const workorder = await workOrderModel.findOne(
    { _id: workorderId },
    { stocks: 1 }
  );

  const stocksArray = workorder?.stocks?.map((stock) => stock.stockId);

  const stocksResult = await stockSchema.find({ _id: { $in: stocksArray } });
  const result = stocksResult.map((stock) => {
    const stockQuantity = workorder.stocks.find(
      (wStock) => wStock.stockId == stock._id
    ).stock;
    return { ...stock._doc, stock: stockQuantity };
  });

  res.status(200).json(result);
});

router.post("/getWorkorderDetails", async (req, res) => {
  const { id } = req.body;
  const result = await workOrderModel
    .findOne(
      { _id: mongoose.Types.ObjectId(id) },
      { stocks: 0, contractors: 0 }
    )
    .lean();

  res.status(200).json(result);
});

router.post("/getReport", async (req, response) => {
  const { workorder, contractor } = req.body;
  let indents = [];
  if (contractor == "all") {
    indents = await IndentSchema.find({ workorder: workorder._id });
  } else {
    indents = await IndentSchema.find({
      workorder: workorder._id,
      contractor: contractor,
    });
  }
  const indentsId = indents.map((indent) => indent._id);

  if (indents.length > 0) {
    ReturnsSchema.find({ indentId: { $in: indentsId } }).then(
      (returnIndents) => {
        stockSchema.find().then((stocks) => {
          const workbook = exportData(
            indents,
            returnIndents,
            stocks,
            workorder
          );
          const dataCell = response.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          );
          response.setHeader(
            "Content-Disposition",
            "attachment; filename=" + `${workorder?.workorder}.xlsx`
          );
          return workbook.xlsx.write(response).then(function () {
            response.status(200).end();
          });
        });
      }
    );
  }
});

module.exports = router;
