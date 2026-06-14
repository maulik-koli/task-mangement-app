import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

export interface CustomDialogProps {
  triggerNode?: ReactNode;
  title?: ReactNode | string;
  description?: ReactNode | string;
  children: ReactNode;
  footerNode?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  contentClassName?: string;
  headerClassName?: string;
  showCloseButton?: boolean;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  triggerNode,
  title,
  description,
  children,
  footerNode,
  open,
  onOpenChange,
  contentClassName,
  headerClassName,
  showCloseButton = true,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {triggerNode && <DialogTrigger asChild>{triggerNode}</DialogTrigger>}
      <DialogContent className={contentClassName} showCloseButton={showCloseButton}>
        {(title || description) && (
          <DialogHeader className={headerClassName}>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        
        {children}
        
        {footerNode && <DialogFooter>{footerNode}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
