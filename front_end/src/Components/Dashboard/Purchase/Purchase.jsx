import * as React from 'react';
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
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import './Purchase.css'
import Number from './Number'
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

function createData(name, category, id,  price, totalValue) {
    return {
        name,
        category,
        id,
        price,
        totalValue,
    };
}


// const rows = [
//     createData(1, 'Cupcake', 305,  67, 4.3),
//     createData(2, 'Donut', 452,  51, 4.9),
//     createData(3, 'Eclair', 262,  24, 6.0),
//     createData(4, 'Frozen yoghurt', 159,  24, 4.0),
//     createData(5, 'Gingerbread', 356,  49, 3.9),
//     createData(6, 'Honeycomb', 408,  87, 6.5),
//     createData(7, 'Ice cream sandwich', 237,  37, 4.3),
//     createData(8, 'Jelly Bean', 375,  94, 0.0),
//     createData(9, 'KitKat', 518,  65, 7.0),
//     createData(10, 'Lollipop', 392,  98, 0.0),
//     createData(11, 'Marshmallow', 318,  81, 2.0),
//     createData(12, 'Nougat', 360,  9, 37.0),
//     createData(13, 'Oreo', 437,  63, 4.0),
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
        numeric: true,
        disablePadding: false,
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
    {
        id: 'button',
        numeric: true,
        disablePadding: false,

    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    const getAlignment = (key) =>{
        if(key === 'Quantity'){
            return 'center'
        }
        else if(key === 'Inventory ID'){
            return 'right'

        }
        else if(key === 'Unit Price($)'){
            return 'right'

        }
        else if(key === 'Inventory Value($)'){
            return 'right'

        }
        else{
            return 'left'
        }




    }

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">

                </TableCell>
                {headCells.map((headCell) => (

                    <TableCell
                        key={headCell.id}
                        align = {getAlignment(headCell.id)}

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
                    Purchase
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
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [dataFromChild, setDataFromChild] = useState("");
    const [purchase, setPurchase] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [purchaseSuccess, setPurchaseSuccess] = React.useState('');
    const [localData, setLocalData] =React.useState(data);

    const rows = React.useMemo(
        () => localData.length ? localData.map(item => createData(item.productName, item.category, item.inventoryID, item.price, (item.stock * item.price).toFixed(2))) : [],
        [localData]
    );
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };
    const handleClosePurchase =()=>{
        setPurchase(false);
        setSelectedRow(null);
        setPurchaseSuccess('');
        reFetch()

    };
    function handleDataFromChild(data) {
        setDataFromChild(data);
    }
    const handleOpenPurchase =(event,row)=>{
        event.preventDefault();
        setSelectedRow(row);
        setPurchase(true);
    };
    useEffect(() => {
        setLocalData(data);
    }, [data]); // This will run whenever the `data` prop changes

    const reFetch = async ()=>{
        try {
            const response = await fetch('http://localhost:18080/inventory');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const newData = await response.json();
            setLocalData(newData);
            // console.log('Response from backend:', data);
        } catch (error) {
            console.error('Error fetching inventory data:', error);
        }
    };

    const handlePurchase = async (e) => {
        e.preventDefault();

            const salesData = {
                Product_Name: String(selectedRow.name),
                Product_Category: String(selectedRow.category),
                Product_ID: String(selectedRow.id),
                Purchase_Amount: String(dataFromChild),
                Purchase_Value:String(dataFromChild*selectedRow.price)
            };



            try {
                const response = await fetch('http://localhost:18080/purchaseProduct', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(salesData),
                });

                const result = await response.json();

                console.log('Response from backend:', result);

                // Handle success or failure

                if (response.ok) {
                    // Handle successful login (e.g., redirect, show a success message)
                    console.log('Purchase Product successful!');
                    setPurchaseSuccess("Purchase Product successful!")

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
        <Box sx={{ width: '100%' }} className="Purchase">
            <Paper sx={{ width: '100%', mb: 2 }} >
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer >
                    <Table
                        className="Table"
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

                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.category}</TableCell>
                                        <TableCell align="left">{row.id}</TableCell>
                                        <TableCell align="right"><Number sendDataToParent={handleDataFromChild}/></TableCell>
                                        <TableCell align="left">{row.price}</TableCell>
                                        <TableCell align="left">{row.totalValue}</TableCell>
                                        <TableCell><Button variant="contained" onClick={(event) => handleOpenPurchase(event, row)}>Purchase</Button></TableCell>
                                        <Dialog open={purchase}
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
                                                {"Sales"}
                                            </DialogTitle>
                                            <DialogContent>{selectedRow &&(
                                                <form onSubmit={handlePurchase} >
                                                    <div>
                                                        <h3 style={{ color: 'red' }}>Are you sure process this purchase?</h3>
                                                        <h4>Product Name: {selectedRow.name}</h4>
                                                        <h4>Product Category: {selectedRow.category}</h4>
                                                        <h4>Product ID: {selectedRow.id}</h4>
                                                        <h4>Purchase Quantity: {dataFromChild}</h4>
                                                        <h4>Total Price: ${(selectedRow.price * dataFromChild).toFixed(2)}</h4>
                                                        <Button  type="submit">Complete Purchase
                                                        </Button>
                                                        <Button onClick={handleClosePurchase} >Close
                                                        </Button>
                                                        {purchaseSuccess && <p style={{ color: 'red' }}>{purchaseSuccess}</p>}

                                                    </div>
                                                </form>
                                            )
                                            }
                                            </DialogContent>
                                        </Dialog>

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
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </Box>
    );
}
