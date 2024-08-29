(async () => {
  const getSubscriptions = async () => {
    try {
      const subscriptions = await fetch("/home/subscriptions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
      });
      return subscriptions.json();
    } catch (err) {
      console.error(err);
    }
  };

  const subscirptions = await getSubscriptions();
  console.log(subscirptions);

  const subscirptionsContainer = document.getElementById(
    "subscriptions-container"
  );
  subscirptions.forEach((sub) => {
    const subscirption = document.createElement("div");
    let status = "not used";
    if (sub.hashedValue) {
      status = "used";
    }
    if (new Date(sub.expiration_date) < new Date()) {
      status = "expired";
    }
    subscirption.innerHTML = `
        <div class="sub-container">
          <h3>${sub.full_name}</h3>
          <p>${sub.expiration_date}</p>
          <p>${sub.code}</p>
          <p>${status}</p>
          <button id="delete-button-${sub._id}" class="delete-sub-button">Delete</button>
        </div>
        `;
    subscirptionsContainer.appendChild(subscirption);
    const deleteButton = document.getElementById(`delete-button-${sub._id}`);
    deleteButton.addEventListener("click", async () => {
      // make confimatopn alert
      const confirmDelete = confirm("Are you sure you want to delete?");
      if (!confirmDelete) {
        return;
      }

      try {
        const response = await fetch(`/home/subscriptions/${sub._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
        });
        if (response.status === 200) {
          alert("Subscription deleted successfully");
          window.location.reload();
        }
      } catch (err) {
        console.error(err);
      }
    });
  });
  let code = "";

  const codeGeneratorButton = document.getElementById("code-generator");
  codeGeneratorButton.addEventListener("click", async () => {
    code = generateRandomString();
    document.getElementById("code").innerText = code;
  });

  function generateRandomString(length = 15) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  const addSubForm = document.getElementById("add-sub-form");
  addSubForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const full_name = document.getElementById("full_name").value;
    const expiration_date = document.getElementById("expiration_date").value;
    if (!full_name || !expiration_date || !code) {
      alert("Please fill all the fields");
      return;
    }
    const newSub = {
      full_name,
      expiration_date,
      code,
    };
    try {
      const response = await fetch("/home/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify(newSub),
      });
      if (response.status === 201) {
        alert("Subscription added successfully");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  });
})();
