
import React from 'react';
import { Box } from '@mui/material';
import Chart from 'react-apexcharts';
import DashboardCard from '../../../components/base-card/DashboardCard';

const DoughnutChartExpenseByCategory = () => {

  const COLORS = ['#00C49F','#364AAE','#F2BE4E','#EF9264','#4E5AA0','#97BD3F','#A8108F', '#0088FE', '#CD8DF5'];

  const optionstotalsales = {
    labels: ['2021', '2020', '2019','2018','2017'],

    chart: {
      height: 215,
      type: 'donut',
      foreColor: '#adb0bb',
      fontFamily: 'DM sans',
    },
    colors: COLORS,
    dataLabels: {
      enabled: true,
    },
    legend: {
      show: true,
    },
    stroke: {
      colors: ['transparent'],
    },
    plotOptions: {
      pie: {
        donut: {
          size: '40%',
          background: 'transparent',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '18px',
              color: undefined,
              offsetY: -10,
            },
            value: {
              show: true,
              color: '#98aab4',
            },
            total: {
              show: false,
              label: 'Total',
              color: '#98aab4',
            },
          },
        },
      },
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: true,
    },
  };
  const seriestotalsales = [12000, 2000, 100,50, 400];
  return (
    <DashboardCard title="Expense By Category" >

      <Box
        sx={{
          mt: 5,
          position: 'relative',
        }}
      >
        <Chart options={optionstotalsales} series={seriestotalsales} type="donut" height="215" />
 
      </Box>
      
    </DashboardCard>
  );
};

export default DoughnutChartExpenseByCategory;
