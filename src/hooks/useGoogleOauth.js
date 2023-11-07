import React, {  useState, useEffect } from 'react';
import {googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export const useGoogleOauth = (init) =>{

const [googleToken, setGoogleToken] = useState(init);
const [userGoogle, setUserGoogle] = useState(null);

  const handleGoogle = useGoogleLogin({
      onSuccess: (res) => { 
        setGoogleToken(res);
      },
      onError: (error) => {console.log('Login Failed:', error)}
  });
  useEffect(
    () => {
        if (googleToken) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleToken.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${googleToken.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setUserGoogle(res.data);
                })
                .catch((err) => console.log(err));
        }
    },
    [ googleToken ]
);
  return [userGoogle, handleGoogle];
}
