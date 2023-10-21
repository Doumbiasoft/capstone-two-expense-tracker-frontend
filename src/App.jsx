import React,{useState, useEffect} from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import RTL from './layouts/full-layout/customizer/RTL';
import ThemeSettings from './layouts/full-layout/customizer/ThemeSettings';
import RouterManager from './routes/Router';
import 'react-perfect-scrollbar/dist/css/styles.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Api from './api';
import { useLocalStorage } from './hooks/useLocalStorage'; 
import CurrentUserContext from './contexts/CurrentUserContext';
import './App.scss';

function App() {
  const theme = ThemeSettings();
  const customizer = useSelector((state) => state.CustomizerReducer);

  const [user, setUser] = useState(null);
  const [userId, seUserId] = useState(0);
  const [token, setToken] = useLocalStorage("token","");

  const handleUser = (data) =>{
    setUser(data);
  }
  const handleToken = (_token) =>{
    setToken(_token);
  }

  const handleLogOut = () =>{
    setToken("");
    setUser(null);
  }

  useEffect(() =>{
    Api.token = token;
  },[user,token]);

  useEffect(() => {
    /* get the current */
    async function getCurrentUser(){
      try {
        if (user === null) {
          if (token){
            const tokenInfo = Api.decodeToken(token);
            seUserId(tokenInfo.id);
            if(tokenInfo){
                const currentUser = await Api.getUser(tokenInfo.id);
                if(currentUser){
                  setUser(currentUser);
                }else{
                  handleLogOut();
                }
            }
          } 
        }
      } catch (error) {
        handleLogOut();
      }
    }
    getCurrentUser();
   }, [user, token]);


  const ctx = {
    userId:userId,
    user:{...user}, 
    token:token, 
    actions:{ 
        handleUser:handleUser,
        handleToken:handleToken,
        handleLogOut:handleLogOut, 
      }
   
    };
  return (
    <CurrentUserContext.Provider value={ctx}>
    <ThemeProvider theme={theme}>
      <RTL direction={customizer.activeDir}>
        <CssBaseline />
        {<RouterManager />}
      </RTL>
    </ThemeProvider>
    </CurrentUserContext.Provider>
  );
}

export default App
