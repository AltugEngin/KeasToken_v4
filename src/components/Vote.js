import React from "react";

export function Vote({ _vote }) {
  return (
    <div>
      <h4>Vote</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
          const kaizen = formData.get("_kaizen");
          _vote(kaizen);
        }}
      >
        <div className="form-group">
          <label>SAP notification number of the Kaizen to be voted for.</label>
          <input className="form-control" type="text" name="_kaizen" required />
        </div>

        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Vote" />
        </div>
      </form>
    </div>
  );
}
