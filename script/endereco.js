async function endereco() {
  let title = document.getElementById("title").value;
  let cep = document.getElementById("cep").value;
  let address = document.getElementById("address").value;
  let number = document.getElementById("number").value;
  let complement = document.getElementById("complement").value;

  const dados = {
    title: title,
    cep: cep,
    address: address,
    number: number,
    complement: complement,
  };

  console.log(dados);

  try {
    let url = "https://go-wash-api.onrender.com/api/user";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodtZWZjOWM5NTgyNjg3Lmhlcm9rdWFwcC5jb20vYXBpL2xvZ2luIiwiaWF0IjoxNzEyMDc4Mjg0LCJuYmYiOjE3MTIwNzgyODQsImp0aSI6ImRPajVkTng4WEgxdVJ5TVkiLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.oBAOYBcADNUiwFKgM",
      },
      body: JSON.stringify(dados),
    });
  } catch (error) {
    console.log(error);
  }
}
