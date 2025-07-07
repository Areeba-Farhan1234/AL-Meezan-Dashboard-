import { ReactNode } from 'react';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import paths, { rootPaths } from './paths';
import MainLayout from 'layouts/main-layout';
import AuthLayout from 'layouts/auth-layout';
import Splash from 'components/loader/Splash';
import PageLoader from 'components/loader/PageLoader';

// Lazy-loaded components
const App = lazy(() => import('App'));
const Dashboard = lazy(() => import('pages/dashboard/Dashbaord'));
// const Home = lazy(() => import('pages/dashboard/Home'));
const Logout = lazy(() => import('layouts/main-layout/topbar/Profile/Logout'));
const PendingTasks = lazy(() => import('pages/dashboard/PendingTasks'));
const UpcomingDeadlines = lazy(() => import('pages/dashboard/UpcomingDeadlines'));
const Alerts = lazy(() => import('pages/dashboard/Alerts'));

const AllClients = lazy(() => import('pages/client-management/AllClients'));
const AddClient = lazy(() => import('pages/client-management/AddNew'));

const KYCForm = lazy(() => import('pages/aml-compliance/KYCForm'));
const TradeWiseCompliance = lazy(() => import('pages/aml-compliance/TradeWiseCompliance'));
const AuthorityWiseCompliance = lazy(() => import('pages/aml-compliance/AuthorityWiseCompliance'));

const VATRegistration = lazy(() => import('pages/vat-form/VATRegistration'));
const VATDeRegistration = lazy(() => import('pages/vat-form/VATDeRegistration'));
const VATRefundClaims = lazy(() => import('pages/vat-form/VATRefundClaims'));
const VATReconsiderationRequests = lazy(() => import('pages/vat-form/VATReconsiderationRequests'));
const VATInquiriesComplains = lazy(() => import('pages/vat-form/VATInquiriesComplains'));

const VATRegistrationList = lazy(() => import('pages/vat-form-list/VATRegistrationList'));
const VATDeRegistrationList = lazy(() => import('pages/vat-form-list/VATDeRegistrationList'));
const VATRefundClaimsList = lazy(() => import('pages/vat-form-list/VATRefundClaimsList'));

const Notifications = lazy(() => import('pages/notifications/Notifications'));

const Signin = lazy(() => import('pages/authentication/Signin'));

type PrivateRouteProps = {
  children: ReactNode;
};

// PrivateRoute component
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return isAuthenticated ? children : <Navigate to="/auth/signin" replace />;
};

// Router
const router = createBrowserRouter(
  [
    {
      element: (
        <Suspense fallback={<Splash />}>
          <App />
        </Suspense>
      ),
      children: [
        {
          path: '/',
          element: <Navigate to="/auth/signin" replace />,
        },

        {
          path: rootPaths.authRoot,
          element: (
            <AuthLayout>
              <Suspense fallback={<PageLoader />}>
                <Outlet />
              </Suspense>
            </AuthLayout>
          ),
          children: [
            {
              path: 'signin',
              element: <Signin />,
            },
          ],
        },

        {
          path: rootPaths.root,
          element: (
            <PrivateRoute>
              <MainLayout>
                <Suspense fallback={<PageLoader />}>
                  <Outlet />
                </Suspense>
              </MainLayout>
            </PrivateRoute>
          ),
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            // {
            //   path: paths.home,
            //   element: <Home />,
            // },

            {
              path: paths.logout,
              element: <Logout />,
            },
            {
              path: paths.pendingTasks,
              element: <PendingTasks />,
            },
            {
              path: paths.upcomingDeadlines,
              element: <UpcomingDeadlines />,
            },
            {
              path: paths.alerts,
              element: <Alerts />,
            },
            {
              path: paths.clientAllClients,
              element: <AllClients />,
            },
            {
              path: paths.clientAddNew,
              element: <AddClient />,
            },
            {
              path: paths.kycForm,
              element: <KYCForm />,
            },
            {
              path: paths.tradeWiseCompliance,
              element: <TradeWiseCompliance />,
            },
            {
              path: paths.authorityWiseCompliance,
              element: <AuthorityWiseCompliance />,
            },
            {
              path: paths.vatRegistration,
              element: <VATRegistration />,
            },
            {
              path: paths.vatDeRegistration,
              element: <VATDeRegistration />,
            },
            {
              path: paths.vatRefundClaims,
              element: <VATRefundClaims />,
            },
            {
              path: paths.vatReconsiderationRequests,
              element: <VATReconsiderationRequests />,
            },
            {
              path: paths.vatInquiriesComplains,
              element: <VATInquiriesComplains />,
            },
            {
              path: paths.vatRegistrationList,
              element: <VATRegistrationList />,
            },
            {
              path: paths.vatDeRegistrationList,
              element: <VATDeRegistrationList />,
            },
            {
              path: paths.vatRefundClaimsList,
              element: <VATRefundClaimsList />,
            },
            {
              path: paths.Notifications,
              element: <Notifications />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: '/almeezan',
  },
);

export default router;
