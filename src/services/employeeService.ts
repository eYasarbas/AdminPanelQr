import { AxiosResponse } from 'axios';
import { axiosInstance } from '../lib/axios';
import { EmployeeResponseDto } from '../models/employees/employeeResponseDto';
import { EmployeeUpdateRequest } from '../models/employees/employeeUpdateRequest';

const EMPLOYEE_URL = 'api/employees';

export const employeeService = {
  getAll: (): Promise<AxiosResponse<EmployeeResponseDto[]>> => {
    return axiosInstance.get(EMPLOYEE_URL);
  },

  getById: (id: string): Promise<AxiosResponse<EmployeeResponseDto>> => {
    return axiosInstance.get(`${EMPLOYEE_URL}/${id}`);
  },

  delete: (id: number): Promise<AxiosResponse> => {
    return axiosInstance.delete(`${EMPLOYEE_URL}/${id}`);
  },

  update: (id: string, data: EmployeeUpdateRequest): Promise<AxiosResponse> => {
    return axiosInstance.put(`${EMPLOYEE_URL}/${id}`, data);
  },
};
