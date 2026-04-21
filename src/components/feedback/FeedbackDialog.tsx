import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type FeedbackDialogVariant = "error" | "warning";

export interface FeedbackDialogAction {
  label: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant?: FeedbackDialogVariant;
  icon: LucideIcon;
  title: string;
  description: string;
  primaryAction: FeedbackDialogAction;
  secondaryAction?: FeedbackDialogAction;
  cancelLabel?: string;
  hint?: string;
  testId?: string;
}

const VARIANT_STYLES: Record<
  FeedbackDialogVariant,
  { wrapper: string; icon: string }
> = {
  error: {
    wrapper: "bg-error-100",
    icon: "text-error-500",
  },
  warning: {
    wrapper: "bg-warning-100",
    icon: "text-warning-500",
  },
};

export function FeedbackDialog({
  open,
  onOpenChange,
  variant = "error",
  icon: Icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  cancelLabel = "Cancelar",
  hint = "Dica: Pressione ESC para fechar ou clique fora do modal",
  testId,
}: FeedbackDialogProps) {
  const styles = VARIANT_STYLES[variant];

  const handleCancel = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[90vw] md:max-w-md rounded-2xl"
        data-test={testId}
      >
        <DialogHeader className="flex-row items-start gap-4 space-y-0 pr-6">
          <div
            className={cn(
              "flex size-12 shrink-0 items-center justify-center rounded-full",
              styles.wrapper,
            )}
            aria-hidden="true"
          >
            <Icon className={cn("size-6", styles.icon)} />
          </div>
          <div className="flex-1 space-y-2 text-left">
            <DialogTitle className="text-lg font-semibold leading-tight">
              {title}
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="flex flex-col gap-2 sm:flex-col sm:space-x-0">
          <Button
            className="w-full py-6 text-base font-semibold"
            onClick={primaryAction.onClick}
            disabled={primaryAction.disabled || primaryAction.loading}
            data-test={testId ? `${testId}-primary` : undefined}
          >
            {primaryAction.label}
          </Button>

          {secondaryAction && (
            <Button
              variant="secondary"
              className="w-full py-6 text-base font-semibold"
              onClick={secondaryAction.onClick}
              disabled={secondaryAction.disabled || secondaryAction.loading}
              data-test={testId ? `${testId}-secondary` : undefined}
            >
              {secondaryAction.label}
            </Button>
          )}

          <Button
            variant="ghost"
            className="w-full text-muted-foreground"
            onClick={handleCancel}
            data-test={testId ? `${testId}-cancel` : undefined}
          >
            {cancelLabel}
          </Button>
        </DialogFooter>

        {hint && (
          <p className="pt-2 text-center text-xs text-muted-foreground">
            {hint}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
