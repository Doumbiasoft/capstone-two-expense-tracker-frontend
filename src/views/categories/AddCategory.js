import React from 'react';
import { Grid } from '@mui/material';
import { FcPlus } from "react-icons/fc";

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

    title: 'Add',
  },
];
import PageContainer from '../../components/container/PageContainer';
import { useFormData } from '../../hooks/useFormData';


export default function AddCategory() {
  const [formData, setFormData, handleChangeFormData] = useFormData({ type: "", name: "" });
  return (
    <PageContainer title="Create a Category" description="this is a form to add a category" >
      {/* breadcrumb */}
      <Breadcrumb title="Create a Category" items={BCrumb} />
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={8}>
          <FormCategory id={0} formData={formData} handleChangeFormData={handleChangeFormData} minHeight='220px' />
        </Grid>
        <Grid item xs={12} lg={4}  >
          <BoxShapeIcon minHeight='210px' count={''} hasCount={false} iconComponent={<FcPlus size={100} />} />
        </Grid>
      </Grid>
    </PageContainer>
  )
}

