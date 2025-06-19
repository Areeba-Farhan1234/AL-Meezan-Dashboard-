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
const Clients = lazy(() => import('pages/dashboard/Clients'));
const Logout = lazy(() => import('layouts/main-layout/topbar/Profile/Logout'));
const PendingTasks = lazy(() => import('pages/dashboard/PendingTasks'));
const UpcomingDeadlines = lazy(() => import('pages/dashboard/UpcomingDeadlines'));
const Alerts = lazy(() => import('pages/dashboard/Alerts'));

const AllClients = lazy(() => import('pages/client-management/AllClients'));
const AddClient = lazy(() => import('pages/client-management/AddNew'));

const KYCForm = lazy(() => import('pages/aml-compliance/KYCForm'));
const TradeWiseCompliance = lazy(() => import('pages/aml-compliance/TradeWiseCompliance'));
const AuthorityWiseCompliance = lazy(() => import('pages/aml-compliance/AuthorityWiseCompliance'));

const VATRegistration = lazy(() => import('pages/other-vat-services/VATRegistration'));
const VATDeRegistration = lazy(() => import('pages/other-vat-services/VATDeRegistration'));
const VATRefundClaims = lazy(() => import('pages/other-vat-services/VATRefundClaims'));
const VATReconsiderationRequests = lazy(
  () => import('pages/other-vat-services/VATReconsiderationRequests'),
);
const VATInquiriesComplains = lazy(() => import('pages/other-vat-services/VATInquiriesComplains'));

const AllReports = lazy(() => import('pages/reports/AllReports'));
const GenerateNewReport = lazy(() => import('pages/reports/GenerateNew'));
const ExportReports = lazy(() => import('pages/reports/Export'));

const VATDeadline = lazy(() => import('pages/notifications/VATDeadline'));
const ClientFollowUps = lazy(() => import('pages/notifications/ClientFollowUps'));

const MyDocuments = lazy(() => import('pages/document-management/MyDocuments'));
const AddDocument = lazy(() => import('pages/document-management/AddNew'));

const Analytics = lazy(() => import('pages/analytics/Analytics'));

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
        // Redirect root path to signin
        {
          path: '/',
          element: <Navigate to="/auth/signin" replace />,
        },
        // Auth Routes
        {
          path: rootPaths.authRoot, // e.g., '/auth'
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
        // Protected Dashboard Routes
        {
          path: rootPaths.root, // e.g., '/dashboard'
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
            {
              path: paths.clients,
              element: <Clients />,
            },

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
              path: paths.allReports,
              element: <AllReports />,
            },
            {
              path: paths.generateNewReport,
              element: <GenerateNewReport />,
            },
            {
              path: paths.exportReports,
              element: <ExportReports />,
            },
            {
              path: paths.vatDeadline,
              element: <VATDeadline />,
            },
            {
              path: paths.clientFollowUps,
              element: <ClientFollowUps />,
            },
            {
              path: paths.myDocuments,
              element: <MyDocuments />,
            },
            {
              path: paths.documentAddNew,
              element: <AddDocument />,
            },
            {
              path: paths.analytics,
              element: <Analytics />,
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
