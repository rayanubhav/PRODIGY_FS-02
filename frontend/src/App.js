import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, Button, AppBar, Toolbar, Typography } from '@mui/material';
import EmployeeList from './components/Employee/EmployeeList';
import DepartmentList from './components/Department/DepartmentList';
import EmployeeForm from './components/Employee/EmployeeForm';
import DepartmentForm from './components/Department/DepartmentForm';

const App = () => {
  return (
    <Router>
      {/* App Bar / Navigation */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Company Management
          </Typography>
          <Button
            component={Link}
            to="/employees"
            color="inherit"
            sx={{ marginRight: '10px' }}
          >
            Employees
          </Button>
          <Button
            component={Link}
            to="/departments"
            color="inherit"
          >
            Departments
          </Button>
        </Toolbar>
      </AppBar>

      {/* Routing */}
      <Box sx={{ p: 3 }}>
        <Routes>
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/new" element={<EmployeeForm onSave={() => {}} />} />
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/departments/new" element={<DepartmentForm onSave={() => {}} />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
