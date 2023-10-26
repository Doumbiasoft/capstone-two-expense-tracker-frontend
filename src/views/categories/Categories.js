import React, { useEffect, useState, useContext } from 'react';
import { Grid } from '@mui/material';
import { FcFolder } from "react-icons/fc";
import Api from '../../api'

import {
  CategoryList,
  BoxShapeIcon
} from './categories-components';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Categories',
  },
];
import PageContainer from '../../components/container/PageContainer';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Swal from 'sweetalert2/dist/sweetalert2.js';


export default function Categories() {
  const ctx = useContext(CurrentUserContext);
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    try {
      const data = await Api.getCategories(ctx.userId);
      if (data) {
        setCategories(data.sort((a, b) => (a.name < b.name ? -1 : 1)));
      }
    } catch (error) {
    }
  }

  const handleDeleteCategory = async (item) => {
    try {

      Swal.fire({
        title: `Do you want to delete "${item.name}" ?`,
        text: "All transactions related to this category will be deleted!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#903535',
        cancelButtonColor: '#5F5E5E',
        confirmButtonText: 'Delete'
      }).then(async (result) => {
        if (result.isConfirmed) {

          const res = await Api.deleteCategory(item.id);
          if (res !== undefined && res !== "" && res !== null) {
            const data = await Api.getCategories(ctx.userId);
            if (data) {
              setCategories(data.sort((a, b) => (a.name < b.name ? -1 : 1)));
              ctx.user.categories = data.sort((a, b) => (a.name < b.name ? -1 : 1));
              ctx.actions.handleUser(ctx.user);
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'The category has been deleted!',
                showConfirmButton: false,
                timer: 1500
              })
            }
          }


        }
      })


    } catch (error) {
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <PageContainer title="Categories" description="this is of category">
      {/* breadcrumb */}
      <Breadcrumb title="Categories" items={BCrumb} />
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={8}>
          <CategoryList data={categories} onDelete={handleDeleteCategory} />
        </Grid>
        <Grid item xs={12} lg={4}  >
          <BoxShapeIcon minHeight='370px' count={categories.length} hasCount={true} iconComponent={<FcFolder size={200} />} />
        </Grid>
      </Grid>
    </PageContainer>
  )
}

