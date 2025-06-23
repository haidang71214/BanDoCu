import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function AuthInputFields({
  isLogin,
  formData,
  onChange,
  loading,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {!isLogin && (
        <div className="grid gap-1.5">
          <Label htmlFor="userName">Username</Label>
          <Input
            id="userName"
            name="userName"
            type="text"
            required
            value={formData.userName || ""}
            onChange={onChange}
            disabled={loading}
            className={cn(
              "h-10 text-sm px-3 py-2",
              error ? "border-destructive ring-destructive" : "border-gray-300"
            )}
          />
        </div>
      )}

      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={onChange}
          disabled={loading}
          className={cn(
            "h-10 text-sm px-3 py-2",
            error ? "border-destructive ring-destructive" : "border-gray-300"
          )}
        />
      </div>

      <div className="grid gap-1.5 relative">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          required
          value={formData.password}
          onChange={onChange}
          disabled={loading}
          className={cn(
            "h-10 text-sm px-3 py-2 pr-10",
            error ? "border-destructive ring-destructive" : "border-gray-300"
          )}
        />
        <button
          type="button"
          className="absolute right-3 top-[37px] text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {!isLogin && (
        <div className="grid gap-1.5 relative">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            required
            value={formData.confirmPassword || ""}
            onChange={onChange}
            disabled={loading}
            className={cn(
              "h-10 text-sm px-3 py-2 pr-10",
              error ? "border-destructive ring-destructive" : "border-gray-300"
            )}
          />
          <button
            type="button"
            className="absolute right-3 top-[37px] text-gray-500 hover:text-gray-700"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      )}

      {isLogin && (
        <div className="flex flex-col gap-2 mt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                name="remember"
                checked={formData.remember || false}
                onCheckedChange={(checked) =>
                  onChange({
                    target: {
                      name: "remember",
                      value: checked,
                    },
                  })
                }
              />
              <Label htmlFor="remember" className="text-sm text-muted-foreground">
                Remember me
              </Label>
            </div>
            <a
              href="/auth/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>
        </div>
      )}
    </div>
  );
}