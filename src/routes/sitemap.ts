import paths from 'routes/paths';

export interface SubMenuItem {
  name: string;
  pathName: string;
  path: string;
  icon?: string;
  active?: boolean;
  items?: SubMenuItem[];
}

export interface MenuItem {
  id: string;
  subheader: string;
  path?: string;
  icon?: string;
  avatar?: string;
  active?: boolean;
  items?: SubMenuItem[];
}

const sitemap: MenuItem[] = [
  {
    id: 'dashboard',
    subheader: 'Dashboard',
    path: paths.dashboard,
    icon: 'ri:dashboard-fill',
    active: true,
    items: [
      // {
      //   name: 'Home',
      //   pathName: 'home',
      //   path: paths.home,
      // },

      {
        name: 'Pending Tasks',
        pathName: 'pending-tasks',
        path: paths.pendingTasks,
      },
      {
        name: 'Upcoming Deadlines',
        pathName: 'upcoming-deadlines',
        path: paths.upcomingDeadlines,
      },
      {
        name: 'Alerts',
        pathName: 'alerts',
        path: paths.alerts,
      },
    ],
  },
  {
    id: 'client-management',
    subheader: 'Client Management',
    icon: 'ri:apps-2-line',
    path: paths.clientAllClients,
    items: [
      {
        name: 'All Clients',
        pathName: 'all-clients',
        path: paths.clientAllClients,
      },
      {
        name: 'Add New',
        pathName: 'add-new',
        path: paths.clientAddNew,
      },
    ],
  },
  {
    id: 'aml-compliance-bar',
    subheader: 'AML Compliance Bar',
    icon: 'ri:file-chart-line',
    path: paths.kycForm,
    items: [
      {
        name: 'KYC Form',
        pathName: 'kyc-form',
        path: paths.kycForm,
      },
      {
        name: 'Trade wise Compliance',
        pathName: 'trade-wise-compliance',
        path: paths.tradeWiseCompliance,
      },
      {
        name: 'Authority wise Compliance',
        pathName: 'authority-wise-compliance',
        path: paths.authorityWiseCompliance,
      },
    ],
  },
  {
    id: 'vat-form',
    subheader: 'VAT Form',
    icon: 'ri:apps-2-line',
    path: paths.vatRegistration,
    items: [
      {
        name: 'VAT Registration',
        pathName: 'vat-registration',
        path: paths.vatRegistration,
      },
      {
        name: 'VAT De-Registration',
        pathName: 'vat-de-registration',
        path: paths.vatDeRegistration,
      },
      {
        name: 'VAT Refund Claims',
        pathName: 'vat-refund-claims',
        path: paths.vatRefundClaims,
      },
      {
        name: 'VAT Reconsideration Requests',
        pathName: 'vat-reconsideration-requests',
        path: paths.vatReconsiderationRequests,
      },
      {
        name: 'VAT Inquiries & Complains',
        pathName: 'vat-inquiries-complains',
        path: paths.vatInquiriesComplains,
      },
    ],
  },
  {
    id: 'vat-form-list',
    subheader: 'VAT Form List',
    icon: 'ri:apps-2-line',
    path: paths.vatDeRegistrationList,
    items: [
      {
        name: 'VAT Registration List',
        pathName: 'vat-registration-list',
        path: paths.vatRegistrationList,
      },
      {
        name: 'VAT De-Registration List',
        pathName: 'vat-de-registration-list',
        path: paths.vatDeRegistrationList,
      },
      {
        name: 'VAT Refund Claims List',
        pathName: 'vat-refund-claims-list',
        path: paths.vatRefundClaimsList,
      },
    ],
  },
  {
    id: 'notifications',
    subheader: 'Notifications',
    icon: 'ri:notification-3-line',
    path: paths.Notifications,
    items: [
      {
        name: 'All Notifications',
        pathName: 'notifications',
        path: paths.Notifications,
      },
    ],
  },
];

export default sitemap;
