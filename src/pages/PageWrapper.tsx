import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SimulationFeedbackModals } from "@/components/feedback";
import { cn } from "@/lib/utils";

const PageWrapper = ({
  children,
  extendContainerStyles,
}: {
  children: ReactNode;
  extendContainerStyles?: string;
}) => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    // Wait for sections to mount before scrolling
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [hash]);

  return (
    <div className="flex min-h-screen justify-between flex-col">
      <Header />

      <main className={cn("flex-1", extendContainerStyles)}>{children}</main>

      <Footer />
      <SimulationFeedbackModals />
    </div>
  );
};

export default PageWrapper;
