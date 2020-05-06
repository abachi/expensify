import React from "react";
import numeral from "numeral";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import selectExpenses from "../selectors/expenses";
import getExpensesTotal from "../selectors/expenses-total";

export const ExpensesSummary = ({
  expenseCount,
  expensesTotal,
  hiddenExpensesCount,
}) => {
  const expenseWord = expenseCount === 1 ? "expense" : "expenses";
  const formattedExpensesTotal = numeral(expensesTotal).format("$0,0.00");
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{expenseCount}</span> <span>{expenseWord}</span>{" "}
          totaling <span>{formattedExpensesTotal}</span>
        </h1>
        {hiddenExpensesCount > 0 && (
          <h4 className="page-header__sub-title">
            <span>{hiddenExpensesCount}</span> expenses not included in this
            filter.
          </h4>
        )}
        <div className="page-header__actions">
          <Link className="button" to="/create">
            Add Expense
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: getExpensesTotal(visibleExpenses),
    hiddenExpensesCount: state.expenses.length - visibleExpenses.length,
  };
};
export default connect(mapStateToProps)(ExpensesSummary);
