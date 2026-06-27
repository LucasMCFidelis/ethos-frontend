import { LibraryItem } from "@/data/library.data";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Icon from "./Icon";

interface LibraryCardItemProps {
  data: LibraryItem;
}

const LibraryCardItem = ({ data }: LibraryCardItemProps) => {
  return (
    <Card
      data-test={`library-item-${data.id}`}
      className="flex flex-col justify-between h-full"
    >
      <CardHeader>
        <Icon icon={data.homeIconLibrary} />
      </CardHeader>
      <CardContent>
        <h3 className="mb-3 text-foreground">{data.title}</h3>
        <p className="text-body-sm text-muted-foreground line-clamp-3">
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
