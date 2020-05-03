import moment from "moment";

export default (expenses, { text, startDate, endDate, sortBy }) => {
  return expenses
    .filter((expense) => {
      const textMatch =
        text.length === 0 ||
        expense.description.toLowerCase().includes(text.toLowerCase());
      const createdAtMoment = moment(expense.createdAt);
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdAtMoment, "day")
        : true;

      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdAtMoment, "day")
        : true;

      return textMatch && startDateMatch && endDateMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt > b.createdAt ? -1 : 1;
      } else {
        return a.amount > b.amount ? -1 : 1;
      }
    });
};
