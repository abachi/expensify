import React from "react";
import { Link } from "react-router-dom";

export default (props) => (
  <div>
    <span>Amount: {props.expense.amount}</span>
    <span>Description: {props.expense.description}</span>
    <span>created at: {props.expense.createdAt}</span>
    <Link to={`edit/${props.expense.id}`}>Edit</Link>
  </div>
);
