import React from "react";

export function Vote({ _vote }) {
  return (
    <div>
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
          <input
            className="form-control"
            placeholder="Oylayacağınız Kaizen'in bildirim numarasını giriniz"
            type="text"
            name="_kaizen"
            required
          />
        </div>

        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Oy ver" />
        </div>
      </form>
    </div>
  );
}
