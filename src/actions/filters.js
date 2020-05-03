export const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text,
});
/**
 * @param date moment
 */
export const setStartDate = (date) => ({
  type: "SET_START_DATE",
  date,
});

export const setEndDate = (date) => ({
  type: "SET_END_DATE",
  date,
});

export const sortByAmount = () => ({
  type: "SET_SORT_BY_AMOUNT",
});

export const sortByDate = () => ({
  type: "SET_SORT_BY_DATE",
});
