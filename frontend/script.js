const BASE_URL = "http://localhost:5000";


// REGISTER
async function registerUser() {

  alert("Register Button Working");

  window.location.href = "login.html";

}


// LOGIN
async function loginUser() {

  alert("Login Button Working");

  window.location.href = "dashboard.html";

}


// SUBMIT COMPLAINT
async function submitComplaint() {

  const data = {

    studentName: document.getElementById(
      "studentName"
    ).value,

    roomNumber: document.getElementById(
      "roomNumber"
    ).value,

    category: document.getElementById(
      "category"
    ).value,

    description: document.getElementById(
      "description"
    ).value

  };

  try {

    const response = await fetch(
      "http://localhost:5000/api/complaints/submit",
      {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

      }
    );

    const result = await response.json();

    alert(result.message);

    // WAIT THEN REDIRECT
    if (response.ok) {

      setTimeout(() => {

        window.location.href = "admin.html";

      }, 500);

    }

  } catch (error) {

    console.log(error);

    alert("Complaint submission failed");

  }

}