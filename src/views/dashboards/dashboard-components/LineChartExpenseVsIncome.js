import React from 'react';
import { Box, Typography } from '@mui/material';
import Chart from 'react-apexcharts';
import DashboardCard from '../../../components/base-card/DashboardCard';

export default function LineChartExpenseVsIncome({ splineChartData }) {


  const categories = (Array.isArray(splineChartData) && splineChartData.length > 0) ? splineChartData.map(data => data.day) : [];
  const incomeData = (Array.isArray(splineChartData) && splineChartData.length > 0) ? splineChartData.map(data => data.income) : [];
  const expenseData = (Array.isArray(splineChartData) && splineChartData.length > 0) ? splineChartData.map(data => data.expense) : [];


  const primary = "#7CCF71";
  const secondary = "#E7D91B";
  const options = {
    grid: {
      show: true,
      borderColor: 'rgba(0, 0, 0, .2)',
      color: '#777e89',
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    chart: {
      fontFamily: 'DM Sans',
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    colors: [primary, secondary],

    xaxis: {
      categories: categories,
    },
    markers: {
      size: 4,
      border: 1,
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
      theme: 'dark',

    },
    legend: {
      show: true,
    },
  };
  const series = [
    {
      name: 'Income',
      data: incomeData,
    },
    {
      name: 'Expense',
      data: expenseData,
    },
  ];
  return (
    <DashboardCard title="Income vs Expense">
      {/* chart */}
      <Typography
        color="textSecondary"
        variant="body1"
        sx={{
          fontSize: 'h5.fontSize',
        }}
      >
        Last 7 days
      </Typography>
      <Box>
        <Chart options={options} series={series} type="line" height="245" />
      </Box>
    </DashboardCard>
  );
}
