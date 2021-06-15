import React from "react";

import "../goodissue.css";
export default function printer() {
  return (
    <div>
      <div
        className="modal"
        tabIndex="-1"
        id="PrinterModal"
        data-bs-keyboard="false"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">SGH - Printer</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Bang table thong tin. Luu y tat ca pohai colspan =3 */}
              <table className="table table-borderless me-2">
                <thead>
                  <th colspan="3">From</th>
                  <th colspan="3">To</th>
                </thead>
                <tbody>
                  <tr>
                    <td colspan="3">TNHH ABC</td>
                    <td colspan="3">Nguyễn Văn A</td>
                  </tr>
                  <tr>
                    <td colspan="3">92 Đường Số 7, Phường 2 Quận 1,TP.HCM</td>
                    <td colspan="3">92 Đường Số 7, Phường 2 Quận 1,TP.HCM</td>
                  </tr>
                  <tr>
                    <td colspan="3">+84 0909 00 007</td>
                    <td colspan="3">+84 0909 000 127</td>
                  </tr>
                </tbody>
              </table>
              {/* Bang table chi tiet product */}
              <table className="table">
                <thead>
                  <th>Product No.</th>
                  <th colspan="3">Name</th>
                  <th>Quantity</th>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td colspan="3">Dell Monitor U2419H - Black</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td colspan="3">Dell Monitor U2419H - Black</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td colspan="3">Dell Monitor U2419H - Black</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td colspan="3">Dell Monitor U2419H - Black</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td colspan="3">Dell Monitor U2419H - Black</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td colspan="3">Dell Monitor U2419H - Black</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td colspan="3">Dell Monitor U2419H - Black</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td colspan="3">Dell Monitor U2419H - Black</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td colspan="3">Dell Monitor U2419H - Black</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td colspan="3">Dell Monitor U2419H - Black</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td colspan="3">Dell Monitor U2419H - Black</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td colspan="3">Dell Monitor U2419H - Black</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td colspan="3">Dell Monitor U2419H - Black</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td colspan="3">Dell Monitor U2419H - Black</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td colspan="3">Dell Monitor U2419H - Black</td>
                    <td>12</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-default text-white button-save--modal "
              >
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
