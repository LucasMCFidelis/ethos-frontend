import { cn } from "@/lib/utils";
import {
  AlertCircle,
  BadgeCheck,
  BookOpenText,
  CheckCircle2,
  Eye,
  PackageSearch,
  ShieldAlert,
} from "lucide-react";

const CARD_ICONS = {
  checkCircle: CheckCircle2,
  checkBadge: BadgeCheck,
  info: Eye,
  alert: AlertCircle,
  searchData: PackageSearch,
  protectQuestion: ShieldAlert,
  book: BookOpenText,
} as const;

export type IconLibrary = keyof typeof CARD_ICONS;

const Icon = ({
  icon = "checkCircle",
  className,
}: {
  icon?: IconLibrary;
  className?: string;
}) => {
  const Icon = CARD_ICONS[icon];
  return (
    <div
      className={cn(
        "flex justify-center items-center size-fit p-2 rounded-md bg-primary/10",
        className,
      )}
    >
      <Icon className="text-primary" />
    </div>
  );
};

export default Icon;
