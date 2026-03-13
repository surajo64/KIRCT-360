import React, { useState } from "react";
import emailjs from "emailjs-com";
import mail_icon from "../assets/mail-icon.png";
import phone_icon from "../assets/phone-icon.png";
import location_icon from "../assets/location-icon.png";
import { toast } from "react-toastify";
import LoadingOverlay from "../components/loadingOverlay.jsx";

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const sendEmail = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  // ✅ Replace these with your real EmailJS values
  const SERVICE_ID = "service_o3huyxm";
  const TEMPLATE_ID_CONTACT = "template_cd5cx4j";
  const TEMPLATE_ID_REPLY = "template_t5b7fbi";
  const PUBLIC_KEY = "fvt8PGB5hN7pa2C2t";

  try {
    // 1️⃣ Send message to KIRCT
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID_CONTACT,
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: "info@kirct.com",
      },
      PUBLIC_KEY
    );

    // 2️⃣ Send auto-reply to user
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID_REPLY,
      {
        to_name: formData.name,
        to_email: formData.email,
      },
      PUBLIC_KEY
    );

    toast.success("✅ Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  } catch (error) {
    console.error("Email send error:", error);
    toast.error("⚠️ Failed to send message. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 tracking-wide">
          CONTACT <span className="text-blue-700">US</span>
          <span className="text-red-600">.</span>
        </h2>
        <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-4 rounded-full"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We’d love to hear from you! Reach out to KIRCT for inquiries,
          partnerships, or support. Our team is always ready to assist.
        </p>
      </div>

      {/* Layout */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-10">
        {/* Left Side */}
        <div className="bg-white shadow-xl rounded-2xl p-8 md:w-1/2 border border-gray-100">
          <h3 className="text-2xl font-semibold text-blue-800 mb-6">
            Get in Touch
          </h3>
          <div className="space-y-5 text-gray-700">
            <p className="flex items-center gap-3">
              <img className="w-6" src={mail_icon} alt="Email" />
              <span className="font-medium">info@kirct.com</span>
            </p>
            <p className="flex items-center gap-3">
              <img className="w-6" src={phone_icon} alt="Phone" />
              <span className="font-medium">+234–90-3626-4188</span>
            </p>
            <p className="flex items-center gap-3">
              <img className="w-6" src={location_icon} alt="Location" />
              <span className="font-medium">
                Km 1 Kwanar Dawaki, Off Kano-Kaduna Express Way, Kano
              </span>
            </p>
          </div>
          <div className="mt-8 border-t pt-4 text-gray-500 text-sm">
            <p>
              Office Hours: <strong>Mon – Fri, 8:00 AM – 5:00 PM</strong>
            </p>
            <p>Follow us on social media for latest updates.</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white shadow-xl rounded-2xl p-8 md:w-1/2 border border-gray-100">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">
            Send Us a Message
          </h3>

          <form onSubmit={sendEmail} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      {isLoading && <LoadingOverlay />}
    </div>
  );
};

export default ContactForm;
