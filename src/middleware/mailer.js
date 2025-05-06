const nodemailer = require("nodemailer");

const generateMailer = () => {
    let transporter, name, email;

    const mailer = {
        build: (transport, inputName) => {
            transporter = nodemailer.createTransport(transport);
            name = inputName;
            email = transport.auth.user;
        },
        sendEmail: async (to, subject, text, html) => {
            const result = await transporter.sendMail({
                from: name + " <" + email + ">",
                to: to,
                subject: subject,
                text: text,
                html: html
            }).catch(e => console.log(e));
            
            return result.rejected.length === 0;
        }
    };

    return mailer;
};

module.exports = generateMailer;