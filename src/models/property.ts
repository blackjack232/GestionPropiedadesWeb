export interface Property {
  idProperty: string;
  idOwner: string;
  name: string;
  address: string;
  price: number;
  codeInternal: string;
  year: number;
  imageUrls: string[];
}

export interface PagedResponse<T> {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  data: T[];
}
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

