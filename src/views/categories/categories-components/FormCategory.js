import React from 'react';
import { Card,CardContent, Typography, Button,Box ,Radio, FormControlLabel, RadioGroup} from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/custom-elements/CustomFormLabel';

const Income="Income";
const Expense="Expense";

export default function FormCategory({minHeight='520px', handleChangeFormData, dataForm, id }) {

console.log(dataForm);
  return (
    <Card>
    <CardContent>
      <Box
        sx={{
          overflow: {
            xs: 'auto',
            md: 'unset',
            minHeight:minHeight
          },
        }}
      >
    <Typography variant="h6" fontWeight="600" sx={{ mb: 3 }}>
    </Typography>
    <form>
    <CustomFormLabel htmlFor="typeG">Type</CustomFormLabel>
        <RadioGroup id='typeG' row aria-label="position" name="position" defaultValue="top">
            <FormControlLabel control={<Radio name="type" checked={dataForm.type === Expense} value={Expense} onChange={handleChangeFormData} sx={{
                  color: (theme) => theme.palette.warning.main,
                  '&.Mui-checked': {
                    color: (theme) => theme.palette.warning.main,
                  },
                }} />} label={Expense} labelPlacement="end" />
            <FormControlLabel control={<Radio name="type" checked={dataForm.type === Income} value={Income} onChange={handleChangeFormData} sx={{
                  color: (theme) => theme.palette.success.main,
                  '&.Mui-checked': {
                    color: (theme) => theme.palette.success.main,
                  },
                }} />} label={Income} labelPlacement="end" />
        </RadioGroup>
        
    <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
    <CustomTextField
                id="name"
                variant="outlined"
                fullWidth
                placeholder="Category Name"
                required
                size="small"
                sx={{ mb: 2 }}
                error={false}
                helperText={""}
                onChange={(e) => handleChangeFormData(e)} 
                value={dataForm.name}
                name="name"
                />



      <Button color="success" variant="contained" sx={{ mr: 1 }}>
        {id===0?"Create":"Update"}
      </Button>
      <Link
        style={{
            textDecoration: 'none',
            color:'white'
        }}
        to="/categories">
        <Button color="danger" variant="contained">
            Cancel
        </Button>
      </Link>
     
    </form>
      </Box>
  </CardContent>
</Card>
  )
}
