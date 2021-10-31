const nodemailer = require('nodemailer');

module.exports = class SendMail {
    sendMail(toEmail, subject, template) {
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
            html: template
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return false;
            } else {
                return true;
            }
        });
    }
}