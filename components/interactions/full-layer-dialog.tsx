"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function FullLayerDialog({
  children,
  isOpen,
  title,
  description,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  title?: string;
  description?: string;
}) {
  return (
    <>
      <Dialog open={isOpen}>
        <DialogContent className="fixed w-screen h-screen left-0 top-0 translate-x-0 translate-y-0 z-50 !rounded-none max-w-none max-h-none bg-background-light dark:bg-text-black">
          <DialogHeader className="w-full">
            <DialogTitle className="text-2xl p-1">{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
}
