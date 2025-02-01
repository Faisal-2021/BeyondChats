import Link from "next/link";
import { Button } from "@heroui/react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Bot Image */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            <Image
              alt="Chatbot Illustration"
              src="/chatbot.png"
              fill
              className="object-contain animate-float"
              priority
            />
          </div>

          {/* Heading and Subheading */}
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
            Transform Your Website with AI-Powered Chat
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Integrate intelligent chatbot capabilities into your website in
            minutes. Enhance customer engagement and automate support.
          </p>

          <Button
            color="primary"
            variant="solid"
            radius="full"
            size="lg"
            className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
