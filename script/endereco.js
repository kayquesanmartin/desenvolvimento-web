document.getElementById("open_btn").addEventListener("click", function () {
  document.getElementById("sidebar").classList.toggle("open-sidebar");
});

document.getElementById("logout_btn").addEventListener("click", function () {
  localStorage.removeItem("user");
  sessionStorage.removeItem("userSession");
  window.location.href = "../view/login.html";
});

document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.user.name) {
    document.getElementById("user-name-nav").textContent = user.user.name;
  } else {
    document.getElementById("user-name-nav").textContent = "Visitante!";
  }

  if (user && user.user.email) {
    document.getElementById("user-email-nav").textContent = user.user.email;
  } else {
    document.getElementById("user-email-nav").textContent =
      "Bem-vindo, visitante!";
  }
});

async function cadastraEndereco() {
  const title = document.getElementById("title").value;
  const cep = document.getElementById("cep").value;
  const address = document.getElementById("address").value;
  const number = document.getElementById("number").value;
  const complement = document.getElementById("complement").value;

  if (!title || !cep || !address || !number) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  const data = { title, cep, address, number, complement };
  const storedData = JSON.parse(localStorage.getItem("user"));
  const token = storedData ? storedData.access_token : null;

  if (!token) {
    alert("Token de acesso não encontrado. Faça login novamente.");
    return;
  }

  try {
    const response = await fetch(
      "https://go-wash-api.onrender.com/api/auth/address",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok)
      throw new Error("Erro ao cadastrar endereço: " + response.statusText);

    alert("Endereço cadastrado com sucesso!");
    window.location.href = "listar_enderecos.html";
  } catch (error) {
    alert("Ocorreu um erro ao cadastrar o endereço.");
    console.error("Erro:", error);
  }
}
