<<<<<<< HEAD
=======
<<<<<<< HEAD
import React from 'react'

const Contact = () => {
  return (
    <div>Contact</div>
  )
}

export default Contact
=======
>>>>>>> 20cc38228264b7523930b8c862b8c524042c2b8a
import { assets } from "@/assets/data/doctors";

const Contact = () => {
  return (
<<<<<<< HEAD
    <div className="pt-10">
      <h2 className="text-center text-2xl text-gray-500">
        Contact <span className="text-gray-700 font-semibold">US</span>
      </h2>

      <div className="my-10 flex flex-col md:flex-row items-center gap-10 text-sm px-4 md:px-20 mb-28">
=======
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          Contact <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
>>>>>>> 20cc38228264b7523930b8c862b8c524042c2b8a
        <img
          className="w-full md:max-w-[360px]"
          src={assets.contact_image}
          alt="Contact illustration"
        />

<<<<<<< HEAD
        <div className="flex flex-col gap-4 text-gray-700">
=======
        <div className="flex flex-col justify-center items-start gap-6">
>>>>>>> 20cc38228264b7523930b8c862b8c524042c2b8a
          <p>📍 123 HealthCare Avenue, Da Nang City, Vietnam</p>
          <p>📞 Phone: +84 123 456 789</p>
          <p>✉️ Email: support@healthclinic.vn</p>
          <p>🕐 Opening Hours: Mon - Sat, 8:00 AM - 6:00 PM</p>
          <p>
<<<<<<< HEAD
            💬 For appointments, queries, or support, feel free to reach out to
            us. We’re always here to help!
          </p>
          <button className="mt-4 border border-black px-6 py-2 text-sm hover:bg-black hover:text-white transition-all duration-300">
=======
            💬 For appointments, queries or support, feel free to reach out to
            us. We’re always here to help!
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-300">
>>>>>>> 20cc38228264b7523930b8c862b8c524042c2b8a
            Send Us a Message
          </button>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Contact;
=======
export default Contact;
>>>>>>> fe-demo
>>>>>>> 20cc38228264b7523930b8c862b8c524042c2b8a
