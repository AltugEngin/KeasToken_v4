import React from "react";

export function AddKaizen({ _addKaizen }) {
  return (
    <div>
      <h4>Add Kaizen</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
          const kaizen = formData.get("_kaizen");
          _addKaizen(kaizen);
        }}
      >
        <div className="form-group">
          <label>SAP Notification Number</label>
          <input className="form-control" type="text" name="_kaizen" required />
        </div>

        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Add" />
        </div>
      </form>
    </div>
  );
}
