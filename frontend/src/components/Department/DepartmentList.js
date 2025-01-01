import React, { useEffect, useState } from 'react';
import { getDepartments, deleteDepartment } from '../../services/departmentService';
import DepartmentForm from './DepartmentForm';
import { 
  Button, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Box, 
  Stack 
} from '@mui/material';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await getDepartments();
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDepartment(id);
      fetchDepartments(); // Refresh list
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  const handleAddNew = () => {
    setEditingDepartment(null); // Clear editing state
    setShowForm(true);
  };

  const handleEdit = (department) => {
    setEditingDepartment(department); // Pass department to edit
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    fetchDepartments(); // Refresh list after save
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Department List
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleAddNew} 
        style={{ marginBottom: '16px' }}
      >
        Add New Department
      </Button>
      <List>
        {departments.map((dept) => (
          <ListItem
            key={dept._id}
            divider
            secondaryAction={
              <Stack direction="row" spacing={1}>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  onClick={() => handleEdit(dept)}
                >
                  Edit
                </Button>
                <Button 
                  variant="outlined" 
                  color="error" 
                  onClick={() => handleDelete(dept._id)}
                >
                  Delete
                </Button>
              </Stack>
            }
          >
            <ListItemText
              primary={dept.name}
              secondary={`Description: ${dept.description}`}
            />
          </ListItem>
        ))}
      </List>
      {showForm && (
        <DepartmentForm
          existingDepartment={editingDepartment}
          onSave={handleSave}
        />
      )}
    </Box>
  );
};

export default DepartmentList;
