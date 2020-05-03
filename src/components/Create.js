import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { addExpense } from "../actions/expenses";

export class Create extends React.Component {
  addExpense = (expense) => {
    this.props.addExpense(expense);
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm onSubmit={this.addExpense} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpense(expense)),
});

export default connect(null, mapDispatchToProps)(Create);
