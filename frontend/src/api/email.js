// // import Nodemailer from 'nodemailer'

// const transporter = Nodemailer.createTransport({
//   host: 'gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     // TODO: replace `user` and `pass` values from <https://forwardemail.net>
//     user: process.env.REACT_APP_EMAIL,
//     pass: process.env.REACT_APP_EMAIL_PASSWORD,
//   },
// })

// export const sendEmail = async () => {
//   let message = {
//     from: 'sender@server.com',
//     to: 'ng.d.phuongnghi@gmail.com',
//     subject: 'Message title',
//     text: 'Plaintext version of the message',
//     html: '<p>HTML version of the message</p>',
//   }

//   await transporter.sendMail(message)
// }
