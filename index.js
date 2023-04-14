import express from 'express'
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/send', (req, res) => {
  res.send("smtp working")
});


app.post('/post', (req, res) =>{
    const { nameSurname,Country,email } = req.body
    console.log(req.body)
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.PASS  // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
    });
  
  //   // setup email data with unicode symbols
    let mailOptions = {
        from: '"Metatesk Contact" <enteskedu2020@gmail.com>', // sender address
        to:  'samedovrasul7@gmail.com', // list of receivers 'shahin@enteskedu.com'
        subject: 'email node.js', // Subject line
        text: 'Hello world?', // plain text body
        html: `
        <ul>
          <li> name surname :${nameSurname}</li>
          <li> email:${email}</li>
          <li> Country:${Country}</li>
        </ul>
        ` // html body
    };
  
  //   // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId); 

        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.send("send message")
        res.status(404).json({error})
        res.status(200).json({output})
        res.send({error})
        res.status(200).json({})
    });

})








const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>console.log(`server start at ${PORT}`))