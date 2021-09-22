export const validateDateInput = (dateInput) => {
  let valid = true;
  if (!dateInput) {
    valid = false;
  }
  try {
    let date = new Date(dateInput);
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60000);
    const today = getToday();
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

const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const getTomorrow = () => {
  const today = getToday();
  return today.setDate(today.getDate() + 1);
};

const isThisWeek = (date) => {
  const today = getToday();
  const day = today.getDay();
  const startOfThisWeek = new Date(today.valueOf() - 1000 * 60 * 60 * 24 * day);
  const startOfNextWeek = new Date(
    startOfThisWeek.valueOf() + 1000 * 60 * 60 * 24 * 7
  );
  return date.valueOf() >= startOfThisWeek && date < startOfNextWeek;
};

// relativeDates = ["past", "today", "tomorrow", "next-three-days", "current-week", "next-seven-days"];
export const addRelativeDates = (objArray, dateKey) => {
  let today = getToday();
  let tomorrow = getTomorrow();
  const sevenDaysFromToday = new Date(
    today.valueOf() + 1000 * 60 * 60 * 24 * 7
  );
  return objArray.map((obj) => {
    let objDate = obj[dateKey];
    objDate.setHours(0, 0, 0, 0);
    let relativeDates = [];
    if (objDate < today) {
      relativeDates = [...relativeDates, "past"];
    } else if (objDate < sevenDaysFromToday) {
      relativeDates = [...relativeDates, "next-seven-days", "future"];
      if (objDate.valueOf() === today.valueOf()) {
        relativeDates = [...relativeDates, "today"];
      } else if (objDate.valueOf() === tomorrow.valueOf()) {
        relativeDates = [...relativeDates, "tomorrow"];
      }
    } else {
      relativeDates = [...relativeDates, "future"];
    }
    if (isThisWeek(objDate)) {
      relativeDates = [...relativeDates, "current-week"];
    }
    return { ...obj, relativeDates };
  });
};
