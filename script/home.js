document.getElementById("open_btn").addEventListener("click", function () {
  document.getElementById("sidebar").classList.toggle("open-sidebar");
});

document.addEventListener("DOMContentLoaded", function() {
  // Recupera o objeto do usuário armazenado no localStorage
  const user = JSON.parse(localStorage.getItem("user")); // Assumindo que os dados do usuário estão no localStorage como um objeto JSON

  if (user && user.user.name) {
    // Se o objeto de usuário existir e tiver o campo 'name', exibimos no header
    document.getElementById("user-name-header").textContent = "Bem-vindo, " + user.user.name;
  } else {
    // Caso não haja dados no localStorage ou nome, pode exibir uma mensagem padrão
    document.getElementById("user-name-header").textContent = "Bem-vindo, visitante!";
  }

  if (user && user.user.name) {
    // Se o objeto de usuário existir e tiver o campo 'name', exibimos no header
    document.getElementById("user-name-nav").textContent = user.user.name;
  } else {
    // Caso não haja dados no localStorage ou nome, pode exibir uma mensagem padrão
    document.getElementById("user-name-nav").textContent = "Bem-vindo, visitante!";
  }

});







