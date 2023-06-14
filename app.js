const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();

const dbPath = path.join(__dirname, "moviesData.db");
let db = null;
const initializeDbAndServer = async () => {
  try {
    const db = await open({ filename: dbPath, driver: sqlite3.Database });
    app.listen(3000, () => {
      console.log("Server has Started at 3000");
    });
  } catch (e) {
    console.log(`DB ERROR:${e.message}`);
    process.exit(1);
  }
};
initializeDbAndServer();
//get movie names
convertDbObjectToResponsive = (dbObject) => {
  return {
    movieId: dbObject.movie_id,
    directorId: dbObject.director_id,
    movieName: dbObject.movie_name,
    leadActor: dbObject.lead_actor,
  };
};
//get movieName basedOn movieId
app.get("movies/:movieId", async (request, response) => {
  //get API
  const getMovieQuery = `select 
    movie_name 
    from 
    movie
     where 
     movie_id=${movieId};`; //sql query we have sqlite3 tool
  const movie = await db.get(getMovieQuery); //fetched data from db stored in movie

  response.send(convertDbObjectToResponsive(movie)); //sending stored data in the form of camelCase
});
module.exports = app;
