import { GET_EMAIL } from '../consts/actionTypes';
import axios from 'axios'
import store from '../store/index'

export function getEmail(loginData) {
    return function (dispatch) {
        axios({
            method: 'POST',
            url: `http://localhost:3001/users/forgot`,
            data: {
                email: loginData.email,
            }
        })
            .then(res => {
                const serializedState = JSON.stringify(res.data.token);
                localStorage.setItem("tokenforgot", serializedState);
                return res;
            })
            // .then(res => localStorage.setItem('token', res.data.token))
            .then(res => {
                
                dispatch({
                    type: GET_EMAIL,
                    payload: res.data
                })
                alert("Se ha enviado un email con instrucciones");
            })
            .catch(() => alert("Los datos del Usuario no concuerdan con un usuario existente...vuelva a intentarlo"))
    }
}
