import React from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";

import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate,
} from "../actions/filters";

export class ExpenseListFilters extends React.Component {
  state = {
    focusedInput: null,
  };
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = (calendarFocus) => {
    this.setState(() => ({ calendarFocus }));
  };
  onTextSearchChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  onSortByChange = (e) => {
    if (e.target.value === "amount") {
      this.props.sortByAmount();
    }

    if (e.target.value === "date") {
      this.props.sortByDate();
    }
  };
  render() {
    return (
      <div>
        <input
          type="text"
          name="search"
          value={this.props.filters.text}
          onChange={this.onTextSearchChange}
        />
        <select
          value={this.props.filters.sortBy}
          name="sortBy"
          onChange={this.onSortByChange}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker
          startDate={this.props.filters.startDate}
          endDate={this.props.filters.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.focusedInput}
          onFocusChange={this.onFocusChange}
          startDateId={"expensefy_0"}
          endDateId={"expensefy_9"}
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDates={true}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sortByAmount: () => dispatch(sortByAmount()),
  sortByDate: () => dispatch(sortByDate()),
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
});

const mapStateToProps = (state) => ({
  filters: state.filters,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
