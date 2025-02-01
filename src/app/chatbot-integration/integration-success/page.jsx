"use client";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { CheckCircle, Share2, MessageCircle, Twitter, Facebook } from "lucide-react";
import ReactConfetti from "react-confetti";
import { useEffect, useState } from "react";

function IntegrateSuccess({ companyWebsiteUrl }) {
  const [confettiWidth, setConfettiWidth] = useState(0);
  const [confettiHeight, setConfettiHeight] = useState(0);

  // Set confetti dimensions based on window size
  useEffect(() => {
    const updateDimensions = () => {
      setConfettiWidth(window.innerWidth);
      setConfettiHeight(window.innerHeight);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-teal-50 relative overflow-hidden">
      {/* Confetti Animation */}
      <ReactConfetti
        width={confettiWidth}
        height={confettiHeight}
        numberOfPieces={200}
        recycle={false}
        gravity={0.1}
        className="absolute inset-0"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-8 max-w-md relative z-10"
      >
        {/* Icon with Animation */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-teal-600 p-6 rounded-full shadow-lg"
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>

        {/* Heading */}
        <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
          Integration Successful!
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-lg">
          Your chatbot has been successfully integrated. Start engaging with your
          visitors now!
        </p>

        {/* Primary Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            // onPress={() => router.push("/admin")}
            className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white hover-lift"
            startContent={<Share2 size={16} />}
          >
            Explore Admin Panel
          </Button>
          <Button
            // onPress={() => window.open(companyWebsiteUrl, "_blank")}
            className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white hover-lift"
            startContent={<MessageCircle size={16} />}
          >
            Start Talking to Your Chatbot
          </Button>
        </div>

        {/* Social Sharing Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 hover-lift"
            startContent={<Twitter size={16} />}
          >
            Share on Twitter
          </Button>
          <Button
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 hover-lift"
            startContent={<Facebook size={16} />}
          >
            Share on Facebook
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default IntegrateSuccess;