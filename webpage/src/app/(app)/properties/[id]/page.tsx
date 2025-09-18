import { AppShell } from "@/ui/shell/AppShell";
import { makeGetProperty } from "@/core/application/usecases";
import { propertyRepositoryHttp } from "@/infrastructure/repositories/propertyRepositoryHttp";
import Image from "next/image";

const getProperty = makeGetProperty(propertyRepositoryHttp);

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getProperty(params.id);
  if (!data)
    return (
      <AppShell>
        <div className="py-12">Not found</div>
      </AppShell>
    );

  return (
    <AppShell>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-soft">
          {data.imageUrl ? (
            <Image
              src={data.imageUrl}
              alt={data.name}
              fill
              className="object-cover"
            />
          ) : null}
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <div className="text-slate-500">{data.addressProperty}</div>
          <div className="text-2xl font-semibold">
            ${data.priceProperty.toLocaleString()}
          </div>
          <div className="text-sm text-slate-400">Owner: {data.idOwner}</div>
        </div>
      </div>
    </AppShell>
  );
}
