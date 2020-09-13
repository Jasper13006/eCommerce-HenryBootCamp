import { GET_PRODUCT } from '../consts/actionTypes.js'

const initialState = {
    producto: {}
}
export default function productos(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT:
            return {
                ...state,
                data: action.payload
            }
        default:
            return { ...state };
    }
}