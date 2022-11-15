async function sendRegistration(event) {
  event.preventDefault();

  const values = {
    email: event.target.email.value,
    firstName: event.target.firstName.value,
    lastName: event.target.lastName.value,
    password: event.target.password.value,
  };

  const response = await fetch("http://localhost:5000/register", {
    method: "post",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).catch((err) => console.log(err));

  console.log(await response.json());
}
