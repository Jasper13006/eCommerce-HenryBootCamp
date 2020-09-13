import axios from 'axios';
import { GET_PRODUCT, GET_CATEGORY, DELETE_PRODUCT, EDIT_PRODUCT,GET_PRODUCT_CATEGORY } from '../consts/actionTypes';





/*--------------------------------------------------------------------------------------- */
/*GET PRODUCTS */
/*--------------------------------------------------------------------------------------- */
export function getProducts(request) {
    return function(dispatch) {
        return axios.get("http://localhost:3001/products")
          .then(response =>{
            console.log(response);
            dispatch({ type: GET_PRODUCT_CATEGORY, payload: response.data });
          })
          
    };
   
}



/// tods los productos de una categoria

export function getProductCategory(name){
    return function(dispatch) {
        return axios.get(`http://localhost:3001/products/category/${name}`)
          .then(response =>{
            console.log(response);
            dispatch({ type: GET_PRODUCT_CATEGORY, payload: response.data });
          })
          
    };
  
}



/*--------------------------------------------------------------------------------------- */
/*GET CATEGORIES */
/*--------------------------------------------------------------------------------------- */


/*--------------------------------------------------------------------------------------- */
/*DELETE PRODUCTS */
/*--------------------------------------------------------------------------------------- */
export function deleteProducts(request) {
    return {
        type: DELETE_PRODUCT,
        categories: request
    }
}

export function axiosDeleteProducts(oldData) {
    return dispatch => {
        dispatch(deleteProducts())
        axios.delete(`http://localhost:3001/products/${oldData.id}`)
            .then(res => {
                console.log('ESTOY EN EL .THEN DELETE', res)
                dispatch({
                    type: DELETE_PRODUCT,
                    payload: res.data
                })
            }
            );
    };
}
/*--------------------------------------------------------------------------------------- */
/*EDIT PRODUCTS */
/*--------------------------------------------------------------------------------------- */
export function editProducts(request) {
    return {
        type: EDIT_PRODUCT,
        categories: request
    }
}

export function axiosEditProducts(newData) {
    return dispatch => {
        console.log(newData)
        dispatch(editProducts())
        axios({
            method: 'PUT',
            url: `http://localhost:3001/products/${newData.id}`,

            data: {
                name: newData.name,
                price: newData.price,
                description: newData.description,
                stock: newData.stock

            }

        })
            .then(res => {
                console.log('ESTOY EN EL .THEN edit', res)
                dispatch({
                    type: EDIT_PRODUCT,
                    payload: res.data
                })
            }
            );
    };
}