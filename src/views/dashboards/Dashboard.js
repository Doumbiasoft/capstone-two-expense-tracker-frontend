import React from 'react';
import { Grid } from '@mui/material';
import {
  AmountTile,
  DoughnutChartExpenseByCategory,
  LineChartExpenseVsIncome,
  RecentTransactions
} from './dashboard-components';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
const BCrumb = [
  {
    title: 'Home',
  },
  {
    title: 'Dashboard',
  }
];

import PageContainer from '../../components/container/PageContainer';



export default function Dashboard() {
  return (
    
  <PageContainer title="Dashboard" description="this is Analytical Dashboard">
  {/* breadcrumb */}
  <Breadcrumb title="Dashboard" items={BCrumb} />
  <Grid container spacing={0}>
    {/* ------------------------- row 1 ------------------------- */}

    <Grid item xs={12} sm={6} lg={4}>
      <AmountTile title='Total Income' amount='7500' fabColor='success' titleColor='#00C292' />
    </Grid>
    <Grid item xs={12} sm={6} lg={4}>
    <AmountTile title='Total Expense' amount='2500' fabColor='danger' titleColor='#E46A76'/>
    </Grid>
    <Grid item xs={12} sm={12} lg={4}>
    <AmountTile title='Total Balance' amount='3500' fabColor='primary' titleColor='#364AAE'/>
    </Grid>
    <Grid item xs={12} lg={8}>
      <LineChartExpenseVsIncome />
    </Grid>
    <Grid item xs={12} lg={4}>
      <DoughnutChartExpenseByCategory />
    </Grid>
  
    <Grid item xs={12} lg={12}>
      <RecentTransactions />
    </Grid>
    
  </Grid>
</PageContainer>
  )
}
