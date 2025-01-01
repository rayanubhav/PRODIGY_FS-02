import React, { useEffect, useState } from 'react';
import { getEmployees, deleteEmployee } from '../../services/employeeService';
import EmployeeForm from './EmployeeForm';
import { 
  Button, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Box, 
  Stack 
} from '@mui/material';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      fetchEmployees(); // Refresh list
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleAddNew = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    fetchEmployees(); // Refresh list
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Employee List
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleAddNew} 
        style={{ marginBottom: '16px' }}
      >
        Add New Employee
      </Button>
      <List>
        {employees.map((emp) => (
          <ListItem
            key={emp._id}
            divider
            secondaryAction={
              <Stack direction="row" spacing={1}>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  onClick={() => handleEdit(emp)}
                >
                  Edit
                </Button>
                <Button 
                  variant="outlined" 
                  color="error" 
                  onClick={() => handleDelete(emp._id)}
                >
                  Delete
                </Button>
              </Stack>
            }
          >
            <ListItemText
              primary={`${emp.name} (${emp.role})`}
              secondary={`Email: ${emp.email} | Salary: ${emp.salary}`}
            />
          </ListItem>
        ))}
      </List>
      {showForm && (
        <EmployeeForm
          existingEmployee={editingEmployee}
          onSave={handleSave}
        />
      )}
    </Box>
  );
};

export default EmployeeList;
