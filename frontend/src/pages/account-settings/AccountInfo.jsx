<<<<<<< HEAD
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { User, Loader2 } from "lucide-react";
import { axiosInstance } from "../../utils/axiosInstance";
import AvatarUpload from "../../components/Auth/AvatarUpload";

const AccountInfo = () => {
  const { user, setUser, accessToken } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || user?.userName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    location: user?.location || "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(user?.image || user?.avatarUrl || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
      fullName: user?.fullName || user?.userName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      bio: user?.bio || "",
      location: user?.location || "",
    });
    setPreview(user?.image || user?.avatarUrl || "");
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
=======
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import {
  Loader2,
  CalendarIcon,
  User,
  Mail,
  FileText,
} from "lucide-react";
import { axiosInstance } from "@/utils/axiosInstance";
import AvatarUpload from "../../components/auth/AvatarUpload";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { formatDate, isValidDate, dateToLocalString } from "@/utils/dateUtils";

const AccountInfo = () => {
  const { user, setUser, accessToken } = useAuth();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [dob, setDob] = useState(null);
  const [dobInput, setDobInput] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { fullName: "", email: "", bio: "", location: "" },
  });

  useEffect(() => {
    if (!user) return;

    reset({
      fullName: user.fullName || user.userName || "",
      email: user.email || "",
      bio: user.bio || "",
      location: user.location || "",
    });

    const date = user.dob ? new Date(user.dob) : null;
    setDob(date);
    setDobInput(date ? formatDate(date) : "");
    setPreview(user.image || user.avatarUrl || "");
  }, [user, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value)
      );
      if (dob && isValidDate(dob))
        formData.append("dob", dateToLocalString(dob));
      if (image) formData.append("img", image);

      const res = await axiosInstance.post(
        "/api/v1/auth/updateMyself",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      toast.success("Cập nhật thành công!");
      const updatedUser = { ...user, ...res.data.user };
      setUser(updatedUser);
      setPreview(res.data.user.image || res.data.user.avatarUrl || "");
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      toast.error(err.response?.data?.message || "Lỗi cập nhật.");
    } finally {
      setLoading(false);
    }
  };

  const handleDateInput = (input) => {
    setDobInput(input);
    const newDate = new Date(input);
    if (isValidDate(newDate)) setDob(newDate);
  };

  const handleDateSelect = (date) => {
    if (isValidDate(date)) {
      setDob(date);
      setDobInput(formatDate(date));
      setCalendarOpen(false);
    }
  };

  const clearDate = () => {
    setDob(null);
    setDobInput("");
>>>>>>> 7b3f7f9b76807f188463fd50c3304484d6d2a9f0
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

<<<<<<< HEAD
  const handleSubmit = async () => {
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("location", formData.location);

      if (image) {
        formDataToSend.append("img", image);
      }

      const res = await axiosInstance.post(
        "/api/v1/auth/updateMyself",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      toast.success("Cập nhật thông tin thành công!");
      setUser(res.data.user);
      setPreview(res.data.user.image || res.data.user.avatarUrl || "");

      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      Object.assign(storedUser, res.data.user);
      localStorage.setItem("user", JSON.stringify(storedUser));
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Có lỗi xảy ra khi cập nhật thông tin"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    const resetData = {
      userName: "",
      email: "",
      bio: "",
    };
    try {
      const res = await axiosInstance.post(
        "/api/v1/auth/updateMyself",
        resetData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      toast.success("Đặt lại thông tin thành công !!!");

      setFormData((prev) => ({
        ...prev,
        fullName: "",
        email: "",
        bio: "",
      }));
      setImage(null);
      setPreview("");

      setUser((prev) => ({
        ...prev,
        userName: "",
        email: "",
        bio: "",
      }));

      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      storedUser.userName = "";
      storedUser.email = "";
      storedUser.bio = "";
      localStorage.setItem("user", JSON.stringify(storedUser));
    } catch (error) {
      toast.error("Lỗi khi đặt lại thông tin.");
      console.log("Lỗi khi đặt lại thông tin", error.message);
    }
  };

=======
>>>>>>> 7b3f7f9b76807f188463fd50c3304484d6d2a9f0
  const removeImage = () => {
    setImage(null);
    setPreview("");
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            Thông tin tài khoản
          </h1>
          <p className="text-slate-600 text-lg">
            Quản lý thông tin cá nhân và tùy chọn của bạn.
          </p>
        </div>

        <div className="space-y-8">
          <AvatarUpload
            preview={preview}
            fullName={formData.fullName}
            handleImageChange={handleImageChange}
            removeImage={removeImage}
          />

          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-purple-500 rounded-lg mr-3 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              Thông tin cá nhân
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Nguyễn Văn A"
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 placeholder-slate-400"
                  required
                />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Địa chỉ email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="user@example.com"
                className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 placeholder-slate-400"
                required
              />
            </div>

            <div className="mt-6 space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Giới thiệu bản thân
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Viết vài dòng về bản thân..."
                rows="4"
                className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 resize-none placeholder-slate-400"
              />
              <p className="text-xs text-slate-500">
                {formData.bio.length}/500 ký tự
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 min-w-48 px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin h-5 w-5 mr-3 text-white" />
                  Đang cập nhật...
                </span>
              ) : (
                "Cập nhật thông tin"
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-300 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
            >
              Đặt lại
            </button>
          </div>
=======
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Thông tin tài khoản
          </h1>
          <p className="text-slate-600 text-base md:text-lg">
            Quản lý thông tin cá nhân của bạn
          </p>
        </div>

        <div className="flex justify-center">
          <AvatarUpload
            preview={preview}
            fullName={user?.fullName}
            handleImageChange={handleImageChange}
            removeImage={removeImage}
          />
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-xl border border-white/20">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <User className="w-4 h-4 text-blue-500" />
                  Họ và tên *
                </label>
                <input
                  {...register("fullName", {
                    required: "Vui lòng nhập họ tên",
                  })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                  placeholder="Nhập họ và tên"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Mail className="w-4 h-4 text-blue-500" />
                  Email *
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Vui lòng nhập email" })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                  placeholder="example@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CalendarIcon className="w-4 h-4 text-blue-500" />
                Ngày sinh
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={dobInput}
                  onChange={(e) => handleDateInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "ArrowDown" &&
                    (e.preventDefault(), setCalendarOpen(true))
                  }
                  placeholder="01 tháng 06, 2025"
                  className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                />
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-blue-50"
                    >
                      <CalendarIcon className="w-4 h-4 text-slate-500" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-white/95 backdrop-blur-sm border-white/20 shadow-xl rounded-2xl"
                    align="end"
                  >
                    <Calendar
                      mode="single"
                      selected={dob}
                      onSelect={handleDateSelect}
                      captionLayout="dropdown"
                      className="rounded-2xl"
                    />
                    {dob && (
                      <div className="p-3 border-t border-slate-100">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={clearDate}
                          className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          Xóa ngày sinh
                        </Button>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FileText className="w-4 h-4 text-blue-500" />
                Giới thiệu
              </label>
              <textarea
                rows="4"
                {...register("bio")}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200 resize-none"
                placeholder="Viết vài dòng giới thiệu về bản thân..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 py-3 rounded-xl font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4 mr-2" />
                    Đang cập nhật...
                  </>
                ) : (
                  "Cập nhật thông tin"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="sm:w-auto border-slate-200 hover:bg-slate-50 py-3 rounded-xl font-semibold transition-all duration-200"
                onClick={() => {
                  reset();
                  clearDate();
                  removeImage();
                }}
              >
                Đặt lại
              </Button>
            </div>
          </form>
>>>>>>> 7b3f7f9b76807f188463fd50c3304484d6d2a9f0
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;