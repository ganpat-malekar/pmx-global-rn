import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Popover,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import MUIDataTable from 'mui-datatables';

import EventIcon from '@mui/icons-material/Event';
import lodash from 'lodash';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import moment from 'moment';
import _ from 'underscore';
import BookAppointmentModal from './Actions/BookAppointmentModal';
import ViewVendorInformation from './Actions/ViewVendorInformation';

import {
  FilterButtons,
  TableLoaderSkeleton,
  ToggleAccountNo,
} from '@paymate/common/components';
import { config } from '@paymate/common/config';
import {
  decryptAES,
  exportData,
  htmlActionExtractor,
  menuPropsTopCorner,
  tableColumnOptions,
  useSimpleReactValidator,
  validatorRules,
} from '@paymate/common/helpers';
import {
  closeConfirmPrompt,
  closeRadioPrompt,
  closeRemarkPrompt,
  deleteVendorInfo,
  emailVendor,
  exportDataFromFilter,
  flushDataToExport,
  getBusinessList,
  getCompaniesByBusiness,
  getContactList_new,
  getContactType,
  getStatusCodesList,
  manageVendor,
  openBookAppointmentModal,
  openConfirmPrompt,
  openDeactivateDialogFn,
  openRadioPrompt,
  openRemarkPrompt,
  openViewVendorDialogFn,
  rejectVendorKYC,
  resetRefresh,
  sendEmail,
  submitBookKycAppointment,
  updateAcquireStatus,
  viewVendorInfo,
} from '@paymate/common/store/actions';
import { formUseStyles } from '@paymate/common/style';

import filterIcon from '@paymate/common/assets/filterIcon.svg';
import { useNavigate } from 'react-router-dom';

// import AssignToKycDialog from '../ManageBusinesses/Actions/AssignToKycDialog';

const _initialFilters = {
  business: '',
  company: '',
  company_status: '',
  document_status: '',
  contact_type: '',
  email: '',
  CompanyId: '',
  ContactTypeId: '',
  EmailId: '',
  KycStatus: '',
  Status: '',
  reference_code: '',
};

