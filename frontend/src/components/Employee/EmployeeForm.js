import React, { useState, useEffect } from 'react';
import { createEmployee, updateEmployee } from '../../services/employeeService';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Grid
} from '@mui/material';

const roles = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Database Administrator",
];

const EmployeeForm = ({ existingEmployee, onSave }) => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    role: '',
    salary: '',
  });

  useEffect(() => {
    if (existingEmployee) {
      setEmployee(existingEmployee); // Populate form for editing
    }
  }, [existingEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (employee._id) {
        await updateEmployee(employee._id, employee); // Update
      } else {
        await createEmployee(employee); // Create new
      }
      onSave(); // Notify parent
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      p={3}
      border={1}
      borderColor="grey.300"
      borderRadius={2}
      boxShadow={3}
    >
      <Typography variant="h5" gutterBottom>
        {employee._id ? 'Edit Employee' : 'Add New Employee'}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            name="name"
            value={employee.name}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Role"
            name="role"
            value={employee.role}
            onChange={handleChange}
            fullWidth
            required
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Salary"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
      </Grid>
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        style={{ marginTop: '16px' }}
      >
        Save
      </Button>
    </Box>
  );
};

export default EmployeeForm;
