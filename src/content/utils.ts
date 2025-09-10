import { Alert, Platform, Linking } from "react-native";

export const callPhoneFromMobile = (
  countryCode: string,
  number: string | number,
) => {
  if (!number) {
    Alert.alert('Phone number is not available');
    return;
  }

  let phoneNumber = number.toString().trim();
  let dialString = countryCode
    ? `${countryCode}${phoneNumber.replace(/^0+/, '')}`
    : phoneNumber;

  const url =
    Platform.OS === 'ios' ? `telprompt:${dialString}` : `tel:${dialString}`;

  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        Alert.alert('Error', `Cannot open dialer for ${dialString}`);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(err => console.error('Error opening dialer', err));
};
