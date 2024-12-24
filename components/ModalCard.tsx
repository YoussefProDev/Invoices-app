"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalCardProps {
  title: string;
  description?: string | React.ReactNode;
  isModalOpen: boolean;
  canClose: boolean;
  children: React.ReactNode;
  isLoading?: boolean;
}
const ModalCard = ({
  title,
  description,
  isModalOpen,
  canClose,
  children,
}: ModalCardProps) => {
  const handleClose = async () => {};

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ModalCard;
