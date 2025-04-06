# Welcome to our Web3 Art Assignment!

## **Overview**
This project is a single-page application designed to assist art enthusiasts in exploring detailed information about various genres of art, galleries, artists, and paintings from around the world. The application provides an interface for browsing, filtering, and managing favorites.

Deployed URL: [Web3A2 on GitHub Pages](https://reesedykman.github.io/Web3A2/)


## **Authors**
- **Reese Dykman**  
  Email: [rdykm626@mtroyal.ca](mailto:rdykm626@mtroyal.ca)

- **Christopher Nottingham**  
  Email: [cnott729@mtroyal.ca](mailto:cnott729@mtroyal.ca)


## **Purpose**
This project was developed as part of a senior-level web development course. The primary goal was to create a functional and visually appealing application that demonstrates React web development including:
- Context management.
- State management.
- Integration with external APIs and databases (Supabase).
- Dynamic filtering and sorting of data.
- Design using Tailwind CSS.


## **Features**
- **Login System**: Template login system with pre-defined credentials.
- **Art Exploration**: Browse and filter paintings, artists, galleries, and genres.
- **Favorites Management**: Add and manage favorite galleries, artists, and paintings.
- **Interactive Map**: View gallery locations using Leaflet maps.
- **Dynamic Sorting**: Sort data by various fields such as title, artist, year, etc.


## **Technologies Used**
### **Frontend**
- **React**: For building the user interface.
- **React Router**: For navigation and routing.
- **Tailwind CSS**: For styling and responsive design.
- **React Leaflet**: For interactive maps.

### **Backend**
- **Supabase**: Used as the backend-as-a-service for database management and API integration.

### **Build Tools**
- **Vite**: For fast development and build processes.
- **ESLint**: For linting and maintaining code quality.


## **Project Structure**
The project is organized into the following key directories:

### **1. `src/components`**
Contains all React components, divided into subdirectories based on functionality:
- **`artistsView`**: Components related to artists.
- **`galleryView`**: Components related to galleries.
- **`genresView`**: Components related to genres.
- **`paintingsView`**: Components related to paintings.
- **`commonViews`**: Shared components like the header, login, and about page.

### **2. `src/scripts`**
Contains utility scripts, such as:
- **`supabaseClient.js`**: For connecting to the Supabase backend.
- **`filterFactory.js`**: For creating dynamic filters.

### **3. `public`**
Contains images.


## **How to Run the Project**
### **Prerequisites**
- Node.js
- npm

### **Steps**
1. Clone the repository:
   ```bash
   git clone https://github.com/reesedykman/Web3A2.git
   cd Web3A2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the application in your browser:
   ```
   http://localhost:5173
   ```


## **Deployment**
The project is deployed to GitHub Pages. The deployment workflow is automated using GitHub Actions. The deployment configuration can be found in `.github/workflows/deploy.yaml`.

### **Deployment Steps**
1. Push changes to the `main` branch.
2. GitHub Actions will automatically build and deploy the project to GitHub Pages.

Deployed URL: [Web3A2 on GitHub Pages](https://reesedykman.github.io/Web3A2/)


## **Credits**
### **External Resources**
- **React Leaflet Documentation**: [https://react-leaflet.js.org/docs/start-setup/](https://react-leaflet.js.org/docs/start-setup/)
- **YouTube Tutorials**:
  - [React Leaflet Tutorial for Beginners (2023)](https://www.youtube.com/watch?v=jD6813wGdBA) by Alejandro AO.
  - [Build a Modal Component in ReactJS and TailwindCSS](https://www.youtube.com/watch?v=dEGbXY-8YtU) by Your Code Lab.
- **Icons and Images**
  - [Icons - SVGRepo](https://www.svgrepo.com/)
  - [Login Hero Image](https://www.artic.edu/artworks/18947/landscape)
  - [Art Pallete Logo](https://clipart-library.com/clip-art/artist-transparent-background-9.htm)

### **Acknowledgments**
Special thanks to the our instructor Randy Connolly who taught us all we know!.


## **Contact**
For any questions or feedback, please reach out to the authors via email:
- Reese Dykman: [rdykm626@mtroyal.ca](mailto:rdykm626@mtroyal.ca)
- Christopher Nottingham: [cnott729@mtroyal.ca](mailto:cnott729@mtroyal.ca)
