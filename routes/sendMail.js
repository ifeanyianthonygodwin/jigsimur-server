const router = require("express").Router()
const nodemailer = require("nodemailer")

router.post('/api/send-email', async (req, res) => {
    const {username,
    firstName,
    lastName,
    email,
    phone,
    Account_Name,
    Bank_Name,
    Account_Number} = req.body
    // res.json(req.body)
    // console.log(req.body);

    // create an SMTP transporter

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: "587",
        secure: false,
        auth: {
            user: "ewotap@gmail.com",
            pass: "hkiontvyfulfbaxk"
        }
    });

    // Compose email

    const mailOption = {
        from: {
            name: "jigsimur destributors",
            address: email
        },
        to: "ewotap@gmail.com",
        subject: "NEW JIGSIMUR DISTRIBUTOR",
        text: `username: ${username}\nfirstName: ${firstName}\nlastName: ${lastName}\nEmail: ${email}\nPhone_Number: ${phone}\nAccount_Name: ${Account_Name}\nBank_Name: ${Bank_Name}\nAccount_Number: ${Account_Number}\n`,
    }

    const sendMail = async () => {
        try{
            await transporter.sendMail(mailOption)
            console.log("Email has been sent");
        } catch (error) {
            console.log(error)
        }
    }

    sendMail(transporter, mailOption)
})


module.exports = router