import { libraryData } from "@/data/library.data";
import PageWrapper from "./PageWrapper";
import LibraryCardItem from "@/components/LibraryItem";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const Library = () => {
  return (
    <PageWrapper extendContainerStyles="container mx-auto py-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Início</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Biblioteca</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col mb-12">
        <h1 className="mb-2">Biblioteca Ética em Atendimento Online</h1>
        <p className="font-body-lg text-body-lg text-muted-foreground max-w-2xl">
          Recursos essenciais para profissionais da saúde sobre conformidade,
          privacidade e ética no teleatendimento.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {libraryData.map((item) => (
          <LibraryCardItem key={item.id} data={item} />
        ))}
      </div>
    </PageWrapper>
  );
};

export default Library;
