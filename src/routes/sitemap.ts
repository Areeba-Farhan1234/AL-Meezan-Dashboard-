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
      {
        name: 'Clients',
        pathName: 'clients',
        path: paths.clients,
      },

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
    icon: 'ri:apps-2-line',
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
    id: 'other-vat-services',
    subheader: 'Other VAT Services',
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
    id: 'reports',
    subheader: 'Reports',
    icon: 'ri:file-chart-line',
    path: paths.allReports,
    items: [
      {
        name: 'All Reports',
        pathName: 'all-reports',
        path: paths.allReports,
      },
      {
        name: 'Generate New',
        pathName: 'generate-new',
        path: paths.generateNewReport,
      },
      {
        name: 'Export',
        pathName: 'export',
        path: paths.exportReports,
      },
    ],
  },
  {
    id: 'notifications',
    subheader: 'Notifications',
    icon: 'ri:notification-3-line',
    path: paths.vatDeadline,
    items: [
      {
        name: 'VAT Deadline',
        pathName: 'vat-deadline',
        path: paths.vatDeadline,
      },
      {
        name: 'Client Follow-ups',
        pathName: 'client-follow-ups',
        path: paths.clientFollowUps,
      },
    ],
  },
  // {
  //   id: 'document-management',
  //   subheader: 'Document Management',
  //   icon: 'ri:file-list-3-line',
  //   path: paths.myDocuments,
  //   items: [
  //     {
  //       name: 'My Documents',
  //       pathName: 'my-documents',
  //       path: paths.myDocuments,
  //     },
  //     {
  //       name: 'Add New',
  //       pathName: 'add-new',
  //       path: paths.documentAddNew,
  //     },
  //   ],
  // },
  // {
  //   id: 'analytics',
  //   subheader: 'Analytics',
  //   icon: 'ri:bar-chart-2-line',
  //   path: paths.analytics,
  // },
];

export default sitemap;
