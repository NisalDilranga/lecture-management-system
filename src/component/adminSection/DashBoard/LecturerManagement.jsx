import React, { useState, useEffect } from 'react';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  FormHelperText,
  Autocomplete
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  PersonAdd as PersonAddIcon
} from '@mui/icons-material';

const LecturerManagement = () => {
  const [lecturers, setLecturers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'permanent', // Default to permanent
    contactNumber: '',
    mobileNumber: '',
    password: '123456', // Default password
    status: 3, // 1: admin, 2: visiting, 3: permanent
    departments: [],
    subjects: [],
    hourlyRate: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [availableSubjects, setAvailableSubjects] = useState([]);

  const lecturerStatus = Number(localStorage.getItem('lecturerStatus')) || 1;

  // Mock departments and subjects by department
  const allDepartments = [
    'Information Technology', 
    'Engineering', 
    'Science',
    'Business Management', 
    'Languages', 
    'Mathematics',
    'Civil Engineering', 
    'Electrical Engineering', 
    'Mechanical Engineering',
    'Computer Applications', 
    'Accountancy'
  ];

  // Subjects organized by department
  const subjectsByDepartment = {
    'Information Technology': ['Web Development', 'Database Systems', 'Computer Science', 'Software Engineering', 'Cybersecurity', 'Data Structures'],
    'Engineering': ['Mechanics', 'Engineering Drawing', 'Thermodynamics', 'Materials Science'],
    'Science': ['Physics', 'Chemistry', 'Biology'],
    'Business Management': ['Accounting', 'Marketing', 'Human Resources', 'Economics'],
    'Languages': ['English', 'Sinhala', 'Tamil', 'French'],
    'Mathematics': ['Calculus', 'Statistics', 'Linear Algebra', 'Discrete Mathematics'],
    'Civil Engineering': ['Structural Engineering', 'Surveying', 'Soil Mechanics', 'Construction Management'],
    'Electrical Engineering': ['Circuit Theory', 'Power Systems', 'Electronics', 'Electromagnetic Theory'],
    'Mechanical Engineering': ['Machine Design', 'Fluid Mechanics', 'Heat Transfer', 'Manufacturing Processes'],
    'Computer Applications': ['Mobile Development', 'Cloud Computing', 'IoT', 'Artificial Intelligence'],
    'Accountancy': ['Financial Accounting', 'Cost Accounting', 'Taxation', 'Audit']
  };

  // Flat list of all subjects for when departments are not selected
  const allSubjects = Object.values(subjectsByDepartment).flat();

  // Update available subjects when departments change
  useEffect(() => {
    if (formData.role === 'visiting' && formData.departments.length > 0) {
      // Filter subjects based on selected departments
      const filteredSubjects = formData.departments.flatMap(
        dept => subjectsByDepartment[dept] || []
      );
      setAvailableSubjects(filteredSubjects);
      
      // Remove any subjects that are not in the filtered list
      const validSubjects = formData.subjects.filter(subject => 
        filteredSubjects.includes(subject)
      );
      
      if (validSubjects.length !== formData.subjects.length) {
        setFormData(prev => ({
          ...prev,
          subjects: validSubjects
        }));
      }
    } else {
      setAvailableSubjects(allSubjects);
    }
  }, [formData.departments, formData.role]);

  // Load demo data on component mount
  useEffect(() => {
    // Sample demo data
    const demoData = [
      {
        id: 1,
        name: 'John Smith',
        email: 'admin@gmail.com',
        role: 'Admin Lecturer',
        contactNumber: '0112345678',
        mobileNumber: '0771234567',
        status: 1,
        departments: [],
        subjects: ['Web Development', 'Database Systems'],
        hourlyRate: ''
      },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'lec@gmail.com',
        role: 'Visiting Lecturer',
        contactNumber: '0113456789',
        mobileNumber: '0772345678',
        status: 2,
        departments: ['Information Technology', 'Computer Applications'],
        subjects: ['Software Engineering', 'Mobile Development'],
        hourlyRate: '2500'
      },
      {
        id: 3,
        name: 'Mark Johnson',
        email: 'perm@gmail.com',
        role: 'Permanent Lecturer',
        contactNumber: '0114567890',
        mobileNumber: '0773456789',
        status: 3,
        departments: [],
        subjects: ['Mathematics', 'Physics'],
        hourlyRate: ''
      }
    ];
    
    setLecturers(demoData);
  }, []);

  // Check if user has admin access
  if (lecturerStatus !== 1) {
    return (
      <Box className="p-6">
        <Typography variant="h5" className="text-red-600 mb-4">
          Access Denied
        </Typography>
        <Typography>
          You don't have permission to access the lecturer management section.
          This feature is only available for admin users.
        </Typography>
      </Box>
    );
  }

  const handleDialogOpen = (lecturer = null) => {
    if (lecturer) {
      // Edit mode - pre-populate form with lecturer data
      setSelectedLecturer(lecturer);
      setFormData({
        name: lecturer.name,
        email: lecturer.email,
        role: lecturer.status === 1 ? 'admin' : lecturer.status === 2 ? 'visiting' : 'permanent',
        contactNumber: lecturer.contactNumber,
        mobileNumber: lecturer.mobileNumber,
        password: '******', // Masked for security
        status: lecturer.status,
        departments: lecturer.departments || [],
        subjects: lecturer.subjects,
        hourlyRate: lecturer.hourlyRate || '',
      });
    } else {
      // Add new lecturer mode
      setSelectedLecturer(null);
      setFormData({
        name: '',
        email: '',
        role: 'permanent',
        contactNumber: '',
        mobileNumber: '',
        password: '123456', // Default password
        status: 3,
        departments: [],
        subjects: [],
        hourlyRate: '',
      });
    }
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update status based on role
    if (name === 'role') {
      const status = value === 'admin' ? 1 : value === 'visiting' ? 2 : 3;
      setFormData(prev => ({
        ...prev,
        [name]: value,
        status: status,
        // Clear hourly rate if not a visiting lecturer
        hourlyRate: value !== 'visiting' ? '' : prev.hourlyRate,
        // Clear departments if not a visiting lecturer
        departments: value !== 'visiting' ? [] : prev.departments,
        // Clear subjects if changing role
        subjects: []
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubjectsChange = (event, newValue) => {
    setFormData(prev => ({
      ...prev,
      subjects: newValue
    }));
  };

  const handleDepartmentsChange = (event, newValue) => {
    setFormData(prev => ({
      ...prev,
      departments: newValue,
      // Clear subjects when departments change to force reselection
      subjects: []
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.contactNumber.trim()) errors.contactNumber = 'Contact number is required';
    if (!formData.mobileNumber.trim()) errors.mobileNumber = 'Mobile number is required';
    
    if (formData.role === 'visiting') {
      if (formData.departments.length === 0) errors.departments = 'At least one department is required';
      if (formData.subjects.length === 0) errors.subjects = 'At least one subject is required';
      if (!formData.hourlyRate.trim()) errors.hourlyRate = 'Hourly rate is required for visiting lecturers';
    }
    
    return errors;
  };

  const handleSubmit = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const roleName = 
      formData.role === 'admin' ? 'Admin Lecturer' :
      formData.role === 'visiting' ? 'Visiting Lecturer' :
      'Permanent Lecturer';

    const newLecturer = {
      id: selectedLecturer ? selectedLecturer.id : lecturers.length + 1,
      name: formData.name,
      email: formData.email,
      role: roleName,
      contactNumber: formData.contactNumber,
      mobileNumber: formData.mobileNumber,
      status: formData.status,
      departments: formData.role === 'visiting' ? formData.departments : [],
      subjects: formData.subjects,
      hourlyRate: formData.role === 'visiting' ? formData.hourlyRate : ''
    };

    if (selectedLecturer) {
      // Update existing lecturer
      setLecturers(lecturers.map(lec => 
        lec.id === selectedLecturer.id ? newLecturer : lec
      ));
    } else {
      // Add new lecturer
      setLecturers([...lecturers, newLecturer]);
    }

    handleDialogClose();
  };

  const handleDeleteLecturer = (id) => {
    if (window.confirm('Are you sure you want to delete this lecturer?')) {
      setLecturers(lecturers.filter(lecturer => lecturer.id !== id));
    }
  };

  const filterLecturers = () => {
    if (!searchTerm) return lecturers;
    
    return lecturers.filter(lecturer => 
      lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecturer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecturer.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <Box className="p-4">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h4" className="text-gray-800 font-bold">
          Lecturer Management
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<PersonAddIcon />}
          onClick={() => handleDialogOpen()}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Add New Lecturer
        </Button>
      </Box>

      {/* Search Bar */}
      <Box className="mb-6">
        <TextField
          fullWidth
          placeholder="Search by name, email, or role"
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

      {/* Lecturers Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell className="font-bold">Name</TableCell>
              <TableCell className="font-bold">Email</TableCell>
              <TableCell className="font-bold">Role</TableCell>
              <TableCell className="font-bold">Contact</TableCell>
              <TableCell className="font-bold">Departments</TableCell>
              <TableCell className="font-bold">Subjects</TableCell>
              {/* Additional columns for visiting lecturers */}
              <TableCell className="font-bold">Hourly Rate</TableCell>
              <TableCell className="font-bold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterLecturers().map((lecturer) => (
              <TableRow key={lecturer.id} className="hover:bg-gray-50">
                <TableCell>{lecturer.name}</TableCell>
                <TableCell>{lecturer.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={lecturer.role} 
                    color={
                      lecturer.status === 1 ? "primary" : 
                      lecturer.status === 2 ? "secondary" : "default"
                    }
                    size="small"
                    className={
                      lecturer.status === 1 ? "bg-blue-600" : 
                      lecturer.status === 2 ? "bg-purple-600" : "bg-green-600"
                    }
                  />
                </TableCell>
                <TableCell>
                  <div>{lecturer.contactNumber}</div>
                  <div className="text-xs text-gray-500">{lecturer.mobileNumber}</div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {lecturer.departments && lecturer.departments.map((department, idx) => (
                      <Chip 
                        key={idx} 
                        label={department} 
                        size="small" 
                        className="bg-blue-100 text-xs"
                      />
                    ))}
                    {(!lecturer.departments || lecturer.departments.length === 0) && 
                      <span className="text-xs text-gray-500">-</span>
                    }
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {lecturer.subjects.map((subject, idx) => (
                      <Chip 
                        key={idx} 
                        label={subject} 
                        size="small" 
                        className="bg-gray-200 text-xs"
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {lecturer.hourlyRate && `Rs. ${lecturer.hourlyRate}`}
                </TableCell>
                <TableCell>
                  <IconButton 
                    size="small" 
                    onClick={() => handleDialogOpen(lecturer)}
                    className="text-blue-600"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => handleDeleteLecturer(lecturer.id)}
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

      {/* Add/Edit Lecturer Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedLecturer ? 'Edit Lecturer' : 'Add New Lecturer'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="mb-4">
            {selectedLecturer 
              ? 'Update the lecturer information below.' 
              : 'Fill in the details to add a new lecturer.'}
          </DialogContentText>
          
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <TextField
              name="name"
              label="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!formErrors.name}
              helperText={formErrors.name}
            />
            
            <TextField
              name="email"
              label="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!formErrors.email}
              helperText={formErrors.email}
            />

            <FormControl fullWidth required>
              <InputLabel>Lecturer Type</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                label="Lecturer Type"
              >
                <MenuItem value="admin">Admin Lecturer</MenuItem>
                <MenuItem value="visiting">Visiting Lecturer</MenuItem>
                <MenuItem value="permanent">Permanent Lecturer</MenuItem>
              </Select>
            </FormControl>
            
            {!selectedLecturer && (
              <TextField
                name="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                fullWidth
                disabled={selectedLecturer}
                helperText="Default password for new accounts"
              />
            )}
            
            <TextField
              name="contactNumber"
              label="Contact Number"
              value={formData.contactNumber}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!formErrors.contactNumber}
              helperText={formErrors.contactNumber}
            />
            
            <TextField
              name="mobileNumber"
              label="Mobile Number"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!formErrors.mobileNumber}
              helperText={formErrors.mobileNumber}
            />
            
            {/* Show departments only for visiting lecturers */}
            {formData.role === 'visiting' && (
              <FormControl fullWidth className="col-span-2" error={!!formErrors.departments}>
                <Autocomplete
                  multiple
                  id="departments"
                  options={allDepartments}
                  value={formData.departments}
                  onChange={handleDepartmentsChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Departments"
                      required={true}
                      error={!!formErrors.departments}
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        size="small"
                        color="primary"
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                />
                {formErrors.departments && (
                  <FormHelperText>{formErrors.departments}</FormHelperText>
                )}
              </FormControl>
            )}

            {/* Show subject selection after departments for visiting lecturers */}
            <FormControl fullWidth className="col-span-2" error={!!formErrors.subjects}>
              <Autocomplete
                multiple
                id="subjects"
                options={formData.role === 'visiting' ? availableSubjects : allSubjects}
                value={formData.subjects}
                onChange={handleSubjectsChange}
                disabled={formData.role === 'visiting' && formData.departments.length === 0}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Subjects"
                    required={formData.role === 'visiting'}
                    error={!!formErrors.subjects}
                    helperText={
                      formData.role === 'visiting' && formData.departments.length === 0 
                      ? 'Select departments first' 
                      : formErrors.subjects || ''
                    }
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      size="small"
                      {...getTagProps({ index })}
                    />
                  ))
                }
              />
              {formErrors.subjects && (
                <FormHelperText>{formErrors.subjects}</FormHelperText>
              )}
            </FormControl>
            
            {/* Show hourly rate only for visiting lecturers */}
            {formData.role === 'visiting' && (
              <TextField
                name="hourlyRate"
                label="Hourly Payment Rate (Rs)"
                value={formData.hourlyRate}
                onChange={handleInputChange}
                fullWidth
                required
                error={!!formErrors.hourlyRate}
                helperText={formErrors.hourlyRate}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Rs.</InputAdornment>
                  ),
                }}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={handleDialogClose} className="text-gray-600">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {selectedLecturer ? 'Update' : 'Add'} Lecturer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LecturerManagement;
