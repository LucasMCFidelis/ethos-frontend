import { useParams, useNavigate } from "react-router-dom";
import {
  libraryData,
  type ContentItemData,
  type ContentItemLeaf,
} from "@/data/library.data";
import PageWrapper from "./PageWrapper";
import {
  AlertCircle,
  ArrowLeft,
  BookOpenText,
  CheckCircle2,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CARD_ICONS = {
  check: CheckCircle2,
  info: Eye,
  alert: AlertCircle,
  book: BookOpenText,
} as const;

const CardIcon = ({ icon = "check" }: { icon?: keyof typeof CARD_ICONS }) => {
  const Icon = CARD_ICONS[icon];
  return (
    <div className="flex justify-center items-center size-fit p-2 rounded-md bg-primary/10">
      <Icon className="text-primary" />
    </div>
  );
};

const ContentLabel = ({ label }: { label: string }) => (
  <label className="flex items-center gap-4 text-lg font-medium mb-5">
    <Badge className="w-8" />
    {label}
  </label>
);

const SubItemList = ({ items }: { items: Array<ContentItemLeaf> }) => (
  <div className="flex flex-col gap-4">
    {items.map((subItem, index) => (
      <div
        key={subItem.label}
        className="flex gap-2 bg-primary/10 border-l-4 p-2 border-primary"
      >
        <span className="text-muted-foreground w-20">{index + 1}</span>
        <div>
          <h5 className="font-medium">{subItem.label}</h5>
          <p className="text-muted-foreground">{subItem.content}</p>
        </div>
      </div>
    ))}
  </div>
);

const ContentItem = ({ item }: { item: ContentItemData }) => {
  const isString = typeof item.content === "string";

  if (isString && item.card) {
    return (
      <Card>
        <CardContent className="grid grid-cols-[5%_1fr] gap-4 p-4">
          <CardIcon icon={item.card.icon} />
          <div>
            <label className="flex items-center gap-4 text-lg font-medium">
              {item.label}
            </label>
            <p className="text-muted-foreground">{item.content as string}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <ContentLabel label={item.label} />
      {isString ? (
        <p className="text-muted-foreground">{item.content as string}</p>
      ) : (
        <SubItemList items={item.content as ContentItemLeaf[]} />
      )}
    </>
  );
};

const LibraryDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const item = libraryData.find((i) => i.id === id);

  if (!item) {
    navigate("/not-found", { replace: true });
    return null;
  }

  return (
    <PageWrapper extendContainerStyles="container mx-auto py-10">
      <Button asChild variant="link" className="text-primary px-0 mb-8">
        <a href="/library">
          <ArrowLeft />
          Voltar para Biblioteca
        </a>
      </Button>

      <h1 className="mb-2">{item.title}</h1>
      <p className="text-muted-foreground text-body-lg mb-8">
        {item.elements.descriptionCurt}
      </p>

      {item.elements.imageUrl && (
        <div
          className="w-full h-48 bg-cover bg-center rounded-lg mb-8"
          style={{ backgroundImage: `url(${item.elements.imageUrl})` }}
        />
      )}

      {item.elements.items.map((contentItem) => (
        <div key={contentItem.label} className="mb-8">
          <ContentItem item={contentItem} />
        </div>
      ))}

      <Card className="mt-12 bg-primary-100">
        <CardContent className="grid grid-cols-[5%_1fr] gap-4 p-4">
          <div className="flex justify-center items-center size-fit p-2">
            <BookOpenText className="text-primary" />
          </div>
          <div className="space-y-5">
            <label className="text-lg font-medium">Fonte Normativa</label>
            {item.font.citation && (
              <>
                <p className="italic leading-relaxed text-muted-foreground">
                  "{item.font.citation}"
                </p>
                <Separator className="bg-primary-200" />
              </>
            )}
            <a
              href={item.font.fontHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-bold block mt-5"
            >
              {item.font.fontLabel}
            </a>
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  );
};

export default LibraryDetails;
