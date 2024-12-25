import {
  useQuery,
  useMutation,
  UseQueryResult,
  QueryClient,
} from '@tanstack/react-query';
import { employeeService } from '../services/employeeService';
import { EmployeeResponseDto } from '../models/employees/employeeResponseDto';
import { EmployeeUpdateRequest } from '../models/employees/employeeUpdateRequest';

// Query Keys
export const employeeKeys = {
  all: ['employees'] as const,
  detail: (id: string) => [...employeeKeys.all, id] as const,
};

// Queries
export const useEmployees = (): UseQueryResult<EmployeeResponseDto[]> => {
  return useQuery({
    queryKey: employeeKeys.all,
    queryFn: async () => {
      const response = await employeeService.getAll();
      return response.data;
    },
  });
};

export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: employeeKeys.detail(id),
    queryFn: async () => {
      const response = await employeeService.getById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

// Mutations
export const useUpdateEmployee = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: EmployeeUpdateRequest;
    }) => {
      const response = await employeeService.update(id, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: employeeKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: employeeKeys.all,
      });
    },
  });
};

export const useDeleteEmployee = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await employeeService.delete(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: employeeKeys.all,
      });
    },
  });
};
