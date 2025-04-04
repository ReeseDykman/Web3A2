// Developer: Christopher Nottingham & Reese Dykman
// Description: This component is the about page for the app which provides the developers point of contact
// why and how it was made and the links to the code used if we did not know how to approach it.

const AboutView = () => {
    return (
        // The overall container for the about section
        <div className=" bg-gray-400 items-center justify-center text-black m-6 p-6 rounded-lg ">


            {/* The title of the section in large bold font */}
            <h1 className="text-2xl text-center font-bold">About the App</h1>

            {/* The the tabbed overall description */}
            <p> &nbsp; This app was made to help assist art enthusiasts
                find detailed information about genres of art, galleries,
                and paintings all around the world.

                Made in a senior level web development class, this application was built using React, Leaflet and Supabase.
                To allow for nativgation around the app, React Router was used.
                Context management was used to limit the amount of props being passed around the app. In order to update the
                page from a user query,
                a colmbination of both state and effect management React API's were used.
            </p>
            {/* Forcing a new line */}
            <br />

            <p className="test-bold">We hope you enjoy using this app as much as we enjoyed making it!</p>
            <br />

            <h2 className="text-xl text-center font-semibold ">Links to code used: </h2>

            <h3>Page: Galleries - Gallery Info</h3>
            <p><a target="_blank" href="https://react-leaflet.js.org/docs/start-setup/">Assistance with Leaflet - Official documentation</a></p>

            <p>
                <a target="_blank" href="https://www.youtube.com/watch?v=jD6813wGdBA"> YOUTUBE - Alejandro AO - Software & Ai :  React Leaflet Tutorial for Beginners (2023) </a>
            </p>
            <br />
            <h3>Page: Paintings - Paintings Modal </h3>
            <h3>
                <p> <a target="_blank" href="https://www.youtube.com/watch?v=dEGbXY-8YtU&ab_channel=YourCodeLab">YOUTUBE - YOUR CODE LAB : Build a Modal Component purely in ReactJS and TailwindCSS </a></p>
            </h3>
            <br />

            {/* Providing the viewers with the developers who made the SPA */}
            <h2 className="text-xl text-center font-semibold ">Developers</h2>
            <p>Reese Dykman:<a href="mailto:rdykm626@mtroyal.ca">rdykm626@mtroyal.ca</a></p>
            <p>Christopher Nottingham:<a href="mailto:cnott729@mtroyal.ca">cnott729@mtroyal.ca</a></p>
        </div >

    );
}
// Exporting the component to be used in other parts of the app
export default AboutView;