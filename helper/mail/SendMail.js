const nodemailer = require('nodemailer');

module.exports = class SendMail {
    sendMail(toEmail, subject, text){
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'shaad036@gmail.com',
                pass: 'vlzwoybiellwqveb'
            }
        });

        let mailOptions = {
            from: 'shaad036@gmail.com',
            to: toEmail,
            subject: subject,
            text: text
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return false;
            } else {
                return true;
            }
        });
    }
}