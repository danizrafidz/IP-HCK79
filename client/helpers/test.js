

// The HTML content
const htmlContent = `
<div class="col-xl-4 col-md-6">
    <div class="card">
      <span style="display: none" class="module-tags">intro to academy fundamental</span>
      <span style="display: none" class="module-diff">all fundamental</span>
      <span style="display: none" class="module-category">all 3</span>
      <span style="display: none" class="module-tier">all 0</span>
      <span style="display: none" class="module-size">all regular</span>
      <span style="display: none" class="module-status">all </span>

      <div style="position: absolute; top: 10px; left: 5px; width:100%;" class="d-flex align-items-center">
        <span
          style="position: absolute; top: -7px; right: 10px; background: #0a121c; border-radius: 30px; padding:10px;">
          <i style="cursor:pointer;" data-module-id="15" data-toggle="tooltip"
            data-title="Add to my Favorite Modules list"
            class="favouriteBtn font-size-18 float-right  fa-sharp fa-solid  fa-heart text-danger"
            data-original-title="" title=""></i>
        </span>
      </div>
      <a href="https://academy.hackthebox.com/module/details/15"><img class="card-img-top img-fluid module-logo"
          src="/storage/modules/15/logo.png" alt="Intro to Academy"></a>
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <h4 class="card-title mt-0">
              <a class="text-dark" href="https://academy.hackthebox.com/module/details/15">Intro to Academy</a>
            </h4>
          </div>
          <div class="col-12">

            <p class="card-text">

            </p>
            <p class="card-text" style="line-height: 1.8">
              <span class="badge mr-1 badge-soft-dark font-size-13">Tier 0</span>
              <span class="badge mr-1 badge-soft-success font-size-13">Fundamental</span>
              <span class="badge mr-1 badge-soft-success font-size-13" data-toggle="tooltip"
                data-title="General module covering various topics" data-original-title="" title="">General</span>
              <span class="badge mr-1 badge-soft-dark font-size-12">8 Sections</span>
              <span class="badge badge-soft-secondary font-size-12" data-toggle="tooltip"
                data-title="You will be rewarded with this number of Cubes after completing the module"
                data-original-title="" title=""><i class="fad fa-cube text-success mr-1"></i>+10 </span>
              <span class="badge ml-1 mr-1 mt-1 badge-soft-dark font-size-12">30 minutes</span>
            </p>
          </div>

          <div class="col-12 tags-container">
          </div>
        </div>
      </div>

      <div class="custom-card-footer bg-color-blue-nav">
        <div class="row">
          <div class="col-lg-8">
            <div class="bg-progress progress animated-progess mt-2 my-2" data-toggle="tooltip"
              data-title="0 / 8 complete" data-original-title="" title="">
              <div class="progress-bar bg-success" role="progressbar" style="width: 0%"></div>
            </div>
          </div>
          <div class="col-lg-4">
            <a id="startModule-15" class="text-muted  d-block " href="https://academy.hackthebox.com/module/15">
              <button class="btn btn-block btn-primary btn-sm">
                Start
              </button>
            </a>
            <button id="unlockModule-15" class="unlockModuleBtn btn btn-outline-success btn-sm w-100 align-items-center
                                                                                            justify-content-center
                                                                                             d-none "
              data-module-id="15" data-module-name="Intro to Academy" data-module-cubes="10">
              <i class="fad fa-cube mr-1" style="margin-top: 2px"></i> Unlock
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>



  <div class="col-xl-4 col-md-6">
    <div class="card">
      <span style="display: none" class="module-tags">intro to academy's purple modules medium</span>
      <span style="display: none" class="module-diff">all medium</span>
      <span style="display: none" class="module-category">all 4</span>
      <span style="display: none" class="module-tier">all 0</span>
      <span style="display: none" class="module-size">all threat_spotlight</span>
      <span style="display: none" class="module-status">all new </span>

      <div style="position: absolute; top: 10px; left: 5px; width:100%;" class="d-flex align-items-center">
        <span class="badge bg-success text-light p-1 mr-1 font-size-11">NEW</span>
        <span
          style="position: absolute; top: -7px; right: 10px; background: #0a121c; border-radius: 30px; padding:10px;">
          <i style="cursor:pointer;" data-module-id="257" data-toggle="tooltip"
            data-title="Add to my Favorite Modules list"
            class="favouriteBtn font-size-18 float-right  fa-regular  fa-heart text-danger" data-original-title=""
            title=""></i>
        </span>
        <span class="badge mx-1 badge-soft-secondary font-size-11 color-white mr-1" data-toggle="tooltip"
          data-placement="top" title=""
          data-original-title="Bite-sized, laser-focused modules on critical vulnerabilities in the wild">
          <span class="d-inline-flex align-items-center flex-nowrap font-size-13">
            <img src="/images/skull.svg" class="mr-1" height="14" width="14" alt="threat-spotlight tag">Threat Spotlight
          </span>
        </span>
      </div>
      <a href="https://academy.hackthebox.com/module/details/257"><img class="card-img-top img-fluid module-logo"
          src="/storage/modules/257/logo.png" alt="Intro to Academy's Purple Modules"></a>
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <h4 class="card-title mt-0">
              <a class="text-dark" href="https://academy.hackthebox.com/module/details/257">Intro to Academy's Purple
                Modules</a>
            </h4>
          </div>
          <div class="col-12">

            <p class="card-text">

            </p>
            <p class="card-text" style="line-height: 1.8">
              <span class="badge mr-1 badge-soft-dark font-size-13">Tier 0</span>
              <span class="badge mr-1 badge-soft-warning font-size-13">Medium</span>
              <span class="badge mr-1 badge-soft-purple font-size-13" data-toggle="tooltip"
                data-title="Covers both attack and detection perspectives" data-original-title="" title="">Purple</span>
              <span class="badge mr-1 badge-soft-dark font-size-12">12 Sections</span>
              <span class="badge badge-soft-secondary font-size-12" data-toggle="tooltip"
                data-title="You will be rewarded with this number of Cubes after completing the module"
                data-original-title="" title=""><i class="fad fa-cube text-success mr-1"></i>+10 </span>
              <span class="badge ml-1 mr-1 mt-1 badge-soft-dark font-size-12">4 hours</span>
            </p>
          </div>

          <div class="col-12 tags-container">
          </div>
        </div>
      </div>

      <div class="custom-card-footer bg-color-blue-nav">
        <div class="row">
          <div class="col-lg-8">
            <div class="unlocksForBtn257 mb-2">
              <div class="btn-group btn-group-sm" role="group">
                <button class="unlockModuleBtn btn btn-light" data-module-id="257"
                  data-module-name="Intro to Academy's Purple Modules" data-module-cubes="10">Unlocks For
                </button>
                <button class="unlockModuleBtn btn btn-outline-light text-dark" data-module-id="257"
                  data-module-name="Intro to Academy's Purple Modules" data-module-cubes="10"><i
                    class="fad fa-cube text-success mr-1"></i>10
                </button>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <a id="startModule-257" class="text-muted  d-none " href="https://academy.hackthebox.com/module/257">
              <button class="btn btn-block btn-primary btn-sm">
                Start
              </button>
            </a>
            <button id="unlockModule-257" class="unlockModuleBtn btn btn-outline-success btn-sm w-100 align-items-center
                                                                                            justify-content-center
                                                                                             d-flex "
              data-module-id="257" data-module-name="Intro to Academy's Purple Modules" data-module-cubes="10">
              <i class="fad fa-cube mr-1" style="margin-top: 2px"></i> Unlock
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>



  <div class="col-xl-4 col-md-6">
    <div class="card">
      <span style="display: none" class="module-tags">attacking wpa/wpa2 wi-fi networks medium</span>
      <span style="display: none" class="module-diff">all medium</span>
      <span style="display: none" class="module-category">all 1</span>
      <span style="display: none" class="module-tier">all 3</span>
      <span style="display: none" class="module-size">all regular</span>
      <span style="display: none" class="module-status">all new </span>

      <div style="position: absolute; top: 10px; left: 5px; width:100%;" class="d-flex align-items-center">
        <span class="badge bg-success text-light p-1 mr-1 font-size-11">NEW</span>
        <span
          style="position: absolute; top: -7px; right: 10px; background: #0a121c; border-radius: 30px; padding:10px;">
          <i style="cursor:pointer;" data-module-id="282" data-toggle="tooltip"
            data-title="Add to my Favorite Modules list"
            class="favouriteBtn font-size-18 float-right  fa-regular  fa-heart text-danger" data-original-title=""
            title=""></i>
        </span>
      </div>
      <a href="https://academy.hackthebox.com/module/details/282"><img class="card-img-top img-fluid module-logo"
          src="/storage/modules/282/logo.png" alt="Attacking WPA/WPA2 Wi-Fi Networks"></a>
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <h4 class="card-title mt-0">
              <a class="text-dark" href="https://academy.hackthebox.com/module/details/282">Attacking WPA/WPA2 Wi-Fi
                Networks</a>
            </h4>
          </div>
          <div class="col-12">

            <p class="card-text">

            </p>
            <p class="card-text" style="line-height: 1.8">
              <span class="badge mr-1 badge-soft-primary font-size-13">Tier III</span>
              <span class="badge mr-1 badge-soft-warning font-size-13">Medium</span>
              <span class="badge mr-1 badge-soft-danger font-size-13" data-toggle="tooltip"
                data-title="Focuses on offensive security practices" data-original-title="" title="">Offensive</span>
              <span class="badge mr-1 badge-soft-dark font-size-12">15 Sections</span>
              <span class="badge badge-soft-secondary font-size-12" data-toggle="tooltip"
                data-title="You will be rewarded with this number of Cubes after completing the module"
                data-original-title="" title=""><i class="fad fa-cube text-success mr-1"></i>+100 </span>
              <span class="badge ml-1 mr-1 mt-1 badge-soft-dark font-size-12">2 days</span>
            </p>
          </div>

          <div class="col-12 tags-container">
          </div>
        </div>
      </div>

      <div class="custom-card-footer bg-color-blue-nav">
        <div class="row">
          <div class="col-lg-8">
            <div class="unlocksForBtn282 mb-2">
              <div class="btn-group btn-group-sm" role="group">
                <button class="unlockModuleBtn btn btn-light" data-module-id="282"
                  data-module-name="Attacking WPA/WPA2 Wi-Fi Networks" data-module-cubes="500">Unlocks For
                </button>
                <button class="unlockModuleBtn btn btn-outline-light text-dark" data-module-id="282"
                  data-module-name="Attacking WPA/WPA2 Wi-Fi Networks" data-module-cubes="500"><i
                    class="fad fa-cube text-success mr-1"></i>500
                </button>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <a id="startModule-282" class="text-muted  d-none " href="https://academy.hackthebox.com/module/282">
              <button class="btn btn-block btn-primary btn-sm">
                Start
              </button>
            </a>
            <button id="unlockModule-282" class="unlockModuleBtn btn btn-outline-success btn-sm w-100 align-items-center
                                                                                            justify-content-center
                                                                                             d-flex "
              data-module-id="282" data-module-name="Attacking WPA/WPA2 Wi-Fi Networks" data-module-cubes="500">
              <i class="fad fa-cube mr-1" style="margin-top: 2px"></i> Unlock
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

// Function to extract JSON from the HTML
function extractModulesFromHTML(html) {
  // Create a temporary DOM parser
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Find all module cards
  const modules = [...doc.querySelectorAll(".col-xl-4.col-md-6")];

  // Extract required data
  const result = modules.map((module) => {
    const detailLink = module.querySelector("a").href;
    const imageUrl = module.querySelector("img").src;

    return {
      detail: detailLink,
      imageUrl: `https://academy.hackthebox.com${imageUrl}`,
    };
  });

  return result;
}

// Extract JSON
const modulesJSON = extractModulesFromHTML(htmlContent);

// Log the result
console.log(JSON.stringify(modulesJSON, null, 2));
