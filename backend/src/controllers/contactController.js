import Contact from "../models/Contact.js";
import { sendMail } from "../services/mailService.js";

export const sendContactMessage = async (req, res) => {
  try {
    await Contact.create(req.body);

    await sendMail(
      process.env.EMAIL_USER,
      "New Contact Form Message",
      `<pre>${JSON.stringify(req.body, null, 2)}</pre>`
    );

    res.json({ success: true, message: "Message sent!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
