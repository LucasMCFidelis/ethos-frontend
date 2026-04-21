import { useState } from "react";
import { X } from "lucide-react";

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

      <DialogContent className="max-w-[90vw] md:max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-primary">
            <h2>Você está certo disso?</h2>
          </DialogTitle>
          <DialogDescription>
            Ao confirmar, todo o progresso realizado nessa trilha será perdido!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="flex-1 gap-2" onClick={() => reset()}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
