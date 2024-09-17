import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "./dialog";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  title: string;
  message: string;
  confirmButtonLabel: string;
};

const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  isLoading = false,
  title,
  message,
  confirmButtonLabel,
}: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-lg">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" disabled={isLoading} onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={isLoading}
            onClick={onConfirm}
          >
            {confirmButtonLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
