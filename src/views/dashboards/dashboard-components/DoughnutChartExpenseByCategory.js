
import React from 'react';
import { Box, Typography } from '@mui/material';
import Chart from 'react-apexcharts';
import DashboardCard from '../../../components/base-card/DashboardCard';

const DoughnutChartExpenseByCategory = ({doughnutChartData}) => {

  const labels = doughnutChartData.map(data => data.categoryName);
  const seriesChart = doughnutChartData.map(data => data.amount);

  const COLORS = ['#00C49F','#364AAE','#F2BE4E','#EF9264','#4E5AA0','#97BD3F','#A8108F', '#0088FE', '#CD8DF5'];

  const options = {
    labels: labels,

    chart: {
      height: 220,
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
          size: '50%',
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
  const series = seriesChart;
  return (
    <DashboardCard title="Expense By Category">
 <Typography
          color="textSecondary"
          variant="body1"
          sx={{
            fontSize: 'h5.fontSize',
          }}
        >
          Last 7 days
        </Typography>
      <Box
        sx={{
          mt: 5,
          position: 'relative',
          height: 220,
        }}
      >
        <Chart options={options} series={series} type="donut" height="220" width="100%" />
 
      </Box>
      
    </DashboardCard>
  );
};

export default DoughnutChartExpenseByCategory;
