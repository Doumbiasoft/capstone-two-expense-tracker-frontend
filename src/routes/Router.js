import React, { lazy, useContext } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Loadable from '../layouts/full-layout/loadable/Loadable';
import CurrentUserContext from '../contexts/CurrentUserContext';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full-layout/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank-layout/BlankLayout')));
/* ***End Layouts**** */

const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const ResetPassword = Loadable(lazy(() => import('../views/authentication/ResetPassword')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboards/Dashboard')));
const Categories = Loadable(lazy(() => import('../views/categories/Categories')));
const AddCategory = Loadable(lazy(() => import('../views/categories/AddCategory')));
const EditCategory = Loadable(lazy(() => import('../views/categories/EditCategory')));

const Transactions = Loadable(lazy(() => import('../views/transactions/Transactions')));
const AddTransaction = Loadable(lazy(() => import('../views/transactions/AddTransaction')));
const EditTransaction = Loadable(lazy(() => import('../views/transactions/EditTransaction')));

const Profile = Loadable(lazy(() => import('../views/profile/Profile')));

/* ****Routes***** */


const Router = () => {
  const ctx = useContext(CurrentUserContext);
  const routes = useRoutes([
    {
      path: '/',
      element: <FullLayout/>,
      children: [
        { path: '/', element: <Navigate to="/dashboard" /> },
        
        { path: '/dashboard', exact: true, element:(ctx.token?<Dashboard />:<Navigate to="/auth/login" />) },
        { path: '/categories', exact: true, element:(ctx.token?<Categories />:<Navigate to="/auth/login" />)},
        { path: '/categories/add',exact: true, element: (ctx.token?<AddCategory />:<Navigate to="/auth/login" />) },
        { path: '/categories/edit',exact: true, element: (ctx.token?<EditCategory />:<Navigate to="/auth/login" />) },

        { path: '/transactions', exact: true, element:(ctx.token?<Transactions />:<Navigate to="/auth/login" />)},
        { path: '/transactions/add',exact: true, element: (ctx.token?<AddTransaction />:<Navigate to="/auth/login" />) },
        { path: '/transactions/edit',exact: true, element: (ctx.token?<EditTransaction />:<Navigate to="/auth/login" />) },
        { path: '/profile', exact: true, element:(ctx.token?<Profile />:<Navigate to="/auth/login" />)},

        { path: '*', element: <Navigate to="/auth/404" /> },
      ],
    },
    {
      path: 'auth',
      element: <BlankLayout />,
      children: [
        { path: '404', element: <Error /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: '*', element: <Navigate to="/auth/404" /> },
      ],
    },
  ]);

  return <>{routes}</>;
};

export default Router;




