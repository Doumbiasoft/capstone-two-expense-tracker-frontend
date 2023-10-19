import React from 'react';
import { Grid } from '@mui/material';
import { FcPlus } from "react-icons/fc";

import {
     BoxShapeIcon,
    FormTransaction
} from './transactions-components';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      to: '/transactions',
      title: 'Transactions',
    },
    {
       
      title: 'Add',
    },
  ];
import PageContainer from '../../components/container/PageContainer';
import { useFormData } from'../../hooks/useFormData';


export default function AddTransaction() {
  const [formData, setFormData, handleChangeFormData] =  useFormData({});
  return (
    <PageContainer title="Create a Transaction" description="this is a form to add a transaction" >
    {/* breadcrumb */}
    <Breadcrumb title="Create a Transaction" items={BCrumb} />
    <Grid container spacing={0}>
      {/* ------------------------- row 1 ------------------------- */}
    <Grid item xs={12} lg={8}>
       <FormTransaction id={0} dataForm={formData} handleChangeFormData={handleChangeFormData} minHeight='220px'/>
    </Grid>
      <Grid item xs={12} lg={4}  >
       <BoxShapeIcon minHeight='385px' count={''} hasCount={false} iconComponent={<FcPlus size={100}/>}/>
      </Grid>
    </Grid>
  </PageContainer>
  )
}

