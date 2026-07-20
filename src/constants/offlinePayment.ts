// Support contact (reused from the contact page)
export const SUPPORT_EMAIL = "info@pathpalz.com";
// WhatsApp number in wa.me format (international, digits only)
export const SUPPORT_WHATSAPP = "447503211801";

export interface IOfflineAccount {
  bankName: string;
  accountName: string;
  accountNumber: string;
  // GB-specific
  sortCode?: string;
  // extra note shown under the details, optional
  note?: string;
}

export const OFFLINE_ACCOUNTS: Record<string, IOfflineAccount> = {
  GB: {
    bankName: "",
    accountName: "Pathpalz Ltd",
    accountNumber: "28752124",
    sortCode: "04-06-05",
  },
  NG: {
    bankName: "Ecobank",
    accountName: "Pathpalz limited",
    accountNumber: "0890021182",
  },
};
