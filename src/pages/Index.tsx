import { useState } from "react";
import { HelpCircle, Users, TrendingUp, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [impactLevel, setImpactLevel] = useState<string | null>(null);

  const handleStartQuiz = () => {
    setShowQuestionnaire(true);
    setQuizCompleted(false);
    setImpactLevel(null);
    setTimeout(() => {
      document.getElementById("questionnaire")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleNavigate = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header onNavigate={handleNavigate} onStartQuiz={handleStartQuiz} />

      <main className="flex-1">
        <Hero onStartQuiz={handleStartQuiz} />

        {/* Questionnaire — conditional */}
        {showQuestionnaire && !quizCompleted && (
          <section id="questionnaire" className="py-20 bg-background">
            <div className="container max-w-3xl text-center">
              <h2 className="text-foreground mb-4">Questionário Ético</h2>
              <p className="text-body-lg text-muted-foreground">
                Em breve: o questionário interativo será exibido aqui.
              </p>
            </div>
          </section>
        )}

        {/* Results — conditional */}
        {quizCompleted && impactLevel && (
          <section id="resultados" className="py-20 bg-background">
            <div className="container max-w-3xl text-center">
              <h2 className="text-foreground mb-4">Resultado da Avaliação</h2>
              <p className="text-body-lg text-muted-foreground">
                Nível de impacto: <strong>{impactLevel}</strong>
              </p>
            </div>
          </section>
        )}

        {/* Como o Ethos Funciona */}
        <section id="como-funciona" className="py-20 bg-muted">
          <div className="container">
            <h2 className="text-center text-foreground mb-12">Como o Ethos Funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="rounded-lg border border-border bg-card p-8 shadow-sm" data-test="card-step-1">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                  <HelpCircle size={24} className="text-primary" />
                </div>
                <h3 className="text-foreground mb-3">1. Responda às Perguntas</h3>
                <p className="text-body-sm text-muted-foreground">
                  O questionário apresenta situações contextuais relacionadas à prática
                  de telemedicina. Todas as perguntas utilizam linguagem neutra e objetiva
                  para evitar viés.
                </p>
              </div>

              {/* Card 2 */}
              <div className="rounded-lg border border-border bg-card p-8 shadow-sm" data-test="card-step-2">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                  <Users size={24} className="text-primary" />
                </div>
                <h3 className="text-foreground mb-3">2. Identifique Dilemas Éticos</h3>
                <p className="text-body-sm text-muted-foreground">
                  Suas respostas nos ajudam a identificar áreas onde dilemas éticos
                  podem surgir em sua prática profissional, considerando aspectos
                  de privacidade, segurança e responsabilidade.
                </p>
              </div>

              {/* Card 3 */}
              <div className="rounded-lg border border-border bg-card p-8 shadow-sm" data-test="card-step-3">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                  <TrendingUp size={24} className="text-primary" />
                </div>
                <h3 className="text-foreground mb-3">3. Avaliação de Impacto</h3>
                <p className="text-body-sm text-muted-foreground">
                  Ao final, você receberá uma classificação do nível de impacto
                  social identificado: Grave, Moderado ou Baixo, com orientações sobre
                  aspectos éticos relevantes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sobre Ética na Telemedicina */}
        <section id="sobre-etica" className="py-20 bg-background">
          <div className="container max-w-3xl">
            <h2 className="text-center text-foreground mb-10">Sobre Ética na Telemedicina</h2>
            <div className="space-y-6 text-body-md text-muted-foreground">
              <p>
                A telemedicina transformou o acesso aos cuidados de saúde, mas também trouxe
                novos desafios éticos que profissionais de tecnologia precisam considerar ao
                desenvolver soluções nesta área.
              </p>
              <p>
                Questões relacionadas ao sigilo médico, segurança de dados, consentimento
                informado e equidade no acesso aos serviços são fundamentais para garantir
                que a tecnologia beneficie pacientes e profissionais de saúde.
              </p>
            </div>

            {/* Disclaimer block */}
            <div
              className="mt-10 rounded-lg border-l-4 border-warning-500 bg-warning-100 px-6 py-5"
              data-test="disclaimer-block"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="mt-0.5 shrink-0 text-warning-900" />
                <div>
                  <h4 className="text-foreground mb-1">Isenção de Responsabilidade</h4>
                  <p className="text-body-sm text-muted-foreground">
                    Este simulador é uma ferramenta educacional e não substitui orientação
                    profissional especializada em ética médica ou jurídica. Os resultados
                    apresentados são baseados em suas respostas e servem como ponto de reflexão
                    inicial sobre dilemas éticos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Entre em Contato */}
        <section id="contato" className="py-20 bg-muted">
          <div className="container max-w-2xl text-center">
            <h2 className="text-foreground mb-4">Entre em Contato</h2>
            <p className="text-body-md text-muted-foreground mb-8">
              Possui dúvidas ou sugestões sobre o Ethos? Nossa equipe está disponível para auxiliar.
            </p>
            <Button
              variant="cta"
              size="lg"
              asChild
              data-test="contact-button-email"
            >
              <a
                href="mailto:contato@ethos.example.com"
                aria-label="Enviar e-mail para a equipe Ethos"
              >
                Enviar E-mail
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
