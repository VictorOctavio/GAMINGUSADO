import config from '../config';

const dataInicial = {
    admin: false,
    users: [],
    messages: [],
    user_bloqueados: []
}

//TYPRES
const ADMIN_ACTIVE = 'ADMIN_ACTIVE';
const USERS = 'USERS';
const MESSAGES = 'MESSAGES';
const USER_BLOQUEADOS = 'USER_BLOQUEADOS';

//Reducer
export default function administradorReducer(state = dataInicial, action){
    switch(action.type){
        case ADMIN_ACTIVE: return {...state, admin: action.payload}
        case USERS: return{...state, users: action.payload}
        case MESSAGES: return {...state, messages: action.payload}
        case USER_BLOQUEADOS: return {...state, user_bloqueados: action.payload}
        default: return{...state}
    }
}

//Action
export const verifyAdmin = () => async(dispatch, getState) => {
    
    const URI = config.URI;
    const {token} = getState().user

    try{
        
        const config = {
            method: 'GET',
            headers: {'auth-token': token}
        }

        const res = await fetch(`${URI}/verify-admin`, config)
        const data = await res.json();

        if(data.err) return dispatch({type: ADMIN_ACTIVE, payload: false})

        
        dispatch({type: ADMIN_ACTIVE, payload: true})

    }catch(err){console.log(err)}
}



export const GetUserActions = (limit, page, sort) => async(dispatch, getState) => {

    const URI = config.URI;
    const {token} = getState().user

    let sort = '-createdAt'

    try{
        const config = {
            method: 'GET',
            headers: {'auth-token': token}
        }

        const res = await fetch(`${URI}/admin/users?limit=${limit}&page=${page}&sort=${sort}`, config)
        const data = await res.json()

        if(data.err) return console.log('No puedes obtener estos datos')  
        
        dispatch({type: USERS, payload: data.data})

    }catch(err){console.log(err)}

}


export const getMessagesAcions = (limit, page, sort) => async(dispatch, getState) => {

    const URI = config.URI;
    const {token} = getState().user

    let sort = '-fecha'

    try{
        const config = {method: 'GET', headers: {'auth-token': token}}

        const res = await fetch(`${URI}/admin/messages?limit=${limit}&page=${page}&sort=${sort}`, config)
        const data = await res.json()

        if(data.err) return console.log('No puedes obtener estos datos')
        
        dispatch({type: MESSAGES, payload: data.data})

    }catch(err){console.log(err)}

}




export const bloquedUser = (id) => async(dispatch, getState) =>{
    const URI = config.URI;
    const {token} = getState().user;
    try{
  
        const config = {method: 'PUT', headers: {'auth-token': token}}

        const res = await fetch(`${URI}/admin/bloqued/${id}`, config);
        const data = await res.json();

        console.log(data);
    }catch(err){console.log(err)}
} 

export const desboquedUser = (id) => async(dispatch, getState) =>{
    const URI = config.URI;
    const {token} = getState().user;
    try{
  
        const config = {method: 'PUT', headers: {'auth-token': token}}

        const res = await fetch(`${URI}/admin/desboqued/${id}`, config);
        const data = await res.json();

        console.log(data);
    }catch(err){console.log(err)}
}  




export const sendMail = (newMail) => async(dispatch, getState) => {
    const URI = config.URI;
    const {token} = getState().user;

    try{
        
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify(newMail)
        };

        const res = await fetch(`${URI}/admin/sendmail`, config);
        const data = await res.json();

        console.log(data);

    }catch(err){console.error(err)}
}

