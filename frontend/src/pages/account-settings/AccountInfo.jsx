import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
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
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview("");
  };

  return (
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
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;