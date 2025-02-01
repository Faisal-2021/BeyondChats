"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Building2, Globe, FileText, Loader, Check, X } from "lucide-react";
import { Button, Input, Textarea, Card, Progress } from "@heroui/react";
import toast, { Toaster } from "react-hot-toast";
// Zod schema for form validation
const schema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyWebsite: z.string().url("Invalid website URL"),
  companyDescription: z
    .string()
    .min(10, "Description must be at least 10 characters"),
});

const SetupOrg = () => {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      companyName: "",
      companyWebsite: "",
      companyDescription: "",
    },
  });

  // Simulate fetching meta description from website URL using metascraper
  const fetchMetaDescription = async (url) => {
    try {
      const response = await fetch(
        `/api/scraper?url=${encodeURIComponent(url)}`
      );
      const data = await response.json();
      console.log("Metadata:", data);
      return data.description || "No meta description found.";
    } catch (error) {
      console.error("Error fetching meta description:", error);
      return "Failed to fetch meta description.";
    }
  };

  // Handle website URL change
  useEffect(() => {
    const url = control._formValues.companyWebsite;
    if (url) {
      fetchMetaDescription(url).then((description) => {
        setValue("companyDescription", description); // Set meta description fetched from website
      });
    }
  }, [control._formValues.companyWebsite, setValue]);

  // Simulate website scanning
  const handleScan = async () => {
    setIsScanning(true);
    setProgress(0);

    const toastId = toast.loading("Scanning your website...");

    // Simulate scanning progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          toast.success("Website scanning completed!", { id: toastId });
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    // Simulate page discovery
    setTimeout(() => {
      setPages([
        {
          id: "1",
          title: "Home",
          status: "scraped",
          chunks: [
            {
              id: "1",
              content: "This is a chunk of scraped data from the homepage.",
            },
            { id: "2", content: "Another chunk of data from the homepage." },
          ],
        },
        {
          id: "2",
          title: "About Us",
          status: "scraped",
          chunks: [
            {
              id: "3",
              content:
                "This is a chunk of scraped data from the About Us page.",
            },
          ],
        },
        { id: "3", title: "Contact", status: "pending", chunks: [] },
        { id: "4", title: "Services", status: "failed", chunks: [] },
      ]);
      setIsScanning(false);
    }, 3000);
  };

   // Handle form submission
   const onSubmit = async (data) => {
    const toastId = toast.loading("Submitting your details...");
    try {
      await handleScan(); // Start scanning after form submission
      toast.success("Details submitted successfully!", { id: toastId });
    } catch (error) {
      toast.error("Failed to submit details. Please try again.", { id: toastId });
    }
  };

  // Handle page click
  const handlePageClick = (page) => {
    setSelectedPage(page);
    toast.success(`Selected page: ${page.title}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-black/20 to-sky-900/20">
          <Toaster position="top-center" reverseOrder={false} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="p-8 bg-background/90 backdrop-blur-lg border  rounded-xl shadow-lg">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Setup Your Organization
              </h1>
              <p className="text-slate-700 mt-2">
                Let's get your organization ready
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Company Details Form */}
              <div className="space-y-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <Controller
                    name="companyName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Company Name"
                        placeholder="Enter your company name"
                        startContent={<Building2 className="text-slate-300" />}
                        error={errors.companyName?.message}
                      />
                    )}
                  />
                  <Controller
                    name="companyWebsite"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Company Website"
                        placeholder="Enter your website URL"
                        startContent={<Globe className="text-slate-300" />}
                        error={errors.companyWebsite?.message}
                      />
                    )}
                  />
                  <Controller
                    name="companyDescription"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        label="Company Description"
                        placeholder="Describe your company"
                        startContent={<FileText className="text-slate-300" />}
                        error={errors.companyDescription?.message}
                      />
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting || isScanning}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white hover-lift"
                  >
                    {isSubmitting ? "Submitting..." : "Scan Website"}
                  </Button>
                </form>
              </div>

              {/* Scanning Progress and Discovered Pages */}
              <div className="space-y-6">
                {isScanning && (
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm ">
                      <span>Scanning progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2 " />
                  </div>
                )}

                {pages.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Discovered Pages</h3>
                    <div className="space-y-3">
                      {pages.map((page) => (
                        <motion.div
                          key={page.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`p-4 rounded-lg cursor-pointer transition-all ${
                            selectedPage?.id === page.id
                              ? "bg-gradient-to-r from-primary to-secondary text-white"
                              : "bg-slate-300/10 hover:bg-slate-500/20"
                          }`}
                          onClick={() => handlePageClick(page)}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{page.title}</span>
                            <span
                              className={`text-sm ${
                                page.status === "scraped"
                                  ? "text-green-500"
                                  : page.status === "failed"
                                  ? "text-red-500"
                                  : "text-yellow-500"
                              }`}
                            >
                              {page.status === "scraped" ? (
                                <Check size={16} />
                              ) : page.status === "failed" ? (
                                <X size={16} />
                              ) : (
                                <Loader size={16} className="animate-spin" />
                              )}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selected Page Details */}
                {selectedPage && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">{selectedPage.title}</h3>
                    <div className="space-y-3">
                      {selectedPage.chunks.length > 0 ? (
                        selectedPage.chunks.map((chunk) => (
                          <div
                            key={chunk.id}
                            className="p-4 bg-gray-400/10 rounded-lg"
                          >
                            <p className="text-gray-500">{chunk.content}</p>
                          </div>
                        ))
                      ) : (
                        <p className="">No data scraped yet.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onPress={() => router.back()}
                className="hover-lift"
              >
                Back
              </Button>
              <Button
                onPress={() => router.push(`/chatbot-integration?companyWebsite=${encodeURIComponent(JSON.stringify(control._formValues.companyWebsite))}`)}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white hover-lift"
              >
                Continue to Chatbot Setup
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default SetupOrg;