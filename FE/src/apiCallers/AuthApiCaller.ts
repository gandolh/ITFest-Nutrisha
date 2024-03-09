import axios from 'axios';


const LoginCall = async  (email : string, password : string) => { 
    // do post call with axios. in body send email and password. The url is http://localhost:8080/auth/login
     await axios.post('http://localhost:8080/auth/login', { email, password })
        .then(response => {
            // handle response
            console.log(response);
            return response;
        })
        .catch(error => {
            //TODO: toast error
            // treat bad request and not found some time
            console.log(error);
        });
}


const RegisterCall = async  (user : User) => {
    // do post call with axios. in body send user. The url is http://localhost:8080/auth/register
    await axios.post('http://localhost:8080/auth/register', user)
        .then(response => {
            console.log(response);
            return response;
        })
        .catch(error => {
            console.log(error);
        });

}

export {
    LoginCall,
    RegisterCall

}