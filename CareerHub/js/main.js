const jobForm = document.getElementById("jobForm");
const titleInput = document.getElementById("title");
const companyInput = document.getElementById("company");
const locationInput = document.getElementById("location");
const jobContainer = document.getElementById("jobContainer");
const jobCount = document.getElementById("jobCount");
const errorText = document.getElementById("error");

function updateJobCount() {
    jobCount.textContent = "Total Jobs: " + document.querySelectorAll(".job-card").length;
}

jobForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const company = companyInput.value.trim();
    const location = locationInput.value.trim();

    if (title === "" || company === "" || location === "") {
        errorText.textContent = "All fields are required";
        return;
    }

    errorText.textContent = "";

    const job = document.createElement("article");
    job.className = "job-card";

    job.innerHTML = `
        <h3>${title}</h3>
        <p class="company">${company}</p>
        <p>${location}</p>
        <button class="applyBtn">Apply</button>
        <button class="deleteBtn">Delete</button>
    `;

    jobContainer.appendChild(job);
    jobForm.reset();
    updateJobCount();
});

jobContainer.addEventListener("click", function (e) {
    if (e.target.className === "applyBtn") {
        e.target.textContent = "Applied";
        e.target.disabled = true;
    }

    if (e.target.className === "deleteBtn") {
        e.target.parentElement.remove();
        updateJobCount();
    }
});

updateJobCount();