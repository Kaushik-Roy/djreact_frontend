
// Actions

import axios from 'axios';
import * as actionTypes from './actionTypes';


export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
}


export const authSuccess = (token) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token
	}
}


export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	}
}


export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationTime');
	return {
		type: actionTypes.AUTH_LOGOUT
	}
}


export const checkAuthTimeout = (expirationTime) => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000)
	}
}


export const authLogin = (username, password) => {
	return dispatch => {
		dispatch(authStart());
		axios.post('http://127.0.0.1:8000/rest-auth/login/', {
			username: username,
			password: password
		})
		.then(response => {
			
			// Store authentication key
			const token = response.data.key;

			// set expiration time to 1 hour
			const expirationTime = new Date(new Date().getTime() + 3600 * 1000);

			// set data to local storage
			localStorage.setItem('token', token);
			localStorage.setItem('expirationTime', expirationTime);

			// dispatch success with token
			dispatch(authSuccess(token));

			// set user expiration time
			dispatch(checkAuthTimeout(3600));
		})
		.catch(error => {
			dispatch(authFail(error))
		});
	}
}


export const authSignup = (username, email, password1, password2) => {
	return dispatch => {
		dispatch(authStart());
		axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
			username: username,
			email: email,
			password1: password1,
			password2: password2
		})
		.then(response => {
			
			// Store authentication key
			const token = response.data.key;

			// set expiration time to 1 hour
			const expirationTime = new Date(new Date().getTime() + 3600 * 1000);

			// set data to local storage
			localStorage.setItem('token', token);
			localStorage.setItem('expirationTime', expirationTime);

			// dispatch success with token
			dispatch(authSuccess(token));

			// set user expiration time
			dispatch(checkAuthTimeout(3600));
		})
		.catch(error => {
			dispatch(authFail(error))
		});
	}
}


export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if (token === undefined) {
			dispatch(logout());
		}
		else {
			const expirationDate = new Date(localStorage.getItem('expirationTime'));
			if(expirationDate <= new Date()) {
				dispatch(logout());
			}
			else {
				dispatch(authSuccess());

				/** Error: Actions must be plain objects. Use custom middleware for async actions. */
				//  dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()) / 1000);
			}
		}
	}
}