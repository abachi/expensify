import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "react-dates/initialize";

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : "",
      amount: props.expense ? props.expense.amount : "",
      note: props.expense ? props.expense.note : "",
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: "",
    };
  }
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onAmountChange = (e) => {
    const amount = e.target.value;
    const isValid = /^\d+(\.\d{0,2})?$/.test(amount);
    if (!amount || isValid) {
      this.setState(() => ({ amount }));
    }
  };
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onCalendarFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { description, note, amount, createdAt } = this.state;
    if (description.trim().length === 0 || !amount) {
      this.setState(() => ({
        error: "Please provide description and amount.",
      }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        description: description.trim(),
        amount: parseFloat(amount, 10),
        note: note.trim(),
        createdAt: createdAt.valueOf(),
      });
    }
  };

  render() {
    const {
      description,
      note,
      amount,
      error,
      createdAt,
      calendarFocused,
    } = this.state;
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        {error.length > 0 && <p className="form__error">{error}</p>}
        <input
          type="text"
          className="text-input"
          name="description"
          placeholder="Description"
          value={description}
          onChange={this.onDescriptionChange}
          autoFocus
        />
        <input
          type="text"
          className="text-input"
          name="amount"
          placeholder="Amount"
          value={amount}
          onChange={this.onAmountChange}
        />
        <textarea
          className="textarea"
          placeholder="Add a note (Optional)"
          value={note}
          name="note"
          onChange={this.onNoteChange}
        ></textarea>
        <SingleDatePicker
          date={createdAt}
          onDateChange={this.onDateChange}
          focused={calendarFocused}
          onFocusChange={this.onCalendarFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <div>
          <button className="button">Save Expense</button>
        </div>
      </form>
    );
  }
}
