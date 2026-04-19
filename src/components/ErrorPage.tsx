import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSimulation } from "@/hooks/useSimulation";
import { ArrowRightIcon, Home, RotateCcw } from "lucide-react";
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const DEFAULT_LINKS = [
  { label: "Página inicial", href: "/" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Entre em Contato", href: "#contato" },
];

interface ErrorPageProps {
  status?: string | number;
  title: string;
  description: string;
  icon: LucideIcon;
  actionsProps: ActionsProps;
}

interface ActionBase {
  text: string;
  action: () => void;
}

interface ActionsProps {
  primary?: ActionBase;
  secondary?: ActionBase;
}

function DefaultActions({
  primary = { text: "Voltar para Início", action: () => {} },
  secondary,
}: ActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row px-4 gap-3 justify-center">
      <Button variant="cta" className="py-6" onClick={() => primary.action()}>
        {primary.text}
      </Button>
      {secondary && (
        <Button
          variant="outline"
          className="py-6 bg-muted"
          onClick={() => secondary.action()}
        >
          {secondary.text}
        </Button>
      )}
    </div>
  );
}

export function ErrorPage({
  status,
  title,
  description,
  icon: Icon,
  actionsProps,
}: ErrorPageProps) {
  return (
    <div className="flex min-h-screen justify-between flex-col">
      <Header />
      <main className="flex  flex-col items-center justify-center px-4 py-20 bg-background">
        <div className="max-w-lg w-full text-center space-y-8">
          <div className="flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
              <Icon size={48} className="text-primary" strokeWidth={2} />
            </div>
          </div>

          <div className="space-y-3 px-4">
            {status && (
              <p className="text-6xl font-extrabold text-primary uppercase tracking-widest">
                {status}
              </p>
            )}
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              {description}
            </p>
          </div>

          <DefaultActions {...actionsProps} />

          <Card>
            <CardHeader>
              <CardTitle>Links Úteis</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {DEFAULT_LINKS.map((link) => (
                <Button
                  asChild
                  key={link.href}
                  variant="outline"
                  className="justify-between font-normal h-auto p-4"
                >
                  <a href={link.href}>
                    {link.label}
                    <ArrowRightIcon className="text-primary" />
                  </a>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
