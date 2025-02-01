"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  InputOtp,
} from "@heroui/react";
import { Mail, SendHorizonal, User } from "lucide-react";
import PasswordInput from "@/components/input_password";
import GoogleLogoSVG from "@/icons/google";
import DividerWithText from "@/components/dividerWithText";
import toast, { Toaster } from "react-hot-toast";

// Define the Zod schema for form validation of registration
const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Enter a password of at least 8 characters")
    .regex(/[0-9]/, "atleast 1 number")
    .regex(/[a-z]/, "atleast 1 lowercase letter")
    .regex(/[A-Z]/, "atleast 1 uppercase letter"),
});

// Define the Zod schema for form validation of Otp verification
const verifySchema = z.object({
  code: z
    .string()
    .length(6, "Verification code must be exactly 6 digits")
    .regex(/^\d{6}$/, "Verification code must contain only numbers"),
});

export default function Register() {
  const [step, setStep] = useState("register");
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step === "register" ? registerSchema : verifySchema),
  });

  const handleRegister = async (data) => {
    const toastId = toast.loading("Creating your account...");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Account created successfully!", { id: toastId });
      setStep("verify");
    } catch (error) {
      toast.error("Failed to create account. Please try again.", {
        id: toastId,
      });
    }
  };

  const handleVerify = async (data) => {
    const toastId = toast.loading("Verifying your email...");
    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Verification Data:", data);
      toast.success("Email verified successfully!", { id: toastId });
      router.push("/setup-organisation");
    } catch (error) {
      toast.error("Failed to verify email. Please try again.", {
        id: toastId,
      });
      console.error("Verification Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <Card className="w-full max-w-md bg-background/90 backdrop-blur-lg border rounded-xl shadow-lg">
        <CardHeader className="text-center p-8">
          <h1 className=" mx-auto text-xl sm:text-2xl md:text-3xl font-semibold md:font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            {step === "register" ? "Create your account" : "Verify your OTP"}
          </h1>
        </CardHeader>
        <CardBody className="px-8 py-4">
          {step === "register" ? (
            <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Name"
                    variant="bordered"
                    type="text"
                    description="Enter your full name"
                    endContent={<User className=" text-slate-500" />}
                    errorMessage={errors.name?.message}
                    isInvalid={!!errors.name}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Email"
                    variant="bordered"
                    type="email"
                    description="Enter your email id"
                    endContent={<Mail className="text-slate-500" />}
                    errorMessage={errors.email?.message}
                    isInvalid={!!errors.email}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    errorMessage={errors.password?.message}
                  />
                )}
              />

              <Button
                color="primary"
                variant="solid"
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3"
              >
                Sign up
              </Button>

              <DividerWithText text="OR" />

              <Button
                variant="ghost"
                color="secondary"
                className="w-full border-2 transition-all transform hover:scale-105"
              >
                <GoogleLogoSVG className="mr-2 h-6 w-6" />
                Continue with Google
              </Button>
            </form>
          ) : (
            <form
              onSubmit={handleSubmit(handleVerify)}
              className="space-y-6 mx-auto"
            >
              <Controller
                name="code"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputOtp
                    length={6}
                    {...field}
                    placeholder="Enter the 6-digit code"
                    errorMessage={errors.code?.message}
                    isInvalid={!!errors.code}
                    description="Enter the verification code sent to your email"
                  />
                )}
              />
              <Button
                variant="solid"
                endContent={<SendHorizonal />}
                color="primary"
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3"
              >
                VERIFY OTP
              </Button>
            </form>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
