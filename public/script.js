document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = {
    name: document.getElementById("fullName").value,
    age: document.getElementById("age").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  try {
    const response = await fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });

    const data = await response.json();
    alert(data.message);

    if (response.ok) {
      document.getElementById("signupForm").reset();
      window.location.href = "/index.html"; // Send to login after signup
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
});