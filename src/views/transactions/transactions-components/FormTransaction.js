import React, { useContext, useState, useEffect, useRef } from 'react';
import { Card, CardContent, Typography, Button, Box, MenuItem, } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import CustomTextField from '../../../components/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/custom-elements/CustomFormLabel';
import CustomSelect from '../../../components/forms/custom-elements/CustomSelect';

import CurrentUserContext from '../../../contexts/CurrentUserContext';
import Api from '../../../api';
import Spinner from '../../../views/spinner/Spinner';

import moment from 'moment';


export default function FormTransaction({ minHeight = '520px', handleChangeFormData, formData, id }) {

  const ctx = useContext(CurrentUserContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const divMessage = useRef("");
  const navigateTo = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ctx.userId) {
      return;
    }

    if (formData.categoryId !== 0 && formData.amount !== 0 && formData.date !== "") {
      setMessage("");
      setIsSubmitted(true);
    }
    if (formData.date === "") {
      setMessage("* Please enter the transaction date!");
    }
    if (formData.amount === 0) {
      setMessage("* The amount should be greater than 0 !");
    }
    if (formData.categoryId === 0) {
      setMessage("* Please choose a transaction category!");
    }
  }

  useEffect(() => {
    async function operationTransaction() {
      try {


        if (isSubmitted === true && formData) {

          let trans = {};

          if (id === 0) {
            const transaction = {
              userId: ctx.userId,
              categoryId: formData.categoryId,
              date: formData.date,
              amount: formData.amount,
              note: formData.note,
            }
            trans = await Api.addTransaction(transaction);
          } else {
            const transaction = {
              categoryId: formData.categoryId,
              date: formData.date,
              amount: formData.amount,
              note: formData.note,
            }
            trans = await Api.updateTransaction(id, transaction);
          }

          if (trans !== undefined && trans !== "" && trans !== null) {
            setIsSubmitted(false);
            navigateTo("/transactions");
          }
        }
      } catch (error) {
        setIsSubmitted(false);
        setMessage(error);
      }
    }
    operationTransaction();

  }, [isSubmitted]);

  useEffect(() => {
    divMessage.current.innerHTML = message;
  }, [message]);


  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            overflow: {
              xs: 'auto',
              md: 'unset',
              minHeight: minHeight
            },
          }}
        >
          <Typography variant="h6" fontWeight="600" sx={{ mb: 3 }}>
          </Typography>
          <Box display="flex" alignItems="center" sx={{ height: '30px' }}>
            {isSubmitted ? <Spinner /> : <></>}
          </Box>
          <form onSubmit={handleSubmit}>
            <div style={{ color: 'red', textAlign: 'center', height: '10px', marginBottom: 8 }} ref={divMessage}></div>
            <CustomFormLabel htmlFor="category-select">Categories</CustomFormLabel>
            <CustomSelect
              labelId="category-select-label"
              id="category-select"
              value={formData.categoryId}
              onChange={handleChangeFormData}
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              name="categoryId"
            >
              <MenuItem value={0}>-- --</MenuItem>
              {ctx.user.categories.sort((a, b) => (a.name < b.name ? -1 : 1)).map((item) => (
                <MenuItem key={item.id} value={item.id}>{`${item.name} - << ${item.type} >>`}</MenuItem>
              ))}
            </CustomSelect>

            <CustomFormLabel htmlFor="amount">{'($) '}Amount</CustomFormLabel>
            <CustomTextField
              id="amount"
              variant="outlined"
              fullWidth
              placeholder="Transaction Amount"
              type="number"
              min="0.01" step="0.01"
              size="small"
              sx={{ mb: 2 }}
              error={false}
              helperText={""}
              onChange={(e) => handleChangeFormData(e)}
              value={formData.amount}
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
              defaultValue={ moment.parseZone(formData.date).format('YYYY-MM-DD')}
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
              value={formData.note}
            />

            <Button type='submit' color="success" variant="contained" sx={{ mr: 1 }}>
              {id === 0 ? "Create" : "Update"}
            </Button>
            <Link
              style={{
                textDecoration: 'none',
                color: 'white'
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
