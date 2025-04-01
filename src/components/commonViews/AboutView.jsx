
const AboutView = () => {
    return (
        <div className="about sky bg-sky-500 items-center justify-center text-white m-6 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl text-center font-bold">About the App</h1>
            <p> &nbsp; This app was made to help assist art enthusiasts
                find detailed information about genres of art, galleries,
                and paintings all around the world.

                Made in a senior level web development class, this application was built using React, Leaflet and Supabase.
                To allow for nativgation around the app, React Router was used.
                Context management was used to limit the amount of props being passed around the app. In order to update the
                page from a user query,
                a colmbination of both state and effect management React API's were used.
            </p>
            <br />
            <p className="test-bold">We hope you enjoy using this app as much as we enjoyed making it!</p>
            <br />
            <h2 className="text-xl text-center font-semibold ">Developers</h2>
            <p>Reese Dykman: <a href="mailto:rdykm626@mtroyal.ca">rdykm626@mtroyal.ca</a></p>
            <p>Christopher Nottingham <a href="mailto:cnott729@mtroyal.ca">cnott729@mtroyal.ca</a></p>
        </div >

    );
}
export default AboutView;