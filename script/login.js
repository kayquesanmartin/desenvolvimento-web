async function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Todos os campos devem ser preenchidos");
  } else {
    const data = {
      email: email,
      password: password,
      user_type_id: 1, // Mantém o user_type_id como padrão
    };

    try {
      let url = "https://go-wash-api.onrender.com/api/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(response.status);

      const result = await response.json();

      console.log(result);
      console.log(result.status);

      if (result && result.data && result.data.errors) {
        const errors = result.data.errors;

        if (errors === "Usuário não está ativo") {
          return alert("Usuário não está ativo");
        } else if (errors === "Usuário não foi encontrado") {
          return alert("Usuário não foi encontrado");
        } else {
          return alert("Erro: " + errors);
        }
      }

      if (result.access_token) {
        localStorage.setItem("access_token", result.access_token);
        localStorage.setItem("user", result.user.id);

        const origin = window.location.origin;
        console.log(origin);

        const currentLocation = window.location.href;
        console.log(currentLocation);

        window.location.href = "home.html";
      } else {
        alert("Erro: " + result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
