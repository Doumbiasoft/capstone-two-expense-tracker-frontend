import React from 'react';

import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/base-card/DashboardCard';
import { Box, Typography } from '@mui/material';

const BoxShapeIcon = ({ minHeight = '440px', count, hasCount = false, iconComponent }) => {

  const theme = useTheme();
  const primary = theme.palette.primary.main;


  return (
    <DashboardCard >
      <Box display='flex' alignContent='stretch' alignItems='stretch' justifyContent='center'>
        <Typography variant='h3'>
          {hasCount === true ? `${count} Item (s)` : ''}
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 5,
          position: 'relative',
          width: '100%',
          minHeight: minHeight,
        }}
        display='flex' alignContent='stretch' alignItems='stretch' justifyContent='center' >

        {iconComponent}
      </Box>
    </DashboardCard>
  );
};

export default BoxShapeIcon;
