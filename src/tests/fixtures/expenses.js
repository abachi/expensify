import moment from "moment";

export default [
  {
    id: "1",
    description: "Rent",
    note: "",
    amount: 1500,
    createdAt: 0,
  },
  {
    id: "2",
    description: "Credit card",
    note: "",
    amount: 25550,
    createdAt: moment(0).subtract(4, "days").valueOf(),
  },
  {
    id: "3",
    description: "Gas bill",
    note: "",
    amount: 5000,
    createdAt: moment(0).add(4, "days").valueOf(),
  },
];
