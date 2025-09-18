import { PropertyRepository } from "./ports";
import { PropertyListResponse, Property } from "../contracts/property";

export function makeListProperties(repo: PropertyRepository) {
  return async function execute(params: {
    name?: string;
    address?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    pageSize?: number;
  }): Promise<PropertyListResponse> {
    return repo.search(params);
  };
}

export function makeGetProperty(repo: PropertyRepository) {
  return async function execute(idProperty: string): Promise<Property | null> {
    return repo.getById(idProperty);
  };
}
