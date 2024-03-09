import axios from 'axios';
import { toast } from 'react-toastify';
import { redirect } from "react-router-dom";


const LoginCall = async  (email : string, password : string) => { 
    // do post call with axios. in body send email and password. The url is http://localhost:8080/auth/login
     await axios.post('http://localhost:8080/auth/login', { email, password })
        .then(_ => {
            redirect("/");
        })
        .catch(error => {
            if(error.response!.status == 400)
                toast("Ai introdus o parola sau o adresa de email invalida")
            else if(error.response!.status == 404)
                toast("Utilizatorul nu a fost gasit.")
            toast("Unexpected problem")
        });
}

const RegisterCall = async  (user : User) => {
    // do post call with axios. in body send user. The url is http://localhost:8080/auth/register
    await axios.post('http://localhost:8080/auth/register', user)
        .then(_ => {
            redirect("/login");

        })
        .catch(_ => {
            toast("You really f up something.")
        });
        redirect("/login");
}

const GoogleLoginCall = async  (user : User) => {
    // do post call with axios. in body send user. The url is http://localhost:8080/auth/google
    await axios.post('http://localhost:8080/auth/google', user)
        .then(response => {
            console.log(response);
            return response;
        })
        .catch(error => {
            console.log(error.code);
        });
}

export {
    LoginCall,
    RegisterCall,
    GoogleLoginCall
}