"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog copy";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().optional(),
  serviceType: z.enum(['web', 'desktop', 'mobile', 'other'], {
    required_error: "Please select a service type",
  }),
  otherService: z.string().optional(),
  budget: z.enum(['under-5k', '5k-10k', '10k-25k', '25k-50k', '50k-plus'], {
    required_error: "Please select a budget range",
  }),
  projectInfo: z.string().min(10, {
    message: "Project information must be at least 10 characters.",
  }),
});

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string | null | undefined;
  userName: string | null | undefined;
}

export default function QuoteRequestModal({
  isOpen,
  onClose,
  userEmail,
  userName,
}: QuoteRequestModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      serviceType: undefined,
      otherService: "",
      budget: undefined,
      projectInfo: "",
    },
  });

  // Update form values when session data changes
  React.useEffect(() => {
    if (session?.user) {
      form.setValue("name", session.user.name || "");
      form.setValue("email", session.user.email || "");
    }
  }, [session, form]);

  const serviceType = form.watch("serviceType");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session?.user) {
      toast.error("Please sign in to request a quote.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quote-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          userId: session.user.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || data.error || "Failed to submit quote request");
      }

      toast.success("Quote request submitted successfully!");
      onClose();
      form.reset();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-y-scroll scrollbar-hide bg-zinc-100 dark:bg-zinc-900 sm:max-w-[425px] max-h-[90vh]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl sm:text-2xl">
            Request a Quote
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Fill out the form below to request a quote for your project. Our team will get back to you within 48 hours.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-4">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jane Doe"
                        {...field}
                        className="h-9 sm:h-10 bg-muted"
                        readOnly={!!userName}
                        disabled={!!userName}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        {...field}
                        className="h-9 sm:h-10 bg-muted"
                        readOnly={!!userEmail}
                        disabled={!!userEmail}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Company Name
                    <span className="text-muted-foreground ml-1 text-xs">
                      (Optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your company name"
                      {...field}
                      className="h-9 sm:h-10"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Type of Service
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-9 sm:h-10">
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="web">Web App</SelectItem>
                      <SelectItem value="desktop">Desktop App</SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {serviceType === 'other' && (
              <FormField
                control={form.control}
                name="otherService"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Please specify
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your service type"
                        className="resize-none min-h-[100px] sm:min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Budget Range
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-9 sm:h-10">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="under-5k">Under $5,000</SelectItem>
                      <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                      <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                      <SelectItem value="50k-plus">$50,000+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Project Information
                    <span className="text-muted-foreground ml-1 text-xs sm:text-sm block sm:inline">
                      Please provide details about your project requirements.
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your project requirements..."
                      className="resize-none min-h-[100px] sm:min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-9 sm:h-10 mt-6"
              disabled={isSubmitting}
              variant={"fancy"}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 