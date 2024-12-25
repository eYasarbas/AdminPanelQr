import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import { useEmployees } from '../../queries/employee.query';

const EmployeeList: FC = () => {
  const navigate = useNavigate();
  const { data: employees, isLoading, error } = useEmployees();

  useEffect(() => {
    if (employees) {
      console.log('Tüm Çalışanlar:', employees);
      // Her çalışanın status değerini ayrı ayrı loglayalım
      employees.forEach((employee) => {
        console.log(`${employee.firstName} ${employee.lastName} - Status:`, {
          rawStatus: employee.status,
          statusType: typeof employee.status,
          label: getStatusLabel(employee.status),
          color: getStatusColor(employee.status),
        });
      });
    }
  }, [employees]);

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'Aktif';
      case 'PASSIVE':
        return 'Pasif';
      default:
        return 'Belirsiz';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'PASSIVE':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleViewDetails = (id: string) => {
    navigate(`/employees/${id}`);
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
        <Alert severity='error'>Çalışanlar yüklenirken bir hata oluştu.</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Typography
        variant='h4'
        component='h2'
        sx={{ my: 2, textAlign: 'center' }}
      >
        Çalışan Listesi
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ad</TableCell>
              <TableCell>Soyad</TableCell>
              <TableCell>Pozisyon</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees?.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(employee.status)}
                    color={
                      getStatusColor(employee.status) as
                        | 'success'
                        | 'error'
                        | 'default'
                    }
                    size='small'
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    onClick={() => handleViewDetails(employee.id.toString())}
                  >
                    Detay
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EmployeeList;
