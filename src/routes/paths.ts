export const rootPaths = {
  root: '/',
  pageRoot: 'pages',
  authRoot: 'auth',
  errorRoot: 'error',
  clientRoot: 'clients',
  amlRoot: 'aml',
  vatRoot: 'vat',
  listRoot: 'list',
  notificationsRoot: 'notifications',
};

const paths = {
  // Dashboard & Core Pages
  dashboard: `/${rootPaths.pageRoot}/dashboard`,

  // Dashboard Subpages
  Clients: `/${rootPaths.pageRoot}/dashboard/clients`,
  pendingTasks: `/${rootPaths.pageRoot}/dashboard/pending-tasks`,
  upcomingDeadlines: `/${rootPaths.pageRoot}/dashboard/upcoming-deadlines`,
  alerts: `/${rootPaths.pageRoot}/dashboard/alerts`,

  // Authentication
  signin: `/${rootPaths.authRoot}/signin`,

  // Error Pages
  notFound: `/${rootPaths.errorRoot}/404`,

  // Client Management
  clients: `/${rootPaths.clientRoot}`,
  clientAllClients: `/${rootPaths.clientRoot}/all-clients`,
  clientAddNew: `/${rootPaths.clientRoot}/add-new`,
  clientUpdate: (id: string | number) => `/${rootPaths.clientRoot}/update/${id}`,
  clientDelete: (id: string | number) => `/${rootPaths.clientRoot}/delete/${id}`,

  // AML Compliance Bar
  kycForm: `/${rootPaths.amlRoot}/kyc-form`,
  tradeWiseCompliance: `/${rootPaths.amlRoot}/trade-wise-compliance`,
  authorityWiseCompliance: `/${rootPaths.amlRoot}/authority-wise-compliance`,

  // VAT Form
  vatRegistration: `/${rootPaths.vatRoot}/vat-registration`,
  vatDeRegistration: `/${rootPaths.vatRoot}/vat-de-registration`,
  vatRefundClaims: `/${rootPaths.vatRoot}/vat-refund-claims`,
  vatReconsiderationRequests: `/${rootPaths.vatRoot}/vat-reconsideration-requests`,
  vatInquiriesComplains: `/${rootPaths.vatRoot}/vat-inquiries-complains`,

  // VAT Form List
  vatRegistrationList: `/${rootPaths.listRoot}/all-reports`,
  vatDeRegistrationList: `/${rootPaths.listRoot}/generate-new`,
  vatRefundClaimsList: `/${rootPaths.listRoot}/export`,

  // Notifications
  Notifications: `/${rootPaths.notificationsRoot}/notifications`,

  logout: `/${rootPaths.authRoot}/dashboard/logout`,
};

export default paths;
