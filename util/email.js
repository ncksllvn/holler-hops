var nodemailer = require('nodemailer')
var mg = require('nodemailer-mailgun-transport')
var sendToEmail = process.env.SEND_TO_EMAIL
//var email = process.env.EMAIL_ADDRESS
//var password = process.env.EMAIL_ADDRESS_PASSWORD
var apiKey = process.env.MAILGUN_API_KEY
var transporter
var auth = {
  auth: {
    api_key: apiKey,
    domain: 'hollerhops.com'
  }
}

if (apiKey)
{
  transporter = nodemailer.createTransport(mg(auth));
}
else
{
  transporter = {
    sendMail(options, callback){
      setTimeout(callback, 300, null, { message: 'In development mode - no email was sent.'})
    }
  }
}

module.exports = (data, callback) => {

  var html = `
      <table>
      <tr>
        <td<label>Name:</label></td><td>${data.name}</td>
      </tr>
      <tr>
        <td><label>Email:</label></td><td>${data.email}</td>
      </tr>
      <tr>
        <td><label>Phone:</label></td><td>${data.phone}</td>
      </tr>
      <tr>
      <td><label>Message:</label></td><td>${data.message}</td>
    </table>`

  var text = `
    Name: ${data.name}\n
    Email: ${data.email}\n
    Phone: ${data.phone}\n
    Message: ${data.message}`

  var mailOptions = {
      from: 'Holler Hops <donotreply@hollerhops.com>', // sender address
      to: sendToEmail, // list of receivers
      subject: 'You have a new message', // Subject line
      text: text,
      html: html
  }

  console.log('Sending mail - ' + text)

  transporter.sendMail(mailOptions, callback)

}

