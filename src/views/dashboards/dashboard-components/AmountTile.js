import React from 'react';
import { Card, CardContent, Typography, Box, Fab } from '@mui/material';

import FeatherIcon from 'feather-icons-react';
import cultureInfo from '../../../helpers/cultureInfo';


export default function AmountTile({title, amount, fabColor="secondary", titleColor}) {
  return (
    <Card>
    <CardContent>
      <Box display="flex" alignItems="flex-start">
        <Typography
          variant="h4"
          sx={{
            marginBottom: '0',
            
          }}
          gutterBottom
          color={titleColor}
        >
          {title}
        </Typography>
        <Box
          sx={{
            marginLeft: 'auto',
          }}
        >
          <Fab
            size="medium"
            color={fabColor}
            aria-label="add"
            elevation="0"
            sx={{
              boxShadow: 'none',
            }}
          >
            <FeatherIcon icon="dollar-sign" size={30} />
          </Fab>
        </Box>
      </Box>
      <Typography
        variant="h1"
        fontWeight="600"
        sx={{
          marginBottom: '0',
          marginTop: '20px',
        }}
        gutterBottom
      >
        {cultureInfo.format(amount)}
      </Typography>
     
    </CardContent>
  </Card>
  )
}

