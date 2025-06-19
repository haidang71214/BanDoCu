<<<<<<< HEAD
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { assets } from "../assets/data/doctors";
import RelatedDoctors from "../components/Doctors/RelatedDoctors";
import { CalendarDays, Clock, UserCheck, Info } from "lucide-react";
import { axiosInstance } from "../utils/axiosInstance";
import { toast } from "react-hot-toast";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const { user } = useAuth();
=======
<<<<<<< HEAD
import React from 'react'

const Appointment = () => {
  return (
    <div>Appointment</div>
  )
}

export default Appointment
=======
import { useState, useEffect } from "react";
import { assets, doctors } from "../assets/data/doctors";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams } from "react-router-dom";

const AppointmentBooking = () => {
  const { docId } = useParams();
>>>>>>> 20cc38228264b7523930b8c862b8c524042c2b8a
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(-1);
  const [slotTime, setSlotTime] = useState("");
<<<<<<< HEAD
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const daysOfWeeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    console.log("📌 docId from URL:", docId);
    console.log(
      "📌 All doctor IDs from context:",
      doctors.map((d) => d._id)
    );
  }, [docId, doctors]);

  useEffect(() => {
    if (doctors.length === 0) return;

    const foundDoc = doctors.find((item) => item._id === docId);
    setDocInfo(foundDoc);
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      generateSlots();
    }
  }, [docInfo]);

  useEffect(() => {
    setSlotTime("");
  }, [slotIndex]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const generateSlots = () => {
    const slotByDate = [];
    const today = new Date();

    const randomTime = (startHour, endHour) => {
      const hour =
        Math.floor(Math.random() * (endHour - startHour)) + startHour;
      const minute = Math.random() > 0.5 ? 0 : 30;
      const date = new Date();
      date.setHours(hour, minute, 0, 0);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    for (let index = 2; index < 9; index++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + index);
      const slotCount = Math.floor(Math.random() * 5) + 2;
      const slotSet = new Set();
      const slots = [];
      while (slotSet.size < slotCount) {
        const timeStr = randomTime(9, 18);
        if (!slotSet.has(timeStr)) {
          slotSet.add(timeStr);
          slots.push({
            dateTime: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate(),
              parseInt(timeStr.split(":")[0], 10),
              parseInt(timeStr.split(":")[1], 10)
            ),
            time: timeStr,
          });
        }
      }
      slots.sort((a, b) => a.dateTime - b.dateTime);
      slotByDate.push(slots);
    }
    setDocSlots(slotByDate);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (slotIndex === -1 || !slotTime) {
        toast.error("Vui lòng chọn ngày và giờ khám");
        return;
      }

      if (!user || !user.id) {
        toast.error("Vui lòng đăng nhập để đặt lịch");
        navigate("/auth/login");
        return;
      }

      const selectedSlot = docSlots[slotIndex].find(
        (slot) => slot.time === slotTime
      );
      const appointmentTime = selectedSlot.dateTime.toISOString();
      const doctorId = docId;

      const response = await axiosInstance.post(
        "/doctor/createAppointmentFuture",
        {
          appointmentTime,
          doctorId,
        }
      );
      toast.success("Đặt lịch thành công");
      console.log("✅ Server Response:", response.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Đặt lịch thất bại");
    } finally {
      setIsLoading(false);
=======
  const [isBooking, setIsBooking] = useState(false);

  const daysOfWeeks = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const fetchDocInfo = () => {
      const info = doctors.find((item) => item._id === docId);
      setDocInfo(info);
      setDocSlots(info?.slots || []);
    };
    fetchDocInfo();
  }, [docId]);

  const handleBookAppointment = async () => {
    if (!slotTime || slotIndex === -1) return;

    const slotDetails = docSlots[slotIndex]?.find(
      (slot) => slot.time === slotTime
    );
    if (!slotDetails || !docInfo) return;

    setIsBooking(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/booking/create`,
        {
          doctorId: docInfo._id,
          slotId: slotDetails._id,
        },
        { withCredentials: true }
      );

      toast.success("📅 Booking successful!");
      setSlotIndex(-1);
      setSlotTime("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Booking failed.");
    } finally {
      setIsBooking(false);
>>>>>>> 20cc38228264b7523930b8c862b8c524042c2b8a
    }
  };

  if (!docInfo) {
    return (
<<<<<<< HEAD
      <div className="pt-32 text-center text-gray-500 text-lg">
        Đang tải thông tin bác sĩ...
      </div>
    );
  }

  return (
    docInfo && (
      <div className="max-w-7xl mx-auto px-4 pt-[7rem] space-y-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="bg-white rounded-2xl shadow-md p-6 w-full lg:w-1/3 border border-pink-100">
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="rounded-xl w-full h-64 object-cover border-4 border-pink-200 shadow"
            />
            <h2 className="text-2xl font-bold text-pink-600 mt-4 flex items-center gap-2">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="Verified" />
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {docInfo.degree} • {docInfo.speciality}
            </p>
            <div className="mt-2 text-sm font-medium bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full inline-block">
              {docInfo.experience} years experience
            </div>
            <div className="mt-4">
              <p className="flex items-center text-purple-700 font-semibold gap-2 mb-1">
                <Info className="w-4 h-4" /> About
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {docInfo.about}
              </p>
            </div>
            <p className="text-green-600 font-bold mt-4">
              💰 Fee: {currencySymbol}
              {docInfo.fees}
            </p>
          </div>

          <div className="flex-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl border shadow-md space-y-6">
              <h3 className="text-xl font-bold text-pink-600 flex items-center gap-2">
                <CalendarDays className="w-5 h-5" /> Choose a Date
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {docSlots.map((daySlots, index) => {
                  const dateObj = daySlots[0]?.dateTime;
                  return (
                    <button
                      key={index}
                      onClick={() =>
                        setSlotIndex(index === slotIndex ? -1 : index)
                      }
                      className={`rounded-xl px-4 py-3 text-center text-sm font-medium border transition-all duration-300
                          ${
                            index === slotIndex
                              ? "bg-gradient-to-br from-pink-500 to-purple-500 text-white scale-105 shadow-lg"
                              : "bg-white hover:bg-pink-50 text-gray-700 border-gray-200"
                          }`}
                    >
                      <p>{daysOfWeeks[dateObj.getDay()]}</p>
                      <p className="text-lg font-bold">{dateObj.getDate()}</p>
                    </button>
                  );
                })}
              </div>

              <div>
                <h4 className="text-md font-semibold mb-2 text-purple-600 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Available Times
                </h4>
                <div className="flex flex-wrap gap-3">
                  {slotIndex >= 0 &&
                    docSlots[slotIndex].map((slot, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSlotTime(slot.time)}
                        className={`px-5 py-2 text-sm rounded-full border transition-all
                            ${
                              slotTime === slot.time
                                ? "bg-gradient-to-r from-green-400 to-blue-500 text-white shadow scale-105"
                                : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                            }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                </div>
              </div>

              <div className="text-right">
                <button
                  onClick={handleSubmit}
                  disabled={!slotTime || isLoading}
                  className={`px-8 py-3 text-sm font-semibold rounded-full transition-all duration-300
                      ${
                        slotTime && !isLoading
                          ? "bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:scale-105 shadow"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                >
                  <UserCheck className="inline w-4 h-4 mr-2" />
                  {isLoading ? "Đang xử lý..." : "Book Appointment"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
      </div>
    )
  );
};

export default Appointment;
=======
      <div className="text-center py-20 text-gray-600 text-xl">
        Loading doctor info...
      </div>
    );
  }
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-10">
        <div className="bg-gradient-to-r h-32"></div>
        <div className="relative px-6 md:px-10 pb-10 -mt-20">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="w-40 h-40 rounded-2xl border-4 border-white shadow-lg"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                {docInfo.name}
                <img
                  src={assets.verified_icon}
                  alt="Verified"
                  className="w-6 h-6"
                />
              </h2>
              <p className="text-gray-600 mt-1 mb-2">
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {docInfo.experience} years experience
              </span>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <h4 className="font-semibold mb-1">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {docInfo.languages.map((lang, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 px-2 py-1 rounded-full"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Available Days</h4>
                  <div className="flex flex-wrap gap-2">
                    {docInfo.availableDays.map((day, i) => (
                      <span
                        key={i}
                        className="bg-green-100 px-2 py-1 rounded-full text-green-800"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-700">🗓️ Choose Date</h3>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {docSlots.map((item, index) => {
            const date = new Date(item[0]?.dateTime);
            return (
              <div
                key={index}
                onClick={() => setSlotIndex(index === slotIndex ? -1 : index)}
                className={`min-w-[80px] text-center p-3 rounded-xl cursor-pointer transition transform hover:scale-105 ${
                  index === slotIndex
                    ? "text-white shadow-md"
                    : "bg-white border border-gray-300 hover:bg-gray-100"
                }`}
              >
                <p className="text-sm font-medium">
                  {daysOfWeeks[date.getDay()].slice(0, 3)}
                </p>
                <p className="text-xl font-bold">{date.getDate()}</p>
              </div>
            );
          })}
        </div>

        {slotIndex !== -1 && (
          <>
            <h3 className="text-xl font-bold mt-8 mb-4 text-gray-700">
              ⏰ Choose Time
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {docSlots[slotIndex]?.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setSlotTime(item.time)}
                  className={`p-3 rounded-lg text-sm transition-all ${
                    slotTime === item.time
                      ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md scale-105"
                      : "bg-white border border-gray-300 hover:bg-blue-50"
                  }`}
                >
                  {item.time}
                </button>
              ))}
            </div>

            <button
              onClick={handleBookAppointment}
              disabled={!slotTime || isBooking}
              className={`mt-6 w-full sm:w-auto px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ${
                slotTime && !isBooking
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isBooking ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Booking...
                </div>
              ) : (
                <>📋 Book Appointment</>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;
>>>>>>> fe-demo
>>>>>>> 20cc38228264b7523930b8c862b8c524042c2b8a
