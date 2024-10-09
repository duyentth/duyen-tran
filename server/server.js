import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
const app = express();
const PORT = process.env.PORT || 8080;
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import job from "./cron";

dotenv.config();
job.start();
//mail transporter
const sender = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.APP_PASS,
  },
});

//multer upload
const storage = multer.diskStorage({
  //using this destination if you run the server with node
  // destination: function (req, file, cb) {
  //   cb(null, "my-upload");
  // },

  //using this destination if you run the application with docker
  destination: function (req, file, cb) {
    cb(null, "/app/server/my-upload");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);
const uploadDir = path.join(__dirname, "my-upload");

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
console.log("upload directory: ", uploadDir);
app.use("/my-upload", express.static(uploadDir));

app.use(express.json());

app.use(
  cors({
    origin: [`${process.env.REACT_APP_LOCAL}`, `${process.env.REACT_APP_URL}`],
  })
);

app.get("/", (req, res) => res.send({ status: "200", message: "OK" }));

app.post("/send-email", upload.array("files"), (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log(name, email, subject, message);
  console.log("files", req.files);
  const files = req.files;
  let mailOptions = {
    from: email,
    to: "dntranth27@gmail.com, duyen.th.tran@gmail.com",
    subject: subject,
    html: `<h1>This message comes from the portfolio website</h1>
            <p>Email: ${email}</p> 
            <p>Name: ${name}</p>
            <p>Subject: ${subject}</p>
            <p>Message: ${message}</p>`,
    attachments: files
      ? files.map((file) => ({
          filename: file.filename,
          path: file.path,
        }))
      : [],
  };

  //sending email
  sender.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send({ status: 400, message: error.message });
    } else {
      res.send({
        status: 200,
        message: `Email sent successfully.
                  Thank you for your considering. I'll get back to you soon. `,
      });
    }
  });
});

app.listen(PORT, () => console.log(`server's listenning on port ${PORT}...`));
