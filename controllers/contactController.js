import nodemailer from "nodemailer";

const mainEmail = process.env.EMAIL;
const password = process.env.PASS;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: mainEmail,
    pass: password,
  },
});
export const contact = (req, res) => {
  const { fullName, email, message, type } = req.body;

  const mailOptions = {
    from: mainEmail,
    to: "ceyhunresulov23@gmail.com",
    subject: "Client Message",
    html: `
    <ul>
    <li>Client: ${fullName}</li>
    <li>Type: ${type}</li>
    <li>Message: ${message}</li>
    <li>Email: ${email}</li>
  </ul>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send("Email sent successfully");
    }
  });
};
