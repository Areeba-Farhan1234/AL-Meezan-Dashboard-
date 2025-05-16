export const rootPaths = {
  root: '/',
  pageRoot: 'pages',
  authRoot: 'auth',
  errorRoot: 'error',
  clientRoot: 'clients',
  amlRoot: 'aml',
  vatRoot: 'vat',
  reportsRoot: 'reports',
  notificationsRoot: 'notifications',
  documentsRoot: 'documents',
  analyticsRoot: 'analytics',
};

const paths = {
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
  // clientUpdate: (id: string | number) => `/${rootPaths.clientRoot}/update/${id}`,
  // clientDelete: (id: string | number) => `/${rootPaths.clientRoot}/delete/${id}`,

  // AML Compliance Bar
  kycForm: `/${rootPaths.amlRoot}/kyc-form`,
  tradeWiseCompliance: `/${rootPaths.amlRoot}/trade-wise-compliance`,
  authorityWiseCompliance: `/${rootPaths.amlRoot}/authority-wise-compliance`,

  // Other VAT Services
  vatRegistration: `/${rootPaths.vatRoot}/vat-registration`,
  vatDeRegistration: `/${rootPaths.vatRoot}/vat-de-registration`,
  vatRefundClaims: `/${rootPaths.vatRoot}/vat-refund-claims`,
  vatReconsiderationRequests: `/${rootPaths.vatRoot}/vat-reconsideration-requests`,
  vatInquiriesComplains: `/${rootPaths.vatRoot}/vat-inquiries-complains`,

  // Reports
  allReports: `/${rootPaths.reportsRoot}/all-reports`,
  generateNewReport: `/${rootPaths.reportsRoot}/generate-new`,
  exportReports: `/${rootPaths.reportsRoot}/export`,

  // Notifications
  vatDeadline: `/${rootPaths.notificationsRoot}/vat-deadline`,
  clientFollowUps: `/${rootPaths.notificationsRoot}/client-follow-ups`,

  // Document Management
  myDocuments: `/${rootPaths.documentsRoot}/my-documents`,
  documentAddNew: `/${rootPaths.documentsRoot}/add-new`,

  // Analytics
  analytics: `/${rootPaths.analyticsRoot}`,
  // accountSettings: `/${rootPaths.pageRoot}/dashboard/account-settings`,
  logout: `/${rootPaths.authRoot}/dashboard/logout`,
};

export default paths;
