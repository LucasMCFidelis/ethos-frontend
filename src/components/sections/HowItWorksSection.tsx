import { HelpCircle, Users, TrendingUp, type LucideIcon } from "lucide-react";

interface Step {
  icon: LucideIcon;
  iconBgColor: string;
  iconTextColor: string;
  title: string;
  description: string;
  dataTest: string;
}

const steps: Step[] = [
  {
    icon: HelpCircle,
    iconBgColor: "bg-primary/10",
    iconTextColor: "text-primary",
    title: "1. Responda às Perguntas",
    description:
      "O questionário apresenta situações contextuais relacionadas à prática de telemedicina. Todas as perguntas utilizam linguagem neutra e objetiva para evitar viés.",
    dataTest: "card-step-1",
  },
  {
    icon: Users,
    iconBgColor: "bg-secondary/10",
    iconTextColor: "text-secondary",
    title: "2. Identifique Dilemas Éticos",
    description:
      "Suas respostas nos ajudam a identificar áreas onde dilemas éticos podem surgir em sua prática profissional, considerando aspectos de privacidade, segurança e responsabilidade.",
    dataTest: "card-step-2",
  },
  {
    icon: TrendingUp,
    iconBgColor: "bg-warning-900/10",
    iconTextColor: "text-warning-500",
    title: "3. Avaliação de Impacto",
    description:
      "Ao final, você receberá uma classificação do nível de impacto social identificado: Grave, Moderado ou Baixo, com orientações sobre aspectos éticos relevantes.",
    dataTest: "card-step-3",
  },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-20 bg-muted">
      <div className="container">
        <h2 className="text-center text-foreground mb-12">
          Como o Ethos Funciona
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(
            ({ icon: Icon, iconTextColor, iconBgColor, title, description, dataTest }) => (
              <div
                key={dataTest}
                className="rounded-lg border border-border bg-card p-8 space-y-4 shadow-sm"
                data-test={dataTest}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${iconBgColor}`}>
                  <Icon
                    size={24}
                    className={`${iconTextColor}`}
                  />
                </div>
                <span className="block text-foreground text-body-lg font-semibold">
                  {title}
                </span>
                <p className="text-body-sm">{description}</p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
