import axios from "axios";


export const withoutAuthAxios = () => {
    return axios.create({
        baseURL: `${"http://192.168.1.31:4000"}/api/public`
 
    });
}; 
export const authAxios = (token) => {

    return axios.create({
        baseURL: "http://localhost:4000/api",
        headers: {
            'Authorization': `${token ? `${token}` : null}`,
        },
    });
};