import { z } from "zod";

export const propertySchema = z.object({
  idProperty: z.string(),
  idOwner: z.string(),
  name: z.string(),
  addressProperty: z.string(),
  priceProperty: z.number(),
  imageUrl: z.string().optional().default(""),
});

export type Property = z.infer<typeof propertySchema>;

export const listResponseSchema = z.object({
  items: z.array(propertySchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export type PropertyListResponse = z.infer<typeof listResponseSchema>;
