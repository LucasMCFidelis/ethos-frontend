import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { QuizSection } from "@/components/sections/QuizSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <Hero />

        <QuizSection />

        <HowItWorksSection />

        {/* Sobre Ética na Telemedicina */}
        <section id="sobre-etica" className="py-20 bg-background">
          <div className="container lg:max-w-4xl">
            <h2 className="text-center text-foreground mb-10">
              Sobre Ética na Telemedicina
            </h2>
            <div className="space-y-6 text-body-md">
              <p>
                A telemedicina transformou o acesso aos cuidados de saúde, mas
                também trouxe novos desafios éticos que profissionais de
                tecnologia precisam considerar ao desenvolver soluções nesta
                área. área.
              </p>
              <p>
                Questões relacionadas ao sigilo médico, segurança de dados,
                consentimento informado e equidade no acesso aos serviços são
                fundamentais para garantir que a tecnologia beneficie pacientes
                e profissionais de saúde.
              </p>
            </div>

            <div
              className="mt-10 rounded-lg bg-warning-500/15 px-6 py-5 space-y-3"
              data-test="disclaimer-block"
            >
              <h3 className="text-foreground mb-1">
                Isenção de Responsabilidade
              </h3>
              <p className="text-body-sm">
                Este simulador é uma ferramenta educacional e não substitui
                orientação profissional especializada em ética médica ou
                jurídica. Os resultados apresentados são baseados em suas
                respostas e servem como ponto de reflexão inicial sobre dilemas
                éticos.
              </p>
            </div>
          </div>
        </section>

        {/* Entre em Contato */}
        <section id="contato" className="py-20 bg-muted">
          <div className="container max-w-2xl text-center">
            <h2 className="text-foreground mb-4">Entre em Contato</h2>
            <p className="text-body-md mb-8">
              Tem dúvidas ou sugestões sobre o Ethos? Gostaríamos de ouvir você.
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
