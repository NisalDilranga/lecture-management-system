import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Chip,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Close as CloseIcon 
} from '@mui/icons-material';

// Sample data structure (will be replaced with API calls in production)
const initialVacancies = [
  {
    id: 1,
    title: "Senior Lecturer - Computer Science",
    department: "Department of Computer Science",
    faculty: "Faculty of Science",
    deadline: "2025-03-30",
    type: "Academic",
    description:
      "We are seeking a highly qualified Senior Lecturer with expertise in Computer Science, particularly in the areas of Artificial Intelligence and Machine Learning.",
    requirements: [
      "PhD in Computer Science or related field",
      "Minimum 5 years teaching experience",
      "Strong research background",
      "Excellent publication record",
    ],
  },
  {
    id: 2,
    title: "Research Assistant - Physics",
    department: "Department of Physics",
    faculty: "Faculty of Science",
    deadline: "2025-03-25",
    type: "Academic",
    description:
      "Join our cutting-edge research team in Quantum Physics and contribute to groundbreaking discoveries.",
    requirements: [
      "MSc in Physics",
      "Experience with laboratory equipment",
      "Strong analytical skills",
      "Research publication experience",
    ],
  },
  {
    id: 3,
    title: "Administrative Officer",
    department: "General Administration",
    faculty: "Central Administration",
    deadline: "2025-03-28",
    type: "Non-Academic",
    description:
      "We're looking for an experienced Administrative Officer to manage and coordinate administrative operations.",
    requirements: [
      "Bachelor's degree in Management",
      "5+ years administrative experience",
      "Strong organizational skills",
      "Excellent communication abilities",
    ],
  },
];

const VacancyManagement = () => {
  const [vacancies, setVacancies] = useState(initialVacancies);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [currentVacancy, setCurrentVacancy] = useState({
    id: null,
    title: '',
    department: '',
    faculty: '',
    deadline: '',
    type: 'Academic',
    description: '',
    requirements: [''],
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Function to handle dialog open for adding a new vacancy
  const handleAddClick = () => {
    setDialogMode('add');
    setCurrentVacancy({
      id: Math.max(...vacancies.map(v => v.id), 0) + 1, // Generate new ID
      title: '',
      department: '',
      faculty: '',
      deadline: '',
      type: 'Academic',
      description: '',
      requirements: [''],
    });
    setOpenDialog(true);
  };

  // Function to handle dialog open for editing a vacancy
  const handleEditClick = (vacancy) => {
    setDialogMode('edit');
    setCurrentVacancy({ ...vacancy });
    setOpenDialog(true);
  };

  // Function to handle dialog close
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (dialogMode === 'add') {
      setVacancies([...vacancies, currentVacancy]);
      setSnackbar({
        open: true,
        message: 'Vacancy added successfully',
        severity: 'success'
      });
    } else {
      setVacancies(vacancies.map(vacancy => 
        vacancy.id === currentVacancy.id ? currentVacancy : vacancy
      ));
      setSnackbar({
        open: true,
        message: 'Vacancy updated successfully',
        severity: 'success'
      });
    }
    setOpenDialog(false);
  };

  // Function to handle vacancy deletion
  const handleDelete = (id) => {
    setVacancies(vacancies.filter(vacancy => vacancy.id !== id));
    setSnackbar({
      open: true,
      message: 'Vacancy deleted successfully',
      severity: 'success'
    });
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentVacancy({
      ...currentVacancy,
      [name]: value
    });
  };

  // Function to handle requirement change
  const handleRequirementChange = (index, value) => {
    const updatedRequirements = [...currentVacancy.requirements];
    updatedRequirements[index] = value;
    setCurrentVacancy({
      ...currentVacancy,
      requirements: updatedRequirements
    });
  };

  // Function to add a new requirement field
  const handleAddRequirement = () => {
    setCurrentVacancy({
      ...currentVacancy,
      requirements: [...currentVacancy.requirements, '']
    });
  };

  // Function to remove a requirement field
  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...currentVacancy.requirements];
    updatedRequirements.splice(index, 1);
    setCurrentVacancy({
      ...currentVacancy,
      requirements: updatedRequirements
    });
  };

  // Handle snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Vacancy Management
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add New Vacancy
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Faculty</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vacancies.map((vacancy) => (
              <TableRow key={vacancy.id}>
                <TableCell>{vacancy.title}</TableCell>
                <TableCell>{vacancy.department}</TableCell>
                <TableCell>{vacancy.faculty}</TableCell>
                <TableCell>{vacancy.deadline}</TableCell>
                <TableCell>
                  <Chip 
                    label={vacancy.type} 
                    color={vacancy.type === 'Academic' ? 'primary' : 'secondary'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton 
                    color="primary" 
                    onClick={() => handleEditClick(vacancy)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => handleDelete(vacancy.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Vacancy Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {dialogMode === 'add' ? 'Add New Vacancy' : 'Edit Vacancy'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="dense"
              label="Title"
              name="title"
              value={currentVacancy.title}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            />
            
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                label="Department"
                name="department"
                value={currentVacancy.department}
                onChange={handleInputChange}
                required
              />
              
              <TextField
                fullWidth
                label="Faculty"
                name="faculty"
                value={currentVacancy.faculty}
                onChange={handleInputChange}
                required
              />
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                label="Deadline"
                name="deadline"
                type="date"
                value={currentVacancy.deadline}
                onChange={handleInputChange}
                required
                InputLabelProps={{ shrink: true }}
              />
              
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={currentVacancy.type}
                  onChange={handleInputChange}
                  label="Type"
                >
                  <MenuItem value="Academic">Academic</MenuItem>
                  <MenuItem value="Non-Academic">Non-Academic</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <TextField
              fullWidth
              margin="dense"
              label="Description"
              name="description"
              value={currentVacancy.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              required
              sx={{ mb: 2 }}
            />
            
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              Requirements
            </Typography>
            
            {currentVacancy.requirements.map((requirement, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  fullWidth
                  label={`Requirement ${index + 1}`}
                  value={requirement}
                  onChange={(e) => handleRequirementChange(index, e.target.value)}
                  required
                />
                {currentVacancy.requirements.length > 1 && (
                  <IconButton color="error" onClick={() => handleRemoveRequirement(index)}>
                    <CloseIcon />
                  </IconButton>
                )}
              </Box>
            ))}
            
            <Button 
              variant="outlined" 
              onClick={handleAddRequirement}
              startIcon={<AddIcon />}
              sx={{ mt: 1 }}
            >
              Add Requirement
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!currentVacancy.title || !currentVacancy.department || !currentVacancy.faculty || 
                     !currentVacancy.deadline || !currentVacancy.description ||
                     currentVacancy.requirements.some(req => !req.trim())}
          >
            {dialogMode === 'add' ? 'Add Vacancy' : 'Update Vacancy'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default VacancyManagement;
