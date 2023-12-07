const { release } = require('os');
const client = require('./client');
const util = require('util');

// GET - /api/video-games - get all video games
async function getAllVideoGames() {
    try {
        const { rows } = await client.query(`
        SELECT * FROM videogames;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
    try {
        const {rows:[videoGame]} = await client.query(`
            SELECT * FROM videoGames
            WHERE id = $1;
        `, [id]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
    // LOGIC GOES HERE
    const { name, description, price, inStock, isPopular, imgURL} = body;
    try {

           //SQL makes a query using INSERT INTO passing values from body
        // client.query executes SQL and log result
       const { rows:[videoGame]} = await client.query(`
  
        INSERT INTO videogames(name, description, price, "inStock", "isPopular", "imgUrl")
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
       `, [name, description, price, inStock, isPopular, imgURL]);
       return videoGame;
     //Handle Error
    } catch (error) {
        throw error;
    }

}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
    // LOGIC GOES HERE
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$$
    {index + 1}`).join(',');
    if(setString.length === 0) {
        return;
    }
    try {
        //import the fields 
           //SQL makes a query using INSERT INTO passing values from body
        // client.query executes SQL and log result
        const {rows: [videoGame]} = await client.query(`
        UPDATE videoGames
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
        `, Object.values(fields));
        return videoGame;

    } catch (error) {
        throw error;
    }
}


// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
    // LOGIC GOES HERE
    try {
           //SQL makes a query using INSERT INTO passing values from body
        // client.query executes SQL and log result
        const {rows:[videoGame]} = await client.query(`
        DELETE FROM videogames
        WHERE id=$1
        RETURNING *;
        `,[id]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}
//Export to Express file
module.exports = {
    getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame
}