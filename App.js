import React, { useState } from 'react';
import {
  Button, TextField, Checkbox, AppBar, Toolbar, IconButton, Typography, Card,
  CardContent, Grid, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, 
  List, ListItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Slider, Switch, Avatar, Badge, CircularProgress, Drawer, Tabs, Tab, Tooltip, Accordion, 
  AccordionSummary, AccordionDetails, Breadcrumbs, ButtonGroup, Chip, Divider, LinearProgress,
  SpeedDial, SpeedDialAction, SpeedDialIcon, Popover, Pagination, Autocomplete, Skeleton, Rating
} from '@mui/material';
import {
  Menu as MenuIcon, Close as CloseIcon, Add as AddIcon, Edit as EditIcon, 
  Delete as DeleteIcon, Info as InfoIcon, Search as SearchIcon, Mail as MailIcon
} from '@mui/icons-material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import Alert from '@mui/material/Alert';
import Fab from '@mui/material/Fab';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './App.css';

const App = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [value, setValue] = useState(30);
  const [rating, setRating] = useState(3);
  const [fabOpen, setFabOpen] = useState(false);

  const handleClickOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleClickSnackbar = () => setSnackbarOpen(true);
  const handleCloseSnackbar = () => setSnackbarOpen(false);
  const handleClickMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const handleClickPopover = (event) => setPopoverAnchor(event.currentTarget);
  const handleClosePopover = () => setPopoverAnchor(null);
  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  return (
    <div className="app-container">
      <AppBar position="static" className="app-bar">
        <Toolbar className="toolbar">
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose} className="drawer">
        <List>
          <ListItem button onClick={handleCloseMenu}>Dashboard</ListItem>
          <ListItem button onClick={handleCloseMenu}>Reports</ListItem>
          <ListItem button onClick={handleCloseMenu}>Settings</ListItem>
        </List>
      </Drawer>

      <div className="content">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card className="card">
              <CardContent>
                <Typography variant="h5">Profile</Typography>
                <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" className="avatar" />
                <Typography variant="body1">Welcome to your dashboard!</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card className="card">
              <CardContent>
                <Typography variant="h5">Form</Typography>
                <TextField label="Name" variant="outlined" fullWidth margin="normal" />
                <TextField label="Email" variant="outlined" fullWidth margin="normal" />
                <Checkbox /> Subscribe
                <Button variant="contained" color="primary" onClick={handleClickOpenDialog}>
                  Open Dialog
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleClickSnackbar}>
                  Show Snackbar
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card className="card">
              <CardContent>
                <Typography variant="h5">Data Table</Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Column 1</TableCell>
                        <TableCell>Column 2</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Row 1, Cell 1</TableCell>
                        <TableCell>Row 1, Cell 2</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogContent>
            <Typography>Dialog Content</Typography>
            <Alert severity="info">This is an alert</Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="Snackbar message"
          className="snackbar"
        />

        <Popover
          open={Boolean(popoverAnchor)}
          anchorEl={popoverAnchor}
          onClose={handleClosePopover}
        >
          <Typography className="popover-content">Popover content</Typography>
        </Popover>

        <Tooltip title="Info">
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Tooltip>

        <Pagination count={10} className="pagination" />

        <SpeedDial
          ariaLabel="SpeedDial example"
          icon={<SpeedDialIcon />}
          onClick={() => setFabOpen(true)}
          className="speed-dial"
        >
          <SpeedDialAction
            icon={<AddIcon />}
            tooltipTitle="Add"
          />
          <SpeedDialAction
            icon={<EditIcon />}
            tooltipTitle="Edit"
          />
        </SpeedDial>

        <ButtonGroup variant="contained" color="primary" className="button-group">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonGroup>

        <Autocomplete
          options={['Option 1', 'Option 2']}
          renderInput={(params) => <TextField {...params} label="Autocomplete" variant="outlined" />}
          className="autocomplete"
        />

        <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
          <Typography color="textPrimary">Home</Typography>
          <Typography color="textPrimary">Library</Typography>
        </Breadcrumbs>

        <Chip label="Chip" onDelete={() => {}} className="chip" />
        <Divider />

        <Skeleton variant="text" className="skeleton" />
        <Skeleton variant="rectangular" width={210} height={118} className="skeleton" />
        <Skeleton variant="circle" width={40} height={40} className="skeleton" />

        <Card className="card">
          <CardContent>
            <Accordion className="accordion">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Accordion Header</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Accordion Details</Typography>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>

        <LinearProgress className="linear-progress" />

        <Fab color="primary" aria-label="add" className="fab">
          <AddIcon />
        </Fab>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleCloseMenu}>Menu Item 1</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Menu Item 2</MenuItem>
        </Menu>

        <IconButton className="search-icon">
          <SearchIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default App;
