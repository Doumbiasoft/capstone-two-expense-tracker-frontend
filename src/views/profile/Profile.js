import React from 'react';
import { Card, Grid, Typography, Button,Box,Fab } from '@mui/material';

import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';

import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import Swal from 'sweetalert2/dist/sweetalert2.js';

const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Profile',
    },
  ];


export default function Profile() {

const handleDeleteAccount = async ()=>{
  const { value: email } = await Swal.fire({
    title: 'Delete Account',
    input: 'email',
    inputLabel: 'Enter your email address',
    inputPlaceholder: 'Enter your email address',
    showCancelButton: true,
    confirmButtonColor: '#903535',
    cancelButtonColor: '#5F5E5E',
    confirmButtonText: 'Delete'
  })
  
  if (email) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your Account has been deleted!',
      showConfirmButton: false,
      timer: 1500
    })
  }
  
}

  return (
  <PageContainer title="Profile" description="user profile and setting">
  <Breadcrumb title="Profile & Settings"  items={BCrumb} />
  <Grid container spacing={0}>
    <Grid item lg={4} md={12} xs={12}>
      <Card sx={{ p: 3, minHeight:'350px'}}>
        <Box
          sx={{
            width: 110,
             height: 110,
         
          }}
        >
          <Fab
            color="secondary"
            aria-label="add"
            elevation="0"
            sx={{
              boxShadow: 'none',
              width: 110,
             height: 110,
            }}
          >
            <span style={{fontWeight:'bold',fontSize:30}}>MD</span>
          </Fab>
      </Box>
        <Typography variant="h2" sx={{ mt: 1 }}>
          Mouhamed Doumbia
        </Typography>
        <Typography variant="body2">doumbiasoft@gmail.com</Typography>
        <Button color="error" variant="contained" sx={{ mt: 3 }} onClick={handleDeleteAccount}>
          Delete Account
        </Button>
      </Card>
    </Grid>
    <Grid item lg={8} md={12} xs={12}>
      <Card sx={{ p: 3 }}>
        <form>
          <CustomFormLabel htmlFor="firstName">First Name</CustomFormLabel>
          <CustomTextField
            id="firstName"
            variant="outlined"
            defaultValue="Nirav"
            fullWidth
            size="small"
            sx={{ mb: 0 }}
            name="firstName"
          />
           <CustomFormLabel htmlFor="lastName">Last Name</CustomFormLabel>
          <CustomTextField
            id="lastName"
            variant="outlined"
            defaultValue="Joshi"
            fullWidth
            size="small"
            sx={{ mb: 0 }}
            name="lastName"
          />

          <CustomFormLabel htmlFor="Email">Email</CustomFormLabel>
          <CustomTextField
            id="Email"
            variant="outlined"
            defaultValue="doumbiasoft@gmail.com"
            fullWidth
            size="small"
            sx={{ mb: 0 }}
            disabled
          />
          <Button color="success" variant="contained" sx={{ mt: 2 }}>
            Update
          </Button>
        </form>
      </Card>
    </Grid>
  </Grid>
</PageContainer>
  )
}
