"use client";

import { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Si1Password } from "react-icons/si";
import Link from "next/link";

const formSchema = z.object({
  code: z
    .string()
    .min(6, { message: "OTP must be 6 digits." })
    .max(6, { message: "OTP must be 6 digits." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function AuthCard08() {
  const { toast } = useToast();
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      const valueArray = value.split("").slice(0, 6);
      const newOtpValues = [...otpValues];
      
      for (let i = 0; i < valueArray.length; i++) {
        if (index + i < 6) {
          newOtpValues[index + i] = valueArray[i];
        }
      }
      
      setOtpValues(newOtpValues);
      setValue("code", newOtpValues.join(""));
      
      const nextIndex = Math.min(index + valueArray.length, 5);
      inputRefs.current[nextIndex]?.focus();
    } else {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
      setValue("code", newOtpValues.join(""));
      
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otpValues[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim().slice(0, 6);
    if (pasteData) {
      const newOtpValues = [...otpValues];
      const pasteArray = pasteData.split("");
      
      for (let i = 0; i < 6; i++) {
        newOtpValues[i] = pasteArray[i] || "";
      }
      
      setOtpValues(newOtpValues);
      setValue("code", newOtpValues.join(""));
  
      const lastFilledIndex = newOtpValues.findIndex(value => !value);
      const focusIndex = lastFilledIndex === -1 ? 5 : lastFilledIndex;
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form submitted:", data);

      toast({
        title: "Login successful",
        description: "You have successfully logged in.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-[400px] rounded-[22px] bg-[#ffffff] p-6 shadow-md dark:bg-zinc-800 sm:p-8">
      <div className="mb-6 flex flex-col items-center">
        <div className="relative flex items-center justify-center h-24 w-24">
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-b from-neutral-300/40 via-white/10 to-white/0 dark:from-white/10 dark:via-black/10 dark:to-black/0"
          />
          <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-zinc-200">
            <Si1Password className="h-5 w-5 text-zinc-600" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Enter Verification Code
        </h1>
        <p className="mt-1 text-center text-sm text-gray-600 dark:text-zinc-400">
          We've sent a code to{" "}
          <span className="font-medium">hello@example.com</span>
        </p>
      </div>

      <div className="mb-6 flex items-center justify-center">
        <div className="relative w-full">
          <hr />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label
            htmlFor="code-0"
            className="text-sm font-medium text-gray-700 dark:text-zinc-300"
          >
            Verification Code
          </label>
        
          <input
            type="hidden"
            {...register("code")}
          />
          
          <div className="flex justify-between gap-2">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="flex-1">
                <Input
                  id={`code-${index}`}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otpValues[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className={`
                    ${errors.code ? "border-red-500" : "border-gray-300 dark:border-zinc-700"}
                    bg-white py-2 text-center font-medium text-lg dark:bg-zinc-800 rounded-lg
                  `}
                  aria-label={`Digit ${index + 1} of verification code`}
                />
              </div>
            ))}
          </div>
          
          {errors.code && (
            <p className="mt-1 flex items-center gap-2 text-sm font-medium text-red-500 border-l-2 border-red-500 pl-2 rounded-md bg-red-500/5">
              {errors.code.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="mt-6 w-full rounded-lg from-blue-600 to-blue-500 text-white bg-gradient-to-t 
    border border-b-2 border-blue-900/40 shadow-md shadow-blue-900/20 
    ring-1 ring-inset ring-white/25 
    transition-[filter] duration-200 hover:brightness-110 active:brightness-90 
    dark:shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.1)] 
    dark:border-x-0 dark:border-t-0 dark:border-blue-900/50 
    dark:ring-white/5 dark:from-blue-700 dark:to-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Submit Code"}
        </Button>

        <div className="mt-4 whitespace-nowrap text-center text-[12px] text-gray-600 dark:text-zinc-400">
          Experiencing issues receiving the code?{" "}
          <Link href="" className="text-blue-600 hover:underline">
            Resend Code
          </Link>
        </div>
      </form>
    </div>
  );
}