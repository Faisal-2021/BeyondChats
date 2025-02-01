"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Card, Progress } from "@heroui/react";
import { motion } from "framer-motion";
import { Share, Mail, Check, X, MessageCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const ChatbotIntegration = () => {
  const router = useRouter();
  const [integrationStatus, setIntegrationStatus] = useState("pending");
  const [isTesting, setIsTesting] = useState(false);
  const searchParam = useSearchParams();
  const companyWebsite = searchParam.get("companyWebsite");
  const companyWebsiteUrl = JSON.parse(decodeURIComponent(companyWebsite));

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (!isValidUrl(companyWebsiteUrl)) {
      toast.error("Invalid URL provided. Redirecting to error page...");
      router.push("/error");
    }
  }, [companyWebsiteUrl, router]);

  
  const handleTestIntegration = async () => {
    setIsTesting(true);
    const toastId = toast.loading("Testing integration...");
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5;
      if (isSuccess) {
        toast.success("Integration test successful!", { id: toastId });
        setIntegrationStatus("success");
      } else {
        toast.error("Integration test failed. Please try again.", {
          id: toastId,
        });
        setIntegrationStatus("failed");
      }
      setIsTesting(false);
    }, 3000);
  }

 
  const handleTestChatbot = () => {
    const newWindow = window.open(companyWebsiteUrl, "_blank");
    if (!newWindow) {
      toast.error("Popup blocked! Please allow popups for this site.");
      return;
    }

    newWindow.onload = () => {
      const script = newWindow.document.createElement("script");
      script.src = "https://dummy-chatbot-integration.com/script.js";
      script.async = true;
      newWindow.document.body.appendChild(script);
      toast.success("Chatbot loaded successfully on your website!");
    };
  };

  useEffect(() => {
    if (integrationStatus === "success") {
      router.push(
        `/chatbot-integration/integration-success?companyWebsite=${encodeURIComponent(
          JSON.stringify(companyWebsiteUrl)
        )}`
      );
    } else if (integrationStatus === "failed") {
      router.push(
        `/chatbot-integration/integration-failed?companyWebsite=${encodeURIComponent(
          JSON.stringify(companyWebsiteUrl)
        )}`
      );
    }
  }, [integrationStatus, router, companyWebsiteUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <Toaster position="top-center" reverseOrder={false} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="p-8 bg-white/90 backdrop-blur-lg rounded-xl shadow-lg border border-white/20">
          <div className="space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full"
              >
                <MessageCircle className="w-12 h-12 text-white" />
              </motion.div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-relaxed">
                Chatbot Integration
              </h1>
              <p className="text-slate-500 text-lg">
                Seamlessly integrate and test your chatbot on your website.
              </p>
            </div>

            {/* Test Chatbot Button */}
            <div className="space-y-4">
              <Button
                onPress={handleTestChatbot}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover-lift"
                startContent={<Share size={16} />}
                aria-label="Test Chatbot"
              >
                Test Chatbot on Your Website
              </Button>
              <p className="text-sm text-gray-500 text-center">
                Chatbot not working as intended?{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Share feedback
                </a>
              </p>
            </div>

            {/* Integrate on Your Website Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-900">
                Integrate on Your Website
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
              <Button
                  onPress={() => {
                    navigator.clipboard.writeText(
                      '<script src="https://dummy-chatbot-integration.com/script.js"></script>'
                    );
                    toast.success("Integration code copied to clipboard!");
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover-lift"
                  startContent={<Check size={16} />}
                >
                  Copy Integration Code
                </Button>
                <Button
                  onPress={() => {
                    toast.success("Instructions sent to your developer's email!");
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover-lift"
                  startContent={<Mail size={16} />}
                >
                  Mail Instructions to Developer
                </Button>
              </div>
            </div>

            {/* Test Integration Button */}
            <div className="space-y-4">
              <Button
                disabled={isTesting}
                onPress={handleTestIntegration}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover-lift"
              >
                {isTesting ? "Testing Integration..." : "Test Integration"}
              </Button>
              {isTesting && <Progress value={50} className="w-full" />}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ChatbotIntegration;
