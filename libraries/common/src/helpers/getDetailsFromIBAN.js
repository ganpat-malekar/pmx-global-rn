import aesEncode from "./aes256encoder";

export default (IBAN) => {
  IBAN = IBAN?.toString() || "";

  const details = {};

  const accNo = IBAN.slice(7, IBAN.length);

  details.AccountNo = accNo;
  details.HashedAccountNo =
    accNo.slice(0, 4) + "XXXXXXXX" + accNo.slice(accNo.length - 4);
  details.HashedIBAN =
    IBAN.slice(0, 4) + "XXXXXXXX" + IBAN.slice(IBAN.length - 4);
  details.EncryptedAccountNo = aesEncode(accNo);
  details.EncryptedIBAN = aesEncode(IBAN);

  return details;
};
