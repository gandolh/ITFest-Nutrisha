import axios from 'axios';
import { toast } from 'react-toastify';


const GetStats = async  (user : User) : Promise<any> => {
    // do post call with axios. in body send user. The url is http://localhost:8080/auth/register
    try {
        const resp = await axios.post('http://localhost:8080/users/getStats', user);
        console.log(resp.data);
        return resp.data;
    } catch (err) {
        console.log(err);
        toast("Problem with getting stats.");
        return -1;
    }
}


export { GetStats };