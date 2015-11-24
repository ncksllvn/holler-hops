var postmark = require('postmark')(process.env.POSTMARK_API_TOKEN)

module.exports = (data, callback) => {
  
  var body = `
    Name: ${data.name}\n
    Email: ${data.email}\n
    Phone: ${data.phone}\n
    Message: ${data.message}`
  
  postmark.send({
      'From': 'noreply@hollerhops.com',
      'To': 'ncksllvn@gmail.com',
      'Subject': 'You have a new message',
      'TextBody': body,
      'Tag': 'hollerhops'
  }, callback);
  
}

