import React from "react";

export function AddKaizen({ _addKaizen }) {
  return (
    <div>
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
          <input
            className="form-control"
            type="text"
            name="_kaizen"
            placeholder="SAP Bildirim Numarası"
            required
          />
        </div>

        <div className="form-group">
          <input
            className="btn btn-primary"
            type="submit"
            value="SAP Bildirim no ile Kaizen Ekle"
          />
        </div>
      </form>
    </div>
  );
}
