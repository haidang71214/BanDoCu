import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointment from "./pages/MyAppointment";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import VerifyEmail from "./pages/VerifyEmail";
import ChangePassword from "./pages/account-settings/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import LoginSuccess from "./pages/LoginSuccess";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import AccountLayout from "./pages/account-settings/AccountLayout";
import AccountInfo from "./pages/account-settings/AccountInfo";
import SecuritySettings from "./pages/account-settings/SecuritySettings";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route path="/auth/verify-email" element={<VerifyEmail />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/my-appointments" element={<MyAppointment />} />
        <Route path="/appointment/:docId/:userId" element={<Appointment />} />
        <Route path="/account-settings" element={<AccountLayout />}>
          <Route index element={<AccountInfo />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="security" element={<SecuritySettings />} />
        </Route>
      </Routes>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
