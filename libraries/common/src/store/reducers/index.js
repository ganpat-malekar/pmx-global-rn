import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import AddUser from "./AccountSettings/ManageUsers/reducer_AddUser";
// import ManageUsers from "./AccountSettings/ManageUsers/reducer_ManageUsers";
import MobileAccessPrompt from './BusinessManagement/ManageBusinessUsers/reducer_mobileAccessPrompt';
// import PaymentLimitsReducer from "./AccountSettings/reducer_PaymentLimits";
// import ApproveRejectMinimumChargesReducer from "./ApproveRejectMinimumChargesReducer";
// import AddIncident from "./AuditManagement/IncidentManagement/reducer_AddIncident";
// import IncidentReducer from "./AuditManagement/IncidentReducer";
// import AddBulkPaymentsConfiguration from "./BusinessManagement/ManageBulkPaymentsConfiguration/reducer_AddBulkPaymentsConfiguration";
// import BulkConfigurations from "./BusinessManagement/ManageBulkPaymentsConfiguration/reducer_ManageBulkPaymentConfiguration";
// import SavedCards from "./BusinessManagement/ManageBusinessCards/reducer_SavedCards";
import AddContact from './BusinessManagement/ManageBusinessContacts/reducer_AddContact';
import BankAccountDetails from './BusinessManagement/ManageBusinessContacts/reducer_BankAccountDetails';
import BasicInfo from './BusinessManagement/ManageBusinessContacts/reducer_BasicInfo';
import BulkContact from './BusinessManagement/ManageBusinessContacts/reducer_BulkContactUpload';
import ManageContacts from './BusinessManagement/ManageBusinessContacts/reducer_ManageContacts';
import AddBusinessUser from './BusinessManagement/ManageBusinessUsers/reducer_AddBusinessUser';
import ManageBusinessUser from './BusinessManagement/ManageBusinessUsers/reducer_ManageUser';
// import BusinessKYC from "./BusinessManagement/ManageBusinesses/KYC/reducer_CommonKYC";
import AddBusinessReducer from './BusinessManagement/ManageBusinesses/reducer_AddBusiness';
// import BusinessInformationReducer from "./BusinessManagement/ManageBusinesses/reducer_BusinessInformation";
// import BusinessSubscription from "./BusinessManagement/ManageBusinesses/reducer_BusinessSubscription";
// import ManageBusinessReducer from "./BusinessManagement/ManageBusinesses/reducer_ManageBusiness";
// import QuestionnaireReducer from "./BusinessManagement/ManageBusinesses/reducer_Questionnaire";
// import RiskComplianceReducer from "./BusinessManagement/ManageBusinesses/reducer_RiskCompliance";
// import TransactionChargesReducer from "./BusinessManagement/ManageBusinesses/reducer_TransactionCharges";
// import AddBankAccountReducer from "./BusinessManagement/ManageSettlementAccount/reducer_AddBankAccount";
// import ManageBankAccounts from "./BusinessManagement/ManageSettlementAccount/reducer_ManageBankAccounts";
// import CheckoutReducer from "./CheckoutReducer";
import DataLists from './Common/Dropdowns/reducer_DataLists';
import TypesList from './Common/Dropdowns/reducer_TypesList';
import ExportLists from './Common/Export/reducer_exportLists';
// import viewColumnReducer from "./Common/Modal/ViewColumnReducer";
// import viewModalReducer from "./Common/Modal/ViewModalReducer";
// import UploadDocumentPromptReducer from "./Common/UploadDocumentPromptReducer";
import confirmPromptReducer from './Common/confirmPromptReducer';
// import filePopupReducer from "./Common/filePopupReducer";
// import radioPromptReducer from "./Common/radioPromptReducer";
import Datatables from './Common/reducer_Datatables';
import remarkPromptReducer from './Common/remarkPromptReducer';
// import RiskHistoryPopupReducer from "./Common/riskHistoryPopupReducer";
// import selectPromptReducer from "./Common/selectPromptReducer";
import Dashboard from './DashboardReducer';
// import AddChannelPartner from "./GatewayManagement/reducer_AddChannelPartner";
// import ManageChannelPartner from "./GatewayManagement/reducer_ManageChannelPartners";
// import PayTaxReducer from "./Payments/VAT Payments/PayTax/reducer_PayTax";
// import AddGibanReducer from "./Payments/VAT Payments/Register GIBAN/reducer_AddGIBAN";
// import ManageGIBANReducer from "./Payments/VAT Payments/Register GIBAN/reducer_ManageGIBAN";
// import AcceptRequestFormModalReducer from "./Payments/reducer_AcceptRequestFormModal";
// import BulkPaymentReducer from "./Payments/reducer_BulkPayments";
// import MakeAPayment from "./Payments/reducer_MakeAPayment";
// import VendorMakePayment from "./Payments/reducer_VendorMakePayment";
import ChangePassword from './ProfileSettings/reducer_ChangePassword';
// import EditProfile from "./ProfileSettings/reducer_EditProfile";
import ReportsReducer from './ReportsReducer';
import ResetPasswordReducer from './ResetPasswordReducer';
// import BulkCollectionReducer from "./Sales/reducer_BulkCollection";
// import CollectPaymentReducer from "./Sales/reducer_CollectPayment";
// import SettlementsReducer from "./Settlements/SettlementsReducer";
// import SubscriptionReducer from "./SubscriptionReducer";
import uiReducer from './UIReducer';
// import ViewPaymentSummaryReducer from "./ViewPaymentSummaryReducer";
import adminReducer from './adminReducer';
import passwordReducer from './passwordReducer';
import SideMenuReducer from './sideMenuReducers';
// import PropertyReducer from "./RentCollection/PropertyReducer";
// import TenantReducer from "./RentCollection/TenantReducer";
// import RentReducer from "./RentCollection/RentReducer";
import { LOGOUT_SUCCESS } from '../actions/types';
// import WorkflowListReducer from "./AccountSettings/reducer_ManageWorkflow";
// import BusinessTransactionChargesReducer from "./AccountSettings/reducer_TransactionCharges";
// import BusinessSubscriptionSettings from "./BusinessSettings/ManageSubscription/BusinessSubscriptionSettings/reducer_BusinessSubscription";
// import ViewDialog from "./Common/reducer_ToggleDialog";
// import VATPaymentsReducer from "./PaymentApprovals/reducer_VATPayments";
// import PendingApprovalReducer from "./Payments/reducer_PendingApproval";
// import PendingApprovalsReducer from "./Payments/reducer_Pending_Approvals";
// import RequestsReceivedReducer from "./Payments/reducer_RequestsReceived";
// import TransactionSummaryReducer from "./Payments/reducer_TransactionSummary";
// import PromoBannerReducer from "./PromoBannerReducer";
// import TrackCollectionsReducer from "./Sales/reducer_TrackCollections";
// import VendorSubscriptionReducer from "./BusinessManagement/ManageBusinesses/reducer_VendorSubscription";
// import TenantRentPaymentReducer from "./RentPayment/TenantRentPaymentReducer";

const isReactNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
console.log('Is ReactNative', isReactNative)

const persistConfig = {
  key: 'root',
  storage: isReactNative ? AsyncStorage : storage,
  // storage: AsyncStorage,
  whitelist: ['admin', 'transactionSummary'],
};

const appReducer = combineReducers({
  admin: adminReducer,
  ui: uiReducer,
  password: passwordReducer,
  sideMenu: SideMenuReducer,
  addBusiness: AddBusinessReducer,
  // businessInformation: BusinessInformationReducer,
  // businessSubscription: BusinessSubscription,
  // transactionCharges: TransactionChargesReducer,
  // questionnaire: QuestionnaireReducer,
  // ManageBusiness: ManageBusinessReducer,
  addContact: AddContact,
  basicInfo: BasicInfo,
  bankAccountDetails: BankAccountDetails,
  typesList: TypesList,
  dataLists: DataLists,
  // businessKYC: BusinessKYC,
  addBusinessUser: AddBusinessUser,
  // addBulkPaymentsConfiguration: AddBulkPaymentsConfiguration,
  // addChannelPartner: AddChannelPartner,
  // manageChannelPartner: ManageChannelPartner,
  // addIncident: AddIncident,
  // addUser: AddUser,
  // manageUsers: ManageUsers,
  // editProfile: EditProfile,
  mobileAccessPrompt: MobileAccessPrompt,
  changePassword: ChangePassword,
  reportsReducer: ReportsReducer,
  // incidentReducer: IncidentReducer,
  // bulkConfigurations: BulkConfigurations,
  // savedCards: SavedCards,
  manageBusinessUser: ManageBusinessUser,
  // manageBankAccount: ManageBankAccounts,
  manageContacts: ManageContacts,
  dashboard: Dashboard,
  exportFiles: ExportLists,
  confirmPrompt: confirmPromptReducer,
  remarkPrompt: remarkPromptReducer,
  // selectPrompt: selectPromptReducer,
  // manageGIBAN: ManageGIBANReducer,
  // businessSubscriptionSettings: BusinessSubscriptionSettings,
  // makeAPayment: MakeAPayment,
  // pendingApprovals: PendingApprovalsReducer,
  // viewDialog: ViewDialog,
  // pendingApproval: PendingApprovalReducer,
  // vatPayments: VATPaymentsReducer,
  // ViewPaymentSummary: ViewPaymentSummaryReducer,
  datatables: Datatables,
  bulkContact: BulkContact,
  // filePopupReducer: filePopupReducer,
  // riskCompliance: RiskComplianceReducer,
  // subscription: SubscriptionReducer,
  // settlementsReducer: SettlementsReducer,
  // viewModal: viewModalReducer,
  // trackCollections: TrackCollectionsReducer,
  // requestsReceived: RequestsReceivedReducer,
  // addGiban: AddGibanReducer,
  // payTax: PayTaxReducer,
  // transactionChargesManagement: BusinessTransactionChargesReducer,
  // workflowList: WorkflowListReducer,
  // bulkPayment: BulkPaymentReducer,
  // collectPayment: CollectPaymentReducer,
  // bulkCollection: BulkCollectionReducer,
  // addBankAccount: AddBankAccountReducer,
  // paymentLimits: PaymentLimitsReducer,
  // acceptRequestFormModal: AcceptRequestFormModalReducer,
  // vendorMakePayment: VendorMakePayment,
  resetPassword: ResetPasswordReducer,
  // promoBanner: PromoBannerReducer,
  // riskHistoryPopup: RiskHistoryPopupReducer,
  // checkout: CheckoutReducer,
  // radioPrompt: radioPromptReducer,
  // approveRejectMinimumCharges: ApproveRejectMinimumChargesReducer,
  // viewColumns: viewColumnReducer,
  // uploadDocumentPrompt: UploadDocumentPromptReducer,
  // transactionSummary: TransactionSummaryReducer,
  // vendorSubscription: VendorSubscriptionReducer,
  // propertyMaster: PropertyReducer,
  // tenantMaster: TenantReducer,
  // rentReducer: RentReducer,
  // tenantRentPayment: TenantRentPaymentReducer,
});

// Clearing the store on user logout
const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    // for all keys defined in your persistConfig(s)
    storage.removeItem('persist:root');
    // storage.removeItem('persist:otherKey')

    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
