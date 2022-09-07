import React from "react";

export function AddApprover({ _addApprover }) {
  return (
    <div>
      <h4>Add Approver</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
          const _approver = formData.get("_approver");
          _addApprover(_approver);
        }}
      >
        <div className="form-group">
          <label>Approver Address</label>
          <input
            className="form-control"
            type="text"
            name="_approver"
            required
          />
        </div>

        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Add" />
        </div>
      </form>
    </div>
  );
}
