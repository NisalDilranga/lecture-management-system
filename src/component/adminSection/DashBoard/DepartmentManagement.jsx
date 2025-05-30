import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  InputAdornment,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  LibraryBooks as LibraryBooksIcon,
  School as SchoolIcon
} from '@mui/icons-material';

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Department dialog state
  const [openDepartmentDialog, setOpenDepartmentDialog] = useState(false);
  const [departmentFormData, setDepartmentFormData] = useState({ name: '' });
  const [departmentFormErrors, setDepartmentFormErrors] = useState({});

  // Subject dialog state
  const [openSubjectDialog, setOpenSubjectDialog] = useState(false);
  const [subjectFormData, setSubjectFormData] = useState({ name: '' });
  const [subjectFormErrors, setSubjectFormErrors] = useState({});
  
  // Edit modes
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editingSubject, setEditingSubject] = useState(null);

  // Demo data for departments and subjects
  useEffect(() => {
    const demoData = [
      {
        id: 1,
        name: "Information Technology",
        subjects: [
          { id: 101, name: "Web Development" },
          { id: 102, name: "Database Systems" },
          { id: 103, name: "Programming Fundamentals" }
        ]
      },
      {
        id: 2,
        name: "Business Studies",
        subjects: [
          { id: 201, name: "Marketing" },
          { id: 202, name: "Accounting" }
        ]
      },
      {
        id: 3,
        name: "Engineering",
        subjects: [
          { id: 301, name: "Circuit Theory" },
          { id: 302, name: "Mechanics" }
        ]
      }
    ];
    
    setDepartments(demoData);
  }, []);
  // Filter departments based on search term
  const filteredDepartments = departments.filter(dept => 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Department Dialog Handlers
  const openAddDepartmentDialog = () => {
    setEditingDepartment(null);
    setDepartmentFormData({ name: '' });
    setDepartmentFormErrors({});
    setOpenDepartmentDialog(true);
  };

  const openEditDepartmentDialog = (dept) => {
    setEditingDepartment(dept);
    setDepartmentFormData({ name: dept.name });
    setDepartmentFormErrors({});
    setOpenDepartmentDialog(true);
  };

  const closeDepartmentDialog = () => {
    setOpenDepartmentDialog(false);
  };

  // Subject Dialog Handlers
  const openAddSubjectDialog = () => {
    if (!selectedDepartment) return;
    setEditingSubject(null);
    setSubjectFormData({ name: '' });
    setSubjectFormErrors({});
    setOpenSubjectDialog(true);
  };

  const openEditSubjectDialog = (subject) => {
    setEditingSubject(subject);
    setSubjectFormData({ name: subject.name });
    setSubjectFormErrors({});
    setOpenSubjectDialog(true);
  };

  const closeSubjectDialog = () => {
    setOpenSubjectDialog(false);
  };

  // Form Handlers
  const handleDepartmentInputChange = (e) => {
    const { name, value } = e.target;
    setDepartmentFormData({
      ...departmentFormData,
      [name]: value
    });
  };

  const handleSubjectInputChange = (e) => {
    const { name, value } = e.target;
    setSubjectFormData({
      ...subjectFormData,
      [name]: value
    });
  };

  // Validation
  const validateDepartmentForm = () => {
    const errors = {};
    if (!departmentFormData.name.trim()) {
      errors.name = "Department name is required";
    }
    return errors;
  };

  const validateSubjectForm = () => {
    const errors = {};
    if (!subjectFormData.name.trim()) {
      errors.name = "Subject name is required";
    }
    return errors;
  };

  // Submit Handlers
  const handleDepartmentSubmit = () => {
    const errors = validateDepartmentForm();
    if (Object.keys(errors).length > 0) {
      setDepartmentFormErrors(errors);
      return;
    }

    if (editingDepartment) {
      // Update existing department
      const updatedDepartments = departments.map(dept => {
        if (dept.id === editingDepartment.id) {
          return {
            ...dept,
            name: departmentFormData.name
          };
        }
        return dept;
      });
      
      setDepartments(updatedDepartments);
      
      // Update selected department if it's the one being edited
      if (selectedDepartment && selectedDepartment.id === editingDepartment.id) {
        setSelectedDepartment({
          ...selectedDepartment,
          name: departmentFormData.name
        });
      }
    } else {
      // Add new department
      const newDepartment = {
        id: Date.now(),
        name: departmentFormData.name,
        subjects: []
      };
      
      setDepartments([...departments, newDepartment]);
    }
    
    closeDepartmentDialog();
  };

  const handleSubjectSubmit = () => {
    if (!selectedDepartment) return;
    
    const errors = validateSubjectForm();
    if (Object.keys(errors).length > 0) {
      setSubjectFormErrors(errors);
      return;
    }

    if (editingSubject) {
      // Update existing subject
      const updatedDepartments = departments.map(dept => {
        if (dept.id === selectedDepartment.id) {
          return {
            ...dept,
            subjects: dept.subjects.map(subject => {
              if (subject.id === editingSubject.id) {
                return {
                  ...subject,
                  name: subjectFormData.name
                };
              }
              return subject;
            })
          };
        }
        return dept;
      });
      
      setDepartments(updatedDepartments);
      
      // Update selected department
      const updatedSelectedDept = updatedDepartments.find(
        dept => dept.id === selectedDepartment.id
      );
      setSelectedDepartment(updatedSelectedDept);
    } else {
      // Add new subject
      const newSubject = {
        id: Date.now(),
        name: subjectFormData.name
      };
      
      const updatedDepartments = departments.map(dept => {
        if (dept.id === selectedDepartment.id) {
          return {
            ...dept,
            subjects: [...dept.subjects, newSubject]
          };
        }
        return dept;
      });
      
      setDepartments(updatedDepartments);
      
      // Update selected department
      const updatedSelectedDept = updatedDepartments.find(
        dept => dept.id === selectedDepartment.id
      );
      setSelectedDepartment(updatedSelectedDept);
    }
    
    closeSubjectDialog();
  };

  // Delete Handlers
  const handleDeleteDepartment = (deptId) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter(dept => dept.id !== deptId));
      if (selectedDepartment && selectedDepartment.id === deptId) {
        setSelectedDepartment(null);
      }
    }
  };

  const handleDeleteSubject = (subjectId) => {
    if (!selectedDepartment) return;
    
    if (window.confirm('Are you sure you want to delete this subject?')) {
      const updatedDepartments = departments.map(dept => {
        if (dept.id === selectedDepartment.id) {
          return {
            ...dept,
            subjects: dept.subjects.filter(subject => subject.id !== subjectId)
          };
        }
        return dept;
      });
      
      setDepartments(updatedDepartments);
      
      // Update selected department
      const updatedSelectedDept = updatedDepartments.find(
        dept => dept.id === selectedDepartment.id
      );
      setSelectedDepartment(updatedSelectedDept);
    }
  };
  return (
    <Box className="p-4">
      {/* Header with Add Department button */}
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h4" className="text-gray-800 font-bold">
          Department Management
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={openAddDepartmentDialog}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Add Department
        </Button>
      </Box>

      {/* Search Bar */}
      <Box className="mb-6">
        <TextField
          fullWidth
          placeholder="Search departments"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          variant="outlined"
        />
      </Box>

      {/* Main Content Layout */}
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Department List */}
        <Card className="shadow-md h-fit">
          <CardContent>
            <Typography variant="h6" className="font-bold mb-4 flex items-center">
              <SchoolIcon className="mr-2" /> Departments
            </Typography>
            
            {filteredDepartments.length > 0 ? (
              <List className="max-h-[60vh] overflow-y-auto">
                {filteredDepartments.map((dept) => (
                  <React.Fragment key={dept.id}>
                    <ListItem 
                      button
                      selected={selectedDepartment?.id === dept.id}
                      onClick={() => setSelectedDepartment(dept)}
                      className={selectedDepartment?.id === dept.id ? "bg-indigo-50" : ""}
                    >
                      <ListItemText 
                        primary={dept.name}
                        secondary={`${dept.subjects.length} subject(s)`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton 
                          edge="end" 
                          aria-label="edit"
                          onClick={() => openEditDepartmentDialog(dept)}
                          className="text-blue-600"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          edge="end" 
                          aria-label="delete"
                          onClick={() => handleDeleteDepartment(dept.id)}
                          className="text-red-600 ml-1"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider variant="fullWidth" component="li" />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Box className="py-8 text-center text-gray-500">
                No departments found. 
                {searchTerm ? " Try a different search term." : " Add a department to get started."}
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Subject Management */}
        <Card className="shadow-md md:col-span-2">
          <CardContent>
            {selectedDepartment ? (
              <>
                <Box className="flex justify-between items-center mb-4">
                  <Typography variant="h6" className="font-bold flex items-center">
                    <LibraryBooksIcon className="mr-2" />
                    Subjects for "{selectedDepartment.name}"
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={openAddSubjectDialog}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    Add Subject
                  </Button>
                </Box>
                
                {selectedDepartment.subjects.length > 0 ? (
                  <TableContainer component={Paper} className="shadow-sm">
                    <Table>
                      <TableHead className="bg-gray-100">
                        <TableRow>
                          <TableCell className="font-bold">Subject Name</TableCell>
                          <TableCell align="right" className="font-bold w-32">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedDepartment.subjects.map((subject) => (
                          <TableRow key={subject.id} className="hover:bg-gray-50">
                            <TableCell>{subject.name}</TableCell>
                            <TableCell align="right">
                              <IconButton 
                                size="small" 
                                onClick={() => openEditSubjectDialog(subject)}
                                className="text-blue-600"
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                onClick={() => handleDeleteSubject(subject.id)}
                                className="text-red-600"
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Box className="py-12 text-center text-gray-500">
                    No subjects added to this department yet.
                  </Box>
                )}
              </>
            ) : (
              <Box className="py-24 text-center text-gray-500">
                <SchoolIcon fontSize="large" className="mb-2 opacity-50" />
                <Typography>
                  Select a department from the list to manage its subjects.
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Department Dialog */}
      <Dialog open={openDepartmentDialog} onClose={closeDepartmentDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingDepartment ? 'Edit Department' : 'Add New Department'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="mb-4">
            {editingDepartment 
              ? 'Update the department name below.' 
              : 'Enter a name for the new department.'}
          </DialogContentText>
          
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Department Name"
            type="text"
            fullWidth
            value={departmentFormData.name}
            onChange={handleDepartmentInputChange}
            error={!!departmentFormErrors.name}
            helperText={departmentFormErrors.name}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={closeDepartmentDialog} className="text-gray-600">
            Cancel
          </Button>
          <Button 
            onClick={handleDepartmentSubmit} 
            variant="contained" 
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {editingDepartment ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Subject Dialog */}
      <Dialog open={openSubjectDialog} onClose={closeSubjectDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingSubject ? 'Edit Subject' : 'Add New Subject'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="mb-4">
            {editingSubject
              ? `Update the subject name below.`
              : `Add a new subject to ${selectedDepartment?.name}.`}
          </DialogContentText>
          
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Subject Name"
            type="text"
            fullWidth
            value={subjectFormData.name}
            onChange={handleSubjectInputChange}
            error={!!subjectFormErrors.name}
            helperText={subjectFormErrors.name}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={closeSubjectDialog} className="text-gray-600">
            Cancel
          </Button>
          <Button 
            onClick={handleSubjectSubmit} 
            variant="contained" 
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {editingSubject ? 'Update' : 'Add'}
          </Button>
        </DialogActions>      </Dialog>
    </Box>
  );
};

export default DepartmentManagement;
