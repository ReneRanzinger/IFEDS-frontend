import {Authenticate} from './apiCalls'
export default {
  user: {
    login: credentials =>
     fetch(Authenticate,{
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
