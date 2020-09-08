var express = require('express');
var router = express.Router();
var docx = require("docx")
var fs = require("fs")
var crypto = require("crypto")
var OCR = require("tesseract.js")

router.post("/", (req,res)=>{
 OCR.recognize(
      `${req.body.files}`,
      'eng',
      { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
   console.log(text + req.body.files)

   console.log(text.split("\n"))
   const doc = new docx.Document();
   if (text.split("\n").includes("Day 1")) {
     if(text.match(/[0-9]{1,2}\.[0-9]{2}am|[0-9]{1,2}\.[0-9]{2}pm/g)) {
       console.log(text.match(/[0-9]{1,2}\.[0-9]{2}am|[0-9]{1,2}\.[0-9]{2}pm/g))

       var l = text.match(/Day 1/g)
       var clock = text.match(/[0-9]{1,2}\.[0-9]{2}am|[0-9]{1,2}\.[0-9]{2}pm/g)
       var line = text.split("\n")
       var time = []
       time.push(text.split(`End of Day${/[0-9]/g}`))
       time.pop()
       line.join().split(/End of Day [0-9]/g).pop()
       var act = line.join().split(/End of Day [0-9]/g).shift().split(/[0-9]{1,2}\.[0-9]{2}am|[0-9]{1,2}\.[0-9]{2}pm/g).splice(1,4)


       function base64_encode(file) {
         // read binary data
         var bitmap = fs.readFileSync(file);
         // convert binary data to base64 encoded string
         return new Buffer(bitmap).toString('base64');
       }

       var base64str = base64_encode('photo.jpg');
       var base64 = base64_encode('ocr.png');

       const image = docx.Media.addImage(doc,base64str, 100, 100)
       const image2 = docx.Media.addImage(doc,base64, 100, 100)
       var times = text.match(/[0-9]{1,2}\.[0-9]{2}am|[0-9]{1,2}\.[0-9]{2}pm/g).map(value => {
         return value
       })



      var row = []
       for (let i = 0; i < act.length ; i++) {
         for (let j = 0; j < act[i].split(",").length ; j++) {
           console.log(clock[i] + act[i].split(",")[j])

           row.push(new docx.TableRow({
             children: [
               new docx.TableCell({
                 children: [new docx.Paragraph({
                   children: [times[i].match("11.00am") ? image2 : times[i].match("12.00pm") ? image : false , new docx.TextRun({
                     text: times[i],
                     bold: true,
                     font: "Tahoma",
                   })]
                 })],
               }),
               new docx.TableCell({
                 children: [new docx.Paragraph({
                   children: [act[i].split(",")[j].match("Andrew arrives") ? image : act[i].split(",")[j].match("Handover of document and products") ?  image2 : false  , new docx.TextRun({
                     text: act[i].split(",")[j],
                     bold: true,
                     font: "Tahoma",
                   })]
                 })],
               }),
               new docx.TableCell({
                 children: [new docx.Paragraph(image)],

               }),
             ],
           }))
         }
       }
       console.log(row)






       const table = new docx.Table({

         rows:
           row

       });


       doc.addSection({
         children: [new docx.Paragraph({
           heading: docx.HeadingLevel.HEADING_1,
           text: "Visual Aid" // req.body.docTitle
         }), new docx.Paragraph({text: `${l[0].toString()}`}), table],
       });

       }
     }


   if (text.split("\n").includes("Day 2")) {

     if(text.match(/[0-9]{1,2}\.[0-9]{2}am|[0-9]{1,2}\.[0-9]{2}pm/g)) {
       console.log(text.match(/[0-9]{1,2}\.[0-9]{2}am|[0-9]{1,2}\.[0-9]{2}pm/g))

       var l = text.match(/Day 2/g)
       var clock = text.match(/[0-9]{1,2}\.[0-9]{2}am|[0-9]{1,2}\.[0-9]{2}pm/g)
       var line = text.split("\n")
       var time = []
       time.push(text.split(`End of Day${/[0-9]/g}`))
       time.pop()
       line.join().split(/End of Day [0-9]/g).pop()
       var act = line.join().split(/End of Day [0-9]/g).shift().split(/[0-9]{1,2}\.[0-9]{2}am|[0-9]{1,2}\.[0-9]{2}pm/g).splice(1,4).filter(item => {return item})


       function base64_encode(file) {
         // read binary data
         var bitmap = fs.readFileSync(file);
         // convert binary data to base64 encoded string
         return new Buffer(bitmap).toString('base64');
       }

       var base64str = base64_encode('photo.jpg');
       var base64 = base64_encode('ocr.png');

       const image = docx.Media.addImage(doc,base64str, 100, 100)
       const image2 = docx.Media.addImage(doc,base64, 100, 100)
       var times = text.match(/[0-9]{1,2}\.[0-9]{2}am|[0-9]{1,2}\.[0-9]{2}pm/g).map(value => {
         return value
       })



       var row = []
       for (let i = 0; i < act.length ; i++) {
         for (let j = 0; j < act[i].split(",").length ; j++) {
           if (act[i].split(",")[j] === "" ) {
             console.log(true+ act[i].split(",")[j])
           } else {
             console.log(false + act[i].split(",")[j])
           }

           row.push(new docx.TableRow({
             children: [
               new docx.TableCell({
                 children: [new docx.Paragraph({
                   children: [times[i].match("11.00am") ? image2 : times[i].match("12.00pm") ? image : false , new docx.TextRun({
                     text: times[i],
                     bold: true,
                     font: "Tahoma",
                   })]
                 })],
               }),
               new docx.TableCell({
                 children: [new docx.Paragraph({
                   children: [act[i].split(",")[j].match("Andrew arrives") ? image : act[i].split(",")[j].match("Handover of document and products") ?  image2 : false  , new docx.TextRun({
                     text: act[i].split(",")[j],
                     bold: true,
                     font: "Tahoma",
                   })]
                 })],
               }),
               new docx.TableCell({
                 children: [new docx.Paragraph(image)],

               }),
             ],
           }))
         }
       }
       console.log(row)

       const table = new docx.Table({
         rows:
         row
       });

       doc.addSection({
         children: [new docx.Paragraph({
           heading: docx.HeadingLevel.HEADING_1,
           text: "Visual Aid" // req.body.docTitle
         }), new docx.Paragraph({text: `${l[0].toString()}`}), table],
       });

     }


 }
   if (text.split("\n").includes("Day 3")) {

     var l = text.match(/Day 2/g)
     const image = docx.Media.addImage(doc, fs.readFileSync("C:\\Users\\Ryan Love\\WebstormProjects\\AutismCIC\\ocr.png"), 100, 100);


     const table = new docx.Table({
       rows: [
         new docx.TableRow({

           children: [
             new docx.TableCell({
               width: {size: 100 / 3, type: docx.WidthType.PERCENTAGE},
               children: [
                 new docx.Paragraph({
                   children: [
                     new docx.TextRun({
                       text: "Time",
                       bold: true,
                       font: "Tahoma",
                     })
                   ],
                   alignment: docx.AlignmentType.CENTER,
                 })
               ],

             }),
             new docx.TableCell({
               width: {size: 100 / 3, type: docx.WidthType.PERCENTAGE},
               children: [new docx.Paragraph({
                 children: [
                   new docx.TextRun({
                     text: "Activity",
                     bold: true,
                     font: "Tahoma",
                   })
                 ],
                 alignment: docx.AlignmentType.CENTER,
               })],
             }),
             new docx.TableCell({
               width: {size: 100 / 3, type: docx.WidthType.PERCENTAGE},
               children: [new docx.Paragraph({
                 children: [
                   new docx.TextRun({
                     text: "Place",
                     bold: true,
                     font: "Tahoma",
                   })
                 ],
                 alignment: docx.AlignmentType.CENTER,
               })],

             }),
           ],
         }),
         new docx.TableRow({
           children: [
             new docx.TableCell({
               children: [new docx.Paragraph({
                 children: [image, new docx.TextRun({
                   text: l.toString(),
                   bold: true,
                   font: "Tahoma",
                 })]
               })],

             }),
             new docx.TableCell({
               children: [new docx.Paragraph(image)],

             }),
             new docx.TableCell({
               children: [new docx.Paragraph(image)],

             }),
           ],
         }),
       ],
     });

     doc.addSection({
       children: [new docx.Paragraph({
         heading: docx.HeadingLevel.HEADING_1,
         text: "Visual Aid"
       }), new docx.Paragraph({text: `Date:${Date.now()}`}), table],
     });
   }
   if (text.split("\n").includes("Day 4")) {

     var l = text.match(/Day 2/g)
     const image = docx.Media.addImage(doc, fs.readFileSync("C:\\Users\\Ryan Love\\WebstormProjects\\AutismCIC\\ocr.png"), 100, 100);


     const table = new docx.Table({
       rows: [
         new docx.TableRow({

           children: [
             new docx.TableCell({
               width: {size: 100 / 3, type: docx.WidthType.PERCENTAGE},
               children: [
                 new docx.Paragraph({
                   children: [
                     new docx.TextRun({
                       text: "Time",
                       bold: true,
                       font: "Tahoma",
                     })
                   ],
                   alignment: docx.AlignmentType.CENTER,
                 })
               ],

             }),
             new docx.TableCell({
               width: {size: 100 / 3, type: docx.WidthType.PERCENTAGE},
               children: [new docx.Paragraph({
                 children: [
                   new docx.TextRun({
                     text: "Activity",
                     bold: true,
                     font: "Tahoma",
                   })
                 ],
                 alignment: docx.AlignmentType.CENTER,
               })],
             }),
             new docx.TableCell({
               width: {size: 100 / 3, type: docx.WidthType.PERCENTAGE},
               children: [new docx.Paragraph({
                 children: [
                   new docx.TextRun({
                     text: "Place",
                     bold: true,
                     font: "Tahoma",
                   })
                 ],
                 alignment: docx.AlignmentType.CENTER,
               })],

             }),
           ],
         }),
         new docx.TableRow({
           children: [
             new docx.TableCell({
               children: [new docx.Paragraph({
                 children: [image, new docx.TextRun({
                   text: l.toString(),
                   bold: true,
                   font: "Tahoma",
                 })]
               })],

             }),
             new docx.TableCell({
               children: [new docx.Paragraph(image)],

             }),
             new docx.TableCell({
               children: [new docx.Paragraph(image)],

             }),
           ],
         }),
       ],
     });

     doc.addSection({
       children: [new docx.Paragraph({
         heading: docx.HeadingLevel.HEADING_1,
         text: "Visual Aid"
       }), new docx.Paragraph({text: `Date:${Date.now()}`}), table],
     });
   }
   if (text.split("\n").includes("Day 5")) {

     var l = text.match(/Day 2/g)
     const image = docx.Media.addImage(doc, fs.readFileSync("C:\\Users\\Ryan Love\\WebstormProjects\\AutismCIC\\ocr.png"), 100, 100);


     const table = new docx.Table({
       rows: [
         new docx.TableRow({

           children: [
             new docx.TableCell({
               width: {size: 100 / 3, type: docx.WidthType.PERCENTAGE},
               children: [
                 new docx.Paragraph({
                   children: [
                     new docx.TextRun({
                       text: "Time",
                       bold: true,
                       font: "Tahoma",
                     })
                   ],
                   alignment: docx.AlignmentType.CENTER,
                 })
               ],

             }),
             new docx.TableCell({
               width: {size: 100 / 3, type: docx.WidthType.PERCENTAGE},
               children: [new docx.Paragraph({
                 children: [
                   new docx.TextRun({
                     text: "Activity",
                     bold: true,
                     font: "Tahoma",
                   })
                 ],
                 alignment: docx.AlignmentType.CENTER,
               })],
             }),
             new docx.TableCell({
               width: {size: 100 / 3, type: docx.WidthType.PERCENTAGE},
               children: [new docx.Paragraph({
                 children: [
                   new docx.TextRun({
                     text: "Place",
                     bold: true,
                     font: "Tahoma",
                   })
                 ],
                 alignment: docx.AlignmentType.CENTER,
               })],

             }),
           ],
         }),
         new docx.TableRow({
           children: [
             new docx.TableCell({
               children: [new docx.Paragraph({
                 children: [image, new docx.TextRun({
                   text: l.toString(),
                   bold: true,
                   font: "Tahoma",
                 })]
               })],

             }),
             new docx.TableCell({
               children: [new docx.Paragraph(image)],

             }),
             new docx.TableCell({
               children: [new docx.Paragraph(image)],

             }),
           ],
         }),
       ],
     });

     doc.addSection({
       children: [new docx.Paragraph({
         heading: docx.HeadingLevel.HEADING_1,
         text: "Visual Aid"
       }), new docx.Paragraph({text: `Date:${Date.now()}`}), table],
     });
   }

   docx.Packer.toBuffer(doc).then((buffer) => {
     fs.writeFileSync(`My Document${Math.random()}.docx`, buffer);
     res.json("DONE")
   });

})
})
/* GET users listing. */
router.get('/', function(req, res, next) {
res.render("doc")

});

module.exports = router;
