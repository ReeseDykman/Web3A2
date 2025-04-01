import { useState } from "react";

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleOnChange = (e) => {
        if (e.target.name === "username") {
            setUsername(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault()
        if(e.target.name === "loginButton") {
            if ((username.toLowerCase() === "reese" || username.toLowerCase() === "christopher") && (password.toLowerCase() === "password")) {
                props.handleLogin(true);
            } else {
                setError("Invalid credentials. Hint: use one of the contributers' names as the username and 'password' as the password (case insensitive).");
            }
        }else{
            setError("Welcome! Your username is Reese and the password is 'password'.");
        }
    };

    return(
       < div className="min-h-screen flex items-center justify-center  px-4">
        <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username:</label>
            <input type="text" name="username" value={username} onChange={handleOnChange} className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password:</label>
            <input type="password" name="password" value={password} onChange={handleOnChange} className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            <div className="md:flex sm:flex-columns items-center md:justify-around sm:justify-between md:pt-8 md:pb-4 md:pb-0 sm:pb-0">
                <button type="button" name="loginButton" onClick={handleSubmit} className="mb-7 mt-7 bg-blue-200 hover:bg-blue-300 border-2 px-8 pt-1 pb-1">Login</button>
                <button type="button" name="registerButton" onClick={handleSubmit} className="mb-7 mt-7 bg-blue-200 hover:bg-blue-300 border-2 px-8 pt-1 pb-1">Register</button>
            </div>
            <br/>
            <span className="text-red-500 text-xs italic">{error}</span>

        </form>
        </div>
    )

};

export default Login;