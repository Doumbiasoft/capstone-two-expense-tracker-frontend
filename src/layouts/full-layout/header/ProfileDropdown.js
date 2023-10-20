import React,{useContext} from 'react';
import { Box, MenuItem, Typography, Divider,Fab } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import { useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import nameAcronym from '../../../helpers/nameAcronym';




export default function ProfileDropdown({setAnchorEl4}) {
  const ctx = useContext(CurrentUserContext);
  const navigateTo = useNavigate();

  const shortName = nameAcronym(ctx);

  const handleProfile=()=>{
    setAnchorEl4(null);
     navigateTo("/profile");
  }
  return (
    <Box>
    <Box
      sx={{
        pb: 3,
        mt: 3,
      }}
    >
      <Box display="flex" alignItems="center">

         <Box
            sx={{
              width: '60px',
               height: '60px',
           
            }}
          >
            <Fab
              color="secondary"
              aria-label="add"
              elevation="0"
              sx={{
                boxShadow: 'none',
              }}
            >
                 <span style={{fontWeight:'bold'}}>{ctx.user.firstName?shortName:''}</span>
            </Fab>
        </Box>
        <Box
          sx={{
            ml: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              lineHeight: '1.235',
            }}
          >
            {ctx.user.firstName?(ctx.user.firstName +' ' + ctx.user.lastName):''}
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography
              color="textSecondary"
              display="flex"
              alignItems="center"
              sx={{
                color: (theme) => theme.palette.grey.A200,
                mr: 1,
              }}
            >
              <FeatherIcon icon="mail" width="18" />
            </Typography>
            <Typography color="textSecondary" variant="h6">
            {ctx.user.email?ctx.user.email:<></>}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
    <Divider
      style={{
        marginTop: 0,
        marginBottom: 0,
      }}
    />

    <Box >
      <MenuItem
         onClick={(e)=>{handleProfile(e)}}
      
        sx={{
          pt: 3,
          pb: 3,
        }}>
        <Box display="flex" alignItems="center">
          <Box 
            sx={{
              ml: -2,
            }}
          
          >
            <Typography
              variant="h5"
              sx={{
                lineHeight: '1.235',
              }}
            >
              Profile
            </Typography>
            <Typography color="textSecondary" variant="h6" fontWeight="400">
              Account Settings
            </Typography>
          </Box>
        </Box>
      </MenuItem>
      <Divider
        style={{
          marginTop: 0,
          marginBottom: 0,
        }}
      />
    </Box>
  </Box>
  )
}
