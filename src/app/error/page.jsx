"use client";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

function ErrorPage() {
    const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 to-orange-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-8 max-w-md"
      >
        {/* Icon with Animation */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-orange-600 p-6 rounded-full shadow-lg"
        >
          <AlertTriangle className="w-12 h-12 text-white" />
        </motion.div>

        {/* Heading */}
        <h3 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          Oops! Something Went Wrong
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-lg">
          We encountered an issue while processing your request. Please try again
          or contact support if the problem persists.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white hover-lift"
            startContent={<RefreshCw size={16} />}
          >
            Try Again
          </Button>
          <Button
            onPress={() => router.push("/")}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white hover-lift"
            startContent={<Home size={16} />}
          >
            Go to Home
          </Button>
        </div>

        {/* Support Link */}
        <p className="text-sm text-muted-foreground">
          Still having trouble?{" "}
          <a
            href="mailto:support@chatbot.com"
            className="text-red-600 hover:underline"
          >
            Contact Support
          </a>
        </p>
      </motion.div>
    </div>
  );
}

export default ErrorPage;