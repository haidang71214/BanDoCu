import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { toast } from "react-hot-toast";
import DoctorCard from "../components/doctors/DoctorCard";

export default function AIDiagnose() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleDiagnose = async () => {
    if (!description.trim()) {
      toast.error("Vui lòng nhập mô tả triệu chứng.");
      return;
    }
    setLoading(true);
    setResults([]);
    try {
      const res = await axiosInstance.post("/api/v1/ai/diagnose", {
        description,
      });
      setResults(res.data);
    } catch (err) {
      toast.error(
        "Không thể chẩn đoán AI.",
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Lỗi không xác định"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-24 px-4">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">AI Chẩn đoán</h2>
      <textarea
        className="w-full border rounded-lg p-3 text-sm mb-4"
        rows={4}
        placeholder="Nhập mô tả triệu chứng của bạn..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold"
        onClick={handleDiagnose}
        disabled={loading}
      >
        {loading ? "Đang chẩn đoán..." : "Chẩn đoán AI"}
      </button>

      {results.length > 0 && (
        <div className="mt-8 space-y-6">
          {results.map((item, idx) => (
            <div key={idx} className="p-4 bg-white rounded-xl shadow">
              <div>
                <b>Chẩn đoán:</b> {item.diagnosis}
              </div>
              <div>
                <b>Lý do:</b> {item.reason}
              </div>
              <div>
                <b>Chuyên khoa:</b> {item.specialty}
              </div>
              <div>
                <b>Bác sĩ đề xuất:</b>
                {item.doctors && item.doctors.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                    {item.doctors.map((doc) => (
                      <DoctorCard
                        key={doc._id}
                        doctor={{ ...doc, source: "mongodb" }}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic mt-1">
                    Không tìm thấy bác sĩ phù hợp.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}