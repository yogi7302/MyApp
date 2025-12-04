import Order from "../models/Order.js";
import { sendMail } from "../services/mailService.js";

export const placeOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);

    // Email to customer
    await sendMail(
      req.body.email,
      "Order Confirmation",
      `<p>Hi ${req.body.name},</p><p>Your order was placed successfully!</p>`
    );

    // Email to you
    await sendMail(
      process.env.EMAIL_USER,
      "New Order Received",
      `<pre>${JSON.stringify(req.body, null, 2)}</pre>`
    );

    res.status(201).json({ success: true, message: "Order placed!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
