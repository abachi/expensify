import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { editExpense, removeExpense } from "../actions/expenses";

export class Edit extends React.Component {
  onSubmit = (expense) => {
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push("/");
  };
  removeExpense = (expense) => {
    this.props.removeExpense(expense);
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <h1>Edit Page {this.props.expense.id}</h1>
        <div>
          <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
          <button onClick={this.removeExpense}>Remove</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  removeExpense: (expense) => dispatch(removeExpense(expense)),
});
const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((exp) => exp.id === props.match.params.id),
});
export default connect(mapStateToProps, mapDispatchToProps)(Edit);
