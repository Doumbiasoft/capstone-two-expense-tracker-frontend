import React from 'react';
import { Grid } from '@mui/material';
import { FcFolder } from "react-icons/fc";

import {
    CategoryList,
    BoxShapeIcon
} from './categories-components';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Categories',
    },
  ];
import PageContainer from '../../components/container/PageContainer';


export default function Categories() {
  const data =[{id:"1",name:"Salary",type:"Income"},{id:"2",name:"Transportation",type:"Expense"},{id:"3",name:"Salary",type:"Income"},{id:"4",name:"Transportation",type:"Expense"},{id:"5",name:"Salary",type:"Income"},{id:"6",name:"Transportation",type:"Expense"},{id:"7",name:"Salary",type:"Income"}].sort((a, b) => (a.name < b.name ? -1 : 1));

  return (
    <PageContainer title="Categories" description="this is of category" >
    {/* breadcrumb */}
    <Breadcrumb title="Categories" items={BCrumb} />
    <Grid container spacing={0}>
      {/* ------------------------- row 1 ------------------------- */}
    <Grid item xs={12} lg={8}>
       <CategoryList data={data}/>
    </Grid>
      <Grid item xs={12} lg={4}  >
      <BoxShapeIcon minHeight='370px' count={data.length} hasCount={true} iconComponent={<FcFolder size={200}/>}/>
      </Grid>
    </Grid>
  </PageContainer>
  )
}

