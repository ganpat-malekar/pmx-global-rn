// export const getTradeLicenseDocumentNames = () => async (dispatch, getState) => {
//     try{
//         const data = {};
//         const response = await api.post(config.FETCH_TRADE_LICENSE_DROPDOWN, data);
//         const { DocumentNames } = response.data.Data.TradeLicence;
//         if(DocumentNames?.length) {
//             dispatch({
//                 type: SAVE_TRADE_LICENSE_DROWPDOWN,
//                 payload: DocumentNames
//             })
//         }
//     } catch(error) {
//         errorAlertHandler(error, dispatch);
//     }
// }
