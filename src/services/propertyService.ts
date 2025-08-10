// services/propertyService.ts
import { apiRequest } from "@/lib/api/apiRequest";
import Owner from "@/models/owner";
import { ApiResponse, PagedResponse, Property } from "@/models/property";
import { Trace } from "@/models/trace";

// 🔹 Obtener listado de propiedades
export function getPropertiesServer(params?: {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
  pageNumber?: number;
  pageSize?: number;
}) {
  return apiRequest<ApiResponse<PagedResponse<Property>>>("/api/Property", {
    method: "GET",
    params,
  });
}

// 🔹 Obtener historial de una propiedad
export function getPropertyTrace(id: string) {
  return apiRequest<ApiResponse<Trace[]>>(`/api/PropertyTrace/${id}`, {
    method: "GET",
  });
}

// Obtener propietario por ID
export function getOwnerById(id: string) {
  return apiRequest<ApiResponse<Owner>>(`/api/Owner/${id}`, {
    method: "GET",
  });
}

// Crear propiedad
export function createProperty(data: Partial<Property>) {
  return apiRequest<ApiResponse<Property>>("/api/Property", {
    method: "POST",
    body: data,
    withAuth: true,
  });
}

// Actualizar propiedad
export function updateProperty(id: string, data: Partial<Property>) {
  return apiRequest<ApiResponse<Property>>(`/api/Property/${id}`, {
    method: "PUT",
    body: data,
    withAuth: true,
  });
}

// Eliminar propiedad
export function deleteProperty(id: string) {
  return apiRequest<ApiResponse<null>>(`/api/Property/${id}`, {
    method: "DELETE",
    withAuth: true,
  });
}
