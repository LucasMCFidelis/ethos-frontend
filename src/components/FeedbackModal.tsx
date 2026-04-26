import { useState } from "react";
import { Star, Send, MessageSquare, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { useSimulation } from "@/hooks/useSimulation";

export interface FeedbackFormData {
  rate: number | null;
  useObjective: string | null;
  improvementAreas: string[];
  suggestion: string;
  email: string;
}

const USE_OBJECTIVES = [
  "Entender dilemas éticos em telemedicina",
  "Avaliar minha prática profissional",
  "Aprender sobre regulamentações",
  "Outro (por favor, especifique)",
] as const;

export function FeedbackModal() {
  const { sendFeedback, feedbackMutation } = useSimulation();

  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState({
    rate: null as number | null,
    useObjective: null as string | null,
    suggestion: "",
  });

  const canSubmit = form.rate !== null && form.useObjective !== null;

  const loading = feedbackMutation.isPending;
  const alreadySent = feedbackMutation.isSuccess;

  function resetForm() {
    setForm({
      rate: null,
      useObjective: null,
      suggestion: "",
    });

    setHovered(null);
  }

  function handleClose() {
    setOpen(false);
    if (!alreadySent) resetForm();
  }

  function handleSubmit() {
    if (!canSubmit) return;

    sendFeedback(
      {
        rate: form.rate!,
        useObjective: form.useObjective!,
        suggestion: form.suggestion || undefined,
      },
      {
        onSuccess: () => {
          setShowSuccess(true);
          toast.success("Feedback enviado com sucesso!", {
            description: "Obrigado pela sua contribuição.",
          });
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex-1 gap-3 py-6 text-base"
          disabled={alreadySent}
        >
          {alreadySent ? (
            <>
              <CheckCircle2 className="h-5 w-5 text-secondary-500" />
              Feedback Enviado
            </>
          ) : (
            <>
              <MessageSquare className="h-5 w-5" />
              Enviar Feedback
            </>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[90vw] md:max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg">
        {showSuccess || alreadySent ? (
          <div className="flex flex-col items-center justify-center text-center py-8 px-4 space-y-6">
            <div className="rounded-full bg-secondary-500/10 p-4">
              <CheckCircle2
                className="h-16 w-16 text-secondary-500"
                strokeWidth={1.5}
              />
            </div>
            <DialogHeader className="text-center">
              <DialogTitle className="text-primary text-center">
                <h2>Feedback Enviado!</h2>
              </DialogTitle>
              <DialogDescription className="text-base pt-2">
                Obrigado pela sua contribuição. Sua opinião nos ajuda a melhorar
                continuamente o Ethos.
              </DialogDescription>
            </DialogHeader>
            <Button
              className="px-8 py-6"
              onClick={() => {
                setShowSuccess(false);
                setOpen(false);
              }}
            >
              Fechar
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="text-start max-w-48 md:max-w-full">
              <DialogTitle className="text-primary">
                <h2>Sua Contribuição é Valiosa!</h2>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-8 max-w-[80%] sm:max-w-full">
              {/* Avaliação */}
              <section className="space-y-3 ">
                <Label>Como você avaliaria o resultado?</Label>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const active =
                      hovered !== null
                        ? star <= hovered
                        : form.rate !== null && star <= form.rate;

                    return (
                      <Button
                        key={star}
                        type="button"
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "transition-colors size-9",
                          active
                            ? "fill-primary text-primary"
                            : "text-neutral-200",
                        )}
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            rate: star,
                          }))
                        }
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(null)}
                        asChild
                      >
                        <Star />
                      </Button>
                    );
                  })}
                </div>
              </section>

              {/* Objetivo */}
              <section className="space-y-4">
                <Label>
                  Qual é seu principal objetivo ao utilizar o Ethos? (Selecione
                  uma opção)
                </Label>

                <div className="grid sm:grid-cols-2 gap-5">
                  {USE_OBJECTIVES.map((item) => (
                    <Button
                      key={item}
                      size="lg"
                      variant="outline"
                      className={`py-3 text-md text-wrap font-normal h-fit text-start hover:bg-transparent ${
                        form.useObjective == item
                          ? "border-2 border-primary-700"
                          : ""
                      } `}
                      onClick={() => setForm({ ...form, useObjective: item })}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </section>

              {/* Sugestão */}
              <section className="space-y-3">
                <Label htmlFor="suggestion">
                  Que novo recurso você gostaria de implementar no Ethos?
                </Label>

                <Textarea
                  id="suggestion"
                  rows={4}
                  placeholder="Descreva o novo recurso que você gostaria de implementar..."
                  value={form.suggestion}
                  className="resize-none"
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      suggestion: e.target.value,
                    }))
                  }
                />
              </section>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 py-3 sm:py-6"
                  onClick={handleClose}
                  disabled={loading}
                >
                  Cancelar
                </Button>

                <Button
                  className="flex-1 py-3 sm:py-6 gap-2 disabled:bg-muted disabled:text-neutral-500"
                  onClick={handleSubmit}
                  disabled={!canSubmit || loading}
                >
                  <Send className="h-4 w-4" />
                  {loading ? "Enviando..." : "Enviar Contribuição"}
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
