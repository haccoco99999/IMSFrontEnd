import React from 'react'

export default function () {
  return (
    <div className="home_content wrapper">
      <div className="text">
        {/* ############################ */}
        <div className="space-top-heading wrapper">
          {/* title  */}
          <div className="title-heading mt-2">
            <span>Report</span>
          </div>

          <nav>
            <div class=" d-flex  nav nav-tabs" id="nav-tab" role="tablist">
              <button class=" p-2 flex-fill nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">General Report</button>
              <button class=" p-2 flex-fill  nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
            </div>
          </nav>
          <div class="tab-content pt-4 pe-4" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">

              <div class="card">
                <h5 class="card-header">Stock take value chart</h5>
                <div class="card-body">
                  <iframe width="100%" height="850" src="https://datastudio.google.com/embed/reporting/fbfb7534-6e92-409b-9c97-5abcba98a937/page/A8TUC" frameborder="0" allowfullscreen></iframe>

                </div>
              </div>

            </div>
            <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
              hehehhee
            </div>

          </div>
        </div>


        {/* ################################# */}
      </div>
    </div>
  );
}
