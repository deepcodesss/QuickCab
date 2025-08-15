import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const HelpPage = () => {
  return (<div>
    <Navbar />
    <div className="bg-gray-100 min-h-screen p-6">
        
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-10">
        <h1 className="text-3xl font-bold text-black mb-6">🚕 QuickCab Help Center</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">💡 Frequently Asked Questions</h2>

          <ul className="space-y-5 text-gray-700">
            <li>
              <strong>1. How do I book a ride on QuickCab?</strong><br />
              Enter your pickup and destination addresses, then click "Find Trip" to book.
            </li>
            <li>
              <strong>2. How can I contact my driver?</strong><br />
              After booking, you’ll see your driver’s name, vehicle, and phone number on the Rider Page.
            </li>
            <li>
              <strong>3. What should I do if my driver is late or not moving?</strong><br />
              Wait a few minutes. If the issue persists, cancel the ride and rebook.
            </li>

            <li>
              <strong>4. How can I cancel my ride?</strong><br />
              Go to the Rider Page and click "Cancel Ride" before the ride starts.
            </li>
            <li>
              <strong>5. How is the fare calculated?</strong><br />
              Fare is based on distance, estimated time, traffic, and base fare.
            </li>
            <li>
              <strong>6. Can I schedule a ride in advance?</strong><br />
              Not yet — we’re working on this feature!
            </li>
            <li>
              <strong>7. How do I report a lost item?</strong><br />
              Visit your Ride History and click "Report Lost Item", or contact your driver directly.
            </li>
            <li>
              <strong>8. What if I face safety issues during the ride?</strong><br />
              Tap the Emergency button on the Rider Page to alert our support team immediately.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">🛟 Need More Help?</h2>
          <p className="text-gray-700 mb-2">If your issue isn’t listed above, we’re here to assist you.</p>
          <ul className="text-gray-700 space-y-2">
            <li>📞 <strong>24/7 Support:</strong> +91-9696026254</li>
            <li>📧 <strong>Email:</strong>quickcabrides@gmail.com</li>
            <li>📍 <strong>Office Hours:</strong> Mon–Sat, 9:00 AM – 8:00 PM IST</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📲 Useful Links</h2>
          <ul className="text-blue-600 underline space-y-2">
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Use</a></li>
            <li><a href="/user/rides">Ride History</a></li>
            <li><a href="/feedback">Feedback Form</a></li>
          </ul>
        </section>
        
      </div>
      <Footer />
    </div></div>
  );
};

export default HelpPage;