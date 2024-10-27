document.getElementById("open_btn").addEventListener("click", function () {
  document.getElementById("sidebar").classList.toggle("open-sidebar");
});

document.getElementById("logout_btn").addEventListener("click", function () {
  localStorage.removeItem("user");
  sessionStorage.removeItem("userSession");
  window.location.href = "../view/login.html";
});

document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.getElementById("save-btn");

  if (saveButton) {
    saveButton.addEventListener("click", function (event) {
      event.preventDefault();
      const id = saveButton.getAttribute("data-id"); // Obtém o ID armazenado no botão
      saveEditedAddress(id);
    });
  } else {
    console.error("Erro: O elemento 'save-btn' não foi encontrado.");
  }

  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.user.name) {
    document.getElementById("user-name-header").textContent = user.user.name;
    document.getElementById("user-name-nav").textContent = user.user.name;
  } else {
    document.getElementById("user-name-header").textContent =
      "Bem-vindo, visitante!";
    document.getElementById("user-name-nav").textContent = "Visitante!";
  }

  if (user && user.user.email) {
    document.getElementById("user-email-nav").textContent = user.user.email;
  } else {
    document.getElementById("user-email-nav").textContent =
      "Bem-vindo, visitante!";
  }
});

async function loadAddresses() {
  const storedData = JSON.parse(localStorage.getItem("user"));
  const token = storedData ? storedData.access_token : null;

  if (!token) {
    alert("Token de acesso não encontrado. Faça login novamente.");
    window.location.href = "../view/login.html";
    return;
  }

  try {
    const response = await fetch(
      "https://go-wash-api.onrender.com/api/auth/address",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok)
      throw new Error("Erro ao buscar endereços: " + response.statusText);

    const addresses = await response.json();
    displayAddresses(addresses);
  } catch (error) {
    document.getElementById("address-list").innerHTML =
      "Erro ao carregar os endereços.";
    console.error("Erro:", error);
  }
}

function displayAddresses(data) {
  const addressList = document.getElementById("address-list");
  addressList.innerHTML = "";

  const addresses = data.data || [];

  if (addresses.length === 0) {
    addressList.innerHTML = "<p>Nenhum endereço cadastrado.</p>";
    return;
  }

  addresses.forEach((address) => {
    const addressItem = document.createElement("div");
    addressItem.className = "address-item";
    addressItem.innerHTML = `
        <h3>${address.title}</h3>
        <p>${address.address}, ${address.number} ${
      address.complement || ""
    } CEP: ${address.cep}</p>
        <p>
          <button class="delete-btn" onclick="deleteAddress(${
            address.id
          })">Excluir</button>
          <button class="edit-btn" onclick="editAddress(${
            address.id
          })">Editar</button>
        </p>
      `;
    addressList.appendChild(addressItem);
  });
}

async function deleteAddress(id) {
  const storedData = JSON.parse(localStorage.getItem("user"));
  const token = storedData ? storedData.access_token : null;

  if (!token) {
    alert("Token de acesso não encontrado. Faça login novamente.");
    window.location.href = "../view/login.html";
    return;
  }

  try {
    const response = await fetch(
      `https://go-wash-api.onrender.com/api/auth/address/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.ok) {
      alert("Endereço excluído com sucesso!");
      loadAddresses();
    } else {
      const errorData = await response.json();
      alert(`Erro ao excluir endereço: ${errorData.message}`);
    }
  } catch (error) {
    alert("Erro ao excluir endereço.");
    console.error("Erro:", error);
  }
}

async function editAddress(id) {
  const storedData = JSON.parse(localStorage.getItem("user"));
  const token = storedData ? storedData.access_token : null;

  if (!token) {
    alert("Token de acesso não encontrado. Faça login novamente.");
    window.location.href = "../view/login.html";
    return;
  }

  try {
    const response = await fetch(
      `https://go-wash-api.onrender.com/api/auth/address/${id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.ok) {
      const address = await response.json();
      populateEditForm(address.data, id);
    } else {
      alert("Erro ao buscar dados do endereço.");
    }
  } catch (error) {
    console.error("Erro ao buscar endereço:", error);
    alert("Erro ao buscar endereço.");
  }
}

function populateEditForm(address, id) {
  document.getElementById("edit-form").style.display = "block";
  document.getElementById("title").value = address.title;
  document.getElementById("address").value = address.address;
  document.getElementById("number").value = address.number;
  document.getElementById("complement").value = address.complement;
  document.getElementById("cep").value = address.cep;

  document.getElementById("save-btn").style.display = "block";
  document.getElementById("save-btn").onclick = function () {
    saveEditedAddress(id);
  };
}

async function saveEditedAddress(id) {
  const storedData = JSON.parse(localStorage.getItem("user"));
  const token = storedData ? storedData.access_token : null;

  // Verifica a existência de cada elemento antes de acessar seu valor
  const titleElement = document.getElementById("title");
  const addressElement = document.getElementById("address");
  const numberElement = document.getElementById("number");
  const complementElement = document.getElementById("complement");
  const cepElement = document.getElementById("cep");

  if (
    !titleElement ||
    !addressElement ||
    !numberElement ||
    !complementElement ||
    !cepElement
  ) {
    console.error("Erro: Um ou mais elementos do formulário estão ausentes.");
    alert("Erro: Um ou mais campos do formulário não foram encontrados.");
    return;
  }

  const updatedAddress = {
    title: titleElement.value,
    address: addressElement.value,
    number: numberElement.value,
    complement: complementElement.value,
    cep: cepElement.value,
  };

  try {
    const response = await fetch(
      `https://go-wash-api.onrender.com/api/auth/address/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAddress),
      }
    );

    /*if (!response.ok) {
      const errorData = await response.json();
      console.error("Detalhes do erro:", errorData);
      alert(
        `Erro ao atualizar endereço: ${
          errorData.message || response.statusText
        }`
      );
      return;
    }*/

    if (response.ok) {
      alert("Endereço atualizado com sucesso!");
      loadAddresses();
    }
  } catch (error) {
    console.error("Erro:", error);
    alert(
      "Erro ao atualizar endereço. Verifique o console para mais detalhes."
    );
  }
}

document.addEventListener("DOMContentLoaded", loadAddresses);
