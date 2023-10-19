import React from 'react';
import { Box } from '@mui/material';
import Chart from 'react-apexcharts';
import DashboardCard from '../../../components/base-card/DashboardCard';

export default function  LineChartExpenseVsIncome() {
  const primary = "#7CCF71";
  const secondary =  "#E7D91B";
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
      categories: ['16/08', '17/08', '18/08', '19/08', '20/08', '21/08', '22/08', '23/08'],
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
      data: [0, 5, 6, 8, 25, 9, 11, 24],
    },
    {
      name: 'Expense',
      data: [0, 3, 1, 2, 8, 1, 5, 1],
    },
  ];
  return (
    <DashboardCard title="Income vs Expense">
      {/* chart */}
      <Box>
        <Chart options={options} series={series} type="line" height="245" />
      </Box>
    </DashboardCard>
  );
}
