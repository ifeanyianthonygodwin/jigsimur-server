import nodemailer from "nodemailer"
import dotenv from "dotenv"


dotenv.config()
export const mailsending = async (req, res) => {
    const { name, email, phone, username, bankName, accountNumber } = req.body;

     // Create a transporter

     const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: process.env.EMAILUSERNAME, // replace with your Gmail
          pass: process.env.EMAILPASSWORD, // use App Password (not your real password)
        },
      });

      // Define the email options
      const mailOptions = {
        from: `"Affiliate Signup" <${process.env.EMAILUSERNAME}>`, // ✅ corrected
        to: process.env.EMAILUSERNAME, 
        subject: "New Affiliate Signup",
        html: `
          <h3>New Affiliate Details</h3>
          <p><strong>Full Name:</strong> ${name}</p>
          <p><strong>Username:</strong> ${username}</p>
          <p><strong>Phone Number:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Bank Name:</strong> ${bankName}</p>
          <p><strong>Account No:</strong> ${accountNumber}</p>
        `,
      };

      // Send the email

      try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully" });
      } catch (error) {
        console.error("Error sending mail:", error);
        res.status(500).json({ message: "Email failed to send" });
      }
}