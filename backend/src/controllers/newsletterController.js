import Newsletter from "../models/Newsletter.js";
import { sendMail } from "../services/mailService.js";

export const subscribeNewsletter = async (req, res) => {
  try {
    await Newsletter.create(req.body);

    await sendMail(
      process.env.EMAIL_USER,
      "New Newsletter Subscriber",
      `<p>${req.body.email} wants updates.</p>`
    );

    res.json({ success: true, message: "Subscribed!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
