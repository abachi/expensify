import React from "react";
import Modal from "react-modal";

export const ConfirmationModal = (props) => {
  return (
    <Modal
      ariaHideApp={false}
      className="modal"
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
    >
      <div>
        <h3 className="modal__title">Do you want remove this expense?</h3>
        <div className="modal__body">
          <button
            name="cancel-btn"
            className="button button--secondary"
            onClick={props.onRequestClose}
          >
            Cancel
          </button>
          <button className="button button--danger" onClick={props.onRemove}>
            Sure
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