function ManageContacts(props) {
  const classes = formUseStyles();
  const [openFilter, setOpenFilter] = React.useState(false);
  const resettingRef = React.useRef(true);
  const [page, setPage] = React.useState(1);
  const [sorting, setSorting] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [transaction_date, setDates] = React.useState([null, null]);
  const [chipData, setChipData] = React.useState([]);
  const [anchorElForMenu, setAnchorElForMenu] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorElForMenu);

  /**Filter Section Start */
  const [filter, updateFilter] = useState({
    ..._initialFilters,
  });

  // Chip Data Starts
  const deleteFilterChip = (chipToBeDeleted) => () => {
    resettingRef.current = true;
    updateFilter({
      ...filter,
      [chipToBeDeleted.name]: '',
    });
    if (chipToBeDeleted.name === 'transaction_date') {
      setDates([null, null]);
    }
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToBeDeleted.key)
    );
  };

  const handleExportMenuClick = (fileType) => () => {
    var data = {
      ClientId: filter.company.ClientId,
      CompanyId: filter.business.id,
      // CompanyStatus: filter.company_status,
      ContactTypeId: filter.contact_type,
      // TODO: check the node
      ReferenceCode: filter.reference_code,
      EmailId: filter.email,
      KycStatus: filter.document_status,
      Status: filter.company_status,
      FromDate:
        transaction_date[0] === null
          ? ''
          : moment(transaction_date[0]).format('DD/MM/YYYY'),
      ToDate:
        transaction_date[0] === null
          ? ''
          : moment(transaction_date[1]).format('DD/MM/YYYY'),
    };
    var filename =
      fileType === 'XLS' ? 'ManageContacts.xlsx' : 'ManageContacts.csv';
    const apiToExportData = config.FETCH_VENDOR_CONFIGURATION_DETAILS;
    props.exportDataFromFilter(data, filename, apiToExportData);
  };
  /**Export Section End */

  // VALIDATORS
  const [validator, forceUpdate] = useSimpleReactValidator({
    autoForceUpdate: true,
    validators: { ...validatorRules },
  });

  const handleFilter = (event) => {
    updateFilter({
      ...filter,
      [event.target.name]: event.target.value,
    });
  };

  const onClear = () => {
    resettingRef.current = true;
    setChipData([]);
    setOpenFilter(true);
    updateFilter({ ..._initialFilters });
    setDates([null, null]);
    setPage(1);
  };

  const onApply = () => {
    if (validator.allValid()) {
      setPage(1);
      resettingRef.current = true;
      setChipData([]);
      let data = { ...filter };
      let count = 0;
      let new_chip_data = [];
      for (let key in data) {
        if (data[key]) {
          if (key === 'business') {
            new_chip_data[count] = {
              key: count,
              name: key,
              label: props.businessList.find(
                (item) => item.id === data.business.id
              )?.label,
            };
          } else if (key === 'company') {
            new_chip_data[count] = {
              key: count,
              name: key,
              label: props.companyList.find(
                (item) => item.ClientId === data.company.ClientId
              )?.ClientAgencyName,
            };
          } else if (key === 'company_status') {
            new_chip_data[count] = {
              key: count,
              name: key,
              label: props.statusCodesLists.VendorCompanyStatus.find(
                (e) => e.StatusCode === data.company_status
              )?.StatusText,
            };
          } else if (key === 'document_status') {
            new_chip_data[count] = {
              key: count,
              name: key,
              label: props.statusCodesLists.VendorKycStatus.find(
                (e) => e.StatusCode === data.document_status
              )?.StatusText,
            };
          } else if (key === 'contact_type') {
            new_chip_data[count] = {
              key: count,
              name: key,
              label: props.contactTypeList.find(
                (e) => e.DetailId === data.contact_type
              )?.CodeName,
            };
          } else if (key === 'reference_code') {
            new_chip_data[count] = {
              key: count,
              name: key,
              label: data[key],
            };
          } else if (key === 'email') {
            new_chip_data[count] = {
              key: count,
              name: key,
              label: data[key],
            };
          } else {
            new_chip_data[count] = {
              key: count,
              name: key,
              label: data[key],
            };
          }
          count++;
        }
      }
      if (transaction_date.some((e) => e !== null)) {
        new_chip_data[count] = {
          key: count,
          name: 'transaction_date',
          label: `${moment(transaction_date[0]).format(
            'DD/MM/YYYY'
          )} - ${moment(transaction_date[1]).format('DD/MM/YYYY')}`,
        };
      }
      setChipData([...new_chip_data]);
      updateFilter({
        ...filter,
      });
      setOpenFilter(false);
    } else {
      validator.showMessages();
    }
  };

  // Code for New Filter UI
  const handleFilterClose = () => {
    setOpenFilter(false);
    setAnchorElForMenu(null);
  };
  const handleFilterButton = (event) => {
    setOpenFilter(true);
    setAnchorElForMenu(event.currentTarget);
  };
  /**Filter Section End */

  /*Initial Loading*/
  useEffect(() => {
    if (resettingRef.current || props.refresh) {
      resettingRef.current = false;
      var data = {
        ClientId: filter.company.ClientId,
        CompanyId: filter.business.id,
        // CompanyStatus: filter.company_status,
        ContactTypeId: filter.contact_type,
        // TODO: check the node
        ReferenceCode: filter.reference_code,
        EmailId: filter.email,
        KycStatus: filter.document_status,
        Status: filter.company_status,
        FromDate:
          transaction_date[0] === null
            ? ''
            : moment(transaction_date[0]).format('DD/MM/YYYY'),
        ToDate:
          transaction_date[0] === null
            ? ''
            : moment(transaction_date[1]).format('DD/MM/YYYY'),
        SortExpression: sorting,
        FromRecord: rowsPerPage * (page - 1),
        ToRecord: rowsPerPage * (page - 1) + rowsPerPage,
        PageNumber: page,
        PageSize: rowsPerPage,
      };
      props.getContactList_new(data);
      props.resetRefresh();
    }
  }, [filter, page, rowsPerPage, sorting, chipData, props.refresh]);
  /*Initial Loading*/

  useEffect(() => {
    props.getBusinessList();
    props.getContactType();
    props.getStatusCodesList({
      ReportName: 'VendorKycStatus',
      RoleType: 'internal',
    });
    props.getStatusCodesList({
      ReportName: 'VendorCompanyStatus',
      RoleType: 'internal',
    });
  }, []);

  useEffect(() => {
    if (filter.business !== '') {
      props.getCompaniesByBusiness({
        CompanyId: filter.business.id,
      });
    }
  }, [filter.business]);

  /*Export Data*/
  useEffect(() => {
    if (!_.isEmpty(props.exportFiles.data)) {
      var filename = props.exportFiles.filename;
      var data = props.exportFiles.data.map((event, index) => {
        return {
          'Business Name': event.CompanyName,
          XpressID: event.ClientRelationShipNo,
          'Company Name': event.DisplayCompanyName,
          'Reference Code': event.BasicInformation.AgencyCode,
          'Contact Person': event.BasicInformation.ContactPerson,
          'Email ID': event.Email,
          'Mobile No': event.BasicInformation.ClientMobileNo,
          'Contact Type': event.BasicInformation.TypeOfContact,
          Category: event.BasicInformation.CategoryName,
          'Sub Category': event.BasicInformation.SubCategoryName,
          'Company Type': event.BasicInformation.CompanyType,
          Country: event.BasicInformation.CountryName,
          'Company Status': event.VendorStatus,
          'KYC Status': event.DocumentStatus,
          'Acquire Status': event.AcqStatus,
          'AML Status': event.AmlStatus,
          'Registration Date': event.BasicInformation.TermsAcceptance,
          'Registered By': event.BasicInformation.ClientAgencyName,
        };
      });

      exportData(data, filename);
      setOpenFilter(false);
      props.flushDataToExport();
    }
  }, [props.exportFiles.data]);
  /*Export Data*/

  const handleVendorView = (popupState, ClientId, viewOnly) => () => {
    var data = {
      ClientId: ClientId,
    };
    props.viewVendorInfo(data, viewOnly);
    props.openViewVendorDialogFn();
    popupState.close();
  };

  const handleEdit = (popupState, ClientId) => {
    navigate(`/App/EditContact/${ClientId}`);
    popupState.close();
  };

  const handleOpenConfirmPrompt =
    (popupState, title, promptText, ClientId) => () => {
      const apiData = {
        ClientId,
        Crid: 0,
        Status: 0,
        XpressId: null,
      };
      const payload = {
        title,
        promptText,
        isPromptOpen: true,
        closePrompt: props.closeConfirmPrompt,
        apiData: { ...apiData },
        submitToApi: props.deleteVendorInfo,
      };

      props.openConfirmPrompt(payload);
      popupState.close();
    };

  const handleOpenRemarkPrompt =
    (popupState, title, ClientId, Crid, UploadedBy, Status) => () => {
      const apiData = {
        ClientId,
        Crid,
        Documentstatus: 0,
        Status,
        UploadedBy,
      };

      const payload = {
        title,
        isPromptOpen: true,
        closePrompt: props.closeRemarkPrompt,
        apiData: { ...apiData },
        submitToApi: props.manageVendor,
      };

      props.openRemarkPrompt(payload);
      popupState.close();
    };

  const handleAcceptKYC = (popupState, ClientId, Crid) => {
    const payload = {
      ClientId,
      Crid,
      Status: 12,
      type: 'kyc',
    };

    props.updateAcquireStatus(payload);
    popupState.close();
  };

  const handleRejectKYC = (popupState, ClientId, Crid) => {
    const apiData = {
      ClientId,
      Crid,
      Status: 6,
    };

    const remarkPromptPayload = {
      title: 'Reject KYC Request',
      isPromptOpen: true,
      closePrompt: props.closeRemarkPrompt,
      apiData: { ...apiData },
      submitToApi: props.rejectVendorKYC,
    };

    props.openRemarkPrompt(remarkPromptPayload);
    popupState.close();
  };

  const handleBookAppointment = (popupState, ClientId, Crid) => {
    const apiData = {
      ClientId,
      Crid,
    };

    const payloadForDialog = {
      isPromptOpen: true,
      apiData: { ...apiData },
      submitToApi: props.submitBookKycAppointment,
    };

    props.openBookAppointmentModal(payloadForDialog);
    popupState.close();
  };

  const handleActivateVendor =
    (popupState, ClientId, Crid, UploadedBy, Status) => () => {
      const data = {
        ClientId,
        Crid,
        UploadedBy,
        Status,
        Documentstatus: 0, // fixed
        Remarks: null,
      };

      props.manageVendor(data);
      popupState.close();
    };

  const handleDeactivateVendor =
    (popupState, ClientId, Crid, UploadedBy, ClientAgencyName) => () => {
      const data = {
        ClientId,
        Crid,
        UploadedBy,
        ClientAgencyName,
      };

      props.openDeactivateDialogFn(data);
      popupState.close();
    };

  const handleSendEmail = (popupState, ClientId, Type) => () => {
    const data = {
      ClientId,
    };

    if (Type) {
      data.Type = Type;
      props.sendEmail(data);
    } else {
      props.emailVendor(data);
    }

    popupState.close();
  };

  const handleOpenAssignToKycDialog =
    (popupState, companyId, CompanyCrid, ClientId) => () => {
      const data = {
        isPromptOpen: true,
        closePrompt: props.closeRadioPrompt,
        companyId,
        CompanyCrid,
        ClientId,
      };
      props.openRadioPrompt(data);
      popupState.close();
    };

  const handleKycVerificationView = (crid) => () => {
    props.history.push('/App/KycVerification/' + crid, {
      screenName: 'ManageContact',
    });
  };

  const updateAcquireStatus = (popupState, ClientId, Crid, Status, title) => {
    const apiData = {
      ClientId,
      Crid,
      Status, //hardcoded
      type: 'kyc', //hardcoded
    };

    const remarkPromptPayload = {
      title,
      isPromptOpen: true,
      closePrompt: props.closeRemarkPrompt,
      apiData: { ...apiData },
      submitToApi: props.updateAcquireStatus,
    };

    props.openRemarkPrompt(remarkPromptPayload);
    popupState.close();
  };

  const columns = [
    {
      name: 'CompanyName',
      label: 'Business Name',
      options: {
        ...tableColumnOptions,
        sorting,
        display: props?.tokenData?.UserType === 'Admin',
      },
    },
    {
      name: 'ClientRelationShipNo',
      label: 'XpressId',
      options: { ...tableColumnOptions, sorting },
    },
    {
      name: 'actioncompanyname',
      label: 'Company Name',
      options: { ...tableColumnOptions, sorting },
    },
    {
      name: 'AgencyCode',
      label: 'Reference Code',
      options: { ...tableColumnOptions, sorting },
    },
    {
      name: 'ContactPerson',
      label: 'Contact Person',
      options: {
        ...tableColumnOptions,
        sorting,
        display: props?.regionCode === 'aed',
      },
    },
    {
      name: 'VendorMobileNumber',
      label: 'Mobile No',
      options: {
        ...tableColumnOptions,
        sorting,
        display: props?.regionCode === 'aed',
      },
    },
    {
      name: 'AccountNo',
      label: 'Account No',
      options: {
        ...tableColumnOptions,
        sorting,
        display: props?.regionCode !== 'aed',
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <ToggleAccountNo
              hashedAccountNo={value[0]}
              accountNo={value[1]}
              classes={classes}
            />
          );
        },
      },
    },
    {
      name: 'BSBCode',
      label: 'BSB Code',
      options: {
        ...tableColumnOptions,
        sorting,
        display: props?.regionCode === 'aud',
      },
    },
    {
      name: 'SwiftCode',
      label: 'SwiftCode / BIC Code',
      options: {
        ...tableColumnOptions,
        sorting,
        display: props?.regionCode === 'myr' || 'sgd',
      },
    },
    {
      name: 'VendorEmailID',
      label: 'Email Address',
      options: { ...tableColumnOptions, sorting },
    },
    {
      name: 'ContactType',
      label: 'Contact Type',
      options: { ...tableColumnOptions, sorting },
    },
    {
      name: 'ContactKycStatus',
      label: 'Document Status',
      options: {
        ...tableColumnOptions,
        sorting,
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value[1].indexOf('onclick') !== -1) {
            return (
              <Tooltip title="Verify KYC">
                <div
                  onClick={handleKycVerificationView(value[2])}
                  className={classes.CustomLink}
                >
                  {value[0]}
                </div>
              </Tooltip>
            );
          } else {
            return <div>{value[0]}</div>;
          }
        },
        // customHeadLabelRender: ({ index, ...column }) => {
        //   return (
        //     <span>
        //       {column.label} <FaSort />
        //     </span>
        //   );
        // },
      },
    },
    {
      name: 'status',
      label: 'Company Status',
      options: { ...tableColumnOptions, sorting },
    },
    {
      name: 'AmlStatus',
      label: 'AML Status',
      options: {
        ...tableColumnOptions,
        sorting,
        display: props?.regionCode === 'aed',
      },
    },
    {
      name: 'CreatedOn',
      label: 'Registration Date',
      options: { ...tableColumnOptions, sorting },
    },
    {
      name: 'Actions',
      label: 'Actions',
      options: {
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div
              style={{
                textAlign: 'center',
                display:
                  value[0] === null || value[0] === '' ? 'none' : 'block',
              }}
            >
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <IconButton size="small" {...bindTrigger(popupState)}>
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                    <Menu
                      className={classes.NewMenuDropDown}
                      PaperProps={menuPropsTopCorner}
                      {...bindMenu(popupState)}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      {/**View vendor information */}
                      <MenuItem
                        style={{
                          display: value[0].includes('view vendor information')
                            ? 'flex'
                            : 'none',
                        }}
                        onClick={handleVendorView(popupState, value[1], true)}
                      >
                        <Typography textAlign="center">
                          View vendor information
                        </Typography>
                      </MenuItem>
                      {/**Edit vendor */}
                      <MenuItem
                        style={{
                          display: value[0]?.includes('edit vendor')
                            ? 'flex'
                            : 'none',
                        }}
                        onClick={() => {
                          handleEdit(popupState, value[1]);
                        }}
                      >
                        <Typography textAlign="center">Edit vendor</Typography>
                      </MenuItem>
                      {/**Delete vendor */}
                      <MenuItem
                        style={{
                          display: value[0]?.includes('delete vendor')
                            ? 'flex'
                            : 'none',
                        }}
                        onClick={handleOpenConfirmPrompt(
                          popupState,
                          'Delete Vendor Configuration',
                          'delete this vendor?',
                          value[1]
                        )}
                      >
                        <Typography textAlign="center">
                          Delete vendor
                        </Typography>
                      </MenuItem>
                      {/**Activate vendor */}
                      <MenuItem
                        style={{
                          display: value[0]?.includes('Activate Vendor')
                            ? 'flex'
                            : 'none',
                        }}
                        // onClick={handleActivateVendor(
                        //   popupState,
                        //   value[1], // ClientId
                        //   value[2], // Crid
                        //   value[3], // UploadedBy
                        //   1 // Status
                        // )}
                      >
                        <Typography textAlign="center">
                          Activate Vendor
                        </Typography>
                      </MenuItem>
                      {/**Deactivate vendor */}
                      <MenuItem
                        style={{
                          display: value[0]?.includes('Deactivate Vendor')
                            ? 'flex'
                            : 'none',
                        }}
                        // onClick={handleOpenRemarkPrompt(
                        //   popupState,
                        //   'Deactivate Vendor Confirmation',
                        //   value[1], // ClientId
                        //   value[2], // Crid
                        //   value[3], // UploadedBy
                        //   10 // 10 is fixed, for deactivate
                        // )}
                      >
                        <Typography textAlign="center">
                          Deactivate Vendor
                        </Typography>
                      </MenuItem>
                      {/**Approve/Reject vendor */}
                      <MenuItem
                        style={{
                          display: value[0].includes('approve vendor')
                            ? 'flex'
                            : 'none',
                        }}
                        // onClick={handleVendorView(popupState, value[1], false)}
                      >
                        <Typography textAlign="center">
                          Approve/Reject vendor
                        </Typography>
                      </MenuItem>
                      {/**Approve/Reject bank account */}
                      <MenuItem
                        style={{
                          display: value[0].includes(
                            'approve bank account details'
                          )
                            ? 'flex'
                            : 'none',
                        }}
                        // onClick={handleVendorView(popupState, value[1], false)}
                      >
                        <Typography textAlign="center">
                          Approve/Reject bank account
                        </Typography>
                      </MenuItem>
                      {/**Resend mail to vendor */}
                      <MenuItem
                        style={{
                          display: value[0].includes('resend mail to vendor')
                            ? 'flex'
                            : 'none',
                        }}
                        // onClick={handleSendEmail(popupState, value[1])}
                      >
                        <Typography textAlign="center">
                          Resend mail to vendor
                        </Typography>
                      </MenuItem>
                      {/**Resend mail to cat team */}
                      <MenuItem
                        style={{
                          display: value[0].includes('resend mail to cat team')
                            ? 'flex'
                            : 'none',
                        }}
                        // onClick={handleSendEmail(
                        //   popupState,
                        //   value[1],
                        //   'InfoToCATForVendorKycUploaded'
                        // )}
                      >
                        <Typography textAlign="center">
                          Resend mail to cat team
                        </Typography>
                      </MenuItem>
                      {/**Request for document */}
                      <MenuItem
                        style={{
                          display: value[0].includes('request for document')
                            ? 'flex'
                            : 'none',
                        }}
                        // onClick={handleSendEmail(popupState, value[1], true)}
                      >
                        <Typography textAlign="center">
                          Request for document
                        </Typography>
                      </MenuItem>
                      {/**Upload documents */}
                      <MenuItem
                        style={{
                          display: value[0].includes('upload documents')
                            ? 'flex'
                            : 'none',
                        }}
                        // onClick={
                        //   () => {
                        //     props.history.push(
                        //       '/App/KycDocument/UploadDocuments/' + value[2]
                        //     );
                        //   }
                        // handleSendEmail(
                        //   popupState,
                        //   value[1],
                        //   "kycRejectlist"
                        // )
                        // }
                      >
                        <Typography textAlign="center">
                          Upload documents
                        </Typography>
                      </MenuItem>
                      {/**Assign to KYC team */}
                      <MenuItem
                        style={{
                          display: value[0].includes('assign to kyc team')
                            ? 'flex'
                            : 'none',
                        }}
                        // onClick={handleOpenAssignToKycDialog(
                        //   popupState,
                        //   value[5], //companyId
                        //   value[2], //crid
                        //   value[1] //client id
                        // )}
                      >
                        <Typography textAlign="center">
                          Assign to kyc team
                        </Typography>
                      </MenuItem>
                      {/**Accept KYC */}
                      <MenuItem
                        style={{
                          display: value[0].includes('accept kyc request')
                            ? 'flex'
                            : 'none',
                        }}
                        // onClick={() =>
                        //   handleAcceptKYC(popupState, value[1], value[2])
                        // }
                      >
                        <Typography textAlign="center">
                          Accept Kyc request
                        </Typography>
                      </MenuItem>
                      {/**Reject KYC */}
                      <MenuItem
                        style={{
                          display: value[0].includes('reject kyc request')
                            ? 'flex'
                            : 'none',
                        }}
                        // onClick={() =>
                        //   handleRejectKYC(popupState, value[1], value[2])
                        // }
                      >
                        <Typography textAlign="center">
                          Reject Kyc request
                        </Typography>
                      </MenuItem>
                      {/**Book An Appointment */}
                      <MenuItem
                        style={{
                          display: value[0].includes('book appointment')
                            ? 'flex'
                            : 'none',
                        }}
                        // onClick={() =>
                        //   handleBookAppointment(popupState, value[1], value[2])
                        // }
                      >
                        <Typography textAlign="center">
                          Book Appointment
                        </Typography>
                      </MenuItem>

                      {/* On Hold */}
                      <MenuItem
                        style={{
                          display: value[0].includes('on hold')
                            ? 'flex'
                            : 'none',
                        }}
                        // onClick={() =>
                        //   updateAcquireStatus(
                        //     popupState,
                        //     value[1], //ClientId
                        //     value[2], //Crid
                        //     14, //status
                        //     // check the title of the modal in the old site
                        //     'Set Vendor On Hold' //title
                        //   )
                        // }
                      >
                        <Typography textAlign="center">On Hold</Typography>
                      </MenuItem>

                      {/* Release document */}
                      <MenuItem
                        style={{
                          display: value[0].includes('release document')
                            ? 'flex'
                            : 'none',
                        }}
                        // onClick={() =>
                        //   updateAcquireStatus(
                        //     popupState,
                        //     value[1], //ClientId
                        //     value[2], //Crid
                        //     13, //status
                        //     // check the title of the modal in the old site
                        //     'Release Document' //title
                        //   )
                        // }
                      >
                        <Typography textAlign="center">
                          Release document
                        </Typography>
                      </MenuItem>

                      {/* Send KYC Rejection Mail */}
                      <MenuItem
                        style={{
                          display: value[0].includes('send kyc rejection mail')
                            ? 'flex'
                            : 'none',
                        }}
                        // onClick={handleSendEmail(
                        //   popupState,
                        //   value[1],
                        //   'kycRejectlist'
                        // )}
                      >
                        <Typography textAlign="center">
                          Send KYC Rejection Mail
                        </Typography>
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </div>
          );
        },
        customHeadLabelRender: ({ index, ...column }) => {
          return <span>{column.label}</span>;
        },
      },
    },
  ];

  const options = {
    elevation: 0,
    responsive: 'standard',
    rowHover: true,
    filter: false,
    print: false,
    page: page - 1,
    search: false,
    viewColumns: false,
    selectableRows: 'none',
    count: _.has(props.contactList, 'TotalRecords')
      ? Number(props.contactList.TotalRecords)
      : 0,
    rowsPerPage: rowsPerPage,
    serverSide: true,
    rowsPerPageOptions: [10, 15, 20],
    onTableChange: (action, tableState) => {
      if (tableState.activeColumn === 0) {
      }
      switch (action) {
        case 'changePage':
          changePage(tableState.page, tableState.sortOrder);
          break;
        case 'changeRowsPerPage':
          changeRowPerPage(tableState.rowsPerPage);
          break;
        case 'sort':
          changeSorting(
            tableState.sortOrder.name,
            tableState.sortOrder.direction
          );
          break;
        default:
      }
    },
  };

  const changePage = (page) => {
    resettingRef.current = true;
    setPage(page + 1);
  };

  const changeRowPerPage = (rows) => {
    resettingRef.current = true;
    setPage(1);
    setRowsPerPage(rows);
  };

  const changeSorting = (columnName, sortOrder) => {
    setPage(1);
    resettingRef.current = true;
    setSorting(columnName + ' ' + sortOrder);
  };

  return (
    <div>
      <BookAppointmentModal />
      <ViewVendorInformation />
      {/* <AssignToKycDialog
        {...{ ...props.radioPromptData, screenName: 'ManageContact' }}
      /> */}
      <div className={classes.TopBar}>
        <div>
          <Typography variant="h5">Manage Business Contacts</Typography>
        </div>
      </div>

      {props.apiStatus === null ? (
        <TableLoaderSkeleton numberOfBones={4} />
      ) : (
        <>
          {/* NEW CODE FOR THE FILTER SECTION */}
          <Box>
            <div className={classes.TopBarFilterSection}>
              {/* <div id="TopBarCards">
                <Card id="TopBarCardDetails">
                  <CardContent>
                    <Typography id="TopBarCardDetailsText">
                      {" "}
                      Total Records{" "}
                    </Typography>
                    <Typography id="TopBarCardDetailsValue">
                      {options.count}
                    </Typography>
                  </CardContent>
                </Card>
                <Card id="TopBarCardDetails">
                  <CardContent>
                    <Typography id="TopBarCardDetailsText">
                      {" "}
                      Total Amount{" "}
                    </Typography>
                    <Typography id="TopBarCardDetailsValue">
                      {" "}
                      ₹6,39,564.23{" "}
                    </Typography>
                  </CardContent>
                </Card>
              </div> */}
              <div className={classes.TopBarFilterOptions}>
                {chipData.length ? (
                  <div id="TopBarFilterChips">
                    {chipData.map((data) => {
                      return (
                        <li key={data.key}>
                          <Chip
                            label={
                              <Typography>
                                {`${lodash.startCase(data.name)} : `}
                                <span>{data.label}</span>
                              </Typography>
                            }
                            onDelete={deleteFilterChip(data)}
                            id="TopBarChipDetails"
                            className={classes.TopBarChipDetails}
                          />
                        </li>
                      );
                    })}
                  </div>
                ) : (
                  <div id="TopBarFilterChips"></div>
                )}
                <div className={classes.TopBarFilter}>
                  <Button
                    variant="outlined"
                    onClick={handleFilterButton}
                    id="filter-button"
                    aria-controls={open ? 'filter-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <img alt="" src={filterIcon} id="filterButtonIcon" />
                    Filter
                  </Button>
                </div>
              </div>
            </div>
            <Popover
              id="filter-menu"
              anchorEl={anchorElForMenu}
              open={openFilter}
              onClose={handleFilterClose}
            >
              <div className={classes.TopBarFilterSectionMenu}>
                <div id="TopBarFilterSectionHeader">
                  <Typography variant="h6" color="rgba(0,0,0,0.87)">
                    Filter
                  </Typography>
                  <IconButton
                    onClick={handleFilterClose}
                    height="24px"
                    width="12px"
                  >
                    <CloseIcon color="primary" />
                  </IconButton>
                </div>
                <div id="TopBarFilterSectionContent">
                  <Grid item container lg={12} md={12} xs={12} spacing={4}>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <Autocomplete
                        disablePortal
                        id="business"
                        name="business"
                        value={filter.business}
                        onChange={(event, value) => {
                          updateFilter({
                            ...filter,
                            business: !_.isEmpty(value) ? value : '',
                          });
                        }}
                        options={props.businessList}
                        renderInput={(params) => (
                          <TextField {...params} label="Enter Business Name" />
                        )}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          id="company"
                          select
                          value={filter.company}
                          label="All Companies"
                          name="company"
                          variant="outlined"
                          onChange={handleFilter}
                        >
                          {!_.isEmpty(props.companyList) ? (
                            [
                              <MenuItem value="">Select Option</MenuItem>,
                              ...props.companyList.map((item, index) => {
                                return (
                                  <MenuItem key={index} value={item}>
                                    {item.ClientAgencyName}
                                  </MenuItem>
                                );
                              }),
                            ]
                          ) : (
                            <MenuItem disabled>No options</MenuItem>
                          )}
                        </TextField>
                      </FormControl>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          id="company_status"
                          select
                          value={filter.company_status}
                          label="Company Status"
                          name="company_status"
                          variant="outlined"
                          onChange={handleFilter}
                        >
                          {!_.isEmpty(
                            props.statusCodesLists.VendorCompanyStatus
                          ) ? (
                            props.statusCodesLists.VendorCompanyStatus.map(
                              (item, index) => {
                                return (
                                  <MenuItem key={index} value={item.StatusCode}>
                                    {item.StatusText}
                                  </MenuItem>
                                );
                              }
                            )
                          ) : (
                            <MenuItem disabled>No options</MenuItem>
                          )}
                        </TextField>
                      </FormControl>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          id="document_status"
                          select
                          value={filter.document_status}
                          label="Document Status"
                          name="document_status"
                          variant="outlined"
                          onChange={handleFilter}
                        >
                          {!_.isEmpty(props.statusCodesLists)
                            .VendorKycStatus ? (
                            props.statusCodesLists.VendorKycStatus.map(
                              (item, index) => {
                                return (
                                  <MenuItem key={index} value={item.StatusCode}>
                                    {item.StatusText}
                                  </MenuItem>
                                );
                              }
                            )
                          ) : (
                            <MenuItem disabled>No options</MenuItem>
                          )}
                        </TextField>
                      </FormControl>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          id="contact_type"
                          select
                          value={filter.contact_type}
                          label="Contact Type"
                          name="contact_type"
                          variant="outlined"
                          onChange={handleFilter}
                        >
                          {!_.isEmpty(props.contactTypeList) ? (
                            props.contactTypeList.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item.DetailId}>
                                  {item.CodeName}
                                </MenuItem>
                              );
                            })
                          ) : (
                            <MenuItem disabled>No options</MenuItem>
                          )}
                        </TextField>
                      </FormControl>
                    </Grid>
                    {props.regionCode !== 'aed' && (
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <FormControl fullWidth>
                          <TextField
                            label="Reference Code"
                            name="reference_code"
                            id="reference_code"
                            variant="outlined"
                            value={filter.reference_code}
                            onChange={handleFilter}
                          />
                        </FormControl>
                      </Grid>
                    )}
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          label="Email Address"
                          name="email"
                          id="email"
                          variant="outlined"
                          value={filter.email}
                          onChange={handleFilter}
                          inputProps={{
                            autoComplete: 'nope',
                            maxLength: '100',
                          }}
                          onBlur={() => {
                            validator.showMessageFor('Email');
                          }}
                          helperText={validator.message('Email', filter.email, [
                            '',
                            { max: 50 },
                          ])}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <FormControl fullWidth>
                          <MobileDatePicker
                            inputFormat="dd/MM/yyyy"
                            disableFuture
                            label="Start Date"
                            value={transaction_date[0]}
                            onChange={(newValue) => {
                              setDates([newValue, transaction_date[1]]);
                            }}
                            maxDate={new Date()}
                            renderInput={(params) => (
                              <TextField
                                fullWidth
                                variant="outlined"
                                {...params}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <EventIcon />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            )}
                          />
                        </FormControl>
                      </LocalizationProvider>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <FormControl fullWidth>
                          <MobileDatePicker
                            disabled={!transaction_date[0]}
                            inputFormat="dd/MM/yyyy"
                            disableFuture
                            label="End Date"
                            value={transaction_date[1]}
                            onChange={(newValue) => {
                              setDates([transaction_date[0], newValue]);
                            }}
                            maxDate={new Date()}
                            renderInput={(params) => (
                              <TextField
                                fullWidth
                                variant="outlined"
                                {...params}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <EventIcon />
                                    </InputAdornment>
                                  ),
                                }}
                                helperText={
                                  transaction_date[0] !== null
                                    ? validator.message(
                                        'end_date',
                                        transaction_date[1],
                                        'required'
                                      )
                                    : ''
                                }
                              />
                            )}
                          />
                        </FormControl>
                      </LocalizationProvider>
                    </Grid>
                    <Grid item lg={12} md={12} xs={12}>
                      <FilterButtons
                        {...{
                          onApply,
                          handleExportMenuClick,
                          onClear,
                        }}
                      ></FilterButtons>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Popover>
          </Box>

          {/* <div className={clsx(classes.DataTables, classes.DensePaddingTable)}> */}
          <div className={classes.NewDataTable}>
            <MUIDataTable
              data={
                !_.isEmpty(props.contactList) &&
                !_.isEmpty(props.contactList.Data)
                  ? props.contactList.Data.map((business, index) => {
                      return {
                        CompanyName: business.CompanyName,
                        ClientRelationShipNo:
                          business.BasicInformation.ClientRelationShipNo,
                        actioncompanyname:
                          business.BasicInformation.ClientAgencyName,
                        AgencyCode: business.BasicInformation.AgencyCode,
                        ContactPerson: business.BasicInformation.ContactPerson,
                        VendorMobileNumber:
                          business.BasicInformation.ClientMobileNo,
                        AccountNo: [
                          business.BankAccountInformation.HashAccountNo,
                          decryptAES(
                            business.BankAccountInformation.EncryptedAccountNo
                          ),
                          business.ClientId,
                        ],
                        // FIXME: which node to bind?
                        // BSBCode: business.BSBCode,
                        // SwiftCode: business.SwiftCode,
                        VendorEmailID: business.BasicInformation.ClientEmailId,
                        ContactType: business.BasicInformation.TypeOfContact,
                        ContactKycStatus: [
                          business.DocumentStatus,
                          business.DisplayCompanyName,
                          business.BasicInformation.Crid,
                        ],
                        status: business.VendorStatus,
                        AmlStatus: business.AmlStatus,
                        // AcquirerState: business.AcqStatus
                        // RegisteredDate: business.BasicInformation.CreatedDate,
                        CreatedOn: moment(business.CreatedOn).format(
                          'DD/MM/YYYY'
                        ),
                        Actions: [
                          htmlActionExtractor(business.Action),
                          business.BasicInformation.ClientId,
                          business.BasicInformation.Crid,
                          business.UploadedBy,
                          business.BasicInformation.ClientAgencyName,
                          business.CompanyId,
                        ],
                      };
                    })
                  : []
              }
              columns={columns}
              options={options}
            />
          </div>
        </>
      )}
    </div>
  );
}

