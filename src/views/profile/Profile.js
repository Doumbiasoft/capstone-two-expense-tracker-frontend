import React,{useContext, useState, useEffect, useRef} from 'react';
import { Card, Grid, Typography, Button,Box,Fab,CardContent } from '@mui/material';


import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';

import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import DashboardCard from '../../components/base-card/DashboardCard';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import nameAcronym from '../../helpers/nameAcronym';
import { useFormData } from '../../hooks/useFormData';
import Api from '../../api';
import Spinner from '../../views/spinner/Spinner';

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
  const ctx = useContext(CurrentUserContext);

    const shortName = nameAcronym(ctx);
 
    const [message, setMessage] = useState("");
    const [formData, setFormData, handleChangeFormData] = useFormData(ctx.user);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const divMessage = useRef("");

      const handleSubmit = (e) => {
        e.preventDefault();
        if(!ctx.user.firstName){
          return;
        }
        if(!formData.email.trim()){
            setMessage("Please enter your email address!"); 
          }
          if(!formData.lastName.trim()){
            setMessage("Please enter your last name!"); 
          }
          if(!formData.firstName.trim()){
            setMessage("Please enter your first name!"); 
          }
        if(formData.firstName.trim() !=="" && formData.lastName.trim() !=="" && formData.email.trim() !=="") {
            setMessage(""); 
            setIsSubmitted(true);
        };
      }

      useEffect(() => {
        async function updateUser() {
          try {
            if (isSubmitted === true && formData) {
              
              const userToUpdate = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
              }
              let user = await Api.updateUser(ctx.user.id, userToUpdate);
              if(user !== undefined && user !== "" && user !== null) {
                ctx.actions.handleUser(user);
                setMessage("User updated successfully!");
                setIsSubmitted(false);
              }
            }
          } catch (error) {
              setIsSubmitted(false);
              setMessage(error);
          }
        };
        updateUser();
        
      }, [isSubmitted]);

    useEffect(() => {
        divMessage.current.innerHTML = message;
      },[message]);
 
      useEffect(() => {
        setFormData(ctx.user);
    },[ctx.user]);
  
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
  <Breadcrumb title="Profile & Settings" items={BCrumb} />
  <Grid container spacing={0}>
    <Grid item lg={4} xs={12}>
    <DashboardCard>
      <Box
          sx={{
            mt: 5,
            position: 'relative',
            width: '100%',
            minHeight:'290px',
        }} 
          display='flex' 
          alignContent='stretch' 
          alignItems='center' 
          justifyContent='center'>
          <Box sx={{width: '100%',}}>
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
            <span style={{fontWeight:'bold',fontSize:30}}>{shortName}</span>
          </Fab>
          <Typography variant="h2" sx={{ mt: 1 }}>
         {ctx.user.firstName?(ctx.user.firstName + ' ' + ctx.user.lastName):''}
        </Typography>
        <Typography variant="body2">{ctx.user.email?ctx.user.email:''}</Typography>
        <Button color="error" variant="contained" sx={{ mt: 7, mb:0 }} onClick={handleDeleteAccount}>
          Delete Account
        </Button>
        <Button color="primary" variant="contained" sx={{ mt: 7, mb:0, ml:1 }} onClick={()=>{}}>
         <span style={{color:'white'}}>Change Password</span>
        </Button>
       </Box>
      </Box>
    </DashboardCard>
    </Grid>
    <Grid item lg={8} xs={12}>
    <Card>
    <CardContent>
      <Box
        sx={{
          overflow: {
            xs: 'auto',
            md: 'unset',
            minHeight:'220px'
          },
        }}
      >
        <form onSubmit={handleSubmit}>
          <CustomFormLabel htmlFor="firstName">First Name</CustomFormLabel>
          <CustomTextField
            id="firstName"
            variant="outlined"
            fullWidth
            size="small"
            sx={{ mb: 0 }}
            name="firstName"
            value={formData.firstName}
            onChange={handleChangeFormData}
          />
           <CustomFormLabel htmlFor="lastName">Last Name</CustomFormLabel>
          <CustomTextField
            id="lastName"
            variant="outlined"
            fullWidth
            size="small"
            sx={{ mb: 0 }}
            name="lastName"
            value={formData.lastName}
            onChange={handleChangeFormData}
          />

          <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
          <CustomTextField
            id="email"
            variant="outlined"
            fullWidth
            size="small"
            sx={{ mb: 0 }}
            disabled
            name="email"
            value={formData.email}
            onChange={handleChangeFormData}
          />
          <Box display="flex" alignItems="center" sx={{height:'30px',mb:3}}>
                {isSubmitted?<Spinner />:<></>}
          </Box>
          <Button type='submit' color="success" variant="contained" sx={{ mt: 2 }}>
            Update
          </Button>
          <div style={{color:'red',textAlign:'center',height:'10px'}} ref={divMessage}></div>
        </form>
      </Box>
      </CardContent>
      </Card>
    </Grid>
  </Grid>
</PageContainer>


  )
}
