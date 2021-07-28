import React from "react";

export default function RejectWrapper(props) {
  return (
    <div class="card text-white alert-danger mb-3">
      <div class="row">
        <div class="card-body col-sm-4">
          <h5 class="card-title text-danger">Rejected By:</h5>
          <div className="form-text text-danger">Name:</div>
          <label className="form-check-label text-danger">{props.name}</label>
          <div className="form-text text-danger">Email:</div>
          <label className="form-check-label text-danger">{props.email}</label>
          <div className="form-text text-danger">Phone Number:</div>
          <label className="form-check-label text-danger">
            {props.phoneNumber}
          </label>
        </div>
        <div class="card-body col-sm-8">
          <h5 class="card-title text-danger">Reson:</h5>
          <p class="card-text text-danger">{props.reason}</p>
          <h5 class="card-title text-danger">Time:</h5>
          <p class="card-text text-danger">{props.date}</p>
        </div>
      </div>
    </div>
  );
}
