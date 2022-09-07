import React from "react";

export function Pay({ _Pay }) {
  return (
    <div>
      <h4>Pay</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
          const _kaizen = formData.get("_kaizen_");
          _Pay(_kaizen);
        }}
      >
        <div className="form-group">
          <label>SAP Notification Number to be paid</label>
          <input
            className="form-control"
            type="text"
            name="_kaizen_"
            required
          />
        </div>

        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Pay" />
        </div>
      </form>
    </div>
  );
}
