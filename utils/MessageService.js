import * as SMS from "expo-sms";

export const sendMessage = async ({ to, message }) => {
  const isAvailable = await SMS.isAvailableAsync();
  if (isAvailable) {
    const { result } = await SMS.sendSMSAsync([to], message);
    if(result === 'cancelled'){
      throw Error("SMS cancelled")
    }
    if(result === 'sent'){
      return true;
    }
    return false;
  } else {
    throw Error("SMS not supported");
  }
};
