import { useState } from "react";
import {
  AlertTriangle,
  Info,
  ShieldAlert,
  RotateCcw,
  MessageSquare,
  ShieldCheck,
  ChevronDown,
  GraduationCap,
  Landmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import type { ResultStep } from "@/types/simulation";
import { FeedbackModal } from "../FeedbackModal";
import { Badge } from "../ui/badge";

const levelConfig: Record<
  string,
  {
    icon: typeof Info;
    iconBgColor: string;
    iconTextColor?: string;
    typeLevel?: string;
  }
> = {
  alto_risco: {
    icon: ShieldAlert,
    iconBgColor: "bg-destructive",
    typeLevel: "Urgência",
  },
  moderado: {
    icon: AlertTriangle,
    iconBgColor: "bg-warning-500",
    typeLevel: "Atenção",
  },
  aceitavel: {
    icon: ShieldCheck,
    iconBgColor: "bg-secondary-500",
    typeLevel: "Conformidade",
  },
  "": {
    icon: Info,
    iconBgColor: "bg-muted",
    iconTextColor: "text-muted-foreground",
  },
};

interface Props {
  result: ResultStep["result"];
  onRestart: () => void;
}

export function ResultsSection({ result, onRestart }: Props) {
  const [showRecommendations, setShowRecommendations] = useState(true);

  const {
    icon: Icon,
    iconBgColor,
    iconTextColor = "text-white",
    typeLevel,
  } = levelConfig[result.key] ?? levelConfig[""];

  return (
    <section
      className="py-12 sm:py-16 lg:py-20 bg-background"
      id="results"
      data-test="result-container"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-foreground">Resultado da Análise</h2>
        </div>

        <Card
          className="mb-8 sm:mb-12 overflow-hidden"
          style={{ borderRadius: "calc(var(--radius) + 8px)" }}
        >
          <div className="grid lg:grid-cols-[1fr_200px]">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <h3 data-test="result-label">{result.label}</h3>

              <p
                className="text-foreground text-base leading-relaxed"
                data-test="result-description"
              >
                {result.description}
              </p>

              {/* Ações recomendadas */}
              {result.actions.length > 0 && (
                <Collapsible
                  open={showRecommendations}
                  onOpenChange={setShowRecommendations}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="gap-2 px-2 text-primary hover:text-primary"
                      data-test="result-button-toggle-actions"
                    >
                      <ChevronDown
                        size={20}
                        className={`transition-transform ${showRecommendations ? "rotate-180" : ""}`}
                      />
                      Ler ações recomendadas
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div
                      className="mt-4 p-4 sm:p-6 bg-primary/5 border border-primary/20 space-y-4"
                      style={{ borderRadius: "var(--radius)" }}
                    >
                      <h4>Ações Recomendadas</h4>
                      <ul className="space-y-3" data-test="result-actions-list">
                        {result.actions.map((action, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="mt-2 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                            <span className="text-base leading-relaxed">
                              {action}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}
              <div className="grid gap-4 md:grid-cols-2">
                {result.level && (
                  <div>
                    <h4>Nível de {typeLevel}</h4>
                    <p>{result.level}</p>
                  </div>
                )}
                {result.action_type && (
                  <div>
                    <h4>Tipo de Ação</h4>
                    <p>{result.action_type}</p>
                  </div>
                )}
              </div>

              {result.fonts && (
                <div
                  className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100 items-start"
                  data-purpose="legal-citation"
                >
                  <Badge
                    variant="outline"
                    className="gap-2 py-2 min-w-fit rounded-md text-primary bg-primary/5 shrink-0"
                  >
                    <Landmark size={20} />
                    <span className="font-bold text-brand-primary tracking-widest uppercase">
                      LEGAL TAG
                    </span>
                  </Badge>

                  <div className="grid md:grid-cols-[auto_1fr] gap-x-1 gap-y-2 sm:pt-2 text-muted-foreground italic w-full items-center">
                    <span className="uppercase">BASE LEGAL:</span>
                    {result.fonts.map((font, index) => (
                      <>
                        {index > 0 && <span />}
                        <a
                          key={font.label}
                          href={font.url}
                          className="w-fit"
                          rel="noopener noreferrer"
                        >
                          {font.label}
                        </a>
                      </>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>

            {/* Ícone lateral */}
            <div
              className={`${iconBgColor} flex items-center justify-center p-8 min-h-[200px] lg:min-h-0`}
            >
              <Icon
                size={80}
                className={`${iconTextColor}`}
                strokeWidth={1.5}
              />
            </div>
          </div>
        </Card>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            className="flex-1 gap-3 py-6 text-base"
            onClick={onRestart}
            data-test="result-button-restart"
          >
            <RotateCcw size={20} />
            Fazer Novamente
          </Button>
          <FeedbackModal />
        </div>

        <Separator className="my-8 sm:my-12" />

        {/* Disclaimer */}
        <Card className="bg-neutral-50">
          <CardContent className="p-4 sm:p-6">
            <p className="text-foreground text-center text-base leading-relaxed">
              <strong>Importante:</strong> Este resultado é baseado em suas
              respostas e serve como ferramenta educacional. Não substitui
              orientação profissional especializada em ética médica ou jurídica.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
