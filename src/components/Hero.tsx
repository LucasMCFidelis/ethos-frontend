import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSimulation } from "@/hooks/useSimulation";

const Hero = () => {
  const { startMutation, handleStartQuiz } = useSimulation();

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary-100 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-secondary-100 blur-3xl" />
      </div>

      <div className="container relative z-10 flex flex-col items-center text-center px-4 py-24 md:py-32">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-block rounded-full border border-border bg-card px-4 py-1.5 text-overline text-muted-foreground shadow-xs"
        >
          Plataforma Ethos
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl text-foreground sm:text-5xl md:text-6xl"
        >
          Simulador de Decisões Éticas em Telemedicina
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 max-w-xl text-body-lg text-muted-foreground"
        >
          Identifique dilemas éticos na sua prática profissional e compreenda o impacto social das suas decisões em ambientes de telemedicina.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10"
        >
          <Button
            variant="cta"
            size="lg"
            data-test="hero-button-cta"
            className="text-base px-8 py-6 w-60 gap-2 shadow-md"
            onClick={() => handleStartQuiz()}
          >
            {startMutation.isPending ? (
              <>...</>
            ) : (
              <>
                Iniciar Simulação
                <ArrowRight size={18} />
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
