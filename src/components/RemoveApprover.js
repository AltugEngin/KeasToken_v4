import React from "react";

export function RemoveApprover({ _removeApprover }) {
  return (
    <div>
      <form
        onSubmit={(event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
          const approver = formData.get("_removeApprover");
          _removeApprover(approver);
        }}
      >
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="_removeApprover"
            placeholder="Onaycı adresi"
            required
          />
        </div>

        <div className="form-group">
          <input
            className="btn btn-primary"
            type="submit"
            value="Kaizen Onaycısı Sil"
          />
        </div>
      </form>
    </div>
  );
}
