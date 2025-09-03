"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useCallback } from "react";
import { LoaderCircle } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  reason: z.string({
    required_error: "Please select a reason for reporting.",
  }),
  details: z.string().min(10, {
    message: "Please provide more details (minimum 10 characters).",
  }),
  image: z.instanceof(File).optional(),
});

interface ReportModalProps {
  templateId: string;
  hasPurchased: boolean;
}

export function ReportModal({ templateId, hasPurchased }: ReportModalProps) {
  const [open, setOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { data: session } = useSession();
  const [canReport, setCanReport] = React.useState(true);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  React.useEffect(() => {
    const checkReportPermission = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch('/api/users/report-permission', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const userData = await response.json();
          setCanReport(userData.canReport !== false);
        } catch (error) {
          console.error('Error checking report permission:', error);
          setCanReport(false);
        }
      }
    };
    checkReportPermission();
  }, [session?.user?.id]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      details: "",
    },
  });

  const handleFileChange = useCallback((file: File | null) => {
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file.");
        setPreviewUrl(null);
        form.setValue("image", undefined);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        setPreviewUrl(null);
        form.setValue("image", undefined);
        return;
      }

      form.setValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      form.setValue("image", undefined);
      setPreviewUrl(null);
    }
  }, [form]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    handleFileChange(file || null);
  }, [handleFileChange]);

  const clearImage = () => {
    handleFileChange(null);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session?.user) {
      toast.error("Please sign in to report a template.");
      return;
    }

    if (!canReport) {
      toast.error("You have been blocked from reporting templates.");
      setOpen(false);
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("reason", values.reason);
      formData.append("details", values.details);
      formData.append("templateId", templateId.toString());
      formData.append("userId", session.user.id.toString());
  
      let imageUrl = null;
  
      if (values.image) {
        const imageFormData = new FormData();
        imageFormData.append("file", values.image);
        imageFormData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");
  
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        if (!cloudName) {
          throw new Error("Cloudinary cloud name is missing. Check .env.local");
        }
  
        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: imageFormData,
          }
        );
  
        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image to Cloudinary");
        }
  
        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.secure_url;
      }
  
      if (imageUrl) {
        formData.append("imageUrl", imageUrl);
      }
  
      const response = await fetch("/api/reports", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit report");
      }
  
      toast.success("Report submitted successfully!");
      setOpen(false);
      form.reset();
      setPreviewUrl(null);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }
  
  
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-primary dark:hover:text-white">
          Report Template
        </button>
      </DialogTrigger>
      <DialogContent className="overflow-y-scroll scrollbar-hide bg-zinc-100 dark:bg-zinc-900 sm:max-w-[425px] max-h-[90vh]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl sm:text-2xl">
            Report this template
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            {!hasPurchased ? (
              "You must purchase this template before you can report it."
            ) : !canReport ? (
              "You have been blocked from reporting templates."
            ) : (
              "If you think a template has stolen your work or has other questionable content, please use the form below to report it."
            )}
          </DialogDescription>
        </DialogHeader>

        {!hasPurchased ? (
          <div className="p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-md">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              You need to purchase this template before you can report issues with it.
              This ensures reports come from actual users of the product.
            </p>
          </div>
        ) : !canReport ? (
          <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-red-800 dark:text-red-200 text-sm">
              You have been blocked from reporting templates. Please contact support if you believe this is an error.
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 mt-4"
            >
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
                          readOnly
                          disabled
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
                          readOnly
                          disabled
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Why are you reporting?
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-9 sm:h-10">
                          <SelectValue placeholder="Select reason" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="copyright">
                          Copyright Violation
                        </SelectItem>
                        <SelectItem value="inappropriate">
                          Inappropriate Content
                        </SelectItem>
                        <SelectItem value="spam">Spam</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Details
                      <span className="text-muted-foreground ml-1 text-xs sm:text-sm block sm:inline">
                        Please briefly explain why you are reporting this
                        template.
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your message here."
                        className="resize-none min-h-[100px] sm:min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Upload Evidence
                      <span className="text-muted-foreground ml-1 text-xs">
                        (Optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                       <div
                        className={`flex items-center justify-center w-full py-6 border-2 border-dashed rounded-md cursor-pointer transition-colors relative ${
                          isDragging
                            ? "border-primary bg-primary/10"
                            : "border-gray-300 dark:border-zinc-700 hover:border-gray-400 dark:hover:border-zinc-600 bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700"
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => !previewUrl && document.getElementById('file-upload-input-template')?.click()}
                      >
                        {previewUrl ? (
                            <div className="absolute inset-0 group">
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-md" />
                                <button
                                    type="button"
                                    onClick={clearImage}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                    aria-label="Remove image"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                           </div>
                        ) : (
                           <div className="flex flex-col items-center justify-center text-center">
                             <svg
                               className="w-8 h-8 text-gray-500 dark:text-gray-400"
                               fill="none"
                               viewBox="0 0 24 24"
                               stroke="currentColor"
                             >
                               <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="2"
                                 d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                               />
                             </svg>
                             <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                               <span className="font-semibold">Click to upload</span> or drag and drop
                             </p>
                             <p className="text-xs text-gray-500 dark:text-gray-500">
                               PNG, JPG, GIF up to 5MB
                             </p>
                           </div>
                        )}
                        <input
                          id="file-upload-input-template"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                        />
                      </div>
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
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <LoaderCircle className="animate-spin mr-2 h-5 w-5" />
                    Submitting...
                  </span>
                ) : "Report template"}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}