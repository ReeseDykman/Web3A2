// Developer: Christopher Nottingham & Reese Dykman
// Description: This component is the about page for the app which provides the developers point of contact
// why and how it was made and the links to the code used if we did not know how to approach it.

const AboutView = () => {
    return (
        // The overall container for the about section
        <div className=" bg-green-700 items-center justify-center text-black m-6 p-6 rounded-lg ">

            <div className=" bg-green-100 rounded-lg p-4 h-[80vh] overflow-auto">


                {/* The title of the section in large bold font */}
                <h1 className="text-2xl text-center font-bold m-6 ">Exploring the world of art in the comfort of your home</h1>

                <h2 className="text-lg text-center font-bold m-6 ">About the app</h2>

                {/* The the tabbed overall description */}
                <div className="m-2">

                    <p className="m-2">
                        &nbsp; This app was made to help assist art enthusiasts find detailed information about genres of art, galleries, and paintings all around the world.

                        <br />
                        <br />

                        &nbsp; React was the library used to build the UI and Leaflet was used to display the gallery on an interactive map. Most importantly however, 
                        Supabase was used for the backend database to retrieve all relevant data for further processing (i.e. useState and localStorage).  To allow for navigation around the app, 
                        React Router  was implemented to enable the single-paged application effect. Furthermore, the useContext hook was used to limit the number of
                         props being passed around the app. To update the page from a user query, a combination of the useState (save variables in a JSX file) and 
                         useEffect (do something if the state changes) React hooks were used. Lastly, to ensure responsiveness and save user favourites, local storage 
                         was implemented to ensure the user could access their favourites later and to reduce the number of pulls for the data from Supabase.
               </p>
                </div>




                {/* Code attribution */}

                <h2 className="text-lg text-center font-semibold m-6 ">Links to code used: </h2>

                <h3 className="m-2 font-semibold" >Page: Galleries - Gallery Info</h3>
                <p className="m-2" ><a className="hover:text-blue-700" target="_blank" href="https://react-leaflet.js.org/docs/start-setup/">&nbsp; Assistance with Leaflet - Official documentation</a></p>

                <p className="m-2" >
                    <a className="hover:text-blue-700" target="_blank" href="https://www.youtube.com/watch?v=jD6813wGdBA">&nbsp; YOUTUBE - Alejandro AO - Software & Ai :  React Leaflet Tutorial for Beginners (2023) </a>
                </p>

                <h3 className="m-2 font-semibold">Page: Paintings - Paintings Modal </h3>

                <p className="m-2"> <a className="hover:text-blue-700" target="_blank" href="https://www.youtube.com/watch?v=dEGbXY-8YtU&ab_channel=YourCodeLab">&nbsp; YOUTUBE - YOUR CODE LAB : Build a Modal Component purely in ReactJS and TailwindCSS </a></p>



                {/* Providing the viewers with the developers who made the SPA */}
                <h2 className="text-lg text-center font-semibold m-6 ">Developers</h2>

                <p className="m-2">Reese Dykman:<a className="hover:text-blue-700" href="mailto:rdykm626@mtroyal.ca"> rdykm626@mtroyal.ca</a></p>

                <p className="m-2">Christopher Nottingham:<a className="hover:text-blue-700" href="mailto:cnott729@mtroyal.ca"> cnott729@mtroyal.ca</a></p>

                <p className="text-lg font-semibold text-center m-2 ">We hope you enjoy using this app as much as we enjoyed making it!</p>

                {/* Providing the user to a hyperlinked header to the github repo */}
                <h2 className="text-lg text-center font-semibold m-6 hover:text-blue-700 "><a href="https://github.com/ReeseDykman/Web3A2" target="_blank" rel="noopener noreferrer">Github Repository</a></h2>
            </div >
        </div>

    );
}
// Exporting the component to be used in other parts of the app
export default AboutView;
