import React,{useEffect,useState,useContext} from 'react';
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
import Api from '../../api'
import CurrentUserContext from '../../contexts/CurrentUserContext';


export default function Dashboard() {

  const ctx = useContext(CurrentUserContext);
  const [dashboard, setDashboard] = useState({});

  async function getDashboard() {
    try {
       const data = await Api.getDashboard(ctx.userId);
        if (data){
          setDashboard(data);
        }
      } catch (error) {
    }
}
useEffect(() => {
  getDashboard();
},[]);

  return (
    
  <PageContainer title="Dashboard" description="this is Analytical Dashboard">
  {/* breadcrumb */}
  <Breadcrumb title="Dashboard" items={BCrumb} />
  <Grid container spacing={0}>
    {/* ------------------------- row 1 ------------------------- */}

    <Grid item xs={12} sm={6} lg={4}>
      <AmountTile title='Total Income' amount={dashboard.totalIncome?dashboard.totalIncome:0} fabColor='success' titleColor='#00C292' />
    </Grid>
    <Grid item xs={12} sm={6} lg={4}>
    <AmountTile title='Total Expense' amount={dashboard.totalExpense?dashboard.totalExpense:0} fabColor='danger' titleColor='#E46A76'/>
    </Grid>
    <Grid item xs={12} sm={12} lg={4}>
    <AmountTile title='Total Balance' amount={dashboard.balance?dashboard.balance:0} fabColor='primary' titleColor='#364AAE'/>
    </Grid>
    <Grid item xs={12} lg={8}>
      <LineChartExpenseVsIncome splineChartData={dashboard.splineChartData?dashboard.splineChartData:[]} />
    </Grid>
    <Grid item xs={12} lg={4}>
      <DoughnutChartExpenseByCategory doughnutChartData={dashboard.doughnutChartData?dashboard.doughnutChartData:[]} />
    </Grid>
  
    <Grid item xs={12} lg={12}>
      <RecentTransactions data={dashboard.recentTransactions?dashboard.recentTransactions:[]} />
    </Grid>
    
  </Grid>
</PageContainer>
  )
}
