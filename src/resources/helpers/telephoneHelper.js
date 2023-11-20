export const telephoneHelper = {
  mask: (phone) => {
    if (phone.length === 10) {
      return `(${phone.substring(0, 2)}) ${phone.substring(
        2,
        7
      )}-${phone.substring(7)}`;
    } else if (phone.length === 11) {
      return `(${phone.substring(0, 2)}) ${phone.substring(
        2,
        7
      )}-${phone.substring(7)}`;
    } else return phone;
  },
  unmask: (phone) => {
    const phoneWithoutMask = phone.replace(/\D/g, "");
    return phoneWithoutMask;
  },
};
