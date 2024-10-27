document.getElementById("open_btn").addEventListener("click", function () {
    document.getElementById("sidebar").classList.toggle("open-sidebar");
<<<<<<< HEAD
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
    document.getElementById("user-name-nav").textContent = "Visitante!";
    }

    if (user && user.user.email) {
    // Se o objeto de usuário existir e tiver o campo 'name', exibimos no header
    document.getElementById("user-email-nav").textContent = user.user.email;
    } else {
    // Caso não haja dados no localStorage ou nome, pode exibir uma mensagem padrão
    document.getElementById("user-email-nav").textContent = "Bem-vindo, visitante!";
    }

});


document.getElementById("logout_btn").addEventListener("click", function() {
=======
});


document.getElementById("logout_btn").addEventListener("click", function () {
>>>>>>> main
    localStorage.removeItem("user");
    sessionStorage.removeItem("userSession");
    window.location.href = "../view/login.html"; // Altere para a página de login ou home desejada
});


<<<<<<< HEAD
async function fetchAddresses() {
=======
document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.user.name) {
        document.getElementById("user-name-header").textContent = user.user.name;
        document.getElementById("user-name-nav").textContent = user.user.name;
    } else {
        document.getElementById("user-name-header").textContent = "Bem-vindo, visitante!";
        document.getElementById("user-name-nav").textContent = "Visitante!";
    }

    if (user && user.user.email) {
        document.getElementById("user-email-nav").textContent = user.user.email;
    } else {
        document.getElementById("user-email-nav").textContent = "Bem-vindo, visitante!";
    }
});

