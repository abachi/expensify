import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";
import getExpensesTotal from "../selectors/expenses-total";

export const ExpenseList = (props) => {
  const total = getExpensesTotal(props.expenses);
  return (
    <div>
      {props.expenses.length === 0 ? (
        <p>No expenses</p>
      ) : (
        <div>
          <p>
            Viewing {props.expenses.length} expenses totaling{" "}
            {numeral(total).format("$0,0.00")}
          </p>
          {props.expenses.map((expense) => (
            <ExpenseListItem key={expense.id} expense={expense} />
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  expenses: selectExpenses(state.expenses, state.filters),
});
export default connect(mapStateToProps)(ExpenseList);
