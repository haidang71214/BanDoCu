import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import AuthInput from "./AuthInput";
import SocialLoginButton from "./SocialLoginButton";
import AuthFooterLink from "./AuthFooterLink";
import * as Icons from "lucide-react";
import { assets } from "../../assets/data/doctors";

export default function AuthForm({
  className,
  formData,
  onChange,
  onSubmit,
  loading,
  mode = "login",
  ...props
}) {
  const isLogin = mode === "login";

  const config = {
    login: {
      title: "Welcome Back!",
      subtitle: "Login to your account",
      submitText: "Login",
      submitIcon: "LogIn",
      loadingText: "Logging in...",
      alternateText: "Don't have an account?",
      alternateLink: "/auth/register",
      alternateLinkText: "Sign up",
      googleText: "Login with Google",
    },
    register: {
      title: "Create Account",
      subtitle: "Sign up for a new account",
      submitText: "Sign Up",
      submitIcon: "UserPlus",
      loadingText: "Creating account...",
      alternateText: "Already have an account?",
      alternateLink: "/auth/login",
      alternateLinkText: "Sign in",
      googleText: "Sign up with Google",
    },
  };

  const current = config[mode];
  const Icon = Icons[current.submitIcon];

  return (
    <div className={className} {...props}>
      <Card className="overflow-hidden rounded-xl shadow-lg border border-gray-100">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-gray-800">
                  {current.title}
                </h1>
                <p className="text-gray-600 text-balance">{current.subtitle}</p>
              </div>

              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <AuthInput
                  isLogin={isLogin}
                  formData={formData}
                  onChange={onChange}
                  loading={loading}
                  error={false}
                />

                <Button
                  type="submit"
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      {current.loadingText}
                    </>
                  ) : (
                    <>
                      <Icon className="w-4 h-4 mr-2" />
                      {current.submitText}
                    </>
                  )}
                </Button>

                <div className="relative text-center text-sm my-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <SocialLoginButton text={current.googleText} />

                <div className="text-center text-sm mt-4">
                  <AuthFooterLink
                    text={current.alternateText}
                    linkText={current.alternateLinkText}
                    linkHref={current.alternateLink}
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="hidden md:block relative w-full h-full">
            <img
              src={assets.about_image}
              alt="Authentication Illustration"
              className="object-cover w-full h-full rounded-r-xl"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
