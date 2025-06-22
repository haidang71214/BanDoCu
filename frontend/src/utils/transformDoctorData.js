function generateRandomTimeSlotsByDate(numDays = 7) {
  const result = {};
  const today = new Date();

  for (let i = 0; i < numDays; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dateStr = date.toISOString().slice(0, 10); 

    const timeSlots = [];
    const startHour = 8;
    const endHour = 17;

    for (let hour = startHour; hour < endHour; hour++) {
      timeSlots.push(`${hour.toString().padStart(2, "0")}:00`);
      timeSlots.push(`${hour.toString().padStart(2, "0")}:30`);
    }

    const shuffled = timeSlots.sort(() => 0.5 - Math.random());
    result[dateStr] = shuffled.slice(0, Math.floor(Math.random() * 3) + 4); 
  }

  return result;
}

export const transformDoctorData = (doc, source) => {
  const transformedDoc = {
    _id: doc._id,
    name: doc.userName || doc.name,
    image: doc.avatarUrl || doc.image,
    speciality: doc.speciality || [], 
    degree: doc.degree || "MBBS",
    experience: doc.experience || "N/A",
    about:
      doc.about ||
      "Experienced medical professional committed to providing quality healthcare.",
    fees: doc.fees || 50,
    ratings: doc.ratings || 4.5,
    totalReviews: doc.totalReviews || 0,
    languages: doc.languages || ["English"],
    availableDays: doc.availableDays || [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ],
    availableTimesByDate: generateRandomTimeSlotsByDate(), 
    isVerified: doc.isVerified || false,
    source: source,
  };
  return transformedDoc;
};