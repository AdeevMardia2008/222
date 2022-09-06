const express = require("express");
const app = express();
const server = require("http").Server(app);
app.use(express.json())

var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'adeevmardia@gmail.com',
        pass: 'dpwnkeequlxjybfr',
    },
    secure: true,
});

app.post("/send-mail", (req, res) => {
    const to = req.body.to;
    const name = req.body.name;
    const amount = req.body.amount;
    const date = req.body.date;
    const mailData = {
        from: "",
        to: to,
        subject: prompt("Enter the subject of the email:"),
        html: `hey there! checking this out`
    };
    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Invitation sent!", message_id: info.messageId });
    });
})

server.listen(process.env.PORT || 3030);