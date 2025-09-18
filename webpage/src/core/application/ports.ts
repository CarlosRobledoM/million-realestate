import { PropertyListResponse, Property } from "../contracts/property";

export interface PropertyRepository {
  search(props: {
    name?: string;
    address?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    pageSize?: number;
  }): Promise<PropertyListResponse>;

  getById(idProperty: string): Promise<Property | null>;
}
