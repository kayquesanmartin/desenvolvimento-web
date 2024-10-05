document.getElementById("open_btn").addEventListener("click", function () {
  document.getElementById("sidebar").classList.toggle("open-sidebar");
});


document.addEventListener("DOMContentLoaded", function() {
  // Recupera o objeto do usuário armazenado no localStorage
  const user = JSON.parse(localStorage.getItem("user")); // Assumindo que os dados do usuário estão no localStorage como um objeto JSON

  if (user && user.user.name) {
    // Se o objeto de usuário existir e tiver o campo 'name', exibimos no header
    document.getElementById("user-name-nav").textContent = user.user.name;
  } else {
    // Caso não haja dados no localStorage ou nome, pode exibir uma mensagem padrão
    document.getElementById("user-name-nav").textContent = "Bem-vindo, visitante!";
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

    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }

    const result = await response.json();
    console.log("Success:", result);
    alert("Endereço cadastrado com sucesso!");
  } catch (error) {
    console.error("Error:", error);
    alert("Ocorreu um erro ao cadastrar o endereço.");
  }
}
