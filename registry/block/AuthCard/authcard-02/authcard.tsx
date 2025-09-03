"use client";

import Link from "next/link";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function AuthCard02() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form submitted:", data);

      toast({
        title: "Account created",
        description: "You have successfully created an account.",
      });

      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-[400px] rounded-[22px] bg-[#ffffff] p-6 shadow-md dark:bg-zinc-800 sm:p-8">
      <div className="mb-6 flex flex-col items-center">
        <Image src="/images/spectrum.svg" alt="Logo" width={70} height={70} className="mb-4" />
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Create an account
        </h1>
        <p className="mt-1 text-center text-sm text-gray-600 dark:text-zinc-400">
          Please enter your details to create an account.
        </p>
      </div>

      <Button
        variant="outline"
        className="mb-6 flex w-full items-center justify-center gap-2 border-gray-300 bg-white text-gray-800 hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        type="button"
      >
        <FcGoogle className="h-5 w-5" />
        <span>Continue with Google</span>
      </Button>

      <Button
        variant="outline"
        className="mb-6 flex w-full items-center justify-center gap-2 border-gray-300 bg-white text-gray-800 hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        type="button"
      >
        <FaApple className="h-5 w-5" />
        <span>Continue with Apple</span>
      </Button>

      <div className="mb-6 flex items-center justify-center">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-zinc-700"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-xs text-gray-500 dark:bg-zinc-800 dark:text-zinc-500">
              OR
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 dark:text-zinc-300"
          >
            Email Address
          </label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="hello@example.com"
              {...register("email")}
              className={`${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 dark:border-zinc-700"
              } bg-white py-2 pr-10 dark:bg-zinc-800 rounded-lg`}
            />
            <Mail className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-teal-500" />
          </div>
          {errors.email && (
            <p className="mt-1 flex items-center gap-2 text-sm font-medium text-red-500 border-l-2 border-red-500 pl-2 rounded-md bg-red-500/5">{errors.email.message}</p>
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
          {isSubmitting ? "Processing..." : "Continue with Email"}
        </Button>

        <div className="mt-4 text-center text-sm text-gray-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
