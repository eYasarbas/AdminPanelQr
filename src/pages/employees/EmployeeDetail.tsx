import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEmployee, useUpdateEmployee } from '../../queries/employee.query';
import { useQueryClient } from '@tanstack/react-query';

const schema = yup.object().shape({
  firstName: yup.string().required('Ad alanı zorunludur'),
  lastName: yup.string().required('Soyad alanı zorunludur'),
  email: yup
    .string()
    .email('Geçerli bir email giriniz')
    .required('Email alanı zorunludur'),
  position: yup.string().required('Pozisyon alanı zorunludur'),
  status: yup
    .string()
    .oneOf(['ACTIVE', 'PASSIVE'])
    .required('Durum alanı zorunludur'),
});

interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  status: 'ACTIVE' | 'PASSIVE';
}

const EmployeeDetail: React.FC = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: employee,
    isLoading,
    error,
  } = useEmployee(employeeId as string);
  const updateEmployeeMutation = useUpdateEmployee(queryClient);

  const formContext = useForm<EmployeeFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      position: '',
      status: 'ACTIVE',
    },
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (employee) {
      formContext.reset({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        position: employee.position,
        status: employee.status as 'ACTIVE' | 'PASSIVE',
      });
    }
  }, [employee, formContext]);

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      await updateEmployeeMutation.mutateAsync({
        id: employeeId as string,
        data: {
          ...data,
          id: employeeId as string,
        },
      });
      navigate('/employees');
    } catch (error) {
      console.error('Güncelleme hatası:', error);
    }
  };

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity='error'>
          Çalışan bilgileri yüklenirken bir hata oluştu.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth='sm'>
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant='h5' component='h1' gutterBottom>
          Çalışan Düzenle
        </Typography>

        <FormContainer formContext={formContext} onSuccess={onSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextFieldElement name='firstName' label='Ad' fullWidth required />
            <TextFieldElement
              name='lastName'
              label='Soyad'
              fullWidth
              required
            />
            <TextFieldElement
              name='email'
              label='Email'
              fullWidth
              required
              type='email'
            />
            <TextFieldElement
              name='position'
              label='Pozisyon'
              fullWidth
              required
            />

            <FormControl fullWidth>
              <InputLabel id='status-label'>Durum</InputLabel>
              <Select
                labelId='status-label'
                label='Durum'
                {...formContext.register('status')}
                defaultValue={employee?.status || 'ACTIVE'}
              >
                <MenuItem value='ACTIVE'>Aktif</MenuItem>
                <MenuItem value='PASSIVE'>Pasif</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                disabled={updateEmployeeMutation.isPending}
              >
                {updateEmployeeMutation.isPending
                  ? 'Kaydediliyor...'
                  : 'Kaydet'}
              </Button>

              <Button
                variant='outlined'
                color='secondary'
                fullWidth
                onClick={() => navigate('/employees')}
              >
                İptal
              </Button>
            </Box>
          </Box>
        </FormContainer>
      </Paper>
    </Container>
  );
};

export default EmployeeDetail;
