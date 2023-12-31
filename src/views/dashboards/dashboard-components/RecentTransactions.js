import React from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import DashboardCard from '../../../components/base-card/DashboardCard';
import cultureInfo from '../../../helpers/cultureInfo';


export default function RecentTransactions({ data }) {


  return (
    <DashboardCard
      title="Recent Transactions"
      subtitle=""
      customdisplay="block"
      custommargin="10px"
    >
      <Typography
        color="textSecondary"
        variant="body1"
        sx={{
          fontSize: 'h5.fontSize',
          mb: 5,
          mt: -3
        }}
      >
        Last 5
      </Typography>
      <Box
        sx={{
          overflow: 'auto',
          mt: -3,
        }}
      >
        <Table
          aria-label="simple table"
          sx={{
            mt: 2,
            whiteSpace: 'nowrap',
            'td:first-of-type, th:first-of-type': {
              pl: 0,
            },
            'td:last-of-type, th:last-of-type': {
              pr: 0,
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h5" color="textSecondary">
                  Category
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" color="textSecondary">
                  Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" color="textSecondary">
                  Amount
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h5" color="textSecondary">
                  Type
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(data) ? data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {row.categoryName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {row.date}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    <span style={{ color: row.categoryType === "Expense" ? "red" : "green" }}>{row.categoryType === 'Expense' ? '- ' : "+ "}</span>{cultureInfo.format(row.amount)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" justifyContent='end'>
                    <Chip
                      sx={{
                        backgroundColor:
                          row.categoryType === 'Expense'
                            ? (theme) => theme.palette.warning.main
                            : (theme) => theme.palette.success.main,
                        color: '#fff',
                        borderRadius: '6px',

                      }}
                      size="small"
                      label={row.categoryType}
                    />
                  </Box>
                </TableCell>

              </TableRow>
            )) : <></>}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  )
}

