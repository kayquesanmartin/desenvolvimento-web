async function cadastro() {
  // Obtém os valores dos campos do formulário usando seus IDs
  let name = document.getElementById("name").value; 
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let cpf_cnpj = document.getElementById("cpf_cnpj").value;
  let birthday = document.getElementById("birthday").value;
  let terms = document.getElementById("terms").checked; // Verifica se os termos foram aceitos

  // Verifica se todos os campos obrigatórios estão preenchidos
  if (!name || !email || !password || !cpf_cnpj || !birthday) { 
    alert("Todos os campos devem ser preenchidos.");
    return; // Interrompe a execução se algum campo estiver vazio
  }

  // Verifica se os termos de uso foram aceitos
  if (!terms) { 
    alert("Você deve aceitar os termos de uso para continuar.");
    return; // Interrompe a execução se os termos não forem aceitos
  }

  // Cria um objeto com os dados do usuário para enviar à API
  const data = {
    name: name,
    email: email,
    password: password,
    cpf_cnpj: cpf_cnpj,
    user_type_id: 1, // Tipo de usuário (deve ser apenas 1, especificado pela API)
    birthday: birthday,
    terms: terms,
  };

  try {
    // Define a URL da API onde os dados serão enviados
    let url = "https://go-wash-api.onrender.com/api/user";
    let response = await fetch(url, {
      method: "POST", // Método HTTP para criar um novo recurso
      body: JSON.stringify(data), // Converte o objeto de dados em uma string JSON
      headers: { 
        "Content-Type": "application/json", // Indica que o corpo da requisição é JSON
      },
    });

    // Verifica se a resposta da API foi bem-sucedida
    if (response.ok) { 
      let result = await response.json(); // Converte a resposta em JSON
      alert("Cadastro realizado com sucesso!"); // Alerta de sucesso
      console.log(result.data); // Exibe os dados retornados no console
    } else {
      const result = await response.json(); // Obtém os dados da resposta em caso de erro

      // Verifica se a resposta contém erros
      if (result && result.data && result.data.errors) {
        const errors = result.data.errors; // Armazena os erros para fácil acesso

        // Verifica se os erros são uma string
        if (typeof errors === "string") {
          if (errors.includes("cpf_cnpj")) {
            return alert("CPF/CNPJ inválido."); // Alerta específico para CPF/CNPJ
          } else if (errors.includes("email")) {
            return alert("E-mail inválido ou já cadastrado."); // Alerta específico para e-mail
          }
        } else if (typeof errors === "object") {
          // Se os erros são um objeto, verifica individualmente
          if (errors.email) {
            return alert("E-mail já cadastrado."); // Alerta se o e-mail já existe
          }
          if (errors.cpf_cnpj) {
            return alert("CPF/CNPJ  já cadastrado."); // Alerta se o CPF/CNPJ já existe
          }
        }
      }

      // Alerta genérico em caso de outros erros
      alert("Erro ao cadastrar: " + JSON.stringify(result.data.errors)); // Mostra os erros em formato JSON
    }
  } catch (error) {
    // Captura e trata erros de rede inesperados
    console.error("Erro de rede inesperado: ", error);
    alert("Erro de rede inesperado. Verifique sua conexão e tente novamente."); // Alerta ao usuário
  }
}