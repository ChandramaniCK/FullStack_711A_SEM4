
// Default Jobs

const defaultJobs = [
    { title: "Frontend Developer", company: "TechCorp", location: "Bangalore", salary: "8 LPA", experience: "2 Years" },
    { title: "Data Analyst", company: "Analytics Pro", location: "Pune", salary: "6 LPA", experience: "1 Year" },
    { title: "Marketing Manager", company: "BrandWorks", location: "Mumbai", salary: "10 LPA", experience: "4 Years" },
    { title: "Backend Developer", company: "CodeBase", location: "Hyderabad", salary: "9 LPA", experience: "3 Years" }
];

// Load or Initialize Jobs

if (!localStorage.getItem("jobs")) {
    localStorage.setItem("jobs", JSON.stringify(defaultJobs));
}

let jobs = JSON.parse(localStorage.getItem("jobs"));



// DOM Elements

const jobContainer = document.getElementById("jobContainer");
const jobCount = document.getElementById("jobCount");
const searchInput = document.getElementById("searchInput");
const jobForm = document.getElementById("jobForm");
const errorText = document.getElementById("error");


// Save Jobs

function saveJobs() {
    localStorage.setItem("jobs", JSON.stringify(jobs));
}


// Update Count

function updateJobCount() {
    if (jobCount) {
        jobCount.textContent = "Total Jobs: " + jobs.length;
    }
}


// Create Job Card

function createJobCard(job, index) {
    const card = document.createElement("article");
    card.className = "job-card";

    card.innerHTML = `
        <h3>${job.title}</h3>
        <p class="company">${job.company}</p>
        <p>${job.location}</p>
        <p><strong>Salary:</strong> ${job.salary}</p>
        <p><strong>Experience:</strong> ${job.experience}</p>

        <div class="job-actions">
            <button onclick="openApplyForm('${job.title}')">Apply</button>
            <button onclick="deleteJob(${index})">Delete</button>
        </div>
    `;
    return card;
}


// Render Jobs

function renderJobs() {
    if (!jobContainer) return;

    jobContainer.innerHTML = "";
    jobs.forEach((job, index) => {
        jobContainer.appendChild(createJobCard(job, index));
    });

    updateJobCount();
}


// Delete Job

function deleteJob(index) {
    jobs.splice(index, 1);
    saveJobs();
    renderJobs();
}


// Add Job

if (jobForm) {
    jobForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const title = document.getElementById("title").value.trim();
        const company = document.getElementById("company").value.trim();
        const location = document.getElementById("location").value.trim();
        const salary = document.getElementById("salary").value.trim();
        const experience = document.getElementById("experience").value.trim();

        if (!title || !company || !location || !salary || !experience) {
            errorText.textContent = "All fields required!";
            return;
        }

        jobs.push({ title, company, location, salary, experience });
        saveJobs();
        renderJobs();
        jobForm.reset();
        errorText.textContent = "";
    });
}


// Search Function

if (searchInput) {
    searchInput.addEventListener("keyup", function () {
        const value = searchInput.value.toLowerCase();

        const filtered = jobs.filter(job =>
            Object.values(job).join(" ").toLowerCase().includes(value)
        );

        jobContainer.innerHTML = "";
        filtered.forEach((job, index) => {
            jobContainer.appendChild(createJobCard(job, index));
        });
    });
}


// Homepage Featured Jobs

const featuredContainer = document.getElementById("featuredJobs");

if (featuredContainer) {
    jobs.slice(0, 3).forEach(job => {
        const card = document.createElement("article");
        card.className = "job-card";
        card.innerHTML = `
            <h3>${job.title}</h3>
            <p class="company">${job.company}</p>
            <p>${job.location}</p>
            <p><strong>Salary:</strong> ${job.salary}</p>
        `;
        featuredContainer.appendChild(card);
    });
}

// Apply Form Popup

function openApplyForm(jobTitle) {
    const name = prompt("Enter your name to apply for " + jobTitle);
    if (name) {
        alert("Application submitted successfully!");
    }
}


renderJobs();