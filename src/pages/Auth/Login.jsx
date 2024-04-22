import { useState} from 'react';
import {useNavigate} from "react-router-dom";
import authService from '../../services/auth.service';

function Login(props) {
    const [requestBody, setRequestBody] = useState({
        'username': "",
        'password': ""
    });
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    function handleChange(event) {
        setRequestBody({
            ...requestBody,
            [event.target.name]: event.target.value
        })
    }

    function handleLogin(event) {
        event.preventDefault();
        authService.login(requestBody).then(response => {
            if (response.status === 200) {
                localStorage.setItem('Token', response.data.token);
                localStorage.setItem('userName', response.data.name);
                localStorage.setItem('userLastName', response.data.lastName);
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('role', response.data.role);
                window.location.href= "/";
            }
        }).catch(error => {
            if (error.response.status === 400 || error.response.status === 403) {
                setShowError(true);
            }
        })
    }

    return (
        <div className="form-signin-container text-center h-75 w-50 m-auto">

            <img src='/log.jpeg' alt='login' width={200} height={200} />
            <form className="form-signin text-center w-100" onSubmit={event => handleLogin(event)}>
                <h1 className="h3 mb-3 font-weight-bold">Login</h1>
                <label htmlFor="text" className="sr-only">Username</label>
                <input type="text" id="inputEmail" className="form-control" placeholder="Username" required
                       autoFocus name="username" onChange={(event => handleChange(event))}   />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                       required name="password" onChange={(event => handleChange(event))} />
                {showError?<label className="text-danger">Username or password is not correct</label>:null}
                <button className="btn btn-lg btn-primary btn-block w-50 m-auto" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;