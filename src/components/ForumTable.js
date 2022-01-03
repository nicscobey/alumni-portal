import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel, { tableSortLabelClasses } from '@mui/material/TableSortLabel';
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
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import {useAppState} from '../AppState'
import {useState, useEffect} from 'react'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
    //   backgroundColor: theme.palette.common.black,
      backgroundColor: "gray",
      color: theme.palette.common.white,
    },
    // [`&.${tableCellClasses.head}:hover`]: {
    //     // backgroundColor: theme.palette.common.black,
    //     color: "red"
    //   },
    // [`&.${TableSortLabel}:hover`]: {
    //   fontSize: 14,
    //   color: "green"
    // },
  }));

  const StyledSortLabel = styled(TableSortLabel)(({ theme }) => ({
      color: "white !important" ,
      
    //   '&:hover': {
    //     color: "red !important"
    //   }
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // '&:nth-of-type(odd)': {
    //   backgroundColor: theme.palette.action.hover,
    // },
    // '&:hover': {
    //     backgroundColor: "green"
    // }
    // hide last border
    // '&:last-child td, &:last-child th': {
    //   border: 0,
    // },
  }));

function createData(topic, replies, views, author, lastReplier, datePosted, dateLastReply, _id) {
  return {
    topic,
    replies,
    views,
    author,
    lastReplier,
    datePosted, 
    dateLastReply,
    _id
  };
}

// const rows = [
//   createData(forum.title, )
// ]

const rows = [
  createData('Cupcake', 305, 4.3, "Amy", "Zelda", 1638677728657, 1638699928657, 1),
  createData('Donut', 452, 4.9, "Bob", "Yolanda", 1638670750657, 1638688728657, 2),
  createData('Eclair', 262, 6.0, "Carly", "Xerox", 1638629728657, 1638677728657, 3),
  createData('Frozen yoghurt', 159, 4.0, "Duckie", "Willie", 1638686728657, 1638677728657, 4),
  createData('Gingerbread', 356, 3.9, "Edwin", "Victor", 1638688728657, 1638677728657, 5),
  createData('Honeycomb', 408, 6.5, "Georgie", "Ursula", 163867071257, 1638687728657, 6),
  createData('Ice cream sandwich', 237, 4.3, "Harriet", "Terry", 1638680728657, 1638677728657, 7),
  createData('Jelly Bean', 375, 0.0, "Isaac", "Stella", 1638670263657, 1638679728657, 8),
  createData('KitKat', 518, 7.0, "Jaques", "Rosa", 1638670746657, 1638678728657, 9),
  createData('Lollipop', 392, 0.0, "Kelly", "Queen", 1638670724657, 1638697728657, 10),
  createData('Marshmallow', 318, 2.0, "Leonard", "Paula", 1638670728657, 1638677728657, 11),
  createData('Nougat', 360, 37.0, "Monica", "Ollie", 1638670428657, 1638679728657, 12),
  createData('Oreo', 437, 4.0, "Natalia", "Nathans", 1638670768657, 1638677928657, 13),
];



// const newRows = [
//     createData('Cupcake', 305, 3.7, 67),
//     createData('Donut', 452, 25.0, 51),
//     createData('Eclair', 262, 16.0, 24),
//     createData('Frozen yoghurt', 159, 6.0, 24),
//     createData('Gingerbread', 356, 16.0, 49),
//     createData('Honeycomb', 408, 3.2, 87),
//     createData('Ice cream sandwich', 237, 9.0, 37),
//     createData('Jelly Bean', 375, 0.0, 94),
//     createData('KitKat', 518, 26.0, 65),
//     createData('Lollipop', 392, 0.2, 98),
//     createData('Marshmallow', 318, 0, 81),
//     createData('Nougat', 360, 19.0, 9),
//     createData('Oreo', 437, 18.0, 63),
//   ];

//topic (with author's name), replies, last post by (with time & author's name), views 

