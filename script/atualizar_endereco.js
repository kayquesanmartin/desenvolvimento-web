document.getElementById("open_btn").addEventListener("click", function () {
  document.getElementById("sidebar").classList.toggle("open-sidebar");
});

// Função que é chamada quando o botão de logout é clicado
document.getElementById("logout_btn").addEventListener("click", function () {
  // Remover dados de autenticação (exemplo com localStorage)
  localStorage.removeItem("user"); // Se você estiver usando localStorage para armazenar o token do usuário
  sessionStorage.removeItem("userSession"); // Se você estiver usando sessionStorage para sessão temporária

  // Redirecionar o usuário para a página de login ou home
  window.location.href = "../view/login.html"; // Altere para a página de login ou home desejada
});

document.addEventListener("DOMContentLoaded", function () {
  // Recupera o objeto do usuário armazenado no localStorage
  const user = JSON.parse(localStorage.getItem("user")); // Assumindo que os dados do usuário estão no localStorage como um objeto JSON

  if (user && user.user.name) {
    // Se o objeto de usuário existir e tiver o campo 'name', exibimos no header
    document.getElementById("user-name-nav").textContent = user.user.name;
  } else {
    // Caso não haja dados no localStorage ou nome, pode exibir uma mensagem padrão
    document.getElementById("user-name-nav").textContent = "Visitante!";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Recupera o objeto do usuário armazenado no localStorage
  const user = JSON.parse(localStorage.getItem("user")); // Assumindo que os dados do usuário estão no localStorage como um objeto JSON

  if (user && user.user.email) {
    // Se o objeto de usuário existir e tiver o campo 'name', exibimos no header
    document.getElementById("user-email-nav").textContent = user.user.email;
  } else {
    // Caso não haja dados no localStorage ou nome, pode exibir uma mensagem padrão
    document.getElementById("user-email-nav").textContent =
      "Bem-vindo, visitante!";
  }
});

async function atualizarEndereco() {
  const title = document.getElementById("title").value;
  const cep = document.getElementById("cep").value;
  const address = document.getElementById("address").value;
  const number = document.getElementById("number").value;
  const complement = document.getElementById("complement").value;

  if (!title || !cep || !address || !number) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  const addressId = document.getElementById("addressId").value;

  const data = {
    title: title,
    cep: cep,
    address: address,
    number: number,
    complement: complement,
  };

  const storedData = JSON.parse(localStorage.getItem("user"));
  const token = storedData ? storedData.access_token : null;

  if (!token) {
    alert("Token de acesso não encontrado. Faça login novamente.");
    return;
  }

  try {
    const response = await fetch(
      `https://go-wash-api.onrender.com/api/auth/address/${addressId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log("Success:", result);
      alert("Endereço atualizado com sucesso! :)");
    } else {
      const result = await response.json();
      console.error("Error:", result);
      alert("Ocorreu um erro ao atualizar o endereço. :( ");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Ocorreu um erro ao cadastrar o endereço.");
  }
}
