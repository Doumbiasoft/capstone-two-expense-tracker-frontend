import React,{useContext, useState, useEffect, useRef} from 'react';
import { Card, Grid, Typography, Button,Box,Fab,CardContent, Avatar } from '@mui/material';

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

    const [passwordUser, setPasswordUser] = useState("");

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
              let user = await Api.updateUser(ctx.userId, userToUpdate);
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
    background:'#2F2F2F',
    focusConfirm: false,
    input: 'email',
    inputLabel: 'Deleting your account, will remove all your data',
    inputLabelColor: '#903535',
    inputPlaceholder: 'Enter your email address',
    showCancelButton: true,
    confirmButtonColor: '#903535',
    cancelButtonColor: '#5F5E5E',
    confirmButtonText: 'Delete',
    inputValidator: (value) => {
      if (value.trim() !== ctx.user.email.trim()) {
        return 'This email address is not related to this account. Please'
      }
    }
  })
  if (email) {
       const res = await Api.deleteUser(ctx.user.id);
        if(res !== undefined && res !== "" && res !== null) {
          ctx.actions.handleToken("");
          ctx.actions.handleUser(null);
        }
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your account has been deleted!',
      showConfirmButton: false,
      timer: 1500
    })
  }
}



const handleEditPassword = async ()=>{
 await Swal.fire({
    title: 'Edit Password',
    inputPlaceholder: 'Enter your new password',
    background:'#2F2F2F',
    showCancelButton: true,
    confirmButtonColor: '#00C292',
    cancelButtonColor: '#5F5E5E',
    confirmButtonText: 'Change',
    inputAttributes: {
      autocapitalize: 'off',
      autocorrect: 'off'
    },
    html:
      '<input type="password" id="password" class="swal2-input" placeholder="New password">' +
      '<input type="password" id="passwordConfirm" class="swal2-input" placeholder="Confirm New password">',
    focusConfirm: false,
    preConfirm: () => {
      const password = Swal.getPopup().querySelector('#password').value
      const passwordConfirm = Swal.getPopup().querySelector('#passwordConfirm').value
      if (password !== passwordConfirm) {
        Swal.showValidationMessage(`The passwords provided are identical`)
      }
      if (!password || !passwordConfirm) {
        Swal.showValidationMessage(`Please enter a password and confirm it`)
      }
      return { password: password, passwordConfirm: passwordConfirm }
    }
  }).then((result) => {
    const { passwordConfirm } = result.value;
    setPasswordUser(passwordConfirm);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your Password has been changed!',
      showConfirmButton: false,
      timer: 1500
    })
    
  })
}
useEffect(() => {
  async function updatePassword() {
    try {
      if (passwordUser) {
        const passwordToUpdate = {
          password: passwordUser
        }
        let user = await Api.updateUser(ctx.user.id, passwordToUpdate);
        if(user !== undefined && user !== "" && user !== null) {
          setMessage("User updated successfully!");
        }
      }
    } catch (error) {
        setMessage(error);
    }
  };
  updatePassword();
  
}, [passwordUser]);

  return (
  <PageContainer title="Profile" description="user profile and setting">
  <Breadcrumb title="Profile & Settings" items={BCrumb} />
  <Grid container spacing={0}>
    <Grid item lg={4} xs={12} >
    <DashboardCard>
      <Box
          sx={{
            mt: 0,
            position: 'relative',
            width: '100%',
            minHeight:'340px',
        }} 
          display='flex' 
          alignContent='stretch' 
          alignItems='center' 
          justifyContent='center'>
          <Box sx={{width: '100%',}}>
            {ctx.user.isOauth? 
             <Avatar alt={shortName} src={ctx.user.oauthPicture} sx={{ width: 110, height: 110 }} />:
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
            }
         
          <Typography variant="h2" sx={{ mt: 1 }}>
         {ctx.user.firstName?(ctx.user.firstName + ' ' + ctx.user.lastName):''}
        </Typography>
        <Typography variant="body2">{ctx.user.email?ctx.user.email:''}</Typography>
        <Button color="error" variant="contained" sx={{ mt: 10, mb:0 }} onClick={handleDeleteAccount}>
          Delete Account
        </Button>
        <Button color="primary" variant="contained" sx={{ mt: 10, mb:0, ml:1 }} onClick={handleEditPassword}  disabled={ctx.user.isOauth?true:false}>
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
            disabled={ctx.user.isOauth?true:false}
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
            disabled={ctx.user.isOauth?true:false}
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
          <Button type='submit' color="success" variant="contained" sx={{ mt: 1,mb:1 }} disabled={ctx.user.isOauth?true:false}>
            Update
          </Button>
          <div style={{color:'red',textAlign:'center',height:'10px',marginBottom:8}} ref={divMessage}></div>
        </form>
      </Box>
      </CardContent>
      </Card>
    </Grid>
  </Grid>
</PageContainer>


  )
}
