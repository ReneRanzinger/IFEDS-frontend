
export default {
  user: {
    login: credentials =>
     fetch("http://localhost:8080/authenticate",{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Accept": "application/json"
        },body: JSON.stringify({
            "username": credentials.email,
            "password": credentials.password
        })
      }).then(res => res.json()) }
};
