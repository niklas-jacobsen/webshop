async function sendLogin(event) {
  event.preventDefault();
  const values = {
    email: event.target.email.value,
    password: event.target.password.value,
  };

  const response = await fetch("http://localhost:5000/user", {
    method: "post",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).catch((err) => console.log(err));

  console.log(response);
}
