const express = require('express');
const vision = require("@google-cloud/vision");
const cors = require("cors");

const multer = require('multer');

const path = require('path');

const app = express();

app.use('/uploads',express.static(path.join(__dirname + 'uploads')));

app.set('view engine', "ejs");

app.use(cors());

const mongoose = require('mongoose');

// mongoose.connect('mongodb://soitcoder:newton123@nodeexpressprojets.ebus4wl.mongodb.net/?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

const textSchema = new mongoose.Schema({
  extractedText: String,
});

const TextModel = mongoose.model('Text', textSchema);


const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.render('index',{data:''});
});

const CREDENTIALS = JSON.parse(
  JSON.stringify({
  "type": "service_account",
  "project_id": "assignment-409019",
  "private_key_id": "43d74cb45dfc02886226a79a2de0c6599a74ee84",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDMAKvQiCMjrqeG\nsXRucMP1kp7OT8Uibd6smVGAd3oDiIwpOS83b7Qm8luDNq4uxRuW/8STus3U5kku\noZ89dXSIBOQ18/rrDJyJQE64KrTH+xOwre6I/4xTU78eX/TTp8ENMIy/UFQRTtbQ\nSAn56z7riRwFAO/Wxq+0g9yMZMKxeoK9aTpjGGtHVXKMi4I3THDJq8aKwmoNozRh\nNEetX9sBMl+0AEz4NZh0mGiUaoG4C+8nFq4NY1BHU6gsRfjoMowiZhMTGiUuAQy9\nha1Qh26y6gM2kFB+rCJU0SVweJMVRBv0pMjCwZqg/eiBhtPkGd/A3leR8pEYV081\nr7F+Wmo7AgMBAAECggEAIA/K8Q80VptQgP7KycC3S5UrmEk5NlwGLyI5iPM+HegL\n/z6ZiSDpM2XLtCeX4Inh+C1ie8VULC21Orr0B/i5w9bg9wnNWbu1rmyI8rDjkLqJ\nMa9kWeuv5ji3RNLX65vl32jN9hNt4vp9EGcCCmFKlkIKQU8QYrT/UGOY+gesAbBz\njdcTSzZpJCHD42rvk2ytsoYHytVQoL2k15Wgy5QQlsfmvJDY2SBu3LhTO/2UQTCL\nj7guy9wsSvUHbDJHVrBvUwFvlS9xL4TO5Fx846aF5iPmQWOcOsjteR40mrTUyh7b\nx/M9BuIM/HwZZ6KAeirlO7+zole7WMr7hwFcjOo4oQKBgQDudgBTBVM812mqixVk\nLKOc56qQ4LIqI2CLD5Q44IYPTu5A4tTsoSlVOyN+Y4k3zwjO0zTo3ZEnb2e5kZKR\n+SjcxnPi5gZOZTleWBSc/6pxJ0wNuuu+dJaPjBMJUcPbxZ0uHm5JXuxwj0r/BvoN\npIDcSWCDji9hvlaEMzrfXiO0rwKBgQDbAdoDPuiQsqhGu8yJQSJJtl4CC5CC+IUh\n4bgbfuLWqTT4oQ/Nc4yC7CFOS+bAJe9sRqpufmLoV9bL4IyKmb5GyS/csx3SPKa2\n0VM1GM5v2+bSdLyW2e/8tlu+P0d4Ah18oT9rwIM/YYEOkWsRsI0yn9Tu5/D5dEp0\nEb6ZgC6eNQKBgQCOn+llvoOgmj7LEFEFD2X0jOOJr7sgVPSDeBfxROkp8s2x5Xnw\n5huwrKR4DdSemqfr/Iti1FLjQVDKvvTpdhsooVHi3i3badO8R/ZcSNaKwzRL6gbi\nbR04UlF4e30nz7RJR04zeCD22d3DV0rsKf4gw4qEZOCWF5/rhjCqNMYqZQKBgAD7\ngyTclWKAyqx2jzZWanb2MHnF34IW51H9lzvYV+AqpigvYMjFKe40bPnS8VgPU4Gi\n14TjYEI2kqobecXtZqMep+5Ph2S4DO9pBPyJ/fMWg3SSPX5Xv/HcR5EU65coO0Wh\n24z6MhyIrXGJSXes2RVPDj98HuKfmO3oXniF0K+5AoGAJDLie3Aj82pJ26Pkoebp\np3nsa/Pg2ZX60iL7IjveBfQrXmny71an7qPk/ka7ReDky05T3QwoEDSrvfQ0uwyt\n3QsagstX3Q367ypDQbzsfJIPCzzzFbAlPoJ+jBjTkMNtWDlctwl9aGHPWfsLFDhO\nUIlWqJIiQGjl78EaDI8XOjc=\n-----END PRIVATE KEY-----\n",
  "client_email": "random@assignment-409019.iam.gserviceaccount.com",
  "client_id": "114257741647138537689",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/random%40assignment-409019.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
  })
);

// Configure Google Cloud Vision API client
const client = new vision.ImageAnnotatorClient({
  credentials: {
    private_key: CREDENTIALS.private_key,
    client_email: CREDENTIALS.client_email,
  },
});

//function to parse the output
function parseExtractedText(text) {
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  const parsedData = {};

  const identificationNumberLine = lines.find(line => /^\d+/.test(line.trim()));
  if (identificationNumberLine) {
    parsedData['identification_number'] = identificationNumberLine.trim();
  }

  const nameIndex = lines.findIndex(line => line.includes('Name'));
  if (nameIndex !== -1) {
    const nameLine = lines[nameIndex];
    parsedData['name'] = nameLine.slice(nameLine.indexOf('Name') + 5).trim();
  }

  const lastNameIndex = lines.findIndex(line => line.includes('Last name'));
  if (lastNameIndex !== -1) {
    const lastNameLine = lines[lastNameIndex];
    parsedData['last_name'] = lastNameLine.slice(lastNameLine.indexOf('Last name') + 9).trim();
  }

  const dobIndex = lines.findIndex(line => line.startsWith('Date of Birth'));
  if (dobIndex !== -1) {
    const dobLine = lines[dobIndex];
    parsedData['date-of-birth'] = dobLine.slice(dobLine.indexOf('Date of Birth') + 13).trim();
  }

  const issueIndex = lines.findIndex(line => line.startsWith('วันออกบัตร'));
  if (issueIndex !== -1) {
    parsedData['date-of-issue'] = lines[issueIndex + 1].trim();
  }

  const expiryIndex = lines.findIndex(line => line.startsWith('วันบัตรหมดอายุ'));
  if (expiryIndex !== -1) {
    parsedData['date-of-expiry'] = lines[expiryIndex + 1].trim();
  }

  return parsedData;
}


app.post("/extract", upload.single('file'), async (req, res) => {
  console.log(req.file.path);
  const fileBuffer = req.file.path;
  try {
    // Use Google Cloud Vision API to perform text detection
    const [result] = await client.textDetection(fileBuffer);
    const text = result.fullTextAnnotation.text;

    // Respond with the extracted text
    // res.json({ text });
    // console.log(text)
    const parsedData = parseExtractedText(text);
    res.render('index',{data:JSON.stringify(parsedData, null, 2)})
    // res.render('index',{data:text})
    // const newText = new TextModel({ extractedText: text });
    // await newText.save();
    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

});

app.listen(27017, () => {
  console.log("App is listening on port 5000");
});
