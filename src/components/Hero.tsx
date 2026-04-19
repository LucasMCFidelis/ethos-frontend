import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useSimulation } from "@/hooks/useSimulation";

const Hero = () => {
  const { startMutation, handleStartQuiz } = useSimulation();

  return (
    <section className="relative flex mx-auto lg:min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden">
      <div className="container max-w-lg sm:max-w-2xl md:max-w-3xl relative z-10 flex flex-col items-center text-center px-4 py-24 md:py-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Simulador de Decisões Éticas em Telemedicina
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 text-body-lg max-w-xl"
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
              <>
                Iniciando Simulação
                <Spinner />
              </>
            ) : (
              <>Iniciar Simulação</>
            )}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
