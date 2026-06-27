import { useParams, useNavigate } from "react-router-dom";
import {
  libraryData,
  type ContentItemData,
  type ContentItemLeaf,
} from "@/data/library.data";
import PageWrapper from "./PageWrapper";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/Icon";

const ContentLabel = ({ label }: { label: string }) => (
  <label className="flex items-center gap-3 text-body-lg font-medium mb-5 text-foreground">
    <span className="h-2 w-2 md:w-8 rounded-full bg-primary shrink-0" />
    {label}
  </label>
);

const SubItemList = ({ items }: { items: Array<ContentItemLeaf> }) => (
  <div className="flex flex-col gap-4">
    {items.map((subItem, index) => (
      <div
        key={subItem.label}
        className="flex gap-3 bg-primary/10 border-l-4 p-4 border-primary rounded-r-md"
      >
        <span className="text-body-sm text-muted-foreground min-w-6 shrink-0">
          {index + 1}
        </span>
        <div className="min-w-0">
          <h5 className="font-medium text-foreground mb-1">{subItem.label}</h5>
          <p className="text-body-sm text-muted-foreground">
            {subItem.content}
          </p>
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
        <CardContent className="flex items-start gap-4 p-4 md:p-6">
          <Icon icon={item.card.icon} />
          <div className="min-w-0 flex-1">
            <label className="block text-body-lg font-medium text-foreground mb-2">
              {item.label}
            </label>
            <p className="text-body-sm text-muted-foreground">
              {item.content as string}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <ContentLabel label={item.label} />
      {isString ? (
        <p className="text-body-md text-muted-foreground">
          {item.content as string}
        </p>
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
    <PageWrapper extendContainerStyles="container py-12 md:py-20">
      <Button asChild variant="link" className="text-primary px-0 mb-6 md:mb-8">
        <a href="/library">
          <ArrowLeft />
          Voltar para Biblioteca
        </a>
      </Button>

      <h1 className="mb-3 text-foreground">{item.title}</h1>
      <p className="text-body-lg text-muted-foreground mb-8 max-w-3xl">
        {item.elements.descriptionCurt}
      </p>

      {item.elements.imageUrl && (
        <div
          className="w-full aspect-[16/9] md:aspect-[21/9] bg-cover bg-center rounded-lg mb-10"
          style={{ backgroundImage: `url(${item.elements.imageUrl})` }}
        />
      )}

      <div className="space-y-8 md:space-y-10">
        {item.elements.items.map((contentItem) => (
          <div key={contentItem.label}>
            <ContentItem item={contentItem} />
          </div>
        ))}
      </div>

      <Card className="mt-12 bg-primary-100 border-primary-200">
        <CardContent className="flex items-start gap-4 p-4 md:p-6">
          <Icon icon="book" className="bg-transparent shrink-0" />
          <div className="space-y-4 min-w-0 flex-1">
            <label className="block text-body-lg font-medium text-foreground">
              Fonte Normativa
            </label>
            {item.font.citation && (
              <>
                <p className="italic text-body-sm text-muted-foreground">
                  "{item.font.citation}"
                </p>
                <Separator className="bg-primary-200" />
              </>
            )}
            <a
              href={item.font.fontHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-bold text-body-sm block break-words"
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
