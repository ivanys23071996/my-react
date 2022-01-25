import axiosService from "./axios.service";
import {url} from "../config/urls";


export const rick_and_mortyService = {
    getAll: () => axiosService.get(url.episode).then(value => value.data)
}