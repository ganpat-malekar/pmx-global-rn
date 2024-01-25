import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const outerTheme = createTheme({
  palette: {
    //mode: "dark",
    primary: {
      light: '#63CCFF',
      main: '#47B6E7',
      contrastText: '#fff',
    },
    secondary: {
      main: '#075065',
    },
  },
  components: {
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: 0,
          display: 'block',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          '& .PrivatePickersSlideTransition-root': {
            minHeight: '230px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          fontSize: '14px',
          // marginRight: "24px !important",
          '&:hover': {
            boxShadow: 'none',
          },
        },
        outlined: {
          backgroundColor: '#fff',
          border: '1px solid rgba(0,0,0,0.12)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          opacity: '0 !important',
          display: 'none',
        },
      },
    },
    MUIDataTable: {
      styleOverrides: {
        paper: {
          borderBottomRightRadius: '4px !important',
          borderTopRightRadius: '0px !important',
          borderBottomLeftRadius: '4px !important',
          borderTopLeftRadius: '0px !important',
        },
      },
    },
    MUIDataTableToolbar: {
      styleOverrides: {
        root: {
          display: 'none !important',
        },
      },
    },
    MUIDataTableHeadRow: {
      styleOverrides: {
        root: {
          //borderBottom: "1px solid rgb(7 80 101 / 24%)",
          backgroundColor: 'rgb(23 183 233 / 14%)',
          // backgroundColor: "#9AE0FF",
          // borderTop: "1px solid #004D6F",
          // borderBottom: "1px solid #004D6F",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          // fontSize: "16px !important",
          color: '#1a1a1a !important',
          // color: "#3C3C3C !important",
          letterSpacing: 0,
          borderBottom: 'none',
          letterSpacing: '0.5px !important',
          // padding: "16px 4px 16px 0px !important",
          // "&:first-child": {
          //   padding: "16px 4px 16px 16px !important",
          // },
          // "&:last-child": {
          //   padding: "16px 16px 16px 4px !important",
          // },
        },
      },
    },
    MUIDataTableBodyRow: {
      styleOverrides: {
        root: {
          // backgroundColor: "#FFFFFF",
          // borderBottom: "1px solid #CFDCE2",
          '&:nth-child(even)': {
            backgroundColor: '#f5f5f5',
          },
          '&:hover': {
            backgroundColor: '#e1e1e1 !important',
            // backgroundColor: "rgba(71,182,231,0.04) !important",
          },
        },
      },
    },
    MUIDataTableHeadCell: {
      styleOverrides: {
        data: {
          //whiteSpace: "nowrap !important",
          '& svg': {
            marginBottom: '-1px !important',
          },
        },
        root: {
          color: '#004b62 !important',
          //padding: "0px !important",
          textTransform: 'capitalize !important',
          letterSpacing: '0.5px !important',
        },
        toolButton: {
          color: '#004b62 !important',
          //padding: "0px !important",
          //marginLeft: "0px !important",
          //justifyContent: "left !important",
          textTransform: 'capitalize !important',
          letterSpacing: '0.5px !important',
          fontSize: '12px !important',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
        fixedHeader: {
          backgroundColor: 'transparent !important',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        popper: {
          boxShadow:
            '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%) !important',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: '0px !important',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
          justifyContent: 'flex-start',
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          zIndex: 1100,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        filled: {
          color: '#212121',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& svg': {
            color: '#47B6E7',
          },
        },
        input: {
          caretColor: '#47B6E7',
          '&::file-selector-button': {
            display: 'none',
          },
        },
        notchedOutline: {
          borderColor: '#a2a2a2',
          borderWidth: '2px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        asterisk: {
          color: 'red',
        },
      },
    },
  },
});

