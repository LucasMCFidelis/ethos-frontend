import { useParams, useNavigate } from "react-router-dom";
import { libraryData } from "@/data/library.data";
import PageWrapper from "./PageWrapper";
import { ArrowLeft, BookOpenText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
        <a href={`/library`}>
          <ArrowLeft />
          Voltar para Biblioteca
        </a>
      </Button>

      <h1 className="mb-2">{item.title}</h1>
      <p className="text-muted-foreground text-body-lg mb-8">
        {item.elements.descriptionCurt}
      </p>

      {item.elements.items.length > 0 &&
        item.elements.items.map((contentItem) => (
          <div className="mb-8">
            <label className="flex items-center gap-4 text-lg font-medium mb-5">
              <Badge className="w-8" />
              {contentItem.label}
            </label>
            {typeof contentItem.content === "string" ? (
              contentItem.useCard ? (
                <Card>
                  <CardContent className="grid grid-cols-[5%_1fr] gap-4 p-4">
                    <div className="flex justify-center items-center size-fit p-2 rounded-md bg-primary/10">
                      <CheckCircle2 className="text-primary" />
                    </div>
                    <p className="text-muted-foreground">
                      {contentItem.content}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <p className="text-muted-foreground">{contentItem.content}</p>
              )
            ) : (
              <div className="flex flex-col gap-4">
                {contentItem.content.map((subItem, index) => (
                  <div
                    key={subItem.label}
                    className="flex gap-2 bg-primary/10 border-l-4 p-2 border-primary"
                  >
                    <span className="text-muted-foreground w-20">
                      {index + 1}
                    </span>
                    <div>
                      <h5 className="font-medium">{subItem.label}</h5>
                      <p className="text-muted-foreground">{subItem.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

      <Card className="mt-12 bg-primary-100">
        <CardContent className="grid grid-cols-[5%_1fr] gap-4 p-4">
          <div className="flex gap-4 justify-center items-center size-fit p-2">
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
              className="mt-5 block text-primary font-bold"
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
