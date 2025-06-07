"use client";

import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";

export default function FeedbackButton() {
  return (
    <Button
      className="fixed bottom-20 right-6 rounded-full shadow-lg hover:shadow-xl transition-shadow"
      size="lg"
      onClick={() =>
        window.open("https://forms.gle/4mskYqipgUU6EoJM9", "_blank")
      }
    >
      <MessageSquarePlus className="h-5 w-5 md:mr-2" />
      <span className="hidden md:inline">피드백 남기기</span>
    </Button>
  );
}
