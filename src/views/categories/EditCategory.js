import React from 'react';
import { Grid } from '@mui/material';
import { AiFillEdit } from "react-icons/ai";
import { useParams, useLocation } from 'react-router-dom';
import { useFormData } from'../../hooks/useFormData';

import {
     BoxShapeIcon,
    FormCategory
} from './categories-components';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      to: '/categories',
      title: 'Categories',
    },
    {
       
      title: 'Edit',
    },
  ];
import PageContainer from '../../components/container/PageContainer';



export default function EditCategory() {
    //const { id } = useParams();
    const location = useLocation()
    const { from } = location.state;
    const [formData, setFormData, handleChangeFormData] =  useFormData(from);
   

  return (
    <PageContainer title="Edit a Category" description="this is a form to edit a category" >
    {/* breadcrumb */}
    <Breadcrumb title="Edit a Category" items={BCrumb} />
    <Grid container spacing={0}>
      {/* ------------------------- row 1 ------------------------- */}
    <Grid item xs={12} lg={8}>
       <FormCategory id={from.id} formData={formData} handleChangeFormData={handleChangeFormData} minHeight='220px'/>
    </Grid>
      <Grid item xs={12} lg={4}  >
       <BoxShapeIcon minHeight='210px' count={''} hasCount={false} iconComponent={<AiFillEdit  size={100}/>}/>
      </Grid>
    </Grid>
  </PageContainer>
  )
}

