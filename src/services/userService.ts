import {LoginRequest} from "../models/users/LoginRequest";
import axios, {AxiosResponse} from "axios";
import {LoginResponse} from "../models/users/LoginResponse";



export const loginAxios = async (loginRequest:LoginRequest)=>{
    const  response: AxiosResponse<LoginResponse> = await axios.post('http://localhost:8080/auth/login',loginRequest)
    return response;
}