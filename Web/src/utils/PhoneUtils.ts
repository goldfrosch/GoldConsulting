class PhoneUtils {
  GetPhone(phone: string): string {
    return phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
  }
  GetPhoneNumber(phone: string): string {
    return phone.replace("-", "");
  }
}

export default new PhoneUtils();