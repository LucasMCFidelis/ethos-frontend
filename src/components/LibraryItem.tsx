import { LibraryItem } from "@/data/library.data";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { ArrowRight, Eye } from "lucide-react";
import { Button } from "./ui/button";

interface LibraryCardItemProps {
  data: LibraryItem;
}

const LibraryCardItem = ({ data }: LibraryCardItemProps) => {
  return (
    <Card
      data-test-id={`library-item-${data.id}`}
      className="flex flex-col justify-between"
    >
      <CardHeader>
        <div className="flex justify-center items-center size-12 rounded-md bg-primary/10">
          <Eye className="text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="mb-3">{data.title}</h3>
        <p className="font-body-md text-body-md text-muted-foreground mb-6 line-clamp-3">
          {data.elements.descriptionCurt}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="text-primary px-0">
          <a href={`/library/${data.id}`}>
            Ler agora
            <ArrowRight />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LibraryCardItem;
