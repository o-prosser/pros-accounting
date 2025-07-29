"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  // return (
  //   <div className="fixed inset-0 bg-black/50 grid place-items-center z-50">
  //     <div className="bg-background z-50 grid w-full mac-w-[calc(100%-2rem)] gap-4 rounded-lg border p-6 shadow-lg sm:max-w-lg">
  //       {children}
  //     </div>
  //   </div>
  // );

  return (
    <Dialog defaultOpen open onOpenChange={() => router.back()}>
      <DialogContent className="relative" showCloseButton={false}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
