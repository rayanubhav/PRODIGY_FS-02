import React, { useState, useEffect } from 'react';
import { createDepartment, updateDepartment } from '../../services/departmentService';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid
} from '@mui/material';

const DepartmentForm = ({ existingDepartment, onSave }) => {
  const [department, setDepartment] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (existingDepartment) {
      setDepartment(existingDepartment); // Populate form for editing
    }
  }, [existingDepartment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (department._id) {
        await updateDepartment(department._id, department); // Update
      } else {
        await createDepartment(department); // Add new
      }
      onSave(); // Notify parent
    } catch (error) {
      console.error('Error saving department:', error);
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
        {department._id ? 'Edit Department' : 'Add New Department'}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Department Name"
            name="name"
            value={department.name}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={department.description}
            onChange={handleChange}
            fullWidth
            multiline
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

export default DepartmentForm;
