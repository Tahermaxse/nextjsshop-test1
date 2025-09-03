"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { Si1Password } from "react-icons/si";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function AuthCard07() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
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
            className="absolute inset-0 rounded-full bg-gradient-to-b from-neutral-300/40 via-white/10 to-white/0 dark:from-white/10 dark:via-black/10 dark:to-black/0
"
          />
          <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-zinc-200">
            <Si1Password className="h-5 w-5 text-zinc-600" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Reset Password
        </h1>
        <p className="mt-1 text-center text-sm text-gray-600 dark:text-zinc-400">
        Enter your email to reset your password.
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
          {isSubmitting ? "Processing..." : "Reset Password"}
        </Button>

        <div className="mt-4 whitespace-nowrap text-center text-[12px] text-gray-600 dark:text-zinc-400">
          Don&apos;t have access anymore?{" "}
          <Link href="" className="text-blue-600 hover:underline">
            Try another method
          </Link>
        </div>
      </form>
    </div>
  );
}
