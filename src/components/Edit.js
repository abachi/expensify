import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import ConfirmationModal from "./ConfirmationModal";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";

export class Edit extends React.Component {
  state = {
    isRemoveModalOpen: false,
  };
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push("/");
  };
  onRemove = () => {
    this.props.startRemoveExpense(this.props.expense);
    this.props.history.push("/");
  };
  openRemoveModal = () => {
    this.setState(() => ({ isRemoveModalOpen: true }));
  };
  closeRemoveModal = () => {
    this.setState(() => ({ isRemoveModalOpen: false }));
  };
  render() {
    return (
      <div className="page">
        <div className="page-header">
          <div className="content-container">
            <div className="page-header__body">
              <h1>Edit Expense</h1>
              <div>
                <button
                  name="remove-btn"
                  className="button button--secondary"
                  onClick={this.openRemoveModal}
                >
                  Remove Expense
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
        </div>
        <ConfirmationModal
          isOpen={this.state.isRemoveModalOpen}
          onRequestClose={this.closeRemoveModal}
          onRemove={this.onRemove}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: (expense) => dispatch(startRemoveExpense(expense)),
});
const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((exp) => exp.id === props.match.params.id),
});
export default connect(mapStateToProps, mapDispatchToProps)(Edit);