export const useStyles = makeStyles((theme) => ({
  NoRecordsFoundText: {
    padding: '24px 24px',
    textAlign: 'center',
    '& p': {
      fontSize: '20px',
    },
  },
  FilterBar: {
    backgroundColor: '#DFEBFF',
    padding: '10px 15px',
    marginBottom: '',
    display: 'flex',
  },
  FilterBtn: {
    '& img': {
      width: '22px',
      transform: 'rotate(90deg)',
    },
  },
  SuccessAlert: {
    marginTop: '4rem',
    position: 'fixed',
    width: '100%',
    zIndex: 2000,
    display: 'block',
    opacity: 1,
    padding: '15px 48px',
    [theme.breakpoints.down('md')]: {
      padding: '15px 48px 15px 16px',
    },
    backgroundColor: '#D9F0DD',
    borderBottom: '4px solid #2B6C37',
    '& .MuiCardHeader-root': {
      padding: 0,
    },
    '& .MuiCardHeader-avatar': {
      marginRight: '8px',
      lineHeight: 0,
    },
    '& svg': {
      fontSize: '1.9rem',
      color: '#2B6C37',
    },
    '& .MuiCardHeader-content': {
      '& .MuiTypography-root': {
        color: '#1A1A1A',
        fontSize: '14px',
        letterSpacing: 0,
        fontWeight: 600,
      },
    },
  },
  DangerAlert: {
    marginTop: '4rem',
    position: 'fixed',
    width: '100%',
    zIndex: 2000,
    display: 'block',
    opacity: 1,
    padding: '15px 48px',
    [theme.breakpoints.down('md')]: {
      padding: '15px 48px 15px 16px',
    },
    backgroundColor: '#ffe4e4',
    borderBottom: '4px solid #b23535',
    '& .MuiCardHeader-root': {
      padding: 0,
    },
    '& .MuiCardHeader-avatar': {
      marginRight: '8px',
      lineHeight: 0,
    },
    '& svg': {
      fontSize: '1.9rem',
      color: '#b23535',
    },
    '& .MuiCardHeader-content': {
      '& .MuiTypography-root': {
        color: '#b23535',
        fontSize: '14px',
        letterSpacing: 0,
        fontWeight: 600,
      },
    },
  },
  WarningAlert: {
    marginTop: '4rem',
    position: 'fixed',
    width: '100%',
    zIndex: 2000,
    // animation: "scale-display 1s",
    // display: "block",
    padding: '15px 48px',
    [theme.breakpoints.down('md')]: {
      padding: '15px 48px 15px 16px',
    },
    backgroundColor: '#FFE7CE',
    borderBottom: '4px solid #954C00',
    '& .MuiCardHeader-root': {
      padding: 0,
    },
    '& .MuiCardHeader-avatar': {
      marginRight: '8px',
      lineHeight: 0,
    },
    '& svg': {
      fontSize: '1.9rem',
      color: '#753C00',
    },
    '& .MuiCardHeader-content': {
      '& .MuiTypography-root': {
        color: '#753C00',
        fontSize: '14px',
        letterSpacing: 0,
        fontWeight: 600,
      },
    },
  },
  DeleteDialog: {
    '& h4': {
      margin: 0,
      color: '#222222',
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '28px',
      letterSpacing: '-0.5px',
    },
    '& p': {
      color: '#222222',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '20px',
      letterSpacing: '0px',
    },
    '& svg': {
      marginBottom: '-5px',
      color: '#D50000',
    },
    '& .MuiDialog-paper': {
      borderRadius: 0,
      borderTop: '4px solid #D50000',
    },
  },
  hideAlert: {
    display: 'none',
  },
  NormalTable: {
    '& .MuiTableRow-root': {
      '&:nth-child(even)': {
        backgroundColor: '#f5f5f5',
      },
    },
    '& .MuiTableCell-alignLeft': {
      fontWeight: 500,
    },
    '& .MuiTableCell-root': {
      borderBottom: 'none',
      fontSize: '16px',
      '&:first-child': {
        padding: '16px 4px 16px 24px !important',
      },
      '&:last-child': {
        padding: '16px 24px 16px 4px !important',
      },
    },
  },
  NormalTable2: {
    '& .MuiTableRow-root': {
      '&:nth-child(odd)': {
        backgroundColor: '#f5f5f5',
      },
    },
    '& .MuiTableCell-alignLeft': {
      fontWeight: 500,
    },
    '& .MuiTableCell-root': {
      borderBottom: 'none',
      fontSize: '14px',
      '&:first-child': {
        padding: '16px 4px 16px 24px !important',
      },
      '&:last-child': {
        padding: '16px 24px 16px 4px !important',
      },
    },
  },
  NormalInnerTable: {
    marginBottom: '60px',
    '& .MuiTableRow-root': {
      '&:nth-child(even)': {
        backgroundColor: '#fff',
      },
    },
    '& .MuiTableRow-head': {
      //backgroundColor: "#f5f5f5",
      color: '#004b62 !important',
      borderBottom: '1px solid #e3e3e3',
    },

    '& .MuiTableCell-root': {
      borderBottom: '1px solid #e3e3e3',
      //borderBottom: "none",
      fontSize: '16px !important',
      '&:first-child': {
        padding: '16px 4px 16px 24px',
      },
      '&:last-child': {
        padding: '16px 24px 16px 4px',
      },
    },
  },
  TableBottomButtons: {
    padding: '16px 24px 0px 24px',
  },
  DetailTableContainer: {
    //borderTop: "1px solid #cacaca",
    //marginBottom: "60px",
  },
  DetailsTitleDiv: {
    backgroundColor: 'rgb(23 183 233 / 14%)',
    margin: '0',
    padding: '0px 24px 0px 12px',
    display: 'flex',
    alignItems: 'center',
    '& p': {
      fontSize: '16px',
      fontWeight: 600,
      color: '#004b62',
    },
  },
  DetailsTitleDiv2: {
    backgroundColor: 'rgb(23 183 233 / 14%)',
    margin: '0',
    padding: '0px 24px 0px 24px',
    display: 'flex',
    alignItems: 'center',
    '& p': {
      fontSize: '16px',
      fontWeight: 600,
      color: '#004b62',
    },
  },
  DetailsTitle: {
    backgroundColor: '#F1FAFD',
    fontSize: '20px',
    fontWeight: 500,
    color: '#004b62',
    margin: '0',
    padding: '25px 24px',
    '& svg': {
      cursor: 'pointer',
      marginBottom: '-5px',
      marginLeft: '5px',
      color: '#004283',
    },
  },
  DetailsTitle2: {
    backgroundColor: '#f6f6f6',
    fontSize: '16px',
    fontWeight: 500,
    color: 'rgba(0,0,0,0.87)',
    margin: '0',
    padding: '25px 24px',
  },
  DetailsTitle3: {
    //backgroundColor: "#f5f5f5",
    fontSize: '14px',
    fontWeight: 500,
    color: '#17B7E9',
    margin: '0',
    padding: '13px 24px',
  },
  ViewDialogTitle: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    '& h5': {
      fontWeight: '500',
      fontSize: '26px',
      letterSpacing: '-0.5px',
      color: '#4a4a4a',
      [theme.breakpoints.down('md')]: {
        fontSize: '20px',
      },
    },
  },
  ViewPageDialog: {
    //"& .MuiDialog-paper": { padding: "2% 0" },
    '& .MuiDialogContent-root': {
      padding: 0,
    },
    '& .MuiDialogTitle-root': {
      backgroundColor: '#f5f5f5',
      borderBottom: '1px solid #e4e4e4',
    },
    '& .MuiDialogActions-root': {
      backgroundColor: '#f5f5f5',
      borderTop: '1px solid #e4e4e4',
    },
  },

  first: {
    padding: '16px',
    display: 'flex',
  },
  last: {
    padding: '16px',
  },
  NewDeleteDialog: {
    '& .CustomDialogContainer-root': {
      display: 'flex',
    },
    '& .MuiDialogTitle-root': {
      paddingTop: '32px',
      paddingLeft: '20px',
      paddingBottom: '0px',
    },
    '& .MuiDialog-paper': {
      borderRadius: '4px',
    },
    '& .MuiDialogContent-root': {
      paddingTop: '14px',
      paddingLeft: '20px',
      paddingBotton: '0px',
    },
    '& .MuiDialogActions-root': {
      justifyContent: 'flex-start',
      paddingTop: '20px',
      paddingLeft: '20px',
      paddingBottom: '25px',
    },
    '& img': {
      paddingTop: '32px',
      paddingLeft: '24px',
    },
    '& h6': {
      fontSize: '18px',
    },
  },
  FileViewDialog: {
    '& .MuiPaper-root': {
      backgroundColor: 'rgb(0 0 0 / 35%)',
    },
    '& .MuiDialogContent-root': {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
    },
    '& img': {
      width: '100%',
    },
  },
  DialogsCSS: {
    '& #successDialog': {
      borderTop: '4px solid #000',
    },
    '& h5': {
      display: 'flex',
      alignItems: 'center',
      color: '#4a4a4a',
      fontSize: '24px',
      fontWeight: 500,
      '& svg': {
        fontSize: '30px',
        padding: '1%',
        marginRight: '14px',
        borderRadius: '4px',
      },
    },
    '& .MuiDialog-paper': {},
    '& .MuiDialogTitle-root': {
      backgroundColor: '#f5f5f5',
      borderBottom: '1px solid #e4e4e4',
    },
    '& .MuiDialogActions-root': {
      backgroundColor: '#f5f5f5',
      borderTop: '1px solid #e4e4e4',
    },
    '& .MuiDialogContent-root': {
      padding: '33px 24px 24px 24px !important',
      '& h6': {
        marginBottom: '2%',
        fontWeight: 400,
        fontSize: '1rem',
      },
    },
    '& #successSVG': {
      color: '#59a559',
      background: '#daffda',
      border: '1px solid #a8e2a8',
    },
    '& #errorSVG': {
      color: '#d30000',
      background: '#ffebeb',
      border: '1px solid #ffd7d7',
    },
    '& #infoSVG': {
      color: '#17b7e9',
      background: '#d5f5ff',
      border: '1px solid #aaebff',
    },
  },
  '@keyframes scale-display': {
    '0%': {
      opacity: 0,
      transform: 'scale(0)',
      '-webkit-transform': 'scale(0)',
    },
    '100%': {
      opacity: 1,
      transform: 'scale(1)',
      '-webkit-transform': 'scale(1)',
    },
  },
  PoweredText: {
    fontSize: '15px',
    margin: 0,
    fontWeight: 600,
    color: '#b2b2b2',
    textShadow: '0 1px 0 rgb(255 255 255 / 40%)',
  },
  TopBar: {
    width: '100%',
    padding: '2% 0 2% 0%',
    [theme.breakpoints.down('sm')]: { width: '100%', padding: '7% 0 7% 0%' },
    '& h5': {
      fontWeight: '500',
      // fontSize: "26px",
      fontSize: '30px',
      letterSpacing: '-0.5px',
      color: '#4a4a4a',
      [theme.breakpoints.down('md')]: {
        fontSize: '20px',
      },
    },
    '& p': {
      fontSize: '14px',
      // color: "#4a4a4a",
      marginTop: '10px',
      marginBottom: '0px',
      fontWeight: 500,
      color: 'rgba(0,0,0,0.6)',
      letterSpacing: '0.25px',
      lineHeight: '24px',
      [theme.breakpoints.down('md')]: {
        fontSize: '12px',
        fontWeight: 400,
      },
    },
    '& a': {
      paddingLeft: '7px',
      color: theme.palette.secondary.main,
    },
  },
}));

