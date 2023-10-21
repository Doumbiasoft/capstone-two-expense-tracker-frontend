import React,{useEffect,useState,useContext} from 'react';
import { Grid } from '@mui/material';
import { FcMultipleInputs } from "react-icons/fc";
import Api from '../../api'

import {
    TransactionList,
    BoxShapeIcon
} from './transactions-components';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import displayDateFormat from '../../helpers/displayDateFormat';
import cultureInfo from '../../helpers/cultureInfo';


const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Transaction',
    },
  ];
import PageContainer from '../../components/container/PageContainer';

export default function Transactions() {

  const ctx = useContext(CurrentUserContext);
  const [transactions, setTransactions] = useState([]);

  async function getTransactions() {
    try {
       const data = await Api.getTransactions(ctx.userId);
        if (data){
          setTransactions(data.sort((a, b) => (a.date < b.date ? 1 : -1)));
        }
      } catch (error) {
    }
}

 const handleDeleteTransaction = async (item)=> {
  try {

    Swal.fire({
      title: `Do you want to transaction:\n"${item.categoryName}"\n${displayDateFormat(item.date)}\n${cultureInfo.format(item.amount)}\n${item.categoryType} ?`,
      text: "This transaction will be deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#903535',
      cancelButtonColor: '#5F5E5E',
      confirmButtonText: 'Delete'
    }).then(async (result) => {
      if (result.isConfirmed) {

        const res = await Api.deleteTransaction(item.id);
        if(res !== undefined && res !== "" && res !== null) {
          const data = await Api.getTransactions(ctx.userId);
          if (data){
            setTransactions(data.sort((a, b) => (a.name < b.name ? -1 : 1)));
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'The transaction has been deleted!',
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
    getTransactions();
  },[]);



  return (
    <PageContainer title="Transactions" description="this is of Transaction" >
    {/* breadcrumb */}
    <Breadcrumb title="Transactions" items={BCrumb} />
    <Grid container spacing={0}>
      {/* ------------------------- row 1 ------------------------- */}
    <Grid item xs={12} lg={8}>
       <TransactionList data={transactions} onDelete={handleDeleteTransaction}/>
    </Grid>
      <Grid item xs={12} lg={4}>
      <BoxShapeIcon minHeight='370px' count={transactions.length} hasCount={true} iconComponent={<FcMultipleInputs size={200}/>}/>
      </Grid>
    </Grid>
  </PageContainer>
  )
}

