// Função assíncrona para realizar o login
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

      const response = await fetch(url, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(data), 
      });

      const result = await response.json();
      if (response.ok) {
        
        localStorage.setItem("user", JSON.stringify(result));
        window.location.href = "home.html";
        return
      }
  
      if (result && result.data && result.data.errors) {
        const errors = result.data.errors;
        alert(errors);
        return

      }

    } catch (error) {
      console.log(error);
    }
  }
}