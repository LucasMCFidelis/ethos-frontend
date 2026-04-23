import { useState } from "react";
import { AlertCircle, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useSimulation } from "@/hooks/useSimulation";

export function ResetQuestionnaireModal() {
  const { reset } = useSimulation();

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex justify-end mb-6">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="size-6 text-muted-foreground"
            onClick={() => setOpen(true)}
          >
            <X />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-w-[90vw] sm:max-w-md rounded-2xl space-y-4 border border-2 border-destructive"
      >
        <DialogHeader className="flex-row items-start gap-4 space-y-0 w-11/12">
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-full text-error-500 bg-error-100"
            aria-hidden="true"
          >
            <AlertCircle />
          </div>
          <div className="flex-1 space-y-2 text-left">
            <DialogTitle className="text-lg font-semibold leading-tight">
              Deseja realmente sair?
            </DialogTitle>
            <DialogDescription className="text-sm sm:w-4/5 leading-relaxed text-muted-foreground">
              Você perderá todo o progresso do questionário e precisará começar
              novamente.
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:space-x-0">
          <Button
            variant="outline"
            className="w-full py-6 text-muted-foreground"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            className="w-full py-6 text-base font-semibold"
            onClick={() => reset()}
          >
            Sim, sair
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
