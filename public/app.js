const nameField = document.getElementById("name");
const emailField = document.getElementById("email");

const saveButton = document.getElementById("save");

const idField = document.getElementById("id");
const updateButton = document.getElementById("update");
const deleteButton = document.getElementById("delete");

const usersDisplay = document.getElementById("users");

saveButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const name = nameField.value;
  const email = emailField.value;

  try {
    const response = await fetch("http://localhost:8080/user/saveUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // necessary (CSE 312)
      },
      body: JSON.stringify({ name, email }),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);

    displayUsers();
  } catch (error) {
    console.error(error.message);
  }
});

updateButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const _id = idField.value;

  const name = nameField.value;
  const email = emailField.value;

  try {
    const response = await fetch("http://localhost:8080/user/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id, name, email }),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);

    displayUsers();
  } catch (error) {
    console.error(error.message);
  }
});

deleteButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const _id = idField.value;

  try {
    const response = await fetch("http://localhost:8080/user/deleteUser", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // necessary (CSE 312)
      },
      body: JSON.stringify({ _id }),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);

    displayUsers();
  } catch (error) {
    console.error(error.message);
  }
});

const displayUsers = async () => {
  usersDisplay.innerHTML = "";

  const users = await getUsers();

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const userElem = document.createElement("div");
    userElem.innerHTML = `
      <div class="user">
        <span>Name: ${user.name}</span>
        <span>Email: ${user.email}</span>
        <span>_id: ${user._id}</span>
      </div>
      `;
    usersDisplay.append(userElem);
  }
};

const getUsers = async () => {
  try {
    const response = await fetch("http://localhost:8080/user/getUsers");

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const users = await response.json();

    return users;
  } catch (error) {
    console.error(error.message);
  }
};

displayUsers();
