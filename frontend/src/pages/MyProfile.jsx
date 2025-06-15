import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const MyProfile = () => {
  const { user, setUser, accessToken } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    dob: "",
    password: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("/default-avatar.png");
  const [loading, setLoading] = useState(false);

  const formatDate = (isoDate) => isoDate?.slice(0, 10) || "";

  useEffect(() => {
    if (user) {
      setForm({
        userName: user.userName || "",
        dob: formatDate(user.dob),
        password: "",
      });
      setPreview(user.image || user.avatarUrl || "/default-avatar.png");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("userName", form.userName);
      formData.append("dob", form.dob);
      if (form.password) formData.append("password", form.password);
      if (image) formData.append("img", image);

      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/updateMyself",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      await new Promise((resolve) => setTimeout(resolve, 500));

      toast.success("Profile updated successfully!");
      const updatedUser = res.data.user;

      setUser(updatedUser);
      setPreview(
        updatedUser.image || updatedUser.avatarUrl || "/default-avatar.png"
      );

      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Update failed. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          My Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            <img
              src={preview}
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover border mb-3"
            />
            <label className="cursor-pointer text-blue-600 text-sm hover:underline">
              Change Avatar
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="userName"
              value={form.userName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 px-4 py-2 text-white font-medium rounded-lg transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            type="button"
            className="text-blue-600 hover:underline text-sm"
            onClick={() => navigate("/change-password")}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
