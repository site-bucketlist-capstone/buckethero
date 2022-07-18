const PRODUCTION_API_BASE_URL = "http://localhost:3001";
const DEVELOPMENT_API_BASE_URL = "http://localhost:3001";
const API_BASE_URL = process.env.NODE_ENV === "production" ? PRODUCTION_API_BASE_URL : DEVELOPMENT_API_BASE_URL;
//Heroku backend deployed but not working. Link : https://francophone-zed-87469.herokuapp.com/

export default API_BASE_URL 