// Função para carregar e exibir endereços
async function loadAddresses() {
>>>>>>> main
    const storedData = JSON.parse(localStorage.getItem("user"));
    const token = storedData ? storedData.access_token : null;

    if (!token) {
        alert("Token de acesso não encontrado. Faça login novamente.");
        window.location.href = "../view/login.html"; // Redirecionar para login se o token estiver ausente
        return;
    }

    try {
<<<<<<< HEAD
        // Fazendo a requisição GET para obter os endereços
=======
>>>>>>> main
        const response = await fetch("https://go-wash-api.onrender.com/api/auth/address", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

<<<<<<< HEAD
        // Verifica se a resposta foi bem sucedida
=======
>>>>>>> main
        if (!response.ok) {
            throw new Error("Erro ao buscar endereços: " + response.statusText);
        }

<<<<<<< HEAD
        // Converte a resposta para JSON
        const addresses = await response.json();
        console.log("Endereços obtidos da API:", addresses);

        // Exibe os endereços na interface
=======
        const addresses = await response.json();
        console.log("Endereços obtidos da API:", addresses);
>>>>>>> main
        displayAddresses(addresses);
    } catch (error) {
        console.error("Erro ao carregar endereços:", error);
        document.getElementById("address-list").innerHTML = "Ocorreu um erro ao carregar os endereços.";
    }
}

<<<<<<< HEAD
=======
// Função para exibir endereços na página
>>>>>>> main
function displayAddresses(data) {
    const addressList = document.getElementById("address-list");
    addressList.innerHTML = ""; // Limpa o conteúdo existente

<<<<<<< HEAD
    // Verifica se há endereços e os exibe
    const addresses = data.data || []; // Supondo que os endereços estejam dentro da propriedade 'data'
=======
    const addresses = data.data || [];
>>>>>>> main

    if (!Array.isArray(addresses) || addresses.length === 0) {
        addressList.innerHTML = "<p>Nenhum endereço cadastrado.</p>";
        return;
    }

<<<<<<< HEAD
    // Itera sobre os endereços e cria elementos HTML para exibi-los
=======
    

>>>>>>> main
    addresses.forEach(address => {
        const addressItem = document.createElement("div");
        addressItem.className = "address-item";
        addressItem.innerHTML = `
<<<<<<< HEAD
            <h3>${address.title}</h3>
            <p>${address.address}, ${address.number}</p>
            <p>${address.complement ? address.complement : ''}</p>
            <p>CEP: ${address.cep}</p>
        `;
=======
          <h3 class="address-item1">${address.title}</h3>
          <p class="address-item2">${address.address}, ${address.number}
          ${address.complement ? address.complement : ''}
          CEP: ${address.cep}</p>
          <p class="address-item3">
          <button class="delete-btn" onclick="deleteAddress(${address.id})">Excluir</button>
          <button class="edit-btn" onclick="editAddress(${address.id})">Editar</button>
          </p>
      `;
>>>>>>> main
        addressList.appendChild(addressItem);
    });
}

<<<<<<< HEAD
// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", fetchAddresses);

=======
async function deleteAddress(id) {
    // Recupera o token do localStorage
    const storedData = JSON.parse(localStorage.getItem("user"));
    const token = storedData ? storedData.access_token : null;

    if (!token) {
        alert("Token de acesso não encontrado. Faça login novamente.");
        window.location.href = "../view/login.html";
        return;
    }

    try {
        // Mostra no console o ID e o token para garantir que estão corretos
        console.log("ID do endereço a ser excluído:", id);
        console.log("Token de autenticação:", token);

        // Faz a requisição DELETE para a API
        const response = await fetch(`https://go-wash-api.onrender.com/api/auth/address/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        // Verifica se a requisição foi bem-sucedida
        if (response.ok) {
            alert("Endereço excluído com sucesso!");
            loadAddresses(); // Recarrega a lista de endereços após a exclusão
        } else {
            const errorData = await response.json();
            console.error("Erro ao excluir endereço:", errorData);
            alert(`Erro ao excluir endereço: ${errorData.message}`);
        }
    } catch (error) {
        alert("Ocorreu um erro ao tentar excluir o endereço.");
        console.error("Erro:", error);
    }
}


// Função para editar endereço (exibe o formulário preenchido)
async function editAddress(id) {
    const storedData = JSON.parse(localStorage.getItem("user"));
    const token = storedData ? storedData.access_token : null;

    if (!token) {
        alert("Token de acesso não encontrado. Faça login novamente.");
        window.location.href = "../view/login.html";
        return;
    }

    try {
        const response = await fetch(`https://go-wash-api.onrender.com/api/auth/address/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const address = await response.json();

            // Verifique se o formulário existe e está visível
            const form = document.getElementById("edit-form");
            if (!form) {
                alert("Formulário de edição não encontrado.");
                return;
            }

            // Certifique-se de que o formulário está visível
            form.style.display = "block"; // Caso esteja oculto, exiba-o

            // Verifica se os elementos do formulário existem
            const titleField = document.getElementById("title");
            const addressField = document.getElementById("address");
            const numberField = document.getElementById("number");
            const complementField = document.getElementById("complement");
            const cepField = document.getElementById("cep");

            if (titleField && addressField && numberField && complementField && cepField) {
                // Preenche os campos com os dados do endereço
                titleField.value = address.data.title;
                addressField.value = address.data.address;
                numberField.value = address.data.number;
                complementField.value = address.data.complement;
                cepField.value = address.data.cep;

                // Exibe o botão de salvar e define o evento de clique
                document.getElementById("save-btn").style.display = "block";
                document.getElementById("save-btn").onclick = function () {
                    saveEditedAddress(id);
                };
            } else {
                console.error("Um ou mais campos do formulário de edição não foram encontrados.");
                alert("Erro ao carregar o formulário de edição. Verifique se os campos existem.");
            }
        } else {
            const errorData = await response.json();
            console.error("Erro ao buscar os dados do endereço:", errorData);
            alert("Erro ao buscar dados do endereço.");
        }
    } catch (error) {
        console.error("Erro ao buscar os dados do endereço:", error);
        alert("Ocorreu um erro ao buscar os dados do endereço.");
    }
}

// Função para salvar as alterações do endereço
async function saveEditedAddress(id) {
    const storedData = JSON.parse(localStorage.getItem("user"));
    const token = storedData ? storedData.access_token : null;

    const updatedAddress = {
        title: document.getElementById("title").value,
        address: document.getElementById("address").value,
        number: document.getElementById("number").value,
        complement: document.getElementById("complement").value,
        cep: document.getElementById("cep").value
    };

    try {
        const response = await fetch(`https://go-wash-api.onrender.com/api/auth/address/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedAddress)
        });

        if (response.ok) {
            alert("Endereço atualizado com sucesso!");
            loadAddresses(); // Recarrega a lista de endereços após a atualização
        } else {
            const errorData = await response.json();
            alert(`Erro ao atualizar endereço: ${errorData.message}`);
        }
    } catch (error) {
        alert("Ocorreu um erro ao tentar atualizar o endereço.");
        console.error("Erro:", error);
    }
}


// Carrega os endereços quando a página é carregada
document.addEventListener("DOMContentLoaded", loadAddresses);
>>>>>>> main
