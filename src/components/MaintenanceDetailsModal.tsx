import { Wrench } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface MaintenanceDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GENERIC_DETAILS =
  "Estamos realizando melhorias na infraestrutura para oferecer uma experiência mais rápida, segura e estável. Durante esse período, algumas funcionalidades podem ficar temporariamente indisponíveis. Agradecemos pela paciência e compreensão.";

export function MaintenanceDetailsModal({
  open,
  onOpenChange,
}: MaintenanceDetailsModalProps) {
  const details =
    import.meta.env.VITE_MAINTENANCE_DETAILS?.toString().trim() || GENERIC_DETAILS;
  const estimate = import.meta.env.VITE_MAINTENANCE_ESTIMATE?.toString().trim();
  const contact = import.meta.env.VITE_MAINTENANCE_CONTACT?.toString().trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] md:max-w-md rounded-2xl">
        <DialogHeader className="flex-row items-start gap-4 space-y-0 w-11/12">
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-warning-100"
            aria-hidden="true"
          >
            <Wrench className="size-6 text-warning-500" />
          </div>
          <div className="flex-1 space-y-2 text-left">
            <DialogTitle className="text-lg font-semibold leading-tight">
              Sobre a Manutenção
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
              {details}
            </DialogDescription>
          </div>
        </DialogHeader>

        {(estimate || contact) && (
          <div className="space-y-2 rounded-lg bg-muted p-4 text-sm">
            {estimate && (
              <p>
                <span className="font-semibold">Previsão de retorno:</span>{" "}
                <span className="text-muted-foreground">{estimate}</span>
              </p>
            )}
            {contact && (
              <p>
                <span className="font-semibold">Contato:</span>{" "}
                <span className="text-muted-foreground">{contact}</span>
              </p>
            )}
          </div>
        )}

        <DialogFooter className="flex flex-col gap-2 sm:flex-col sm:space-x-0">
          <Button
            className="w-full py-6 text-base font-semibold"
            onClick={() => onOpenChange(false)}
          >
            Entendi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
