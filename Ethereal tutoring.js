// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        ethereal: {
          light: '#e0f7fa',
          medium: '#80deea',
          dark: '#26c6da',
        },
      },
    },
  },
};
<><div className="bg-gradient-to-br from-ethereal-light via-ethereal-medium to-ethereal-dark min-h-screen transition-all duration-700">
    {/* Content */}
</div><button className="bg-ethereal-dark text-white px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300">
        Start Session
    </button></>

    const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

const sessionSchema = new mongoose.Schema({
  studentId: String,
  tutorId: String,
  subject: String,
  scheduledTime: Date,
  status: String,
});
io.on('connection', socket => {
  socket.on('joinRoom', ({ sessionId }) => {
    socket.join(sessionId);
  });

  socket.on('sendMessage', ({ sessionId, message }) => {
    io.to(sessionId).emit('receiveMessage', message);
  });
});
const stripe = require('stripe')(process.env.STRIPE_SECRET);
app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'zar',
        product_data: { name: 'Ethereal Tutoring Subscription' },
        unit_amount: 50000,
      },
      quantity: 1,
    }],
    mode: 'subscription',
    success_url: 'https://ethereal-tutoring.com/success',
    cancel_url: 'https://ethereal-tutoring.com/cancel',
  });
  res.json({ id: session.id });
});

import React from 'react';

const SubscriptionCard = () => {
  return (
    <div className="bg-gradient-to-br from-blue-100 via-purple-200 to-indigo-300 p-6 rounded-xl shadow-lg text-center">
      <h2 className="text-2xl font-semibold mb-4 text-white">Subscribe to Ethereal Tutoring</h2>
      <p className="text-white mb-6">Access all tutoring features for just R500/month.</p>
      <a
        href="https://pay.yoco.com/ethereal-tutoring-monthly"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full transition duration-300"
      >
        Subscribe Now
      </a>
    </div>
  );
};

export default SubscriptionCard;
const nodemailer = require('nodemailer');

const sendReminder = async (email) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-app-password',
    },
  });

  const mailOptions = {
    from: 'Ethereal Tutoring <your-email@gmail.com>',
    to: email,
    subject: 'Monthly Subscription Reminder',
    html: `
      <h3>Hi there!</h3>
      <p>Your Ethereal Tutoring subscription is due. Click below to renew:</p>
      <a href="https://pay.yoco.com/ethereal-tutoring-monthly">Renew Subscription</a>
    `,
  };

  await transporter.sendMail(mailOptions);
};