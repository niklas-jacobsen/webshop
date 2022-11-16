async function sendLogin(event) {
  event.preventDefault();
  const values = {
    email: event.target.email.value,
    password: event.target.password.value,
  };

  const response = await fetch(backend_url + "/login", {
    method: "post",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).catch((err) => console.log(err));

  if (response) {
    const res = await response.json();
    console.log(res);

    setCookie("token", res.token, 0.5);

    window.location = "/";
  }
}
