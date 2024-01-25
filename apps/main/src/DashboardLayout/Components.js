// import  from "@pages/AccountSettings/ManageUsers/AddUser";
// import  from "@pages/AccountSettings/ManageUsers/ManageUsers";
// import TransactionCharges from "@pages/AccountSettings/TransactionCharges";
// import DesignWorkflow from "@pages/AccountSettings/WorkflowSettings/ManageWorkflow/DesignWorkflow";
// import ManageWorkflow from "@pages/AccountSettings/WorkflowSettings/ManageWorkflow/ManageWorkflow";
// import SetLimit from "@pages/AccountSettings/WorkflowSettings/PaymentLimits";
// import ManageLimit from "@pages/AccountSettings/WorkflowSettings/PaymentLimits";
import { AddUsers, ManageUsers } from '@paymate/user-management';
// import { EventLogs, AddIncident, ManageIncidents } from "audit-management";
// import {
//   AddBusiness,
//   ManageBusiness,
//   AddUser,
//   ManageUser,
//   AddBankAccounts,
//   ManageBankAccounts,
//   ContactKycDocuments,
//   NewCard,
//   SavedCards,
//   AddBulkPaymentsConfiguration,
//   ManageBulkPaymentsConfiguration,
//   KycVerification,
// } from "business-management";
import {
  AddContact,
  BulkUploadContacts,
  ManageContacts,
} from '@paymate/contact-management';
// import  from "@pages/BusinessSettings/ManageSubscription/BusinessSubscriptionSettings";
// import  from "@pages/BusinessSettings/ManageSubscription/SubscriptionHistory";
// import {
//   BusinessSubscriptionSettings,
//   SubscriptionHistory,
// } from 'business-settings';
import { Dashboard } from '@paymate/dashboards';
// import {
//   CollectionPayments,
//   PayablePayments,
//   TaxablePayment,
// } from "settlements";
// import { AddChannelPartner, ManageChannelPartner } from "gateway-management";
// import  from "@pages/GatewayManagement/AddChannelPartner";
// import  from "@pages/GatewayManagement/ManageChannelPartner";
// import  from "@pages/PaymentApprovals/VATPayments";
// import  from "@pages/Payments/BulkPayments";
// import  from "@pages/Payments/MakeAPayment";
// import  from "@pages/Payments/MakePayment";
// import  from "@pages/Payments/PendingApproval/PendingApproval";
// import  from "@pages/Payments/PendingApprovals/PendingApprovals";
// import  from "@pages/Payments/RequestsReceived";
// import  from "@pages/Payments/VATPayments/PayTax";
// import  from "@pages/Payments/VATPayments/RegisterGIBAN/AddGIBAN";
// import {
//   BulkPayment,
//   MakeAPayment,
//   MakePayment,
//   PendingApproval,
//   PendingApprovals,
//   RequestsReceived,
//   CheckoutPage,
//   VendorRequestsReceived,
//   PayTax,
//   AddGIBAN,
//   ManageGIBAN,
//   VATPayments,
// } from 'payments';
// import  from "@pages/ProfileSettings/ChangePassword";
// import  from "@pages/ProfileSettings/EditProfile";
// import  from "@pages/Reports/AccountBalanceHistory";
// import  from "@pages/Reports/BusinessSubscription";
// import  from "@pages/Reports/Collections";
// import  from "@pages/Reports/DiscountingReport";
// import  from "@pages/Reports/MadePayments";
// import  from "@pages/Reports/PaymentGatewayTransactions";
// import  from "@pages/Reports/Payments";
// import  from "@pages/Reports/RegisteredBusiness";
// import  from "@pages/Reports/SettlementTransactions";
// import  from "@pages/Reports/TaxPayments";
// import VendorSubscription from "@pages/Reports/VendorSubscription";
// import  from "@pages/Sales/BulkCollections";
// import  from "@pages/Sales/CollectPayments";
// import  from "@pages/Sales/TrackCollections";
// import  from "@pages/Sales/VendorCollectPayment";
// import AddSubscription from "@pages/Settings/Manage Subscription/AddSubscription";
// import ManageSubscription from "@pages/Settings/Manage Subscription/ManageSubscription";
// import { ChangePassword, EditProfile, UploadDocuments } from 'profile-settings';

// import {
//   BulkCollections,
//   CollectPayment,
//   TrackCollections,
//   VendorCollectPayment,
//   VendorTrackCollections,
// } from 'sales';

