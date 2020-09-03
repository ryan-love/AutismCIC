var express = require('express');
var router = express.Router();
var fs = require("fs")
var Document = require("docx").Document
var Packer = require("docx").Packer
var Paragraph = require("docx").Paragraph
var TextRun  = require("docx").TextRun

/* GET home page. */
router.get('/', function(req, res, next) {



// Create document
  const doc = new Document();

// Documents contain sections, you can have multiple sections per document, go here to learn more about sections
// This simple example will only contain one section
  doc.addSection({
    properties: {},
    children: [
      new Paragraph({
        children: [
          new TextRun("Hello World"),
          new TextRun({
            text: "Foo Bar",
            bold: true,
          }),
          new TextRun({
            text: "\tGithub is the best",
            bold: true,
          }),
        ],
      }),
    ],
  });

// Used to export the file into a .docx file
  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
  });
  res.render('index', { title: 'Express' });
});


module.exports = router;
