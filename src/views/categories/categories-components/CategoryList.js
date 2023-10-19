import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import {
  Card,
  CardContent,
  Typography,
  TableHead,
  Chip,
  Box,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableFooter,
  IconButton,Button,Grid,Tooltip
} from '@mui/material';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Swal from 'sweetalert2/dist/sweetalert2.js';


function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


const CategoryList = ({data}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dense, setDense] = React.useState(true);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

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
  const handleDeleteItem = async (id)=>{
    Swal.fire({
      title: `Delete id: ${id} ?`,
      text: "You won't be able to revert this. All transactions related to this category will be deleted too!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#903535',
      cancelButtonColor: '#5F5E5E',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'The category has been deleted!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  return (
  
      <Card>
        <CardContent>
            <Grid marginBottom={'20px'}  display={'flex'}  justifyContent={'end'}>
            <Link
                style={{
                    textDecoration: 'none',
                }}
                to="/categories/add"
               
                >
                    <Button
                    sx={{
                        mt: 2,
                        display: 'block',
                
                        
                    }}
                    variant="contained"
                    color="success"
                    >
                    + New Category
                    </Button>
            </Link>
            </Grid>
          <Box
            sx={{
              overflow: {
                xs: 'auto',
                md: 'unset',
                minHeight:'400px'
              },
            }}
          >
            <Table
              aria-label="list of items"
              sx={{
                whiteSpace: 'nowrap',
              }}
              size={dense ? 'small' : 'medium'}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5">Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">Type</Typography>
                  </TableCell>
                  <TableCell>
                  <Box display="flex" justifyContent='end'>
                    <Typography variant="h5">Action</Typography>
                    </Box>
                  </TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : data
                ).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Typography variant="h5">{row.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        sx={{
                          backgroundColor:
                            row.type === 'Expense'
                              ? ''
                              : '',
                          
                          color:
                            row.type === 'Expense'
                              ? (theme) => theme.palette.danger.main
                              : (theme) => theme.palette.success.main,
                              
                          borderRadius: '6px',
                          pl: '3px',
                          pr: '3px',
                        }}
                        size="small"
                        label={row.type}
                      />
                    </TableCell>
                    <TableCell>
                    <Box display="flex" justifyContent='end'>
                        <Tooltip title="Edit">
                            <IconButton component={Link} to={`/categories/edit`} state={{ from: row }} >
                               <FeatherIcon icon="edit-3" width="20" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton onClick={()=>{handleDeleteItem(row.id)}}>
                            <FeatherIcon icon="trash" width="20" color="red" />
                            </IconButton>
                        </Tooltip>
                        </Box>
                    </TableCell>
                
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={6}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputprops: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </Box>
        </CardContent>
      </Card>
  
  );
};

export default CategoryList;
