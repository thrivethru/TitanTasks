export const validateDateInput = (dateInput) => {
  let valid = true;
  if (!dateInput) {
    valid = false;
  }
  try {
    let date = new Date(dateInput);
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60000);
    const today = new Date(Date.now());
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    let year2100 = 4102444800000;
    if (today > date || date >= year2100) {
      valid = false;
    }
  } catch (error) {
    // console.log(error);
    valid = false;
  }
  return valid;
};

export const sanitizeHTML = (str) => {
  return str.replace(/[^\w. ]/gi, function (c) {
    return "&#" + c.charCodeAt(0) + ";";
  });
};
