import React from 'react';
import { Card,CardContent, Typography, Button,Box , MenuItem, } from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/custom-elements/CustomFormLabel';
import CustomSelect from '../../../components/forms/custom-elements/CustomSelect';


import dateFormat from '../../../helpers/dateFormat';


export default function FormTransaction({minHeight='520px', handleChangeFormData, dataForm, id }) {
const [age, setAge] = React.useState('0');
  
console.log(dataForm);

const handleChangeSelect = (event) => {
  setAge(event.target.value);
};
//console.log(dataForm);


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


        <CustomFormLabel htmlFor="category-select">Categories</CustomFormLabel>
          <CustomSelect
            labelId="category-select-label"
            id="category-select"
            value={age}
            onChange={handleChangeSelect}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            name="categoryId"
          >
            <MenuItem value={0}>-- --</MenuItem>
            <MenuItem value={1}>One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
          </CustomSelect>

          <CustomFormLabel htmlFor="amount">{'($) '}Amount</CustomFormLabel>
          <CustomTextField
                      id="amount"
                      variant="outlined"
                      fullWidth
                      placeholder="Transaction Amount"
                      type="number"
                      min="0.01" step="0.01"
                      required
                      size="small"
                      sx={{ mb: 2 }}
                      error={false}
                      helperText={""}
                      onChange={(e) => handleChangeFormData(e)} 
                      value={dataForm.amount}
                      name="amount"
                      />
     

          <CustomFormLabel htmlFor="date">Date</CustomFormLabel>

            <CustomTextField
              id="date"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,

              }}
              size="small"
              sx={{ mb: 2 }}
              name="date"
              required
              defaultValue={dateFormat(dataForm.date)}
              onChange={(e) => handleChangeFormData(e)}
              
            />


        <CustomFormLabel htmlFor="note">Note</CustomFormLabel>
        <CustomTextField
          id="note"
          name="note"
          multiline
          rows={2}
          sx={{ mb: 2 }}
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => handleChangeFormData(e)} 
          value={dataForm.note}
        />

      <Button color="success" variant="contained" sx={{ mr: 1 }}>
        {id===0?"Create":"Update"}
      </Button>
      <Link
            style={{
                textDecoration: 'none',
                color:'white'
            }}
            to="/transactions">
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
