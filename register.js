const bcrypt = require("bcrypt");
const saltRounds = 10;

async function sendRegistration(event) {
  event.preventDefault();
  const passwordPlaintext = event.target.password.value;
  const passwordHashed = "";

  bcrypt.hash(passwordPlaintext, saltRounds, (err, hash) => {
    passwordHashed = hash;
  });

  const values = {
    email: event.target.email.value,
    firstName: event.target.firstName.value,
    lastName: event.target.lastName.value,
    password: passwordHashed,
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
