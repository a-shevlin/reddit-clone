import React from "react";
import PropTypes from "prop-types"

function ReusableForm(props) {
  return (
    <React.Fragment>
      <div className="formPage">

        <h4>{props.pageHead}</h4>
        <hr />
        <div className="container reusableForm">
          <form onSubmit={props.formSubmissionHandler}>
            <input 
              id="formUserName"
              type="text"
              name="userName"
              placeholder="User Name" />
            <input 
              id="formDate"
              type="text"
              name="date"
              placeholder="Date" />
            <br />
            <input
              id="formTitle"
              type="text"
              name="heading"
              placeholder="Title" />
            <textarea 
              id="formText"
              name="content"
              placeholder="Text"  >
            </textarea>
            <button id="formSubmit" type='submit'>{props.buttonText}</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;