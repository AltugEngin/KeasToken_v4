import React from "react";

export function AddApprover({ _addApprover }) {
  return (
    <div>
      <form
        onSubmit={(event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
          const _approver = formData.get("_approver");
          const _name = formData.get("_name");
          const _surname = formData.get("_surname");
          _addApprover(_approver, _name, _surname);
        }}
      >
        <div className="form-group">
          <input
            placeholder="Adı"
            className="form-control"
            type="text"
            name="_name"
            required
          />
          <input
            placeholder="Soyadı"
            className="form-control"
            type="text"
            name="_surname"
            required
          />
          <input
            placeholder="Onaycı Adresi"
            className="form-control"
            type="text"
            name="_approver"
            required
          />
        </div>

        <div className="form-group">
          <input
            className="btn btn-primary"
            type="submit"
            value="Kaizen Onaycısı Ekle"
          />
        </div>
      </form>
    </div>
  );
}
