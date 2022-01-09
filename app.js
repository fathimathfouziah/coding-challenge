var http=require('http')
var fs = require('fs');
var qs = require('querystring');

var EventEmitter=require('events')
var events=new EventEmitter()
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fathimathfouziah59@gmail.com',
    pass: ''
  },
  tls:{
      rejectUnauthorized:false,
  }
});

var mailOptions = {
  from: 'fathimathfouziah59@gmail.com',
  to: 'fathimathfouziah59@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};
var index = fs.readFileSync('index.html');
var server=http.createServer(function(req,res){
    console.log(req.method)
    if(req.method=="GET"){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
}
else if(req.method=="POST"){
    console.log(req)
    var body = ''
    req.on('data', function(data) {
        body += data
       
      })
      req.on('end', function () {
        var post = qs.parse(body);
        console.log(post['bookname'])
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    });
res.write('babujiii hello')
res.end();
}
})