// import ApproveRejectMinimumCharges from "@root/Pages/ApproveRejectMinimumCharges";
// import from "@root/Pages/BusinessManagement/ManageBusinesses/Actions/KycVerification";
// import Card3DSProcessing from "@root/Pages/Card3DSProcessing";
// import Payment3DSProcessing from "@root/Pages/Payment3DSProcessing";
// import  from "@root/Pages/Payments/Checkout/Checkout";
// import  from "@root/Pages/Payments/VATPayments/RegisterGIBAN/ManageGIBAN/ManageGIBAN";
// import  from "@root/Pages/Payments/VendorRequestsReceived";
// import  from "@root/Pages/ProfileSettings/UploadDocuments";
// import VendorCollections from "@root/Pages/Reports/VendorCollections";
// import  from "@root/Pages/Sales/VendorTrackCollections";
// import AddPromoBanner from "@root/Pages/Settings/Promo Banner/AddPromoBanner";
// import ManagePromoBanner from "@root/Pages/Settings/Promo Banner/ManagePromoBanner";
// import ViewTransactionSummary from "@root/Pages/ViewTransactionSummary";

// import BulkRegisterProperty from "@root/Pages/RentCollection/RegisterProperty/BulkRegisterProperty";
// import SingleRegisterProperty from "@root/Pages/RentCollection/RegisterProperty/SingleRegisterProperty";
// import ManageProperty from "@root/Pages/RentCollection/RegisterProperty/ManageProperty";

// import BulkRegisterTenant from "@root/Pages/RentCollection/RegisterTenant/BulkRegisterTenant";
// import SingleRegisterTenant from "@root/Pages/RentCollection/RegisterTenant/SingleRegisterTenant";
// import ManageTenant from "@root/Pages/RentCollection/RegisterTenant/ManageTenant";

// import BulkRentCollection from "@root/Pages/RentCollection/CollectRent/BulkRentCollection";
// import RentCollection from "@root/Pages/RentCollection/CollectRent/RentCollection";
// import TrackRent from "@root/Pages/RentCollection/CollectRent/TrackRent";

// import  from "@root/Pages/Reports/RentCollectionReport";

// import TenantRequestsReceived from "@root/Pages/RentPayments/TenantRequestsReceived";
// import TenantManageProperty from "@root/Pages/RentPayments/TenantManageProperty";
// import TenantTrackRent from "@root/Pages/RentPayments/TenantTrackRent";
// import TenantPaymentsReport from "@root/Pages/Reports/TenantPaymentsReport";

// import {
//   AccountBalanceHistory,
//   BusinessSubscription,
//   Collections,
//   DiscountingReport,
//   MadePayments,
//   PaymentGatewayTransactions,
//   Payments,
//   RegisteredBusiness,
//   RentCollectionReport,
//   SettlementTransactions,
//   TaxPayments,
//   TenantPaymentsReport,
//   VendorCollections,
//   VendorSubscription,
// } from 'reports';

export {
  Dashboard,
  // AddBusiness,
  // ManageBusiness,
  AddContact,
  BulkUploadContacts,
  ManageContacts,
  // ManageBankAccounts,
  // AddUser,
  // ManageUser,
  // SavedCards,
  // AddBulkPaymentsConfiguration,
  // ManageBulkPaymentsConfiguration,
  // AddChannelPartner,
  // ManageChannelPartner,
  // AccountBalanceHistory,
  // BusinessSubscription,
  // Collections,
  // PaymentGatewayTransactions,
  // Payments,
  // SettlementTransactions,
  // VendorSubscription,
  // EventLogs,
  // AddIncident,
  // ManageIncidents,
  AddUsers,
  ManageUsers,
  // CollectionPayments,
  // PayablePayments,
  // EditProfile,
  // ChangePassword,
  // BulkPayment,
  // PayTax,
  // BulkCollections,
  // MakeAPayment,
  // MakePayment,
  // RequestsReceived,
  // PendingApprovals,
  // ManageGIBAN,
  // TrackCollections,
  // VATPayments,
  // DiscountingReport,
  // TaxPayments,
  // SubscriptionHistory,
  // RegisteredBusiness,
  // PendingApproval,
  // BusinessSubscriptionSettings,
  // AddGIBAN,
  // AddBankAccounts,
  // ManageWorkflow,
  // TransactionCharges,
  // NewCard,
  // CollectPayment,
  // SetLimit,
  // ManageLimit,
  // MadePayments,
  // DesignWorkflow,
  // ManageSubscription,
  // AddSubscription,
  // TaxablePayment,
  // UploadDocuments,
  // KycVerification,
  // ContactKycDocuments,
  // CheckoutPage,
  // VendorCollectPayment,
  // VendorRequestsReceived,
  // VendorTrackCollections,
  // VendorCollections,
  // AddPromoBanner,
  // ManagePromoBanner,
  // ViewTransactionSummary,
  // ApproveRejectMinimumCharges,
  // Payment3DSProcessing,
  // Card3DSProcessing,
  // BulkRegisterProperty,
  // ManageProperty,
  // SingleRegisterProperty,
  // BulkRegisterTenant,
  // SingleRegisterTenant,
  // ManageTenant,
  // BulkRentCollection,
  // RentCollection,
  // TrackRent,
  // RentCollectionReport,
  // TenantRequestsReceived,
  // TenantManageProperty,
  // TenantTrackRent,
  // TenantPaymentsReport,
};
