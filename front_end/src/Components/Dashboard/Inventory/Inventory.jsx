import * as React from 'react';
import {useEffect} from "react";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import './Inventory.css'
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

function createData(name, category, id, quantity, price, totalValue,lowStock) {
    return {
        name,
        category,
        id,
        quantity,
        price,
        totalValue,
        lowStock,
    };
}

// const rows = [
//     // createData(1, 'Cupcake', 305, 3.7, 67, 4.3),
//     // createData(2, 'Donut', 452, 25.0, 51, 4.9),
//     // createData(3, 'Eclair', 262, 16.0, 24, 6.0),
//     // createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
//     // createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
//     // createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
//     // createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
//     // createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
//     // createData(9, 'KitKat', 518, 26.0, 65, 7.0),
//     // createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
//     // createData(11, 'Marshmallow', 318, 0, 81, 2.0),
//     // createData(12, 'Nougat', 360, 19.0, 9, 37.0),
//     // createData(13, 'Oreo', 437, 18.0, 63, 4.0),
//     createData('Apple','Fruit','IN001',10,10,100)
//
//
// ];



function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }

    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Product Name',
    },
    {
        id:'Category',
        numeric: false,
        disablePadding: true,
        label: 'Category',


    },
    {
        id: 'ID',
        numeric: false,
        disablePadding: true,
        label: 'Inventory ID',
    },

    {
        id: 'Quantity',
        numeric: true,
        disablePadding: false,
        label: 'Quantity',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Unit Price($)',
    },
    {
        id: 'value',
        numeric: true,
        disablePadding: false,
        label: 'Inventory Value($)',
    },
];

function EnhancedTableHead(props) {

    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    {/*<Checkbox*/}
                    {/*    color="primary"*/}
                    {/*    indeterminate={numSelected > 0 && numSelected < rowCount}*/}
                    {/*    checked={rowCount > 0 && numSelected === rowCount}*/}
                    {/*    onChange={onSelectAllClick}*/}
                    {/*    inputProps={{*/}
                    {/*        'aria-label': 'select all desserts',*/}
                    {/*    }}*/}
                    {/*/>*/}
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                },
                numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                },
            ]}
        >
            {/*{numSelected > 0 ? (*/}
            {/*    <Typography*/}
            {/*        sx={{ flex: '1 1 100%' }}*/}
            {/*        color="inherit"*/}
            {/*        variant="subtitle1"*/}
            {/*        component="div"*/}
            {/*    >*/}
            {/*        {numSelected} selected*/}
            {/*    </Typography>*/}
            {/*) : (*/}
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Inventory
                </Typography>
            {/*)}*/}
            {/*{numSelected > 0 ? (*/}
            {/*    <Tooltip title="Delete">*/}
            {/*        <IconButton>*/}
            {/*            <DeleteIcon />*/}
            {/*        </IconButton>*/}
            {/*    </Tooltip>*/}
            {/*) : (*/}
            {/*    <Tooltip title="Filter list">*/}
            {/*        <IconButton>*/}
            {/*            <FilterListIcon />*/}
            {/*        </IconButton>*/}
            {/*    </Tooltip>*/}
            {/*)}*/}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({ data }) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('Quantity');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [visable,setVisable] = React.useState(false);
    const [newInventory,setNewInventory] = React.useState(false);
    const [newInventoryName, setNewInventoryName]=React.useState('');
    const [newInventoryCategory, setNewInventoryCategory]=React.useState('');
    const [newInventoryPrice, setNewInventoryPrice]=React.useState('');
    const [createSuccess, setCreateSuccess]=React.useState('');

    const rows = React.useMemo(

        () => data.length ? data.map(item => createData(item.productName, item.category, item.inventoryID, item.stock, item.price, (item.stock * item.price).toFixed(2),item.lowStock === "Yes")) : [],
        [data]
    );

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleChange = (event) => {
        const input = event.target.value;
        // Only allow digits, and optionally a decimal point
        if (/^\d*\.?\d*$/.test(input)) {
            setNewInventoryPrice(input);
        }
    };



    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };
    const handleNewInventory = (event) =>{
        event.preventDefault();
        setNewInventory(true);

    };
    const handleClose = () => {

        setNewInventory(false);
        setNewInventoryName('');
        setNewInventoryCategory('');
        setNewInventoryPrice('')
        setCreateSuccess('');

    };
    const handleChangeCategory = (event) => {
        setNewInventoryCategory(event.target.value);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        let id='';
        if(data.length<100){
            id = 'IN0';
        }
        else{
            id = 'IN1'
        }
        const productData = {
            Product_Name:newInventoryName,
            Product_Category:newInventoryCategory,
            Product_Price:newInventoryPrice,
            Product_ID:id + String(data.length + 1),
        };
        try {
            const response = await fetch('http://localhost:18080/createProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            const result = await response.json();

            console.log('Response from backend:', result);

            // Handle success or failure

            if (response.ok) {
                // Handle successful login (e.g., redirect, show a success message)
                console.log('Create Product successful!');
                setCreateSuccess("Create Product successful!")

            } else {

                setCreateSuccess('Item exist!');

            }
        } catch (error) {
            console.error('Error during create user:', error);
        }

    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            [...rows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage,rows],
    );

    return (
        <Box sx={{ width: '100%' }} className="Inventory">
            <Paper sx={{ width: '100%', mb: 2 }} >
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer >
                    <Table
                        className="Table"
                        key={data.length}
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>

                            {visibleRows.map((row, index) => {
                                const isItemSelected = selected.includes(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        // hover
                                        // onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.lowStock&&<PriorityHighIcon sx={{ color: 'red',ml:-3}} />}
                                            {row.name}

                                        </TableCell>
                                        <TableCell align="left">{row.category}</TableCell>
                                        <TableCell align="left">{row.id}</TableCell>
                                        <TableCell align="right">{row.quantity}</TableCell>
                                        <TableCell align="right">{row.price}</TableCell>
                                        <TableCell align="right">{row.totalValue}</TableCell>
                                        {/*<TableCell align="right">{row.protein}</TableCell>*/}
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    // onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </Paper>
            <Button variant="contained" onClick={handleNewInventory}>Create new product
            </Button>
            <Dialog open={newInventory}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="sm"
                    fullWidth
                    keepMounted = {false}
                    PaperProps={{
                        style:{
                            height :'330px'
                        },
                    }}
                    BackdropProps={{
                        style: { backgroundColor: 'rgba(100, 100, 100, 100)' },
                    }}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Create New Product"}
                </DialogTitle>
                <DialogContent>

                    <form onSubmit={handleCreate}>
                        <div >
                            <input className="styled-input" type="text" placeholder="Product Name" value={newInventoryName} onChange={(e) => setNewInventoryName(e.target.value)} required/>

                        </div>
                        <div >
                            <input className="styled-input" type="text"  placeholder="Price"  value={newInventoryPrice} onChange={handleChange} required/>

                        </div>
                        <div >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Product Cateogry</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={newInventoryCategory}
                                    label="Type"
                                    onChange={handleChangeCategory}
                                >
                                    <MenuItem value={"Fruit"}>Fruit</MenuItem>
                                    <MenuItem value={"Food"}>Food</MenuItem>
                                    <MenuItem value={"Drink"}>Drink</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <Button  type="submit">Create</Button>
                        {createSuccess && <p style={{ color: 'red' }}>{createSuccess}</p>}
                    </form>
                </DialogContent>
            </Dialog>

        </Box>
    );
}