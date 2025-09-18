"use client";
import { useState } from "react";
import { AppShell } from "@/ui/shell/AppShell";
import { Filters, FilterValues } from "@/modules/properties/Filters";
import { PropertyCard } from "@/modules/properties/Card";
import { useQuery } from "@tanstack/react-query";
import { makeListProperties } from "@/core/application/usecases";
import { propertyRepositoryHttp } from "@/infrastructure/repositories/propertyRepositoryHttp";
import { PropertyListResponse } from "@/core/contracts/property";
import { Pagination } from "@/ui/pagination/Pagination";

type SearchParams = {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
  page: number;
  pageSize: number;
};

const listProperties = makeListProperties(propertyRepositoryHttp);

export default function PropertiesPage() {
  const [params, setParams] = useState<SearchParams>({ page: 1, pageSize: 12 });

  const { data, isLoading } = useQuery<PropertyListResponse>({
    queryKey: ["properties", params],
    queryFn: () => listProperties(params),
  });

  function onSubmit(v: FilterValues) {
    setParams((p) => ({
      ...p,
      name: v.name || undefined,
      address: v.address || undefined,
      minPrice: v.minPrice ?? undefined,
      maxPrice: v.maxPrice ?? undefined,
      page: 1,
    }));
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Properties</h1>
        <Filters loading={isLoading} onSubmit={onSubmit} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data?.items.map((x) => (
            <PropertyCard
              key={x.idProperty}
              idProperty={x.idProperty}
              name={x.name}
              addressProperty={x.addressProperty}
              priceProperty={x.priceProperty}
              imageUrl={x.imageUrl}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <Pagination
            page={data?.page ?? 1}
            pageSize={data?.pageSize ?? 12}
            total={data?.total ?? 0}
            onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
          />
        </div>
      </div>
    </AppShell>
  );
}
