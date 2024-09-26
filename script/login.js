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

    const liveserver = "http://127.0.0.1:5500";
    const origin =
      "file:///home/kayque/Documents/dev/desenvolvimento-web/index.html";

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

      // Verifica se há erros retornados pela API
      if (result && result.data && result.data.errors) {
        const errors = result.data.errors;

        if (errors === "Usuário não está ativo") {
          return alert("Usuário não está ativo");
        } else if (errors === "Usuário não foi encontrado") {
          return alert("Usuário não foi encontrado");
        }
      }

      console.log(result);

      // Redirecionamento com base no sucesso do login
      if (result.access_token) {
        localStorage.setItem("access_token", result.access_token); // Corrigido o uso do access_token
        localStorage.setItem("user", result.user.id);

        // Verifica se o ambiente é o liveserver ou o origin
        const currentLocation = window.location.href;

        if (currentLocation.startsWith(liveserver)) {
          console.log("Redirecionando para: " + liveserver + "/index.html");
          window.location.href = liveserver + "/index.html";
        } else if (currentLocation.startsWith("file://")) {
          console.log("Redirecionando para: " + origin);
          window.location.href = origin; // Redireciona para o arquivo local
        } else {
          console.log(
            "Ambiente não reconhecido, redirecionando para a página padrão."
          );
          window.location.href = liveserver + "/index.html"; // Ponto de redirecionamento padrão
        }
      } else {
        alert(result.message || "Erro desconhecido");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
