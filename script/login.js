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
    try {
      let url = "https://go-wash-api.onrender.com/api/login";
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      if (result.message == "Login efetuado com sucesso") {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", result.user.id);
        window.location.href = "../index.html";
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
