import React from 'react';
import { Grid } from '@mui/material';
import { AiFillEdit } from "react-icons/ai";
import { useParams, useLocation } from 'react-router-dom';
import { useFormData } from'../../hooks/useFormData';

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
       
      title: 'Edit',
    },
  ];
import PageContainer from '../../components/container/PageContainer';



export default function EditTransaction() {
    //const { id } = useParams();
    const location = useLocation()
    const { from } = location.state;
    const [formData,setFormData, handleChangeFormData] =  useFormData(from);
   

  return (
    <PageContainer title="Edit a Transaction" description="this is a form to edit a transaction" >
    {/* breadcrumb */}
    <Breadcrumb title="Edit a Transaction" items={BCrumb} />
    <Grid container spacing={0}>
      {/* ------------------------- row 1 ------------------------- */}
    <Grid item xs={12} lg={8}>
       <FormTransaction id={from.id} dataForm={formData} handleChangeFormData={handleChangeFormData} minHeight='220px'/>
    </Grid>
      <Grid item xs={12} lg={4}  >
       <BoxShapeIcon minHeight='385px' count={''} hasCount={false} iconComponent={<AiFillEdit  size={100}/>}/>
      </Grid>
    </Grid>
  </PageContainer>
  )
}