ManageContacts.propTypes = {};

const mapStateToProps = (state) => ({
  contactList: state.manageContacts.contactList,
  apiStatus: _.has(state.manageContacts.contactList, 'Status')
    ? state.manageContacts.contactList.Status
    : null,
  businessList: state.dataLists.businessList,
  contactTypeList: state.manageContacts.contactTypeList,
  companyList: state.manageContacts.companyList,
  vendorsList: state.reportsReducer.vendorsList,
  exportFiles: state.exportFiles,
  statusCodesLists: state.dataLists.statusCodesList,
  refresh: state.datatables.refresh,
  tokenData: state.admin.tokenData,
  radioPromptData: state.radioPrompt,
  regionCode: state.admin.regionCode,
});

export default connect(mapStateToProps, {
  getBusinessList,
  getContactType,
  getCompaniesByBusiness,
  getContactList_new,
  viewVendorInfo,
  manageVendor,
  sendEmail,
  emailVendor,
  openViewVendorDialogFn,
  openDeactivateDialogFn,
  exportDataFromFilter,
  flushDataToExport,
  getStatusCodesList,
  resetRefresh,
  openConfirmPrompt,
  closeConfirmPrompt,
  deleteVendorInfo,
  openRemarkPrompt,
  closeRemarkPrompt,
  openRadioPrompt,
  closeRadioPrompt,
  updateAcquireStatus,
  rejectVendorKYC,
  submitBookKycAppointment,
  openBookAppointmentModal,
})(ManageContacts);