export const formUseStyles = makeStyles((theme) => ({
  TopBar: {
    width: '100%',
    padding: '2% 0 2% 0%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: '7% 0 7% 0%',
      display: 'block',
    },
    '& h5': {
      fontWeight: '500',
      // fontSize: "26px",
      fontSize: '30px',
      letterSpacing: '-0.5px',
      color: '#4a4a4a',
      [theme.breakpoints.down('md')]: {
        fontSize: '20px',
      },
    },
    '& p': {
      fontSize: '14px',
      // color: "#4a4a4a",
      marginTop: '10px',
      marginBottom: '0px',
      fontWeight: 500,
      color: 'rgba(0,0,0,0.6)',
      letterSpacing: '0.25px',
      lineHeight: '24px',
      [theme.breakpoints.down('md')]: {
        fontSize: '12px',
        fontWeight: 400,
      },
    },
    '& a': {
      paddingLeft: '7px',
      color: theme.palette.secondary.main,
    },
  },
  BackDiv: {
    paddingTop: '1%',
  },
  BackBtn: {
    margin: 0,
    padding: 0,
    fontSize: '14px',
    fontWeight: 600,
    color: '#075065',
    textTransform: 'capitalize',
  },
  heading: {
    // fontSize: "16px !important",
    fontSize: '20px !important',
    // color: "#075065 !important",
    color: '#3C3C3C !important',
    fontWeight: '500 !important',
  },
  MasterDetailsDiv: {
    width: '100%',
    [theme.breakpoints.down('md')]: { width: '100%' },
  },
  FormPanel: {
    position: 'relative',
    width: '100%',
    // padding: "4% 2%",
    padding: '25px 0',
  },
  FormPanel2: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#fff',
    padding: '2% 0%',
    [theme.breakpoints.down('md')]: { padding: '8% 2%' },
    '& .MuiGrid-spacing-xs-3': {
      [theme.breakpoints.down('md')]: { margin: '0px !important' },
    },
  },
  DropZoneLabel: {
    color: 'rgb(7 80 100 / 85%) !important',
    fontWeight: '500',
    fontSize: '13px',
  },
  FormPanelExtra: {
    width: '100%',
    padding: '4% 2%',
    backgroundColor: '#E1E7F1',
    '& #Card-type-select': {},
  },
  formSmallHeadings: {
    fontSize: '16px',
    fontWeight: 500,
    color: '#1a1a1a',
    margin: 0,
  },
  formSmallHeadingsForTable: {
    fontSize: '16px',
    fontWeight: 500,
    color: '#1a1a1a',
    margin: '30px 0 0 0',
  },
  SubmitBtnDiv: {
    padding: '1.5% 0%',
    [theme.breakpoints.down('md')]: { padding: '8.5% 0%' },
  },
  MasterConfirmDiv: {
    width: '67%',
    [theme.breakpoints.down('md')]: { width: '100%' },
  },

  AcquirerTable: {
    '& .MuiTableRow-head': {
      backgroundColor: '#fff !important',
      borderBottom: '2px solid #2A2E69',
      '& .MuiTableCell-root': {
        fontWeight: '600',
        color: '#2A2E69 !important',
      },
    },
    '& .MuiTableRow-root': {
      backgroundColor: '#fff !important',
      '& .MuiTableCell-root': {
        fontWeight: '600',
      },
    },
  },
  BuyerConfigTable: {
    '& .MuiTableRow-head': {
      backgroundColor: '#fff !important',
      borderBottom: '2px solid #2A2E69',
      '& .MuiTableCell-root': {
        fontWeight: '600',
        color: '#2A2E69 !important',
      },
    },
    '& .MuiTableRow-root': {
      '&:nth-child(odd)': {
        backgroundColor: '#f5f5f5',
      },
      '& .MuiTableCell-root': {
        fontWeight: '600',
      },
    },
  },
  CollapsibleTable: {
    borderTop: '1px solid #cacaca',
    '& .MuiTableRow-head': {
      backgroundColor: '#fff !important',
      borderBottom: 'none',
      '& .MuiTableCell-root': {
        color: '#000 !important',
        fontWeight: '600',
      },
    },
    '& .MuiTableRow-root': {
      backgroundColor: '#f5f5f5 !important',
      '& .MuiTableCell-root': {
        fontWeight: '500',
      },
    },
  },
  CollapsibleTableFees: {
    borderTop: '2px solid #2A2E69',
    borderBottom: '2px solid #2A2E69',
    '& .MuiTableRow-head': {
      '& .MuiTableCell-root': {
        color: '#000 !important',
        fontWeight: '600',
      },
    },
    '& .MuiTableRow-root': {
      backgroundColor: '#f5f5f5 !important',
      '& .MuiTableCell-root': {
        fontWeight: '500',
      },
    },
  },
  CardLoadLink: {
    color: '#0042B3 !important',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontWeight: '600 !important',
  },
  TableJumpLink: {
    color: '#0042B3 !important',
    cursor: 'pointer',
    fontWeight: '600 !important',
    '& svg': {
      marginBottom: '-8px',
    },
  },
  TopBarBtns: {
    marginTop: '3%',
    display: 'flex',
    '& div:first-child': {
      flex: 1,
    },
    '& label': {
      fontSize: '14px',
      color: '#4a4a4a',
      letterSpacing: 0,
    },
  },
  DeactiveStatus: {
    width: 'fit-content',
    textTransform: 'capitalize',
    backgroundColor: '#fff4e5',
    border: '1px solid #ffe2b6',
    borderRadius: '2px',
    fontSize: '12px !important',
    color: '#222222 !important',
    fontWeight: '400 !important',
    lineHeight: '17px',
    padding: '3% 6%',
    whiteSpace: 'nowrap',
    margin: '7px 10px 7px 27px',
    '& svg': {
      marginBottom: '-1px',
      fontSize: '10px',
      color: '#FF9800',
    },
  },
  ActiveStatus: {
    width: 'fit-content',
    textTransform: 'capitalize',
    backgroundColor: '#9ed8a8',
    border: '1px solid #6ba775',
    borderRadius: '2px',
    fontSize: '12px !important',
    color: '#1a1a1a !important',
    fontWeight: '500 !important',
    lineHeight: '17px',
    padding: '3% 6%',
    whiteSpace: 'nowrap',
    margin: '7px 10px 7px 27px',
    '& svg': {
      marginBottom: '-2px',
      fontSize: '10px',
    },
  },

  DisplayFlex: {
    display: 'flex',
    [theme.breakpoints.down('md')]: { display: 'block' },
  },
  DetailsRightTile: {
    width: '33%',
    [theme.breakpoints.down('md')]: { width: '100%' },
  },
  TransactionSummary: {
    marginLeft: '5%',
    padding: '6% 4%',
    border: '1px solid #d7d7de',
    borderRadius: '4px',
    [theme.breakpoints.down('md')]: { marginLeft: '0%', marginTop: '15%' },
    '& h3': {
      margin: 0,
      color: '#2A2E69',
      fontSize: '20px',
      letterSpacing: '-0.5px',
      fontWeight: 600,
    },
    '& h4': {
      margin: 0,
      color: '#222222',
      fontSize: '14px',
      letterSpacing: '0px',
      fontWeight: 600,
    },
    '& h5': {
      margin: 0,
      color: '#075065',
      fontSize: '14px',
      letterSpacing: '0px',
      fontWeight: 600,
    },
    '& p': {
      margin: '12% 0 0 0',
      color: '#1a1a1a',
      fontSize: '12px',
      letterSpacing: '0px',
      fontWeight: '500 !important',
    },
    '& h3:first-child': {
      flex: 1,
    },
    '& .MuiGrid-root': {
      margin: 0,
      width: '100%',
    },
    '& .MuiGrid-item': {
      padding: 0,
    },
  },
  BarMain: {
    marginTop: '2%',
    '& svg': {
      marginBottom: '-3%',
      color: '#075065',
      cursor: 'pointer ',
    },
    '& thead': {
      '& th': {
        fontSize: '16px',
        fontWeight: '600',
        color: '#767676',
      },
    },
    '& tbody': {
      '& td': {
        fontSize: '14px',
        fontWeight: '600',
        color: '#075065',
      },
      '& td:first-of-type': {
        color: '#222222',
      },
    },
    '& .MuiTableCell-root': {
      padding: '12px 0px',
    },
    '& h4': {
      fontSize: '20px',
      color: '#075065',
      fontWeight: '600',
      lineHeight: '28px',
    },
    '& .MuiButtonGroup-root': {
      margin: '18px 0 8px 0',
    },
  },
  TimelineSummary: {
    marginLeft: '5%',
    padding: '9% 4% 0% 4%',
    border: '1px solid #d7d7de',
    borderRadius: '4px',
    [theme.breakpoints.down('md')]: { marginLeft: '0%' },
    '& h2': {
      margin: 0,
      color: '#2A2E69',
      fontSize: '26px',
      letterSpacing: '-0.5px',
      fontWeight: 600,
    },
    '& h4': {
      color: '#1a1a1a',
      margin: 0,
      fontSize: '14px',
    },
    '& h5': {
      margin: 0,
      color: '#1a1a1a',
      fontSize: '12px',
    },
    '& p': {
      margin: 0,
      color: '#222222',
      fontSize: '14px',
      fontWeight: 500,
    },
  },
  TimeLineNumberIcon: {
    width: '1em',
    height: '1em',
    fontSize: '1.5rem',
    lineHeight: '24px',
    textAlign: 'center',
  },
  TimelineCompleted: {
    marginLeft: '4px',
    '& .MuiTimelineDot-root': {
      borderColor: '#22552b',
      '& svg': {
        color: '#22552b',
      },
      '& div': {
        color: '#22552b',
      },
    },
    '& .MuiTimelineConnector-root': {
      backgroundColor: '#0042b3',
    },
  },
  TimelineActive: {
    '& .MuiTimelineDot-root': {
      borderColor: '#075065',
      borderStyle: 'double',
      borderWidth: '6px',
      '& svg': {
        color: '#075065',
      },
      '& div': {
        color: '#075065',
      },
    },
    '& .MuiTimelineConnector-root': {
      backgroundColor: '#cacaca',
    },
  },
  TimelinePending: {
    marginLeft: '4px',
    '& .MuiTimelineDot-root': {
      borderColor: '#cacaca',
      '& svg': {
        color: '#075065',
      },
      '& div': {
        color: '#075065',
      },
    },
  },
  TimelineActiveText: {
    '& h4': {
      color: '#0042B3',
    },
  },
  PaymentStatusWidget: {
    marginLeft: '5%',
    marginBottom: '7%',
    padding: '4% 4% 4% 4%',
    borderTop: '1px solid #d7d7de',
    borderLeft: '1px solid #d7d7de',
    borderRight: '1px solid #d7d7de',
    borderRadius: '4px',
    [theme.breakpoints.down('md')]: { marginLeft: '0%', marginTop: '15%' },
    '& h4': {
      fontSize: '16px',
      fontWeight: '600',
      color: '#2a2e69',
      margin: 0,
    },
    '& h5': {
      fontSize: '14px',
      color: '#222222',
      fontWeight: '400',
      margin: '10px 0',
    },
  },
  PaymentWidgetBorderPendingPayouts: {
    borderBottom: '8px solid #22552b',
  },
  PaymentWidgetBorderDeclined: {
    borderBottom: '8px solid #9b0000',
  },
  PaymentWidgetBorderPaid: {
    borderBottom: '8px solid #22552b',
  },
  PaymentWidgetBorderFailed: {
    borderBottom: '8px solid #9b0000',
  },
  PaymentWidgetBorderAuthorized: {
    borderBottom: '8px solid #753c00',
  },
  PaymentWidgetBorderPendingAuthorization: {
    borderBottom: '8px solid #753c00',
  },
  PaymentLightStatus: {
    width: 'fit-content',
    textTransform: 'capitalize',
    backgroundColor: '#fff4e5',
    border: '1px solid #ffe2b6',
    borderRadius: '2px',
    fontSize: '12px !important',
    color: '#222222 !important',
    fontWeight: '400 !important',
    lineHeight: '17px',
    padding: '1% 2%',
    whiteSpace: 'nowrap',
    '& svg': {
      marginBottom: '-1px',
      fontSize: '10px',
      color: '#FF9800',
    },
  },
  BottomBorder: {
    borderBottom: '3px solid #2a2e69',
  },
  DeleteBPSPDialog: {
    '& h4': {
      margin: 0,
      color: '#222222',
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '28px',
      letterSpacing: '-0.5px',
    },
    '& p': {
      color: '#222222',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '20px',
      letterSpacing: '0px',
    },
    '& svg': {
      marginBottom: '-5px',
      color: '#D50000',
    },
    '& .MuiDialog-paper': {
      borderRadius: 0,
      borderTop: '4px solid #D50000',
    },
  },
  TableRowSeparater: {
    borderBottom: '3px solid #132482',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  AddIssuerBtn: {
    marginTop: '4%',
  },
  AquerierKeys: {
    overflowWrap: 'break-word',
    maxWidth: '360px',
    fontSize: '14px',
    letterSpacing: 0,
    lineHeight: '20px',
    color: '#1a1a1a',
  },
  KeyPopup: {
    '& .MuiPopover-paper': {
      padding: '1% 1%',
      borderRadius: '0px',
      backgroundColor: '#E5EBF0',
      borderBottom: '4px solid #48627E',
      display: 'inline-flex',
    },
    '& svg': {
      color: '#48627E',
    },
    '& .MuiCardHeader-title': {
      overflowWrap: 'break-word',
      maxWidth: '360px',
      fontSize: '14px',
      letterSpacing: 0,
      lineHeight: '20px',
      color: '#1a1a1a',
    },
    '& .MuiCardHeader-root': {
      padding: 0,
      '& svg': {
        color: '#394D62',
      },
    },
    '& h6': {
      overflowWrap: 'break-word',
      fontSize: '14px',
      letterSpacing: 0,
      lineHeight: '20px',
      color: '#1a1a1a',
    },
    '& h5': {
      overflowWrap: 'break-word',
      fontSize: '16px',
      letterSpacing: 0,
      lineHeight: '20px',
      color: '#1a1a1a',
      marginBottom: '6px',
      fontWeight: 600,
    },
  },
  AlignCenter: {
    alignItems: 'center',
  },
  PrimaryAccountFlex: {
    display: 'flex',
    [theme.breakpoints.down('md')]: { display: 'block' },
    '& .MuiFormControlLabel-root': {
      margin: '-17px 0 0px 20px',
      [theme.breakpoints.down('md')]: { margin: '0' },
    },
  },
  checkBoxMsg: {
    color: '#616188',
    fontSize: '14px',
    letterSpacing: 0,
    lineHeight: '20px',
    marginTop: 0,
  },
  DeleteFloatBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
  show: {
    display: 'block',
  },
  hide: {
    display: 'none',
  },
  MDR: {
    '& button': {
      marginLeft: '9px',
    },
    '& svg': {
      marginBottom: '0px',
      color: '#075065',
      cursor: 'pointer',
    },
  },
  TableStatusBadgeDeclined: {
    width: 'fit-content',
    color: '#9b0000',
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: 0,
    backgroundColor: '#f8e4ff',
    borderRadius: '2px',
    padding: '1% 2%',
    border: '1px solid #fbbaba',
    whiteSpace: 'nowrap',
    '& svg': {
      color: '#9b0000',
      fontSize: '12px',
      marginBottom: '-2px',
    },
  },
  TableStatusBadgePaid: {
    width: 'fit-content',
    color: '#22552b',
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: 0,
    backgroundColor: '#d9f0dd',
    borderRadius: '2px',
    padding: '1% 2%',
    border: '1px solid #22552b',
    whiteSpace: 'nowrap',
    '& svg': {
      color: '#22552b',
      fontSize: '12px',
      marginBottom: '-2px',
    },
  },
  TableStatusBadgeFailed: {
    width: 'fit-content',
    color: '#9b0000',
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: 0,
    backgroundColor: '#ffe4e4',
    borderRadius: '2px',
    padding: '1% 2%',
    border: '1px solid #ffaeae',
    whiteSpace: 'nowrap',
    '& svg': {
      color: '#9b0000',
      fontSize: '12px',
      marginBottom: '-2px',
    },
  },
  TableStatusBadgeAuthorized: {
    width: 'fit-content',
    color: '#753c00',
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: 0,
    backgroundColor: '#ffe7ce',
    borderRadius: '2px',
    padding: '1% 2%',
    border: '1px solid #f7ba79',
    whiteSpace: 'nowrap',
    '& svg': {
      color: '#753c00',
      fontSize: '12px',
      marginBottom: '-2px',
    },
  },
  TableStatusBadgePendingPayouts: {
    width: 'fit-content',
    color: '#22552b',
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: 0,
    backgroundColor: '#d9eef0',
    borderRadius: '2px',
    padding: '1% 2%',
    border: '1px solid #8cd098',
    whiteSpace: 'nowrap',
    '& svg': {
      color: '#22552b',
      fontSize: '12px',
      marginBottom: '-2px',
    },
  },
  TableStatusBadgePendingAuthorization: {
    width: 'fit-content',
    color: '#753c00',
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: 0,
    backgroundColor: '#ffdace',
    borderRadius: '2px',
    padding: '1% 2%',
    border: '1px solid #753c00',
    whiteSpace: 'nowrap',
    '& svg': {
      color: '#753c00',
      fontSize: '12px',
      marginBottom: '-2px',
    },
  },
  BaasKeyBtn: {
    '& button': {
      border: 'none',
      padding: '0',
    },
  },
  AccountNumber: {
    maxWidth: '0px',
    overflowWrap: 'break-word',
  },
  CreateReportForm: {
    '& .MuiInput-root': {
      border: '1px solid #616188',
    },
    '& .MuiSelect-select:focus': {
      border: '1px solid #075065',
    },
    '& .MuiSelect-selectMenu': {
      maxWidth: '318px !important',
      [theme.breakpoints.up('md')]: { maxWidth: '100% !important' },
    },
    '& .MuiInput-underline:before': {
      border: 'none',
    },
    '& .MuiInput-underline:after': {
      border: 'none',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: 'none',
    },
  },
  dropDownLoader: {
    '& li': {
      opacity: '1 !important',
    },
  },
  PrimaryAccountCheck: {
    [theme.breakpoints.down('md')]: {
      '& .MuiButtonBase-root': {
        padding: '9px 9px 9px 0px',
      },
    },
  },
  Blur: {
    '& textarea': {
      '-webkit-filter': 'blur(3px)',
    },
  },
  BusinessSubscriptionTable: {
    border: '1px solid rgba(224, 224, 224, 1)',
    borderRadius: '0px !important',
    margin: '30px 0 0 0',
    boxShadow: 'none !important',
    '& .MuiTableCell-head': {
      fontSize: '14px !important',
      fontWeight: '500 !important',
      color: 'rgb(7 80 100 / 85%)!important',
    },
  },
  FormDataTables: {
    border: '1px solid rgba(224, 224, 224, 1)',
    borderRadius: '4px !important',
    margin: '30px 0 0 0',
    boxShadow: 'none !important',
  },
  FormDataTablesWithLabel: {
    border: '1px solid rgba(224, 224, 224, 1)',
    borderRadius: '4px !important',
    margin: '1% 0 3% 0',
    boxShadow: 'none !important',
  },
  DataTables: {
    '& .MuiPaper-root': {
      boxShadow: 'rgb(33 33 52 / 10%) 0px 1px 4px',
      // boxShadow: "none",
    },
  },
  DensePaddingTable: {
    '& .MuiTableCell-root': {
      padding: '16px 4px 16px 0px !important',
      '&:first-child': {
        padding: '16px 4px 16px 16px !important',
      },
      '&:last-child': {
        padding: '16px 16px 16px 4px !important',
      },
    },
  },
  NewDataTable: {
    '& .MuiPaper-root': {
      boxShadow: 'none',
    },
    '& .MuiTableHead-root': {
      backgroundColor: '#9AE0FF',
    },
    '& .MuiTableCell-root': {
      // padding: "26px 4px 26px 0px !important",
      '&:first-child': {
        paddingRight: '4px !important',
        paddingLeft: '16px !important',
      },
      '&:last-child': {
        paddingRight: '16px !important',
        paddingLeft: '4px !important',
      },
    },
    '& thead .MuiTableCell-root': {
      backgroundColor: '#87dafc',
      fontSize: '16px !important',
    },
    '& thead .MuiButton-root': {
      fontSize: '16px !important',
    },
    '& tbody .MuiTableCell-root': {
      fontSize: '16px !important',
      color: '#3C3C3C !important',
    },
    '& tbody .MuiTableRow-root': {
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #CFDCE2',
      '&:hover': {
        backgroundColor: 'rgba(71,182,231,0.04) !important',
      },
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: '30px',
    },
  },
  NewDataTableDialog: {
    '& .MuiPaper-root': {
      boxShadow: 'none',
    },
    '& .MuiTableHead-root': {
      backgroundColor: '#9AE0FF',
    },
    '& .MuiTableCell-root': {
      padding: '26px 4px 26px 0px !important',
      '&:first-child': {
        paddingRight: '4px !important',
        paddingLeft: '24px !important',
      },
      '&:last-child': {
        paddingRight: '24px !important',
        paddingLeft: '4px !important',
      },
    },
    '& thead .MuiTableCell-root': {
      backgroundColor: '#87dafc',
      fontSize: '16px !important',
    },
    '& thead .MuiButton-root': {
      fontSize: '16px !important',
    },
    '& tbody .MuiTableCell-root': {
      fontSize: '16px !important',
      color: '#3C3C3C !important',
    },
    '& tbody .MuiTableRow-root': {
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #CFDCE2',
      '&:hover': {
        backgroundColor: 'rgba(71,182,231,0.04) !important',
      },
    },
  },
  TopBarFilterForm: {
    //borderBottom: "1px solid rgb(7 80 101 / 24%)",
    boxShadow:
      '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%) !important',
    '& .MuiPaper-root': {
      boxShadow: 'none !important',
      margin: '0px !important',
    },
    '& .MuiAccordionSummary-content': {
      '& svg': {
        marginBottom: '-6px',
      },
      '& p': {
        color: '#075065 !important',
        fontSize: '16px !important',
        fontWeight: '500 !important',
      },
    },
  },
  TopBarFilterButton: {
    padding: '46px 13.5px 24px 13px',
    borderBottom: '3px solid #075065',
    height: '36px',
    width: '121px',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '500',
    letterSpacing: '1.25px',
    lineHeight: '16px',
  },
  TopBarFilterPaddingOn: {
    padding: '30px 16px',
  },
  TableLoaderStack: {
    borderRadius: '4px',
    background: '#fff',
  },
  TableLoaderStackInner: {
    background: '#fff',
  },
  first: {
    padding: '16px 0',
  },
  last: {
    padding: '16px 0',
  },
  NewMenuDropDown: {
    '& .MuiPopover-paper:before': {
      backgroundColor: 'transparent',
    },
    '& .MuiPaper-root': {
      border: '1px solid rgba(0, 0, 0, 0.12)',
      boxShadow: '0 6px 9px 0 rgba(0,0,0,0.09)',
      filter: 'none',
    },
    '& .MuiList-root': {
      paddingTop: '0px',
      paddingBottom: '0px',
    },
    '& .MuiMenuItem-root': {
      paddingTop: '14px',
      paddingLeft: '22px',
      paddingRight: '22px',
      paddingBottom: '14px',
      borderBottom: '1px solid #CFDCE2',
      '&:last-child': {
        borderBottom: 'none',
      },
    },
    '& p': {
      fontSize: '14px',
      fontWeight: '500',
      textTransform: 'uppercase',
      color: theme.palette.primary.main,
    },
  },
  NavDropDown: {
    '& .MuiList-padding': {
      padding: 0,
    },
    '& .MuiButtonBase-root': {
      paddingTop: '10px',
      paddingBottom: '10px',
    },
    '& .MuiMenuItem-root': {
      backgroundColor: '#fff',
      '&:hover': {
        backgroundColor: '#eef9ff !important',
      },
    },
    '& .MuiCardHeader-root': {
      '& .MuiCardHeader-title': {
        fontSize: '16px',
        fontWeight: 600,
        color: '#526277',
      },
      '& .MuiCardHeader-subheader': {
        fontSize: '14px',
        color: '#4a4a4a',
      },
    },
  },
  TopBarFilterSection: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: '29px',
    '& #TopBarCards': {
      display: 'flex',
      flexDirection: 'row',
      marginRight: '43px',
    },
    '& #TopBarCardDetails': {
      border: '1px solid rgba(0,0,0,0.12)',
      boxShadow: 'none',
      marginRight: '20px',
      maxHeight: '90px',
      '& .MuiCardContent-root': {
        padding: '16px 27px 16px 16px',
      },
    },
    '& #TopBarCardDetailsText': {
      whiteSpace: 'nowrap',
      fontWeight: '500',
    },
    '& #TopBarCardDetailsValue': {
      fontWeight: '500',
      fontSize: '24px',
    },
  },
  TopBarDashboardCards: {
    '& .MuiCardContent-root': {
      padding: '16px',
    },
    '& #TopBarCardDetailsText': {
      whiteSpace: 'nowrap',
      fontWeight: '500',
    },
    '& #TopBarCardDetailsValue': {
      fontWeight: '500',
      fontSize: '24px',
    },
    '& #TopBarDashboardCardCollections': {
      backgroundColor: '#EFFFF4',
      border: '1px solid rgba(21,156,114,0.3)',
      boxShadow: 'none',
    },
    '& #TopBarDashboardCardPayments': {
      backgroundColor: '#FFF0FF',
      border: '1px solid rgba(177,64,255,0.3);',
      boxShadow: 'none',
    },
    '& #TopBarDashboardCardBalance': {
      backgroundColor: '#FFFDE7',
      border: '1px solid rgba(251, 192, 45, 0.4)',
      boxShadow: 'none',
    },
    '& #TopBarCardDetailsCurrency': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      '& .MuiInput-root:before': {
        borderBottom: 'none',
      },
      '& .MuiInput-root:after': {
        borderBottom: 'none',
      },
      '& svg': {
        color: '#47B6E7',
      },
    },
  },
  DashboardCharts: {
    padding: '30px',
  },
  TopBarFilterOptions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    '& #TopBarFilterChips': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      listStyle: 'none',
    },
    '& #TopBarChipDetails': {
      margin: '5px 20px 0px 0px',
      borderRadius: '16px',
      backgroundColor: '#ebf7fc',
      '& .MuiTypography-root ': {
        color: 'rgba(0,0,0,0.87)',
        fontSize: '14px',
        '& span': {
          fontWeight: 'bold',
          marginLeft: '4px',
        },
      },
      '& .MuiChip-deleteIcon': {
        color: '#47B6E7',
      },
    },
  },
  Chip: {
    margin: '5px 20px 0px 0px !important',
    borderRadius: '16px',
    backgroundColor: '#ebf7fc',
    '& .MuiTypography-root ': {
      color: 'rgba(0,0,0,0.87)',
      fontSize: '14px',
      '& span': {
        fontWeight: 'bold',
        marginLeft: '4px',
      },
    },
    '& .MuiChip-deleteIcon': {
      color: '#47B6E7',
    },
  },
  TopBarFilter: {
    display: 'flex',
    flexDireciton: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    '& #filter-button': {
      padding: '8px 24px 7.8px 11px',
      color: 'primary',
      border: '1px solid rgba(0,0,0,0.12)',
    },
    '& #filterButtonIcon': {
      margin: '0px 15px 0px 0px',
    },
  },

  TopBarFilterSectionMenu: {
    padding: '19px 24px 35px 24px',
    width: '739px',
    borderRadius: '4px',
    boxShadow:
      '0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.2)',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    '& #TopBarFilterSectionHeader': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    '& #TopBarFilterSectionContent': {
      padding: '20px 0px 8px 0',
    },
  },
  ButtonGroup: {
    marginTop: '2%',
    // "& .MuiButton-root": {
    //   borderRight: "none !important",
    // },

    // "&:not(:last-of-type)": {
    //   borderRight: "none !important",
    // },
  },
  HeaderLabel: {
    display: 'flex',
    alignContent: 'center',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  NewAddFormAccordian: {
    borderRadius: '0',
    boxShadow: 'none',
    margin: '16px 0',
    '& .Mui-expanded': {
      borderBottom: 'none',
    },
    '& .MuiAccordionSummary-root': {
      // minHeight: "64px",
      minHeight: '80px',
      backgroundColor: '#F1FAFD',
      justifyContent: 'left',
      borderBottom: 'none',
    },
    '&:before': {
      backgroundColor: '#F1FAFD',
    },
  },
  NoteText: {
    color: 'rgba(0,0,0,0.6)',
    fontfamily: 'Roboto',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.25px',
    lineHeight: '24px',
  },
  InfoText: {
    color: 'rgba(0,0,0,0.6)',
    fontFamily: 'Roboto',
    fontSize: '14px',
    letterSpacing: '0.25px',
    lineHeight: '20px',
    textAlign: 'justify',
  },
  Divider: {
    borderColor: '#979797 !important',
    marginTop: '10px',
    marginBottom: '10px',
  },
  AddFormAccordian: {
    borderRadius: '4px',
    boxShadow: 'rgb(33 33 52 / 10%) 0px 1px 4px',
    margin: '16px 0',
    '&::before': {
      height: '0px',
    },
    '& .Mui-expanded': {
      borderTopRightRadius: '4px',
      borderTopLeftRadius: '4px',
      borderBottomRightRadius: '0px',
      borderBottomLeftRadius: '0px',
    },
    '& .MuiAccordionSummary-root': {
      borderTopRightRadius: '4px',
      borderTopLeftRadius: '4px',
      borderBottomRightRadius: '4px',
      borderBottomLeftRadius: '4px',
      backgroundColor: '#f5f5f5',
      justifyContent: 'left',
    },
  },
  FilterAccordian: {
    borderRadius: '4px',
    boxShadow: 'rgb(33 33 52 / 10%) 0px 1px 4px',
    margin: '16px 0',
    '&::before': {
      height: '0px',
    },
    '& .Mui-expanded': {
      borderTopRightRadius: '4px',
      borderTopLeftRadius: '4px',
      borderBottomRightRadius: '0px',
      borderBottomLeftRadius: '0px',
    },
    '& .MuiAccordionSummary-root': {
      borderTopRightRadius: '4px',
      borderTopLeftRadius: '4px',
      borderBottomRightRadius: '0px',
      borderBottomLeftRadius: '0px',
      backgroundColor: '#f5f5f5',
      justifyContent: 'left',
    },
    '& .MuiAccordionDetails-root': {
      borderTop: '1px solid #e4e4e4',
    },
  },
  CustomLink: {
    color: theme.palette.primary.main,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  ViewImageDialog: {
    '& .MuiPaper-root': {
      //backdropFilter: "blur(20px)",
      backgroundColor: 'rgba(255, 255, 255, 1)',
      alignItems: 'center',
      position: 'relative',
      padding: '48px 16px 16px 16px',
      width: 'fit-content',
      maxWidth: '100%',
    },
    '& button': {
      position: 'absolute',
      right: 16,
      top: 10,
      border: '1px solid #d5d5d5',
    },
    '& img': {
      width: '100%',
    },
  },
  ViewPageDialog: {
    '& .MuiDialog-paper': { width: '100%' },
    '& .MuiDialogContent-root': {
      padding: 0,
    },
    '& .MuiDialogTitle-root': {
      backgroundColor: '#f5f5f5',
      borderBottom: '1px solid #e4e4e4',
    },
    '& .MuiDialogActions-root': {
      backgroundColor: '#f5f5f5',
      borderTop: '1px solid #e4e4e4',
    },
  },
  PrivacyDailog: {
    '& strong': {},
    '& h3': { fontSize: '30px' },
    '& p': {
      //color: "#939393",
    },
    '& .MuiDialogContent-root': {
      padding: '50px 30px',
    },
    '& .MuiDialogActions-root': {
      padding: '30px 50px',
    },
    '& .MuiAccordion-root': {
      boxShadow: 'none',
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
      '& .MuiCollapse-root': {
        padding: '0px 16px',
      },
      '&:before': {
        opacity: 0,
      },
    },
  },
  ViewDialogTitle: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    '& h5': {
      fontWeight: '500',
      fontSize: '26px',
      letterSpacing: '-0.5px',
      color: '#4a4a4a',
      [theme.breakpoints.down('md')]: {
        fontSize: '20px',
      },
    },
  },
  DetailsTitle: {
    backgroundColor: '#F1FAFD',
    fontSize: '20px',
    fontWeight: 500,
    color: '#004b62',
    margin: '0',
    padding: '25px 24px',
    '& svg': {
      cursor: 'pointer',
      marginBottom: '-5px',
      marginLeft: '5px',
      color: '#004283',
    },
  },
  NormalInnerTable: {
    marginBottom: '60px',
    '& .MuiTableRow-root': {
      '&:nth-child(even)': {
        backgroundColor: '#fff',
      },
    },
    '& .MuiTableRow-head': {
      //backgroundColor: "#f5f5f5",
      color: '#004b62 !important',
      borderBottom: '1px solid #e3e3e3',
    },

    '& .MuiTableCell-root': {
      borderBottom: '1px solid #e3e3e3',
      fontSize: '16px !important',
      '&:first-child': {
        padding: '16px 4px 16px 24px',
      },
      '&:last-child': {
        padding: '16px 24px 16px 4px',
      },
    },
  },
  Legend: {
    listStyleType: 'none',
    padding: '0px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    '& li': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    '& .LegendSquareIcon': {
      borderRadius: '3px',
      height: '10px',
      width: '10px',
      display: 'inline-block',
      marginRight: '8px',
    },
    '& span': {
      fontSize: '12px',
      width: 'auto',
      color: '#212121',
    },
  },
  QuickLinksDrawer: {
    height: '100%',
    border: 'none',
    padding: '82px 0 82px 0',
    backgroundColor: '#FFF7F7',
    '& .QuickLinks': {
      '& .badge': {
        fontSize: '16px',
        fontWeight: '500',
        padding: '2px 10px',
        marginLeft: '8px',
        backgroundColor: '#FE9898',
        color: '#ffffff',
        borderRadius: '4px',
      },
    },
    '& ul': {
      marginTop: '8px',
    },
    '& .linkText span': {
      color: '#47B6E7',
      fontWeight: '500 !important',
    },
    '& .MuiListItemButton-root svg': {
      fontSize: 16,
      color: '#47B6E7',
    },
    '& .MuiListItemButton-root': {
      padding: '12px 24px 12px 24px',
    },
  },
  CreditCardOuter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    [theme.breakpoints.down('md')]: { height: '350px' },
    [theme.breakpoints.down('sm')]: { height: '350px' },
  },
  CreditCard: {
    //backgroundColor: "#10ADE8",
    cursor: 'pointer',
    position: 'relative',
    width: '300px',
    padding: '16px 21px',
    margin: '3px auto',
    borderRadius: '5px',
    [theme.breakpoints.down('xl')]: { width: '260px' },
    '&:hover': {
      outline: '3px solid #47B6E7',
    },
    '& #topRow': {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '70px',
      [theme.breakpoints.down('xl')]: { marginBottom: '60px' },
    },
    '& h6': {
      fontSize: '12px',
      color: '#f6fdff',
      fontWeight: 400,
    },
    '& #number': {
      marginBottom: '5px',
      '& h5': {
        fontSize: '16px',
        color: '#fff',
        fontWeight: 300,
      },
    },
    '& #name': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& h5': {
        fontSize: '14px',
        color: '#fff',
        fontWeight: 400,
      },
    },
    '& .MuiCheckbox-root': {
      color: '#1220c7',
      '& svg': {
        fontSize: '2rem',
      },
    },
  },
  CheckoutPage: {
    '& .slick-slide': '340px',
  },
  Dashboard: {
    '& #MainBox': {
      paddingTop: '24px',
      paddingBottom: '24px',
      paddingLeft: '24px',
      [theme.breakpoints.down('md')]: { padding: '24px 24px 0 24px' },
    },
  },
  AddCard: {
    minHeight: '100%',
    '& #MainBox': {
      paddingTop: '24px',
      paddingBottom: '24px',
      paddingLeft: '24px',
      [theme.breakpoints.down('md')]: { padding: '24px 24px 0 24px' },
    },
  },
  UploadFile: {
    marginTop: '5px',
    '& button': {
      padding: 0,
      lineHeight: 1,
      textTransform: 'capitalize',
    },
    '& .MuiDivider-root': {
      borderColor: theme.palette.primary.main,
    },
    '& .MuiTypography-root': {
      fontSize: '0.75rem',
    },
  },
}));
