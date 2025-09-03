"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Header from "@/components/Contact/Header"
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().optional(),
  serviceType: z.enum(["web", "desktop", "mobile", "other"], {
    required_error: "Please select a service type",
  }),
  otherService: z.string().optional(),
  budget: z.enum(["under-5k", "5k-10k", "10k-25k", "25k-50k", "50k-plus"], {
    required_error: "Please select a budget range",
  }),
  projectInfo: z.string().min(10, {
    message: "Project information must be at least 10 characters.",
  }),
})

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)


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
  })

  const serviceType = form.watch("serviceType")

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Simulate API call - replace with your actual endpoint
      const response = await fetch("/api/contact-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Failed to submit contact request")
      }

      toast.success("Contact request submitted successfully! We'll get back to you within 48 hours.")
      form.reset()
    } catch (error: any) {  
      toast.error(error.message || "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
      <div className="min-h-screen bg-white dark:bg-zinc-900 text-gray-900 dark:text-white">
        <Header title="Contact Us" description=" Let’s connect and help you build faster" /> 
      <div className="relative overflow-clip px-4 border-b border-grid-border">
  <div className="relative z-0 mx-auto max-w-[1200px]">
    {/* Side border fade effect */}
    <div className="pointer-events-none absolute inset-0 border-x border-grid-border " />

    {/* Main content */}
    <div className="relative z-10 px-4 py-8 lg:py-16">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-zinc-400 uppercase tracking-wide">Contact Us</p>
              <h1 className="text-3xl lg:text-4xl font-bold">Let’s connect and help you build faster</h1>
              <p className="text-gray-600 dark:text-zinc-400 text-lg">
                Reach out to our team for questions about components, templates, pricing, or collaboration opportunities.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center ">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-700 dark:text-zinc-300">Get a walkthrough of the Nextjsshop platform</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-700 dark:text-zinc-300">Get help selecting the best templates and components for your project</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-700 dark:text-zinc-300">Share feedback or explore collaboration opportunities</span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-zinc-800 p-6 rounded-lg border-l-4 border-green-500">
              <blockquote className="text-lg italic text-gray-700 dark:text-zinc-300 mb-4">
                "Nextjsshop has completely transformed the way we build and launch web apps. The ready-to-use templates and components saved us hours of development time while keeping our UI clean, responsive, and modern."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">J</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Jordan Malik</p>
                  <p className="text-sm text-gray-600 dark:text-zinc-400">Frontend Engineer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-gray-50 dark:bg-zinc-800 p-6 lg:p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-6">How can we help?</h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                            className="bg-white dark:bg-zinc-700 border-gray-300 dark:border-zinc-600"
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
                            className="bg-white dark:bg-zinc-700 border-gray-300 dark:border-zinc-600"
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
                        <span className="text-gray-500 dark:text-zinc-400 ml-1 text-xs">(Optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your company name"
                          {...field}
                          className="bg-white dark:bg-zinc-700 border-gray-300 dark:border-zinc-600"
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
                      <FormLabel className="text-sm font-medium">Type of Service</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white dark:bg-zinc-700 border-gray-300 dark:border-zinc-600">
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

                {serviceType === "other" && (
                  <FormField
                    control={form.control}
                    name="otherService"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Please specify</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your service type"
                            className="bg-white dark:bg-zinc-700 border-gray-300 dark:border-zinc-600 resize-none min-h-[100px]"
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
                      <FormLabel className="text-sm font-medium">Budget Range</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white dark:bg-zinc-700 border-gray-300 dark:border-zinc-600">
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
                        <span className="text-gray-500 dark:text-zinc-400 ml-1 text-xs block sm:inline">
                          Please provide details about your project requirements.
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your project requirements..."
                          className="bg-white dark:bg-zinc-700 border-gray-300 dark:border-zinc-600 resize-none min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <div className="pt-4">
                  <p className="text-sm text-gray-600 dark:text-zinc-400 mb-4">
                    You can also email us at our{" "}
                    <a href="mailto:contact@nextjsshop.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                      contact email
                    </a>
                  </p>
                  <Button
                    type="submit"
                    variant="fancy"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Send message"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
        </div>
      </div>
    </div>
    </div>
  )
}
