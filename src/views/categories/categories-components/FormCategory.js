import React, { useContext, useState, useEffect, useRef } from 'react';
import { Card, CardContent, Typography, Button, Box, Radio, FormControlLabel, RadioGroup } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import CustomTextField from '../../../components/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/custom-elements/CustomFormLabel';

import CurrentUserContext from '../../../contexts/CurrentUserContext';
import Api from '../../../api';
import Spinner from '../../../views/spinner/Spinner';


const Income = "Income";
const Expense = "Expense";

export default function FormCategory({ minHeight = '520px', handleChangeFormData, formData, id }) {
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
    if (formData.type !== "" && formData.name !== "") {
      setMessage("");
      setIsSubmitted(true);
    };
    if (formData.name === "") {
      setMessage("* Please enter category name!");
    }
    if (formData.type === "") {
      setMessage("* Please choose a type!");
    }
  }

  useEffect(() => {
    async function operationCategory() {
      try {
        if (isSubmitted === true && formData) {

          let cat = {};

          if (id === 0) {
            const category = {
              userId: ctx.userId,
              type: formData.type,
              name: formData.name,
            }
            cat = await Api.addCategory(category);
          } else {
            const category = {
              type: formData.type,
              name: formData.name,
            }
            cat = await Api.updateCategory(id, category);
          }

          if (cat !== undefined && cat !== "" && cat !== null) {
            setIsSubmitted(false);
            ctx.user.categories = [...ctx.user.categories, cat].sort((a, b) => (a.name < b.name ? -1 : 1));
            ctx.actions.handleUser(ctx.user);
            navigateTo("/categories");
          }
        }
      } catch (error) {
        setIsSubmitted(false);
        setMessage(error);
      }
    };
    operationCategory();

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
            <CustomFormLabel htmlFor="typeG">Type</CustomFormLabel>
            <RadioGroup id='typeG' row aria-label="position" name="position" defaultValue="top">
              <FormControlLabel control={<Radio name="type" checked={formData.type === Expense} value={Expense} onChange={handleChangeFormData} sx={{
                color: (theme) => theme.palette.warning.main,
                '&.Mui-checked': {
                  color: (theme) => theme.palette.warning.main,
                },
              }} />} label={Expense} labelPlacement="end" />
              <FormControlLabel control={<Radio name="type" checked={formData.type === Income} value={Income} onChange={handleChangeFormData} sx={{
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
              size="small"
              sx={{ mb: 2 }}
              error={false}
              helperText={""}
              onChange={handleChangeFormData}
              value={formData.name}
              name="name"
            />



            <Button type='submit' color="success" variant="contained" sx={{ mr: 1 }}>
              {id === 0 ? "Create" : "Update"}
            </Button>
            <Link
              style={{
                textDecoration: 'none',
                color: 'white'
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
