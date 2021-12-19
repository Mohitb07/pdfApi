const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");

// IF ENV VARIABLE CALLED PORT IS DEFINED THEN USE IT ELSE USE THE PORT 3000
const PORT = process.env.PORT || 3000;

// MIDDLEWARE USED FOR HANDLING THE INCOMING REQUEST OBJECT AS JSON OBJECT (because we are using post method)
app.use(express.json());

// POST HTTP METHOD USED FOR TAKING THE USER'S INPUT(dynamic file name)
app.post("/api/getFile", (req, res) => {
  // EXCTRACTING THE USER DATA SENT TO US FROM REQUEST OBJECT
  const { fileName } = req.body;

  // ACCESSING THE PDF FILES DIRECTORY
  const filesDirectory = path.join(__dirname, "/assets");

  // ACCESSING THE FILE BASED ON THE USER's QUERY
  const filePath = filesDirectory + `/${fileName}.pdf`;

  // CHECKING IF THE FILE IS PRESENT IN THE DIRECTORY
  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, (err, data) => {
      if (err)
        res.status(500).send({
          message: `Cannot read the file ${fileName}.pdf, please try again later`,
        });
      else {
        res.contentType("application/pdf");
        res.send(data);
      }
    });
  } else {
    res.status(404).send({
      message: `File name ${fileName}.pdf not found`,
    });
  }
});

app.listen(PORT, () => {
  console.log(`SERVER IS UP AT localhost:${PORT}`);
});
