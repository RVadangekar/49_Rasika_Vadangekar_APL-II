// src/pages/Details.js
import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, Typography, Button, Rating, Popover, IconButton, Tooltip, Menu,
  MenuItem, Chip, Divider, SpeedDial, SpeedDialAction, SpeedDialIcon, CircularProgress
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElPopover, setAnchorElPopover] = useState(null);
  const openMenu = Boolean(anchorEl);
  const openPopover = Boolean(anchorElPopover);
  const [expense, setExpense] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const id = parseInt(query.get('id'), 10);
    // Fetch or find expense based on ID (simulated with hardcoded data here)
    const fetchedExpense = {
      id,
      name: 'Groceries',
      amount: 50,
      paid: false,
    };
    setExpense(fetchedExpense);
  }, [location.search]);

  const handlePopoverOpen = (event) => {
    setAnchorElPopover(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorElPopover(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    // Edit functionality (navigate to a new route or show a form)
    navigate('/'); // Navigate back to Home or to an Edit page
  };

  const handleDelete = () => {
    // Delete functionality
    handleMenuClose();
    navigate('/'); // Navigate back to Home after deletion
  };

  if (!expense) return <CircularProgress />;

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5">Expense Details</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="h6">Expense Name: {expense.name}</Typography>
          <Typography variant="h6">Amount: ${expense.amount}</Typography>
          <Typography variant="h6">Paid: {expense.paid ? 'Yes' : 'No'}</Typography>
          <Rating name="read-only" value={4} readOnly />
          <Chip label="High Priority" color="primary" style={{ margin: '10px 0' }} />
          <Tooltip title="More actions">
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEdit}><EditIcon /> Edit</MenuItem>
            <MenuItem onClick={handleDelete}><DeleteIcon /> Delete</MenuItem>
          </Menu>
          <Tooltip title="Show more info">
            <Button onClick={handlePopoverOpen}>Show More Info</Button>
          </Tooltip>
          <Popover
            open={openPopover}
            anchorEl={anchorElPopover}
            onClose={handlePopoverClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <Typography sx={{ p: 2 }}>Detailed information about the expense can be found here.</Typography>
          </Popover>
          <SpeedDial
            ariaLabel="SpeedDial"
            icon={<SpeedDialIcon />}
            onClose={handlePopoverClose}
            onOpen={handlePopoverOpen}
            open={openPopover}
          >
            <SpeedDialAction
              icon={<EditIcon />}
              tooltipTitle="Edit"
              onClick={handleEdit}
            />
            <SpeedDialAction
              icon={<DeleteIcon />}
              tooltipTitle="Delete"
              onClick={handleDelete}
            />
          </SpeedDial>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
