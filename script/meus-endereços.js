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
    localStorage.removeItem("user");
    sessionStorage.removeItem("userSession");
    window.location.href = "../view/login.html"; // Altere para a página de login ou home desejada
});


async function fetchAddresses() {
    const storedData = JSON.parse(localStorage.getItem("user"));
    const token = storedData ? storedData.access_token : null;

    if (!token) {
        alert("Token de acesso não encontrado. Faça login novamente.");
        window.location.href = "../view/login.html"; // Redirecionar para login se o token estiver ausente
        return;
    }

    try {
        // Fazendo a requisição GET para obter os endereços
        const response = await fetch("https://go-wash-api.onrender.com/api/auth/address", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Verifica se a resposta foi bem sucedida
        if (!response.ok) {
            throw new Error("Erro ao buscar endereços: " + response.statusText);
        }

        // Converte a resposta para JSON
        const addresses = await response.json();
        console.log("Endereços obtidos da API:", addresses);

        // Exibe os endereços na interface
        displayAddresses(addresses);
    } catch (error) {
        console.error("Erro ao carregar endereços:", error);
        document.getElementById("address-list").innerHTML = "Ocorreu um erro ao carregar os endereços.";
    }
}

function displayAddresses(data) {
    const addressList = document.getElementById("address-list");
    addressList.innerHTML = ""; // Limpa o conteúdo existente

    // Verifica se há endereços e os exibe
    const addresses = data.data || []; // Supondo que os endereços estejam dentro da propriedade 'data'

    if (!Array.isArray(addresses) || addresses.length === 0) {
        addressList.innerHTML = "<p>Nenhum endereço cadastrado.</p>";
        return;
    }

    // Itera sobre os endereços e cria elementos HTML para exibi-los
    addresses.forEach(address => {
        const addressItem = document.createElement("div");
        addressItem.className = "address-item";
        addressItem.innerHTML = `
            <h3>${address.title}</h3>
            <p>${address.address}, ${address.number}</p>
            <p>${address.complement ? address.complement : ''}</p>
            <p>CEP: ${address.cep}</p>
        `;
        addressList.appendChild(addressItem);
    });
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", fetchAddresses);

