import { api } from "../http/apiClient";
import { PropertyRepository } from "@/core/application/ports";
import { Property, PropertyListResponse } from "@/core/contracts/property";
import { z } from "zod";

const propertyApiSchema = z.object({
  id_property: z.string(),
  id_owner: z.string(),
  name: z.string(),
  address_property: z.string(),
  price_property: z.number(),
  image_url: z.string().optional().default(""),
});

const listApiSchema = z.object({
  items: z.array(propertyApiSchema),
  total: z.number(),
  page: z.number(),
  page_size: z.number(),
});

function mapApiToDomain(x: z.infer<typeof propertyApiSchema>): Property {
  return {
    idProperty: x.id_property,
    idOwner: x.id_owner,
    name: x.name,
    addressProperty: x.address_property,
    priceProperty: x.price_property,
    imageUrl: x.image_url,
  };
}

export const propertyRepositoryHttp: PropertyRepository = {
  async search(params) {
    const r = await api.get<unknown>("/api/properties", {
      params: {
        name: params.name,
        address: params.address,
        min_price: params.minPrice,
        max_price: params.maxPrice,
        page: params.page ?? 1,
        page_size: params.pageSize ?? 12,
      },
    });
    const parsed = listApiSchema.parse(r.data);
    const mapped: PropertyListResponse = {
      items: parsed.items.map(mapApiToDomain),
      total: parsed.total,
      page: parsed.page,
      pageSize: parsed.page_size,
    };
    return mapped;
  },

  async getById(idProperty) {
    const r = await api.get<unknown>(`/api/properties/${idProperty}`);
    const parsed = propertyApiSchema.parse(r.data);
    return mapApiToDomain(parsed);
  },
};
