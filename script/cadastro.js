async function cadastro() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let cpf_cnpj = document.getElementById("cpf_cnpj").value;
  let birthday = document.getElementById("birthday").value;
  let terms = document.getElementById("terms").checked;

  if (!terms) {
    alert("Você deve aceitar os termos de uso para continuar.");
    return;
  }

  const data = {
    name: name,
    email: email,
    password: password,
    cpf_cnpj: cpf_cnpj,
    user_type_id: 1,
    birthday: birthday,
    terms: terms,
  };

  try {
    let url = "https://go-wash-api.onrender.com/api/user";
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      let result = await response.json();
      alert("Cadastro realizado com sucesso!");
      console.log(result.data);
    } else {
      const result = await response.json();

      if (result && result.data && result.data.errors) {
        const errors = result.data.errors;

        if (typeof errors === "string") {
          if (errors.includes("cpf_cnpj")) {
            return alert("CPF/CNPJ inválido ou já cadastrado.");
          } else if (errors.includes("email")) {
            return alert("E-mail inválido ou já cadastrado.");
          }
        } else if (typeof errors === "object") {
          if (errors.email) {
            //return alert(errors.email);
            return alert("E-mail já cadastrado.");
          }
          if (errors.cpf_cnpj) {
            //return alert(errors.cpf_cnpj);
            return alert("CPF/CNPJ inválido ou já cadastrado.");
          }
        }
      }

      alert("Erro ao cadastrar: " + JSON.stringify(result.data.errors));
    }
  } catch (error) {
    console.error("Erro de rede inesperado: ", error);
    alert("Erro de rede inesperado. Verifique sua conexão e tente novamente.");
  }
}
