export const config = {
  // Endpoints
  DOMAIN: process.env.REACT_APP_BACKEND_URL,
  BASE_NAME: process.env.REACT_APP_BASE_NAME,
  AMLAPIUrl:
    process.env.AML_API_URL ||
    'https://dev.paymate.in/Beta/AMLManagementService/api/WC1/SaveCaseRequest',
  AMLClientAuthCode:
    process.env.AML_CLIENT_AUTH_TOKEN || '4DD02771-CAB6-4C24-9227-B9AAF255145C',

  // Cryptography
  AESKey: process.env.PMXUAE_AES_KEY || 'B987A8C9A8765BCAB987A8C9A8765BCA',
  AESIv: process.env.PMXUAE_AES_IV || '54327CD65487ECAB',

  countryCodes: ['au', 'my', 'sg'],

  GEOGRAPHIC_DETAILS: '/CommonManagement/GeographicalDetails',

  // Authentication
  API_LOGIN: process.env.PMXUAE_API_LOGIN || '/UserManagement/Login',
  API_LOGOUT: process.env.PMXUAE_API_LOGOUT || '/UserManagement/Logout',

  // Password and OTP
  API_GENERATE_OTP:
    process.env.PMXUAE_API_GENERATE_OTP || '/CommonManagement/GenerateOtp',
  API_RE_GENERATE_OTP:
    process.env.PMXUAE_API_RE_GENERATE_OTP || '/CommonManagement/ReGenerateOtp',
  API_VALIDATE_OTP:
    process.env.PMXUAE_API_VALIDATE_OTP ||
    '/CommonManagement/ValidateOtpForPassword',
  API_CHANGE_PASSWORD:
    process.env.PMXUAE_API_CHANGE_PASSWORD ||
    '/UserManagement/ChangePasswordPostOTPVerification',
  API_CHANGE_EXPIRED_PASSWORD:
    process.env.PMXUAE_CHANGE_EXPIRED_PASSWORD ||
    '/UserManagement/ChangePassword',
  API_EXTEND_PASSWORD_EXPIRY:
    process.env.PMXUAE_EXTEND_PASSWORD_EXPIRY ||
    '/UserManagement/ExtendUserPassword',

  // Session
  API_EXTEND_SESSION:
    process.env.PMXUAE_API_GENERATE_TOKEN || '/UserManagement/GenerateToken',

  GET_DATA_AGAINST_TOKEN:
    process.env.GET_DATA_AGAINST_TOKEN || '/UserManagement/GetDataAgainstToken',

  // Multiple Accounts
  GET_MULTIPLE_ACCOUNTS:
    process.env.GET_MULTIPLE_ACCOUNTS || '/UserManagement/GetMultipleAccounts',
  GET_DASHBOARD_MULTIPLE_ACCOUNTS:
    process.env.GET_DASHBOARD_MULTIPLE_ACCOUNTS ||
    '/UserManagement/GetDashBoardMultipleAccounts',

  // Timers
  TIMER_RESEND_OTP: process.env.PMXUAE_TIMER_RESEND_OTP || 60000,

  SIDEMENU_LIST_ADMIN:
    process.env.PMXUAE_SIDEMENU_LIST_ADMIN ||
    '/DashBoardManagement/GetMenuData',

  // Add Business
  GET_TYPES_DATA:
    process.env.GET_TYPES_DATA || '/CommonManagement/GetTypesData',
  // Add Business - Business Information
  FETCH_COUNTRIES:
    process.env.PMXUAE_FETCH_COUNTRIES || '/CommonManagement/FetchCountry',
  FETCH_COMPANY_TYPES:
    process.env.PMXUAE_FETCH_COMPANY_TYPES ||
    '/CommonManagement/FetchCompanyType',
  GET_CATEGORY:
    process.env.PMXUAE_GET_CATEGORY || '/CommonManagement/GetCategoryData',
  GET_SUB_CATEGORY:
    process.env.PMXUAE_GET_SUB_CATEGORY ||
    '/CommonManagement/GetSubCategoryData',
  FETCH_STATE:
    process.env.PMXUAE_FETCH_STATE || '/CommonManagement/FetchStateMaster',
  GET_USER_DATA:
    process.env.PMXUAE_GET_USER_DATA || '/UserManagement/GetUserData',
  BUISNESS_INTEGRATION:
    process.env.PMXUAE_BUISNESS_INTEGRATION ||
    '/BusinessManagement/BusinessIntegration',
  // Add Business - Transaction Currency
  TRANSACTION_CURRENCY:
    process.env.PMXUAE_SAVE_COMPANY_CURRENCIES ||
    '/BusinessManagement/SaveCompanyCurrencies',
  // Add Business - Business Subscription
  BUSINESS_SUBSCRIPTION:
    process.env.PMXUAE_SAVE_SUBSCRIPTION_DETAILS ||
    '/SubscriptionManagement/SaveSubscriptionDetails',

  FETCH_BUSINESS_SUBSCRIPTION_DATA:
    process.env.PMXUA_EFETCH_BUSINESS_SUBSCRIPTION_DATA ||
    '/SubscriptionManagement/FetchSubscriptionDetails',

  // Add Business - Transaction Charges
  FETCH_REGISTRAR_MASTER:
    process.env.FETCH_REGISTRAR_MASTER ||
    '/GatewayManagement/FetchRegistrarMaster',
  FETCH_ISSUING_BANK_RELATIONSHIP_USERS:
    process.env.FETCH_ISSUING_BANK_RELATIONSHIP_USERS ||
    '/CommonManagement/FetchIssueBankRelationshipUser',
  FETCH_REGISTRAR_GATEWAYS:
    process.env.FETCH_REGISTRAR_GATEWAYS ||
    '/GatewayManagement/FetchRegistrarGateway',
  FETCH_COMPANY_CURRENCIES:
    process.env.FETCH_COMPANY_CURRENCIES ||
    '/CommonManagement/FetchCompanyCurrencies',
  FETCH_COUNTRY_WISE_TAXES:
    process.env.FETCH_COUNTRY_WISE_TAXES ||
    '/SubscriptionManagement/FetchCountryWiseTaxes',
  ADD_PAYMENT_CHARGES:
    process.env.ADD_PAYMENT_CHARGES ||
    '/SubscriptionManagement/AddPaymentCharges',

  DELETE_TRANSACTION_CHARGES:
    process.env.DELETE_TRANSACTION_CHARGES ||
    '/SubscriptionManagement/DeletePaymentCharges',

  FETCH_TRANSACTION_CHARGES:
    process.env.FETCH_TRANSACTION_CHARGES ||
    '/SubscriptionManagement/FetchPaymentCharges',

  FETCH_GATEWAY_CHARGES_HISTORY:
    process.env.FETCH_GATEWAY_CHARGES_HISTORY ||
    '/ReportManagement/GatewayChargesHistory',

  SUBMIT_TRANSACTION_CHARGES:
    process.env.SUBMIT_TRANSACTION_CHARGES ||
    '/SubscriptionManagement/TransactionChargeSubmit',

  // Add Business - Settlement Charges
  FETCH_SETTLEMENT_CHARGES:
    process.env.FETCH_SETTLEMENT_CHARGES ||
    '/SubscriptionManagement/FetchSettlementCharges',

  SAVE_SUBSCRIPTION_CHARGES:
    process.env.SAVE_SUBSCRIPTION_CHARGES ||
    '/SubscriptionManagement/SendChargesForApproval',

  // (Send for approval) during edit for all 3 sections - transaction currency, transaction charges, settlement charges
  SEND_CHANGED_CHARGES_FOR_APPROVAL:
    process.env.SEND_CHANGE_CHARGE_SETTING_FOR_APPROVAL ||
    '/SubscriptionManagement/SendChangeChargeSettingForApproval',

  // Add Business - Questionnaire
  FETCH_COMPANY_QUESTIONNAIRE:
    process.env.FETCH_COMPANY_QUESTIONNAIRE ||
    '/BusinessManagement/CompanyQuestionnaire',
  SAVE_COMPANY_QUESTIONNAIRE:
    process.env.SAVE_COMPANY_QUESTIONNAIRE ||
    '/BusinessManagement/SaveCompanyQuestionnaire',

  // Manage Business Congifuraions
  FETCH_MANAGE_BUSINESS_CONFIGURATIONS:
    process.env.FETCH_MANAGE_BUSINESS_CONFIGURATIONS ||
    '/BusinessManagement/ManageBusinessList',
  FETCH_SALES_REPRESENTATIVE_DROPDOWN:
    process.env.FETCH_SALES_REPRESENTATIVE_DROPDOWN ||
    '/UserManagement/GetUsersOfDepartmentAndRole',
  FETCH_BUSINESS_INFORMATION:
    process.env.FETCH_BUSINESS_INFORMATION ||
    '/BusinessManagement/FetchBusinessInformation',

  APPROVE_BUSINESS_INFORMATION:
    process.env.APPROVE_BUSINESS_INFORMATION ||
    '/BusinessManagement/UpdateCompanyProgressStatus',

  APPROVE_TRANSACTION_CURRENCY:
    process.env.APPROVE_TRANSACTION_CURRENCY ||
    '/BusinessManagement/UpdateCompanyCurrencyStatus',

  APPROVE_BUSINESS_SUBSCRIPTION_DETAILS:
    process.env.APPROVE_BUSINESS_SUBSCRIPTION_DETAILS ||
    '/BusinessManagement/UpdateCompanySubscriptionStatus',

  UPDATE_VENDOR_SUBSCRIPTION_STATUS:
    process.env.UPDATE_VENDOR_SUBSCRIPTION_STATUS ||
    '/BusinessManagement/UpdateCompanyVendorSubscriptionStatus',

  APPROVE_TRANSACTION_CHARGES_DETAILS:
    process.env.APPROVE_TRANSACTION_CHARGES_DETAILS ||
    '/BusinessManagement/UpdateCompanyTransactionChargeStatus',

  APPROVE_SETTLEMENT_CHARGES_DETAILS:
    process.env.APPROVE_SETTLEMENT_CHARGES_DETAILS ||
    '/BusinessManagement/UpdateCompanySettlementChargeStatus',

  ACTIVATE_BUSINESS:
    process.env.ACTIVATE_BUSINESS || '/BusinessManagement/ActivateBusiness',

  UPDATE_COMPANY_STATUS:
    process.env.DEACTIVATE_BUSINESS ||
    '/BusinessManagement/UpdateCompanyStatus',

  ASSIGN_TO_SALES_TEAM:
    process.env.ASSIGN_TO_SALES_TEAM ||
    '/BusinessManagement/UpdateSalesPersonCompanyMaster',

  ASSIGN_TO_KYC_TEAM:
    process.env.ASSIGN_TO_KYC_TEAM || '/VendorManagement/AssignKycVerification',

  UPDATE_CHARGED_SETTING_STATUS:
    process.env.UPDATE_CHARGED_SETTING_STATUS ||
    '/SubscriptionManagement/UpdateChargeSettingStatus',

  // Manage Business Contacts
  // Add Contacts
  FETCH_ALL_VENDOR_INFO:
    process.env.FETCH_ALL_VENDOR_INFO ||
    '/VendorManagement/FetchVendorInformation',

  UPLOAD_BULK_CONTACTS:
    process.env.UPLOAD_BULK_CONTACTS ||
    '/VendorManagement/ValidateContactMasterSession',

  CONFIRM_BULK_UPLOAD_CONTACTS:
    process.env.CONFIRM_BULK_UPLOAD_CONTACTS ||
    '/VendorManagement/ConfirmBulkUpload',

  GET_BUSINESS_LIST:
    process.env.GET_BUSINESS_LIST || '/BusinessManagement/ManageBusinessList',

  SUBMIT_VENDOR_BASIC_INFO:
    process.env.SUBMIT_VENDOR_BASIC_INFO ||
    '/VendorManagement/SaveVendorBasicInformationDetails',

  SAVE_AML_DETAILS:
    process.env.SAVE_AML_DETAILS || '/CommonManagement/SaveAMLScreeningDetails',

  SEND_FOR_CONTACT_APPROVAL:
    process.env.SEND_FOR_CONTACT_APPROVAL ||
    '/VendorManagement/SendVendorAppovalMailToApprover',

  FETCH_CURRENCY_BY_COUNTRY:
    process.env.FETCH_CURRENCY_BY_COUNTRY ||
    '/CommonManagement/FetchCurrencyByCountry',

  FETCH_CURRENCY_BY_PAYMENT_TYPE:
    process.env.FETCH_CURRENCY_BY_PAYMENT_TYPE ||
    'CommonManagement/FetchCurrenciesByPaymentTypes',

  FETCH_BANKS: process.env.FETCH_BANKS || '/CommonManagement/FetchBank',

  FETCH_BANK_ACCOUNT_TABLE_DATA:
    process.env.FETCH_BANK_ACCOUNT_TABLE_DATA ||
    '/VendorManagement/VendorBankAccountSummaryDetails',

  SUBMIT_BANK_ACCOUNT_DETAIL:
    process.env.SUBMIT_BANK_ACCOUNT_DETAIL ||
    '/VendorManagement/SaveVendorBeneficaryBankAccountDetails',

  DELETE_BANK_ACCOUNT:
    process.env.DELETE_BANK_ACCOUNT ||
    '/VendorManagement/UpdateVendorBankAccountDetails',

  SUBMIT_KYC_DOCUMENT_UPLOADED_BY:
    process.env.SUBMIT_KYC_DOCUMENT_UPLOADED_BY ||
    '/VendorManagement/SetKycDocumentUploadedBy',

  // Business KYC Display
  FETCH_KYC_DOCUMENT_DETAILS_DISPLAY:
    process.env.FETCH_KYC_DOCUMENT_DETAILS_DISPLAY ||
    '/KycManagement/FetchKycDocumentDetailsDisplay',

  FETCH_KYC_SINGLE_DOCUMENT_DETAILS:
    process.env.FETCH_KYC_SINGLE_DOCUMENT_DETAILS ||
    '/KycManagement/FetchKycDocumentDetailsView',

  // Business KYC
  FETCH_KYC_DOCUMENT_DETAILS:
    process.env.FETCH_KYC_DOCUMENT_DETAILS ||
    '/KycManagement/FetchKycDocumentDetails',

  // use this for table data
  FETCH_KYC_DOCUMENT_DETAILS_BY_PREFIX:
    process.env.FETCH_KYC_DOCUMENT_DETAILS_BY_PREFIX ||
    '/KycManagement/FetchKycDocumentDetailsByPreFix',

  SAVE_KYC_DOCUMENT_DETAILS:
    process.env.SAVE_KYC_DOCUMENT_DETAILS ||
    '/KycManagement/SaveKycDocumentDetails',

  UPDATE_COMPANY_TYPE_BUSINESS:
    process.env.UPDATE_COMPANY_TYPE_BUSINESS ||
    '/KycManagement/UpdateCompanyTypeInfo',

  UPDATE_COMPANY_TYPE_CONTACT:
    process.env.UPDATE_COMPANY_TYPE_CONTACT ||
    '/KycManagement/SetVendorCompanyTypeAndCategories',

  MANAGE_KYC_DOCUMENT_DETAILS:
    process.env.MANAGE_KYC_DOCUMENT_DETAILS ||
    '/KycManagement/ManageKycDocumentDetails',

  // use this for downloading kyc document and display them
  FETCH_VIEW_IMAGE:
    process.env.FETCH_VIEW_IMAGE || '/CommonManagement/FetchViewImage',

  // Add User (Manage Business)
  FETCH_DEPARTMENTS_MAPPED_ROLES:
    process.env.FETCH_DEPARTMENTS_MAPPED_ROLES ||
    '/CommonManagement/FetchDepartmentsMappedRoles',

  SAVE_USER: process.env.SAVE_USER || '/UserManagement/SaveUser',

  FETCH_BUSINESS_USER_DATA:
    process.env.FETCH_BUSINESS_USER_DATA || '/UserManagement/GetUserData',

  // Add bulk payments configuration
  FETCH_COMPANY_FILE_SETTINGS:
    process.env.FETCH_COMPANY_FILE_SETTINGS ||
    '/CommonManagement/FetchCompanyFileSettings',

  SUBMIT_COMPANY_FILE_SETTINGS:
    process.env.SUBMIT_COMPANY_FILE_SETTINGS ||
    '/CommonManagement/SaveCompanyFileSettings',

  // Gateway management
  SUBMIT_CHANNEL_PARTNER_DETAILS:
    process.env.SUBMIT_CHANNEL_PARTNER_DETAILS ||
    '/GatewayManagement/InsertUpdateRegistrar',

  FETCH_CAHNNEL_PARTNER_CARD_TYPES:
    process.env.FETCH_CAHNNEL_PARTNER_CARD_TYPES ||
    '/CommonManagement/GetProcessingTypes',

  // Change gateway status
  MANAGE_PAYMENT_GATEWAY_STATUS:
    process.env.MANAGE_PAYMENT_GATEWAY_STATUS ||
    '/GatewayManagement/MangePaymentGatewayStatus',

  // For row gateway export
  FETCH_BUSINESS_MAPPED_GATEWAY:
    process.env.FETCH_BUSINESS_MAPPED_GATEWAY ||
    '/GatewayManagement/FetchBusinessMapppedGateway',

  // Add Incident
  FETCH_SYSTEM_MODULES:
    process.env.FETCH_SYSTEM_MODULES || '/CommonManagement/FetchSystemModules',
  FETCH_INCIDENTS:
    process.env.FETCH_INCIDENTS || '/CommonManagement/FetchIncidents',
  SUBMIT_UPDATE_INCIDENT:
    process.env.SUBMIT_UPDATE_INCIDENT || '/CommonManagement/AddUpdateIncident',
  // Audit management
  FETCH_EVENT_LOGS:
    process.env.FETCH_EVENT_LOGS || '/CommonManagement/FetchEventLogs',

  // Add user (admin)
  FETCH_CHANNEL_PARTNER_LIST:
    process.env.FETCH_CHANNEL_PARTNER_LIST ||
    '/CommonManagement/FetchChannelPartner',

  // Profile settings
  FETCH_CURRENT_PASSWORD:
    process.env.FETCH_CURRENT_PASSWORD || '/UserManagement/GetCurrentPassword',

  SUBMIT_NEW_PASSWORD:
    process.env.SUBMIT_NEW_PASSWORD || '/UserManagement/ChangePassword',

  // Reports

  FETCH_REPORT_STATUS_DROPDOWN:
    process.env.FETCH_REPORT_STATUS_DROPDOWN ||
    '/PaymentManagement/FetchStatus',

  FETCH_PAYMENT_RECEIVED_REPORT:
    process.env.FETCH_PAYMENT_RECEIVED_REPORT ||
    '/ReportManagement/PaymentReceivedReport',

  FETCH_MAKE_PAYMENTS_REPORT:
    process.env.FETCH_MAKE_PAYMENTS_REPORT ||
    '/ReportManagement/MakePaymentsReport',

  FETCH_GATEWAY_TRANSACTION_BUSINESS_REPORT:
    process.env.FETCH_GATEWAY_TRANSACTION_BUSINESS_REPORT ||
    '/ReportManagement/GatewayTransactionBusinessReport',

  FETCH_PG_PAYMENT_STATUS:
    process.env.FETCH_PG_PAYMENT_STATUS ||
    '/GatewayManagement/FetchPGPaymentStatus',

  FETCH_BUSINESS_SUBSCRIPTION_REPORT:
    process.env.FETCH_BUSINESS_SUBSCRIPTION_REPORT ||
    '/ReportManagement/BusinessSubscriptionReport',

  FETCH_ACCOUNT_BALANCE_HISTORY_REPORT:
    process.env.FETCH_ACCOUNT_BALANCE_HISTORY_REPORT ||
    '/ReportManagement/XpressAccountHistoryReport',

  FETCH_BUSINESS_ACCOUNT_BALANCE_DETAILS_REPORT:
    process.env.FETCH_BUSINESS_ACCOUNT_BALANCE_DETAILS_REPORT ||
    '/ReportManagement/XpressAccountDetailsReport',

  FETCH_TENANT_PAYMENTS_REPORT:
    process.env.FETCH_TENANT_PAYMENTS_REPORT ||
    '/ReportManagement/TenantRentPaymentsReport',

  // FETCH_VENDOR_SUBSCRIPTION_REPORT:
  //   process.env.FETCH_VENDOR_SUBSCRIPTION_REPORT || "/",

  FETCH_SETTLEMENT_TRANSACTION_REPORT:
    process.env.FETCH_SETTLEMENT_TRANSACTION_REPORT ||
    '/ReportManagement/SettlementTransactionReport',

  // Bulk configurations
  FETCH_COMPANY_FILE_SETTINGS:
    process.env.FETCH_COMPANY_FILE_SETTINGS ||
    '/CommonManagement/FetchCompanyFileSettings',

  // Cards
  FETCH_CARD_DETAILS_LIST:
    process.env.FETCH_CARD_DETAILS_LIST || '/GatewayManagement/CardDetailsList',

  FETCH_CARD_TYPE_BY_COMPANY:
    process.env.FETCH_CARD_TYPE_BY_COMPANY ||
    '/GatewayManagement/FetchCardTypeByCompanyId',

  // Manage Business user
  FETCH_ALL_DEPARTMENT_MAPPED_ROLES:
    process.env.FETCH_ALL_DEPARTMENT_MAPPED_ROLES ||
    '/CommonManagement/FetchAllDepartmentsMappedRoles',

  // Manage Bank Account
  FETCH_ALL_BANK_ACCOUTNS:
    process.env.FETCH_ALL_BANK_ACCOUTNS ||
    '/SettlementManagement/BusinessbankAccountSummaryDetails',

  FETCH_ISSUING_BANK_BY_COMPANY:
    process.env.FETCH_ISSUING_BANK_BY_COMPANY ||
    '/GatewayManagement/FetchIssuingBanksByCompanyId',

  // Table actions for Reports
  // Collections:
  FETCH_RECEIVED_PAYMENT_VIEW_SUMMARY_REPORT:
    process.env.FETCH_RECEIVED_PAYMENT_VIEW_SUMMARY_REPORT ||
    '/ReportManagement/ReceivedPaymentsViewSummaryReport',

  FETCH_INVOICE_ATTACHMENT:
    process.env.FETCH_INVOICE_ATTACHMENT ||
    '/PaymentManagement/FetchInvoiceAttachment',

  // Panyments:
  FETCH_MAKE_PAYMENTS_HISTORY:
    process.env.FETCH_MAKE_PAYMENTS_HISTORY ||
    '/PaymentManagement/FetchMakePaymentHistory',

  FETCH_MAKE_PAYMENT_HISTORY_GRID:
    process.env.FETCH_MAKE_PAYMENT_HISTORY_GRID ||
    '/PaymentManagement/FetchMakePaymentHistoryGrid',

  // Manage contacts
  FETCH_VENDOR_CONFIGURATION_DETAILS:
    process.env.FETCH_VENDOR_CONFIGURATION_DETAILS ||
    '/VendorManagement/ManageVendorConfigurationDetails',

  UPDATE_ACQUIRE_STATUS:
    process.env.UPDATE_ACQUIRE_STATUS ||
    '/CommonManagement/UpdateAcquireStatus',

  REJECT_CONTACT_KYC:
    process.env.REJECT_CONTACT_KYC || '/VendorManagement/UpdateStatus',

  SET_CONTACT_KYC_APPOINTMENT:
    process.env.SET_CONTACT_KYC_APPOINTMENT ||
    '/VendorManagement/SetKycAppointment',

  // Tax Payments
  FETCH_TAX_PAYMENTS:
    process.env.FETCH_TAX_PAYMENTS || '/ReportManagement/TaxPaymentsReport',
  FETCH_GIBAN_DETAILS:
    process.env.FETCH_GIBAN_DETAILS || '/CommonManagement/FetchGIBANDetails',

  // Table actions
  // Account settings -> Manage Users
  MANAGE_USER_CONFIGURATION:
    process.env.MANAGE_USER_CONFIGURATION ||
    '/UserManagement/ManageUserConfiguration',
  MANAGE_MOBILE_USER_PERMISSION:
    process.env.MANAGE_MOBILE_USER_PERMISSION ||
    '/UserManagement/ManageMobileUserPermission',

  // Account settings -> Transaction Charges
  FETCH_BUSINESS_TRANSACTION_CHARGES:
    process.env.FETCH_BUSINESS_TRANSACTION_CHARGES ||
    '/BusinessManagement/FetchBusinessTransactionCharges',
  SAVE_MDR_CHARGES:
    process.env.SAVE_MDR_CHARGES || '/BusinessManagement/SaveMDRCharges',
  MDR_CHARGES_CONFIGURATION:
    process.env.MDR_CHARGES_CONFIGURATION ||
    '/BusinessManagement/MDRChargesConfiguration',

  // Account settings -> Manage Workflow
  FETCH_APPROVAL_WORKFLOW_LIST:
    process.env.FETCH_APPROVAL_WORKFLOW_LIST ||
    '/WorkFlowManagement/GetApprovalWorkflowList',
  FETCH_LIST_LIMIT_WORKFLOW:
    process.env.FETCH_LIST_LIMIT_WORKFLOW ||
    '/WorkFlowManagement/ListLimitWorkflow',
  FETCH_APPROVAL_WORKFLOW_LIMIT_CONFIGURATION:
    process.env.FETCH_APPROVAL_WORKFLOW_LIMIT_CONFIGURATION ||
    '/WorkFlowManagement/ApprovalWorkFlowLimitConfiguration',
  FETCH_WORKFLOW_PAYMENT_TYPES:
    process.env.FETCH_WORKFLOW_PAYMENT_TYPES ||
    '/CommonManagement/GetWorkflowPaymentTypes',
  FETCH_BIND_LIMITS:
    process.env.FETCH_BIND_LIMITS || '/LimitsManagement/BindLimits',
  FETCH_BIND_USER_ROLES:
    process.env.FETCH_BIND_USER_ROLES || '/WorkFlowManagement/BindUserRoles',
  SAVE_LIMIT_WORKFLOW:
    process.env.SAVE_LIMIT_WORKFLOW || '/WorkFlowManagement/SaveLimitWorkflow',

  CHANGE_APPROVER_DATA:
    process.env.CHANGE_APPROVER_DATA ||
    '/WorkFlowManagement/ChangeApproverData',

  // Table actions for Business management
  // Bulk payment configuration
  UPDATE_COMPANY_FILE_SETTING:
    process.env.UPDATE_COMPANY_FILE_SETTING ||
    '/CommonManagement/UpdateCompanyFileSettings',

  // Saved cards
  UPDATE_CARD_STATUS:
    process.env.UPDATE_CARD_STATUS || '/GatewayManagement/UpdateCardStatus',

  // Manage settlement bank
  SET_COMPANY_BANK_DETAIL_DEFAULT:
    process.env.SET_COMPANY_BANK_DETAIL_DEFAULT ||
    '/SettlementManagement/SetCompanyBankDetailDefault',

  // Manage contact
  VENDOR_DELETE: process.env.VENDOR_DELETE || '/VendorManagement/VendorDelete',

  // Manage contact
  UPDATE_VENDOR_STATUS:
    process.env.UPDATE_VENDOR_STATUS || '/VendorManagement/UpdateStatus',

  VENDOR_MAILER: process.env.VENDOR_MAILER || '/VendorManagement/VendorMailer',

  SEND_INVITATION_MAIL:
    process.env.SEND_INVITATION_MAIL ||
    '/VendorManagement/SendVendorInvitationMail',

  // Dashboard
  GET_PROFILE_MENU_DETAILS:
    process.env.GET_PROFILE_MENU_DETAILS ||
    '/DashBoardManagement/GetDashboardDispay',

  GET_ADMIN_DASHBOARD_NOTIFICATIONS:
    process.env.GET_ADMIN_DASHBOARD_NOTIFICATIONS ||
    '/DashBoardManagement/GetAdminDashboardNotifications',

  GET_DASHBOARD_GRAPH_DATA:
    process.env.GET_DASHBOARD_GRAPH_DATA ||
    '/DashBoardManagement/DashboadBusinessVendorData',

  GET_ADMIN_DASHBOARD_SETTLEMENT_TRANSACTIONS:
    process.env.GET_ADMIN_DASHBOARD_SETTLEMENT_TRANSACTIONS ||
    '/DashBoardManagement/AdminDashboardSettlementTransactions',

  GET_BUSINESS_DASHBOARD_DETAILS:
    process.env.GET_BUSINESS_DASHBOARD_DETAILS ||
    '/DashBoardManagement/BusinessDashBoardDetails',

  GET_BUSINESS_CHART_DATA:
    process.env.GET_BUSINESS_CHART_DATA ||
    '/DashBoardManagement/DashboadReceivedMadeData',

  // Commons for dropdowns
  GET_ALL_VENDOR:
    process.env.GET_ALL_VENDOR || '/VendorManagement/SearchContact',

  SEARCH_BUSINESS:
    process.env.SEARCH_BUSINESS || '/BusinessManagement/SearchBusiness',

  GET_PAYMENT_TYPES:
    process.env.GET_PAYMENT_TYPES || '/PaymentManagement/FetchPaymentTypes',

  // Bulk collection
  UPLOAD_BULK_COLLECTIONS:
    process.env.UPLOAD_BULK_COLLECTIONS ||
    '/PaymentManagement/ValidateUploadedFileAR',

  FETCH_STATUS_CODES_LIST:
    process.env.FETCH_STATUS_CODES_LIST || '/CommonManagement/StatusCodesList',

  // SETTLEMENTS
  FETCH_SEARCH_ALL_BUSINESS:
    process.env.FETCH_SEARCH_ALL_BUSINESS ||
    '/PaymentManagement/SearchAllBusiness',
  FETCH_SETTLE_PG_TRANSACTIONS:
    process.env.FETCH_SETTLE_PG_TRANSACTIONS ||
    '/SettlementManagement/SettlePGTransactions',
  FETCH_PENDING_RECEIVED_PAYMENTS_TRANSACTION:
    process.env.FETCH_PENDING_RECEIVED_PAYMENTS_TRANSACTION ||
    '/SettlementManagement/FetchPendingReceivedPaymentTransactions',
  FETCH_PENDING_PAYABLE_PAYMENTS_TRANSACTION:
    process.env.FETCH_PENDING_PAYABLE_PAYMENTS_TRANSACTION ||
    '/SettlementManagement/FetchPendingPayablePaymentTransactions',
  FETCH_SETTLEMENT_TRANSACTION_STATUS:
    process.env.FETCH_SETTLEMENT_TRANSACTION_STATUS ||
    '/SettlementManagement/HoldReleaseSettlementTransaction',
  FETCH_VAT_PENDING_PAYABLE_PAYMENT_TRANSACTIONS:
    process.env.FETCH_VAT_PENDING_PAYABLE_PAYMENT_TRANSACTIONS ||
    '/SettlementManagement/FetchVATPendingPayablePaymentTransactions',
  UPDATE_TRANSACTION_HOLD_STATUS:
    process.env.UPDATE_TRANSACTION_HOLD_STATUS ||
    '/SettlementManagement/TransactionOnHold',
  FETCH_SETTLEMENT_TRANSACTION_VIEW_HISTORY:
    process.env.FETCH_SETTLEMENT_TRANSACTION_VIEW_HISTORY ||
    '/SettlementManagement/SettlementTransactionViewHistory',

  // BUSINESS
  // Business Settings -> Manage Subscription ->
  // Business Subscription Setting -> Plan Details
  FETCH_BUSINESS_SUBSCRIPTION_PLAN_DETAILS:
    process.env.FETCH_BUSINESS_SUBSCRIPTION_PLAN_DETAILS ||
    '/SubscriptionManagement/FetchCompanySubscriptionSetting',
  // Business Subscription Setting -> Plan Details
  FETCH_BUSINESS_SUBSCRIPTION_PLAN_LIST:
    process.env.FETCH_BUSINESS_SUBSCRIPTION_PLAN_LIST ||
    '/SubscriptionManagement/FetchSingleSubscriptionPlanList',
  FETCH_INVOICE_DATA_FOR_SUBSCRIPTION:
    process.env.FETCH_INVOICE_DATA_FOR_SUBSCRIPTION ||
    'SubscriptionManagement/GetInvoiceDataForSubscription',

  FETCH_PAYMENT_THROUGH:
    process.env.FETCH_PAYMENT_THROUGH ||
    '/CommonManagement/FetchPaymentThrough',

  FETCH_MDR_CHARGES:
    process.env.FETCH_MDR_CHARGES || '/PaymentManagement/FetchMdrCharges',

  // Make a payment
  BOOK_PAYMENT: process.env.BOOK_PAYMENT || '/PaymentManagement/BookPayment',
  UPDATE_BOOK_PAYMENT:
    process.env.UPDATE_BOOK_PAYMENT || '/PaymentManagement/UpdateBookedRequest',

  CONFIMR_BOOKED_TRANSACTIONS:
    process.env.CONFIMR_BOOKED_TRANSACTIONS ||
    '/PaymentManagement/ConfirmBookedTransactions',

  FETCH_BOOKED_TRANSACTIONS_TABLE_DATA:
    process.env.FETCH_BOOKED_TRANSACTIONS_TABLE_DATA ||
    'PaymentManagement/BookedTransactions',

  DELETE_BOOKED_TRANSACTIONS:
    process.env.DELETE_BOOKED_TRANSACTIONS ||
    '/PaymentManagement/DeleteBookedTransaction',

  // Bulk Payments

  VALIDATE_UPLOADED_FILE:
    process.env.VALIDATE_UPLOADED_FILE ||
    '/PaymentManagement/ValidateUploadedFileAP',

  CONFIRM_BULK_PAYMENTS:
    process.env.CONFIRM_BULK_PAYMENTS ||
    '/PaymentManagement/ConfirmBulkPayments',
  GET_PAY_FROM_TYPE:
    process.env.GET_PAY_FROM_TYPE || '/CommonManagement/GetPayFromType',

  // VAT Payments -> Manage GIBAN
  FETCH_GIBAN_REPORT:
    process.env.FETCH_GIBAN_REPORT || '/PaymentManagement/ManageGIBANReport',
  FETCH_GIBAN_BUSINESS:
    process.env.FETCH_GIBAN_BUSINESS || '/CommonManagement/FetchGIBANBusiness',
  UPDATE_GIBAN_STATUS:
    process.env.UPDATE_GIBAN_STATUS || '/PaymentManagement/UpdateGIBanNoStatus',

  // CHECKOUT
  FETCH_PAYMENT_CHARGES:
    process.env.FETCH_PAYMENT_CHARGES ||
    '/TransactionManagement/GetPaymentCharges',
  SUBMIT_PAYMENT_CHARGES:
    process.env.SUBMIT_PAYMENT_CHARGES ||
    '/TransactionManagement/SubmitFormData',

  // Pending Approvals
  FETCH_PENDING_APPROVALS:
    process.env.FETCH_PENDING_APPROVALS ||
    'PaymentManagement/FetchAPTransactions',
  // View Action Payment Summary
  FETCH_PAYMENT_SUMMARY_HISTORY:
    process.env.FETCH_PAYMENT_SUMMARY_HISTORY ||
    '/PaymentManagement/FetchMakePaymentHistory',
  FETCH_PAYMENT_SUMMARY_HISTORY_GRID:
    process.env.FETCH_PAYMENT_SUMMARY_HISTORY_GRID ||
    '/PaymentManagement/FetchMakePaymentHistoryGrid',

  // Payment Approvals
  // VAT Payments
  FETCH_VAT_PAYMENTS:
    process.env.FETCH_VAT_PAYMENTS ||
    '/PaymentManagement/FetchTaxAPTransactions',
  FETCH_PROCESS_APTRANSACTIONS:
    process.env.FETCH_PROCESS_APTRANSACTIONS ||
    '/PaymentManagement/ProcessAPTransaction',

  // Requests Received
  FETCH_REQUESTS_RECEIVED:
    process.env.FETCH_REQUESTS_RECEIVED ||
    '/PaymentManagement/FetchRequestReceived',
  FETCH_CONFIRM_RECEIVED_REQUESTS:
    process.env.FETCH_CONFIRM_RECEIVED_REQUESTS ||
    '/PaymentManagement/ConfirmReceivedRequests',
  FETCH_APPROVE_REJECT_REQUEST_PAYMENT:
    process.env.FETCH_APPROVE_REJECT_REQUEST_PAYMENT ||
    '/PaymentManagement/ApproveRejectRequestPayment',
  FETCH_COMPANY_BALANCE:
    process.env.FETCH_COMPANY_BALANCE || '/PaymentManagement/GetCompanyBalance',
  FETCH_SENDER_REQUESTS_RECEIVED:
    process.env.FETCH_SENDER_REQUESTS_RECEIVED ||
    '/PaymentManagement/FetchSenderRequestReceived',

  // SALES
  // Track Collections
  FETCH_PENDING_REQUESTS:
    process.env.FETCH_PENDING_REQUESTS ||
    '/PaymentManagement/FetchPendingRequests',
  SEND_REQUEST_PAYMENT_MAIL:
    process.env.SEND_REQUEST_PAYMENT_MAIL ||
    '/PaymentManagement/SendRequestPaymentEmail',
  FETCH_PENDING_VENDOR_PAYMENTS:
    process.env.FETCH_PENDING_VENDOR_PAYMENTS ||
    '/PaymentManagement/FetchPendingVendorPayment',
  SEND_VENDOR_PAYMENT_EMAIL:
    process.env.SEND_VENDOR_PAYMENT_EMAIL ||
    '/PaymentManagement/SendVendorPaymentEmail',

  // VENDOR APIs

  // Reports - Registered Business
  FETCH_REGISTERED_BUSINESS:
    process.env.FETCH_REGISTERED_BUSINESS ||
    '/ReportManagement/VendorRegisteredBusinessesReport',

  // Reports - Payments (Vendor -- Made Payments)
  FETCH_MADE_PAYMENTS:
    process.env.FETCH_MADE_PAYMENTS ||
    '/ReportManagement/MakePaymentsVendorReport',

  // Reports - Discounting Reports
  FETCH_DISCOUNTING_REPORTS:
    process.env.FETCH_DISCOUNTING_REPORTS ||
    '/ReportManagement/DiscountingReport',
  FETCH_MANAGE_CONTRACTS:
    process.env.FETCH_MANAGE_CONTRACTS ||
    '/DiscountingManagement/ManageContract',

  // Vendor Collections
  FETCH_PAYMENT_RECEIVED_VENDOR_REPORTS:
    process.env.FETCH_PAYMENT_RECEIVED_VENDOR_REPORTS ||
    '/ReportManagement/PaymentReceivedVendorReport',

  // Pending Approval
  FETCH_PENDING_APPROVAL:
    process.env.FETCH_PENDING_APPROVAL ||
    '/PaymentManagement/FetchSenderPayableTransactions',
  FETCH_VENDOR_PAYMENTS_MODES:
    process.env.FETCH_VENDOR_PAYMENTS_MODES ||
    '/CommonManagement/FetchVendorPaymentsModes',
  FETCH_VENDOR_PAYMENT_THROUGH:
    process.env.FETCH_VENDOR_PAYMENT_THROUGH ||
    '/CommonManagement/FetchVendorPaymentThrough',
  FETCH_CONFIRM_SENDER_RECEIVED_REQUEST:
    process.env.FETCH_CONFIRM_SENDER_RECEIVED_REQUEST ||
    '/PaymentManagement/ConfirmSenderReceivedRequest',

  FETCH_SEARCH_BUSINESS:
    process.env.FETCH_SEARCH_BUSINESS || '/BusinessManagement/SearchBusiness',

  INSERT_UPDATE_RISK_COMPLIANCE:
    process.env.INSERT_UPDATE_RISK_COMPLIANCE ||
    '/BusinessManagement/InsertUpdateRiskCompliance',

  FETCH_RISK_COMPLIANCE_LIST:
    process.env.FETCH_RISK_COMPLIANCE_LIST ||
    '/BusinessManagement/FetchRiskComplianceList',

  // subscription

  FETCH_SUBSCRIPTOIN_DATA:
    process.env.FETCH_SUBSCRIPTOIN_DATA ||
    '/SubscriptionManagement/FetchSubscriptionById',
  // "/SubscriptionManagement/FetchSubscription",

  UPDATE_SUBSCRIPTION:
    process.env.UPDATE_SUBSCRIPTION ||
    '/SubscriptionManagement/AddSubscription',

  UPDATE_SUBSCRIPTION_STATUS:
    process.env.UPDATE_SUBSCRIPTION_STATUS ||
    '/SubscriptionManagement/UpdateSubscriptionStatus',

  SET_DEFAULT_BANK:
    process.env.SET_DEFAULT_BANK ||
    '/SettlementManagement/SetCompanyBankDetailDefault',

  // Promo Banner
  FETCH_PROMO_CODE_DATA:
    process.env.FETCH_PROMO_CODE_DATA || '/MobileManageMent/GetPromoCodeData',
  SUBMIT_PROMO_CODE_DATA:
    process.env.SUBMIT_PROMO_CODE_DATA ||
    '/MobileManageMent/SavePromoCodeDetails',
  MANAGE_PROMO_CONFIGURATION:
    process.env.MANAGE_PROMO_CONFIGURATION ||
    '/MobileManageMent/ManagePromoConfiguration',

  // Approve Reject Minimum Charges
  FETCH_BUSINESS_DETAILS:
    process.env.FETCH_BUSINESS_DETAILS ||
    '/BusinessManagement/FetchBusinessDetails',
  MINIMUM_CHARGE_APPROVE_REJECT:
    process.env.MINIMUM_CHARGE_APPROVE_REJECT ||
    '/BusinessManagement/MinChargeApproveReject',

  // vendor subscription
  UPDATE_VENDOR_SUBSCRIPTION:
    process.env.UPDATE_VENDOR_SUBSCRIPTION ||
    '/BusinessManagement/UpdateCompanyVendorSubscriptionStatus',

  FETCH_VENDOR_SUBSCRIPTION_DETAILS:
    process.env.FETCH_VENDOR_SUBSCRIPTION_DETAILS ||
    '/SubscriptionManagement/FetchVendorSubscriptionDetails',

  // GIBAN
  SAVE_GIBAN: process.env.SAVE_GIBAN || '/PaymentManagement/SaveGiban ',

  // Add bank
  INSERT_UPDATE_BANK_DETAILS:
    process.env.INSERT_UPDATE_BANK_DETAILS ||
    '/SettlementManagement/InsertUpdateBankDetails',

  // Add Card
  ADD_CARD: process.env.ADD_CARD || '/GatewayManagement/AddCard',

  // Payment limist (setlimit & manage limits)
  SAVE_LIMIT: process.env.SAVE_LIMIT || '/LimitsManagement/SaveLimits',
  MANAGE_LIMIT: process.env.MANAGE_LIMIT || '/LimitsManagement/ManageLimits',

  // Reset Password - for vendor user (user added from "Add Contact" form)
  GET_USER_BASIC_INFO:
    process.env.GET_USER_BASIC_INFO || '/UserManagement/GetUserBasicInfo',

  FETCH_VENDOR_DETAILS_FOR_SIGNUP:
    process.env.FETCH_VENDOR_DETAILS_FOR_SIGNUP ||
    '/VendorManagement/FetchVendorDetailsForSignUp',

  // Reports - Regeistered Businesss (Vendor user only)
  ACCEPT_SENDER_INVITE:
    process.env.ACCEPT_SENDER_INVITE || '/VendorManagement/AcceptSenderInvite',

  ACCEPT_CONNECTION_REQUEST:
    process.env.ACCEPT_CONNECTION_REQUEST ||
    '/VendorManagement/AcceptSenderInvite',

  GET_CONNECTION_REQUESTS:
    process.env.GET_CONNECTION_REQUESTS ||
    '/VendorManagement/GetPendingInvites',

  SAVE_SHARE_HOLDER_KYC_DETAILS:
    process.env.SAVE_SHARE_HOLDER_KYC_DETAILS ||
    '/KycManagement/InsertUpdateKycDocumentData',

  SAVE_SINGLE_DOCUMENT_FILE:
    process.env.SAVE_SINGLE_DOCUMENT_FILE ||
    '/KycManagement/SaveSingleDocumentFile',

  GET_TERMS_AND_POLICIES:
    process.env.GET_TERMS_AND_POLICIES || '/UserManagement/GetTermsDetails',

  // ACCEPT_TERMS_AND_POLICIES:
  //   process.env.ACCEPT_TERMS_AND_POLICIES ||
  //   "/UserManagement/AcceptTermsAndConditions",

  ACCEPT_TERMS_AND_POLICIES:
    process.env.ACCEPT_TERMS_AND_POLICIES ||
    '/UserManagement/AcceptPartialTermsAndConditions',

  AUTHENTICATE_SENDER:
    process.env.AUTHENTICATE_SENDER || '/VendorManagement/AuthenticateSender',

  GET_COMPANY_BALANCE:
    process.env.GET_COMPANY_BALANCE || '/PaymentManagement/GetCompanyBalance',

  UPDATE_3DS_RESPONSE:
    process.env.UPDATE_3DS_RESPONSE ||
    '/GatewayManagement/Update3DSPaymentResponse',

  FETCH_TRANSACTION_SUMMARY:
    process.env.FETCH_TRANSACTION_SUMMARY ||
    '/PaymentManagement/FetchTransactionSummary',
  GET_TRANSACTION_SUMMARY:
    process.env.GET_TRANSACTION_SUMMARY ||
    '/PaymentManagement/GetTransactionSummary',

  GET_SUBSCRIPTION_CHARGES:
    process.env.GET_SUBSCRIPTION_CHARGES ||
    '/SubscriptionManagement/FetchBusinessSubscriptionData',

  SAVE_SUBSCRIPTION_REQUEST:
    process.env.SAVE_SUBSCRIPTION_REQUEST || '/PaymentManagement/SaveRequests',

  // Rent collections
  // Property Registration
  SUBMIT_SINGLE_PROPERTY_REGISTRATION_DATA:
    process.env.SUBMIT_SINGLE_PROPERTY_REGISTRATION_DATA ||
    '/PropertyManagement/PropertyRegistration',

  FETCH_PROPERTY_MASTER_DATA:
    process.env.FETCH_PROPERTY_MASTER_DATA ||
    '/PropertyManagement/ManagePropertyMaster',

  MANAGE_PROPERTY_CONFIGURATION:
    process.env.MANAGE_PROPERTY_CONFIGURATION ||
    '/PropertyManagement/ManagePropertyConfiguration',

  VALIDATE_BULK_PROPERTY_REGISTRATION:
    process.env.VALIDATE_BULK_PROPERTY_REGISTRATION ||
    '/PropertyManagement/ValidatePropertyMasterSession',

  CONFIRM_BULK_PROPERTIES:
    process.env.CONFIRM_BULK_PROPERTIES ||
    '/PropertyManagement/ConfirmBulkPropertyMaster',

  GET_BULK_PROPERTIES_FROM_SESSION:
    process.env.GET_BULK_PROPERTIES_FROM_SESSION ||
    '/PropertyManagement/FecthBulkPropertySession',

  CANCEL_BULK_PROPERTY:
    process.env.CANCEL_BULK_PROPERTY ||
    '/PropertyManagement/RemovePropertyMasterSession',

  // Tenant Registration
  SUBMIT_SINGLE_TENANT_REGISTRATION_DATA:
    process.env.SUBMIT_SINGLE_TENANT_REGISTRATION_DATA ||
    '/TenantManagement/TenantRegistration',

  FETCH_TENANT_MASTER_DATA:
    process.env.FETCH_TENANT_MASTER_DATA ||
    '/TenantManagement/ManageTenantConfigurationDetails',

  VALIDATE_BULK_TENANT_REGISTRATION:
    process.env.VALIDATE_BULK_TENANT_REGISTRATION ||
    '/TenantManagement/ValidateTenantMasterSession',

  CONFIRM_BULK_TENANTS:
    process.env.CONFIRM_BULK_TENANTS || '/TenantManagement/ConfirmBulkUpload',

  GET_BULK_TENANTS_FROM_SESSION:
    process.env.GET_BULK_TENANTS_FROM_SESSION ||
    '/TenantManagement/FetchValidatedBulkTenantsFromSession',

  UPDATE_TENANT_STATUS:
    process.env.UPDATE_TENANT_STATUS || '/TenantManagement/UpdateStatus',

  CANCEL_BULK_TENANT:
    process.env.CANCEL_BULK_TENANT ||
    '/VendorManagement/RemoveContactMasterSession',
  SEND_TENANT_INVITATION_MAIL:
    process.env.SEND_TENANT_INVITATION_MAIL ||
    '/TenantManagement/SendTenantInvitationMail',

  // Collect Rent
  // TODO: Where is this being used?
  FETCH_SUBSCRIPTION_AND_LIMIT_DETAILS:
    process.env.FETCH_SUBSCRIPTION_AND_LIMIT_DETAILS ||
    '/WorkFlowManagement/FetchSubscriptionAndLimitDetails',

  // Fetching lease type dropdown -> TypeCode: "RLT"
  // Fetching frequency dorpdown -> TypeCode: "FRQ"
  GET_CODE_DETAILS_DATA_BY_CODE:
    process.env.GET_CODE_DETAILS_DATA_BY_CODE ||
    '/CommonManagement/GetCodeDetailsDataByCode',

  // TODO: There is spelling miskate in Fetch
  // TODO: Ask, what are the mandatory parameters to send as nothing is mentioned in the doc
  // for getting booked rent request table data in the Comfirm request tab
  FETCH_BOOKED_TRANSACTIONS:
    process.env.FETCH_BOOKED_TRANSACTIONS ||
    '/PaymentManagement/FecthBookedTransactions',
  CHECK_IF_NOTIFICATION_CLOSED:
    process.env.CHECK_IF_NOTIFICATION_CLOSED ||
    '/UserManagement/CheckIfNotificationClosed',

  // for confirm button on the rent collection -> bulk collection page
  BOOK_RENT_PAYMENTS:
    process.env.BOOK_RENT_PAYMENTS || '/PaymentManagement/BookRentPayments',

  // for updating single rent collection request which is being edited from "Confirm Request" table
  UPDATE_RENT_BOOKED_REQUEST:
    process.env.UPDATE_RENT_BOOKED_REQUEST ||
    '/PaymentManagement/UpdateRentBookedRequest',

  // for deleting rent request from the "Confirm request" table
  DELETE_BOOKED_RENT_TRANSACTION:
    process.env.DELETE_BOOKED_RENT_TRANSACTION ||
    '/PaymentManagement/DeleteBookedRentTransaction',

  // TODO: Ask about this
  // for confirm button on the rent collection -> confrim request accordion
  CONFIRM_RENT_COLLECTION_TRANSACTIONS:
    process.env.CONFIRM_RENT_COLLECTION_TRANSACTIONS ||
    '/PaymentManagement/ConfirmRentCollectionTransactions',
  MANAGE_TRACK_RENT_COLLECTION:
    process.env.MANAGE_TRACK_RENT_COLLECTION ||
    '/PaymentManagement/ManageTrackRentCollection',
  UPDATE_RENT_COLLECTION_REMINDER:
    process.env.UPDATE_RENT_COLLECTION_REMINDER ||
    'PaymentManagement/UpdateRentCollectionReminder',
  RENT_COLLECTION_REPORT:
    process.env.RENT_COLLECTION_REPORT ||
    '/ReportManagement/RentCollectionReport',

  VALIDATE_BULK_RENT_PAYMENT_FILE:
    process.env.VALIDATE_BULK_RENT_PAYMENT_FILE ||
    '/PaymentManagement/ValiDateRentPaymentFile',

  // TENANT LOGIN
  TENANT_MANAGE_PROPERTY:
    process.env.TENANT_MANAGE_PROPERTY ||
    '/PaymentManagement/TenantManageProperty',
  TENANT_REQUEST_RECEIVED:
    process.env.TENANT_REQUEST_RECEIVED ||
    '/PaymentManagement/TenantRequestRecived',
  APPROVE_REJECT_TENANT_PAYMENT:
    process.env.APPROVE_REJECT_TENANT_PAYMENT ||
    '/PaymentManagement/ApproveRejectTenantPayment',
  TENANT_TRACK_RENT_COLLECTION:
    process.env.TENANT_TRACK_RENT_COLLECTION ||
    '/PaymentManagement/TenantTrackRentCollection',
};
