'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar toggle
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// filtering logic
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

// toggle dropdown
select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// common filtering function
const filterFunc = function (selectedValue) {
  filterItems.forEach(item => {
    const category = item.dataset.category.toLowerCase();
    if (selectedValue === "all" || selectedValue === category) {
      item.classList.add("active");
      item.style.display = "block";
    } else {
      item.classList.remove("active");
      item.style.display = "none";
    }
  });
}

// dropdown filter
selectItems.forEach(item => {
  item.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

// button filter
let lastClickedBtn = filterBtn[0];
filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

    filterFunc(selectedValue);
  });
});

// contact form validation
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", function () {
    formBtn.disabled = !form.checkValidity();
  });
});

// navigation logic
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link, index) => {
  link.addEventListener("click", function () {
    pages.forEach(page => page.classList.remove("active"));
    navigationLinks.forEach(nav => nav.classList.remove("active"));

    const pageName = this.innerHTML.toLowerCase();

    // Change "achievements" to match the new label
    pages.forEach(page => {
      // Support both "blog" and "achievements" for backward compatibility
      if (
        page.dataset.page === pageName ||
        (pageName === "achievements" && page.dataset.page === "blog")
      ) {
        page.classList.add("active");
        window.scrollTo(0, 0);
      }
    });

    this.classList.add("active");
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Certificate Modal Logic
  const certLinks = document.querySelectorAll('.project-item[data-filter-item][data-category="Certifications"] a[data-certificate-img]');
  const certModal = document.getElementById('certificate-modal');
  const certModalImg = document.getElementById('certificate-modal-img');
  const certModalClose = document.getElementById('certificate-modal-close');
  const certModalOverlay = document.getElementById('certificate-modal-overlay');

  certLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const imgSrc = this.getAttribute('data-certificate-img');
      if (imgSrc) {
        certModalImg.src = imgSrc;
        certModal.classList.add('active');
      }
    });
  });

  function closeCertModal() {
    certModal.classList.remove('active');
    certModalImg.src = '';
  }

  certModalClose.addEventListener('click', closeCertModal);
  certModalOverlay.addEventListener('click', closeCertModal);

  // Certificate Modal Logic for Resume Experience
  const expCertThumbs = document.querySelectorAll('.certificate-thumb[data-certificate-img]');
  expCertThumbs.forEach(thumb => {
    thumb.addEventListener('click', function (e) {
      e.preventDefault();
      const imgSrc = this.getAttribute('data-certificate-img');
      if (imgSrc) {
        certModalImg.src = imgSrc;
        certModal.classList.add('active');
      }
    });
  });

  // --- Project Details Modal for Flight Price Prediction ---
  let projectModal = document.getElementById('project-details-modal');
  if (!projectModal) {
    projectModal = document.createElement('div');
    projectModal.id = 'project-details-modal';
    projectModal.className = 'certificate-modal';
    projectModal.innerHTML = `
      <div class="certificate-modal-overlay" id="project-details-modal-overlay"></div>
      <div class="certificate-modal-content" style="max-width:700px;align-items:stretch;">
        <button class="certificate-modal-close" id="project-details-modal-close">
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <div id="project-details-modal-body"></div>
      </div>
    `;
    document.body.appendChild(projectModal);
  }

  const flightDetails = `
    <div>
      <h2>Flight Fare Prediction System</h2>
      <div class="project-section">
        <div class="project-section-title"><span>📚</span> <span>Project Description</span></div>
        <div>
          The Flight Fare Prediction System is a Web Application designed to aid users in estimating flight fares based on various parameters. This tool utilizes machine learning models to predict prices for a flight, offering users a convenient way to gauge their travel expenses in advance.<br><br>
          The application comprises both a powerful backend for training and evaluating models, and a simple, user-friendly frontend for retrieving price estimates.
        </div>
      </div>
      <div class="project-section">
        <div class="project-section-title"><span>🌟</span> <span>Features</span></div>
        <ul>
          <li><span class="feature-badge">✅ Predictions Based on Multiple Factors</span> Provides price estimates by analyzing key factors such as:
            <ul>
              <li>Airline</li>
              <li>Flight Number</li>
              <li>Source and Destination Cities</li>
              <li>Departure Time</li>
              <li>Arrival Time</li>
              <li>Number of Stops</li>
              <li>Class of Flight (Economy, Business, etc.)</li>
              <li>Duration</li>
              <li>Number of Days Left Before Departure</li>
            </ul>
          </li>
          <li><span class="feature-badge">✅ Ensemble Model Approach</span> Utilizes multiple regression models — including Linear Regression, AdaBoost, Extra Trees, Lasso, Decision Tree, Random Forest, Gradient Boosting, KNN, and XGBoost — and then produces an average of their predictions for greater accuracy.</li>
          <li><span class="feature-badge">✅ Automated Data Preprocessing</span>
            <ul>
              <li>Categorical variables are label-encoded.</li>
              <li>Numerical variables are cleaned and parsed.</li>
              <li>Time-related columns are standardized.</li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="project-section project-implementation">
        <div class="project-section-title"><span>🛡</span> <span>Tech Stack</span></div>
        <ul>
          <li><span class="feature-badge">✅ Python (Flask) for Web Application</span> Flask forms the lightweight framework for routing, API endpoints, and rendering HTML.</li>
          <li><span class="feature-badge">✅ Scikit-Learn and XGBoost for Machine Learning</span> Provides a range of powerful regression models for training and evaluating the algorithm’s performance.</li>
          <li><span class="feature-badge">✅ Pandas and NumPy for Data Manipulation</span> Offers fast and flexible data structures for processing tabular data.</li>
          <li><span class="feature-badge">✅ Joblib for Model Persistence</span> Allows us to save trained models efficiently and reuse them without needing to train every time.</li>
          <li><span class="feature-badge">✅ Jinja2 for Templating</span> Generates dynamic HTML content for the frontend.</li>
        </ul>
      </div>
      <div style="text-align:center;margin-top:24px;">
        <a href="https://drive.google.com/file/d/10FbeCeWHrbLNqPGmfrkScj_7KN7XHarZ/view?usp=drive_link" 
           target="_blank"
           style="display:inline-block;background:var(--orange-yellow-crayola);color:#232526;font-weight:600;padding:10px 26px;border:none;border-radius:8px;cursor:pointer;font-size:1.08rem;box-shadow:0 2px 8px 0 rgba(0,0,0,0.10);transition:background 0.2s;text-decoration:none;">
          View Complete Project PDF
        </a>
      </div>
    </div>
  `;

  const flightProject = Array.from(document.querySelectorAll('.project-item[data-filter-item][data-category="Projects"]'))
    .find(item => {
      const title = item.querySelector('.project-title');
      return title && title.textContent.trim().toLowerCase().includes('flight price prediction');
    });

  if (flightProject) {
    flightProject.querySelector('a').addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('project-details-modal-body').innerHTML = flightDetails;
      projectModal.classList.add('active');
    });
  }

  // Fix the ID from project-details-modal_close to project-details-modal-close
  document.getElementById('project-details-modal-close').onclick = function () {
    projectModal.classList.remove('active');
    document.getElementById('project-details-modal-body').innerHTML = '';
  };
  
  document.getElementById('project-details-modal-overlay').onclick = function () {
    projectModal.classList.remove('active');
    document.getElementById('project-details-modal-body').innerHTML = '';
  };
});
