import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, TextField, Checkbox, Card, CardContent, Grid, Dialog,
  DialogActions, DialogContent, DialogTitle, Snackbar, IconButton, List, ListItem, Table, 
  TableBody, TableCell, TableContainer, TableHead, TableRow, Slider, Switch, Avatar, Badge, 
  Drawer, MenuItem, ListItemText, Tooltip, Accordion, AccordionSummary, AccordionDetails, 
  Autocomplete, Breadcrumbs, Chip, Divider, Fab, LinearProgress, Pagination, Rating, Popover,
  CircularProgress, Alert
} from '@mui/material';
import { Close as CloseIcon, Menu as MenuIcon, Add as AddIcon, Info as InfoIcon, 
  ExpandMore as ExpandMoreIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const App = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Groceries', amount: 50, paid: false },
    { id: 2, name: 'Utilities', amount: 120, paid: true }
  ]);
  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [view, setView] = useState('list');
  const [sliderValue, setSliderValue] = useState(100);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [rating, setRating] = useState(3);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleAddExpense = () => {
    if (newExpenseName.trim() && !isNaN(newExpenseAmount) && Number(newExpenseAmount) > 0) {
      setExpenses([
        ...expenses,
        { id: expenses.length + 1, name: newExpenseName, amount: Number(newExpenseAmount), paid: false }
      ]);
      setNewExpenseName('');
      setNewExpenseAmount('');
      setSnackbarOpen(true);
    }
  };

  const handleTogglePaid = (id) => {
    setExpenses(expenses.map(expense =>
      expense.id === id ? { ...expense, paid: !expense.paid } : expense
    ));
  };

  const handleOpenDialog = (expense) => {
    setSelectedExpense(expense);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedExpense(null);
  };

  const handleSwitchChange = (event) => {
    setView(event.target.checked ? 'table' : 'list');
  };

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handlePopoverOpen = (event) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  const handleTagSelect = (event, newValue) => {
    setSelectedTag(newValue);
  };

  const filteredExpenses = expenses.filter(expense => expense.amount <= sliderValue);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Tooltip title="Open Menu" aria-label="menu">
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Personal Finance Tracker
          </Typography>
          <Tooltip title="Total filtered expenses" aria-label="info">
            <Avatar>
              <Badge badgeContent={filteredExpenses.length} color="secondary">
                <InfoIcon />
              </Badge>
            </Avatar>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <div style={{ width: 250, padding: 20 }}>
          <Typography variant="h6">Menu</Typography>
          <MenuItem onClick={() => setView('list')}>
            <Tooltip title="Switch to List View" aria-label="list view">
              <Typography>List View</Typography>
            </Tooltip>
          </MenuItem>
          <MenuItem onClick={() => setView('table')}>
            <Tooltip title="Switch to Table View" aria-label="table view">
              <Typography>Table View</Typography>
            </Tooltip>
          </MenuItem>
          <MenuItem onClick={() => alert('Settings')}>
            <Tooltip title="Go to Settings" aria-label="settings">
              <Typography>Settings</Typography>
            </Tooltip>
          </MenuItem>
        </div>
      </Drawer>

      <Grid container spacing={2} style={{ padding: 20 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5">Add New Expense</Typography>
              <TextField
                label="Expense Name"
                variant="outlined"
                value={newExpenseName}
                onChange={(e) => setNewExpenseName(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Amount"
                variant="outlined"
                type="number"
                value={newExpenseAmount}
                onChange={(e) => setNewExpenseAmount(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Tooltip title="Adjust the amount filter" aria-label="filter slider">
                <Slider
                  value={sliderValue}
                  onChange={handleSliderChange}
                  aria-labelledby="amount-slider"
                  min={0}
                  max={500}
                  valueLabelDisplay="auto"
                  style={{ marginBottom: 16 }}
                />
              </Tooltip>
              <Typography>Filter by Amount: {sliderValue}</Typography>
              <Tooltip title="Add the new expense to the list" aria-label="add expense">
                <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddExpense}>
                  Add Expense
                </Button>
              </Tooltip>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Tooltip title={`Switch to ${view === 'list' ? 'Table' : 'List'} View`} aria-label="switch view">
            <Switch
              checked={view === 'table'}
              onChange={handleSwitchChange}
              color="primary"
            />
          </Tooltip>
          <Typography>{view === 'list' ? 'List View' : 'Table View'}</Typography>
        </Grid>

        <Grid item xs={12}>
          {loading && <LinearProgress />}
          {view === 'list' ? (
            <List>
              {filteredExpenses.map(expense => (
                <ListItem key={expense.id} button onClick={() => handleOpenDialog(expense)}>
                  <Checkbox
                    checked={expense.paid}
                    onChange={() => handleTogglePaid(expense.id)}
                  />
                  <ListItemText
                    primary={expense.name}
                    secondary={`Amount: $${expense.amount}`}
                  />
                  <IconButton onClick={() => handleTogglePaid(expense.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => setExpenses(expenses.filter(e => e.id !== expense.id))}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Expense</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredExpenses.map(expense => (
                    <TableRow key={expense.id}>
                      <TableCell>{expense.name}</TableCell>
                      <TableCell>${expense.amount}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={expense.paid}
                          onChange={() => handleTogglePaid(expense.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpenDialog(expense)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => setExpenses(expenses.filter(e => e.id !== expense.id))}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>

        <Grid item xs={12}>
          <Pagination count={Math.ceil(expenses.length / 5)} color="primary" />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            options={['Groceries', 'Utilities', 'Rent', 'Misc']}
            renderInput={(params) => <TextField {...params} label="Tag" variant="outlined" />}
            value={selectedTag}
            onChange={handleTagSelect}
          />
        </Grid>

        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="textPrimary">Home</Typography>
            <Typography color="textPrimary">Expenses</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid item xs={12}>
          <Chip label="Grocery" onDelete={() => {}} />
          <Chip label="Rent" color="primary" onDelete={() => {}} />
        </Grid>

        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Here you can find detailed information about your expenses and financial status.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12}>
          <Fab color="primary" aria-label="add" style={{ position: 'fixed', bottom: 20, right: 20 }}>
            <AddIcon />
          </Fab>
        </Grid>

        <Grid item xs={12}>
          <Rating
            name="expense-rating"
            value={rating}
            onChange={handleRatingChange}
            precision={0.5}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="outlined" onClick={handlePopoverOpen}>
            Show Popover
          </Button>
          <Popover
            open={Boolean(popoverAnchor)}
            anchorEl={popoverAnchor}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Typography style={{ padding: 20 }}>
              This is a popover with additional information.
            </Typography>
          </Popover>
        </Grid>
      </Grid>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Expense Details</DialogTitle>
        <DialogContent>
          {selectedExpense && (
            <>
              <Typography><strong>Name:</strong> {selectedExpense.name}</Typography>
              <Typography><strong>Amount:</strong> ${selectedExpense.amount}</Typography>
              <Typography><strong>Paid:</strong> {selectedExpense.paid ? 'Yes' : 'No'}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Expense added!"
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={() => setSnackbarOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />

      <Alert
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        severity="success"
        style={{ position: 'fixed', bottom: 20, left: 20 }}
      >
        This is an alert message!
      </Alert>

      {loading && <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />}
    </div>
  );
};

export default App;
