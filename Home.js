// src/pages/Home.js
import React, { useState } from 'react';
import {
  Card, CardContent, TextField, Button, List, ListItem, Checkbox, Typography,
  Snackbar, IconButton, Divider, Tooltip, Slider, CircularProgress, MenuItem, Menu
} from '@mui/material';
import { Add as AddIcon, Close as CloseIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Home = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Groceries', amount: 50, paid: false },
    { id: 2, name: 'Utilities', amount: 120, paid: true },
  ]);
  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(100);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleAddExpense = () => {
    if (newExpenseName.trim() && !isNaN(newExpenseAmount) && Number(newExpenseAmount) > 0) {
      setExpenses([...expenses, { id: expenses.length + 1, name: newExpenseName, amount: Number(newExpenseAmount), paid: false }]);
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

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
    handleMenuClose();
  };

  const filteredExpenses = expenses.filter(expense => expense.amount <= sliderValue);

  return (
    <div>
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
          <Slider
            value={sliderValue}
            onChange={handleSliderChange}
            aria-labelledby="amount-slider"
            min={0}
            max={500}
            valueLabelDisplay="auto"
            style={{ marginBottom: 16 }}
          />
          <Typography>Filter by Amount: {sliderValue}</Typography>
          <Tooltip title="Add the new expense to the list">
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddExpense}>
              Add Expense
            </Button>
          </Tooltip>
          <Divider style={{ margin: '20px 0' }} />
          {loading && <CircularProgress />}
          <List>
            {filteredExpenses.map(expense => (
              <ListItem key={expense.id}>
                <Checkbox
                  checked={expense.paid}
                  onChange={() => handleTogglePaid(expense.id)}
                />
                <Typography variant="body1" style={{ flexGrow: 1 }}>
                  {expense.name} - ${expense.amount}
                </Typography>
                <Tooltip title="Edit">
                  <IconButton component={Link} to={`/details?id=${expense.id}`} onClick={handleMenuOpen}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDelete(expense.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleDelete(expense.id)}>Delete</MenuItem>
                </Menu>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
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
    </div>
  );
};

export default Home;
