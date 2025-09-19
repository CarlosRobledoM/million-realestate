import { api } from "../http/apiClient";
import { PropertyRepository } from "@/core/application/ports";
import {
  Property,
  PropertyListResponse,
  propertySchema,
} from "@/core/contracts/property";
import { z } from "zod";

const listApiSchema = z.object({
  items: z.array(propertySchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export const propertyRepositoryHttp: PropertyRepository = {
  async search(params) {
    const r = await api.get<unknown>("/api/properties", {
      params: {
        name: params.name,
        address: params.address,
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        page: params.page ?? 1,
        pageSize: params.pageSize ?? 12,
      },
    });
    const parsed = listApiSchema.parse(r.data);
    const mapped: PropertyListResponse = {
      items: parsed.items,
      total: parsed.total,
      page: parsed.page,
      pageSize: parsed.pageSize,
    };
    return mapped;
  },
  async getById(idProperty) {
    const r = await api.get<unknown>(`/api/properties/${idProperty}`);
    const parsed = propertySchema.parse(r.data);
    return parsed as Property;
  },
};
