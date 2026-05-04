import { Linkedin, Globe, Github } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { members } from "@/data/team.data";

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

const PortfolioIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 5.25V3C3 2.60218 3.15804 2.22064 3.43934 1.93934C3.72064 1.65804 4.10218 1.5 4.5 1.5H13.5C13.8978 1.5 14.2794 1.65804 14.5607 1.93934C14.842 2.22064 15 2.60218 15 3V15C15 15.3978 14.842 15.7794 14.5607 16.0607C14.2794 16.342 13.8978 16.5 13.5 16.5H4.5C4.10218 16.5 3.72064 16.342 3.43934 16.0607C3.15804 15.7794 3 15.3978 3 15V12.75"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6.75 9H14.25"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6.75 12H14.25"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M3 9H4.5"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M3 12H4.5"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

interface MemberLinkProps {
  href: string;
  label: string;
  dataTest: string;
  icon: React.ReactNode;
}

const MemberLink = ({ href, label, dataTest, icon }: MemberLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="bg-neutral-100 p-2 rounded-sm hover:text-primary transition-colors"
    data-test={dataTest}
  >
    {icon}
  </a>
);

const TeamSection = () => {
  return (
    <section className="flex-1 py-20 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-center text-foreground mb-4">Nossa Equipe</h2>
          <p className="text-body-md text-muted-foreground max-w-2xl mx-auto">
            Conheça as pessoas que desenvolveram o Ethos. Essa plataforma foi
            desenvolvida no Programa de Simulação{" "}
            <a
              href="https://www.pipocaagil.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary"
            >
              Pipoca Ágil
            </a>
            .
          </p>
        </div>

        {/* Team grid */}
        {members.length === 0 ? (
          <p
            className="text-center text-body-sm text-muted-foreground"
            data-test="team-empty-state"
          >
            Em breve apresentaremos os membros da equipe.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {members.map((member) => (
              <Card
                key={member.name}
                data-test={`team-card-${member.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex flex-col justify-between items-center text-center bg-neutral-50 border-neutral-200 "
              >
                <CardHeader className="items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    {member.imageUrl ? (
                      <AvatarImage
                        src={member.imageUrl}
                        alt={member.name}
                        className="object-cover"
                      />
                    ) : null}
                    <AvatarFallback className="text-3xl font-bold text-primary">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription>{member.position}</CardDescription>
                </CardHeader>

                {(member.linkedIn || member.gitHub || member.portfolio) && (
                  <CardContent className="flex flex-wrap sm:flex-nowrap px-2 w-full items-center justify-center gap-3">
                    {member.linkedIn && (
                      <MemberLink
                        href={member.linkedIn}
                        label={`LinkedIn de ${member.name}`}
                        dataTest="team-link-linkedin"
                        icon={<Linkedin size={18} strokeWidth={2} />}
                      />
                    )}
                    {member.gitHub && (
                      <MemberLink
                        href={member.gitHub}
                        label={`GitHub de ${member.name}`}
                        dataTest="team-link-github"
                        icon={<Github size={18} strokeWidth={2} />}
                      />
                    )}
                    {member.portfolio && (
                      <MemberLink
                        href={member.portfolio}
                        label={`Portfólio de ${member.name}`}
                        dataTest="team-link-portfolio"
                        icon={<PortfolioIcon />}
                      />
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
