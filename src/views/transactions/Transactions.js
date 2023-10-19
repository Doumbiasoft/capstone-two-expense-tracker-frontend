import React from 'react';
import { Grid,Box } from '@mui/material';
import { FcMultipleInputs } from "react-icons/fc";

import {
    TransactionList,
    BoxShapeIcon
} from './transactions-components';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Transaction',
    },
  ];
import PageContainer from '../../components/container/PageContainer';


export default function Transactions() {
  const data =[{id:"1",category:"Salary",date:"2023-10-06 00:00:00",type:"Income",amount:21000,note:"good for me"},{id:"2",category:"Transportation",date:"2023-10-04 00:00:00",type:"Expense",amount:500,note:"not good at all for me"}]

  return (
    <PageContainer title="Transactions" description="this is of Transaction" >
    {/* breadcrumb */}
    <Breadcrumb title="Transactions" items={BCrumb} />
    <Grid container spacing={0}>
      {/* ------------------------- row 1 ------------------------- */}
    <Grid item xs={12} lg={8}>
       <TransactionList data={data}/>
    </Grid>
      <Grid item xs={12} lg={4}>
      <BoxShapeIcon minHeight='370px' count={data.length} hasCount={true} iconComponent={<FcMultipleInputs size={200}/>}/>
      </Grid>
    </Grid>
  </PageContainer>
  )
}

