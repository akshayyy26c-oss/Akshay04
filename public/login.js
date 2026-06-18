document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const userCredentials = {
    email: document.getElementById("loginEmail").value,
    password: document.getElementById("loginPassword").value
  };

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userCredentials)
    });

    const data = await response.json();
    alert(data.message);

    if (response.ok) {
      window.location.href = "/view.html";
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong with the server.");
  }
});