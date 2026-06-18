async function loadUsers() {
    try {
        const response = await fetch("/users");
        const users = await response.json();

        let rows = "";
        
        users.forEach(user => {
            rows += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.age}</td>
                    <td>${user.city}</td>
                    <td>${user.email}</td>
                </tr>
            `;
        });

        // Insert the rows into the table body
        document.getElementById("usersTable").innerHTML = rows;

    } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to load user data.");
    }
}

// Run the function immediately when the page loads
loadUsers();