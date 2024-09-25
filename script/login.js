async function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Todos os campos devem ser preenchidos");
  } else {
    const data = {
      email: email,
      password: password,
      user_type_id: 1,
    };

    let locationInfo = location;
    console.log(locationInfo);

    try {
      let url = "https://go-wash-api.onrender.com/api/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", result.user.id); // Armazena o id do usuário no localStorage
        window.location.href = "../index.html";
      } else {
        alert(result.message || "Erro desconhecido");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