console.log(rows)

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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'datePosted',
    numeric: false,
    disablePadding: true,
    label: 'Topic',
  },
  // {
  //   id: 'replies',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Replies',
  // },
  // {
  //   id: 'views',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Views',
  // },
  {
    id: 'dateLastReply',
    numeric: true,
    disablePadding: false,
    label: 'Date Posted',
  },
//   {
//     id: 'author',
//     numeric: false,
//     disablePadding: false,
//     label: 'Author',
//   },
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
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            // padding={headCell.disablePadding ? 'none' : 'normal'}
            padding="16px"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <StyledSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <b>{headCell.label}</b>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </StyledSortLabel>
          </StyledTableCell>
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

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )} */}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function ForumTable() {
  const [order, setOrder] = React.useState('asc');
  const {state, dispatch} = useAppState()
  const {token, url } = state;


  //THE DEFAULT SHOULD BE LAST REPLY OR FIRST POSTED DATE
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    console.log(isAsc)
    console.log(orderBy)
    console.log(property)
    console.log(order)
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  let [data, setData] = useState(false);

  const retrieveData = async () => {
    console.log(url)
    console.log(token)
    const response = await fetch(url + "/forums", {
      method: "get",
      headers: {
        Authorization: "bearer " + token,
      }
    })
    console.log(response)
    const data = await response.json()
    console.log(data)
    setData(data)
  }

  useEffect(() => {retrieveData()}, [])

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelecteds = rows.map((n) => n.name);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };


  //NEED TO REPLACE THIS HANDLE CLICK SO THAT WHEN A ROW IS CLICKED, NO ACTION OCCURS, BUT INSTEAD WE JUST LINK TO THAT FORUM'S PAGE
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    // setSelected(newSelected);
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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const convertToDate = (ms) => {
      const dateObj = new Date(ms)

    let hour

    if (dateObj.getHours() === 0) {
        hour = 12;
    }
    else if (dateObj.getHours() >= 12) {
        hour = dateObj.getHours() - 12
    }
    else {
        hour = dateObj.getHours() + 1
    }

    // let minutes


    // if (dateObj.getMinutes() === 0) {
    //     hour = 12;
    // }
    // else if (dateObj.Minutes() >= 12) {
    //     hour = dateObj.Minutes() - 11
    // }
    // else {
    //     hour = dateObj.Minutes() + 1
    // }

      return `${dateObj.getMonth()+1}-${dateObj.getDate()}-${dateObj.getFullYear()} at ${hour}:${dateObj.getMinutes()>9 ? dateObj.getMinutes() : "0" + dateObj.getMinutes()} ${dateObj.getHours() >= 12 ? "pm" : "am"}`
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


    const returnTable = () => {
      return (
<Box sx={{ width: 'calc(100% - 40px)', margin: "20px", }}>
      <Paper sx={{ width: '100%', mb: 2, border: "none", boxShadow: "none"  }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
            //   onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((forum, index) => {
                  const isItemSelected = isSelected(forum.title);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow
                      hover
                      onClick={(event) => handleClick(event, forum.title)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={forum.title}
                      selected={isItemSelected}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell> */}
                      <TableCell
                        // component="th"
                        id={labelId}
                        // scope="row"
                        padding="16px"
                      >
                        <p className="no-margin"><b><Link to={`/my/forum/${forum.id}`}>{forum.title}</Link></b></p>
                        {/* <p className="no-margin">Author: {forum.user_id}, {convertToDate(row.datePosted)}, {convertToDate(Date.now())}
                        </p> */}
                        <p className="margin-left"><i>Author:</i> {forum.firstname} {forum.lastname}</p>
                        
                      </TableCell>
                      {/* <TableCell align="right">
                          {row.replies}
                        </TableCell>
                      <TableCell align="right">{row.views}</TableCell> */}
                      <TableCell align="right"><i>Date posted: </i>{convertToDate(forum.created_at)}</TableCell>
                      {/* <TableCell align="right">{row.protein}</TableCell> */}
                    </StyledTableRow>
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
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
      )
    }
  return (
    <>
              {/* <button onClick={retrieveData}>Test</button> */}
      {data ? returnTable() : null}
    </>
  );
}