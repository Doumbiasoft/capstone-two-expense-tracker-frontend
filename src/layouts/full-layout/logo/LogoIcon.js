import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FcCurrencyExchange } from "react-icons/fc";
import {
  Typography,

} from '@mui/material';

const LogoIcon = ({title="Expense Tracker", logoSize=45, titleFontSize="22px", TypographyVariant="h4"}) => {
  const customizer = useSelector((state) => state.CustomizerReducer);

  return (
    <Link  to="/" style={{textDecoration:"none"}}  >
    <div style={{display: 'flex', alignItems: 'center'}} >
      {customizer.activeMode === 'dark' ?  <FcCurrencyExchange size={logoSize}/>:<FcCurrencyExchange size={logoSize} />}<span style={{color:"white",fontSize:titleFontSize, }}>{' '}<Typography color="textPrimary" variant={TypographyVariant} fontWeight="400" sx={{ ml: 1 }}>{title}</Typography></span>
    </div>
    </Link>

  );
};

export default LogoIcon;
