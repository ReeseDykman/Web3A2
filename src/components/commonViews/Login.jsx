import { useState } from "react";

const Login = (props) => {
    // State variables for username, password, and error message
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Handles input changes for username and password fields
    const handleOnChange = (e) => {
        if (e.target.name === "username") {
            setUsername(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    };

    // Handles form submission for login and register buttons
    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.name === "loginButton") {
            // Check if username and password match predefined credentials
            if (
                (username.toLowerCase() === "reese" || username.toLowerCase() === "christopher") &&
                password.toLowerCase() === "password"
            ) {
                props.handleLogin(true); // Successful login
            } else {
                // Invalid credentials error message
                setError(
                    "Invalid credentials. Hint: use one of the contributors' names as the username and 'password' as the password (case insensitive)."
                );
            }
        } else {
            // Welcome message for register button
            setError("Welcome! Your username is Reese and the password is 'password'.");
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center px-4 bg-cover bg-center bg-no-repeat relative"
            style={{
                backgroundImage: "url('hero.jpg')",
            }}
        >
            <form className="bg-green-100 shadow-lg rounded-lg p-8 w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                >
                    Username:
                </label>
                <input
                    placeholder="JohnDoe"
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleOnChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                >
                    Password:
                </label>
                <input
                    placeholder="VeryLongPassword123!"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <div className="md:flex sm:flex-columns items-center md:justify-around sm:justify-between md:pt-8 md:pb-4 md:pb-0 sm:pb-0">
                    <button
                        type="button"
                        name="loginButton"
                        onClick={handleSubmit}
                        className="mb-7 mt-7 bg-green-300 hover:bg-green-500 hover:text-white border-2 px-8 pt-1 pb-1"
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        name="registerButton"
                        onClick={handleSubmit}
                        className="mb-7 mt-7 bg-green-300 hover:bg-green-500 hover:text-white border-2 px-8 pt-1 pb-1"
                    >
                        Register
                    </button>
                </div>
                <br />
                <span className="text-red-500 text-xs italic">{error}</span>
            </form>

            {/* Hero Image Credit */}
            <p className="absolute bottom-0 w-full text-center text-white text-sm p-4">
                Hero Image Courtesy of George Inness American, 1825-1894
                <br />
                <a
                    href="https://www.artic.edu/artworks/18947/landscape"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                >
                    https://www.artic.edu/artworks/18947/landscape
                </a>
            </p>
        </div>
    );
};

export default Login;