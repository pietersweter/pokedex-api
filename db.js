require('dotenv').config();
const mongoose = require('mongoose');
// console.log(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
// mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
mongoose.connect('mongodb://xxxx:xxxx@ds139459.mlab.com:39459/pokedex');
console.log()
// mongoose.connect('mongodb://localhost/pokedex');

const Pokemon = require('./models/pokemon');
const Type = require('./models/type');

class Database {
  async addPokemon(pokemon) {
    const insertedPokemon = new Pokemon({
      id: pokemon.id,
      name: pokemon.ename,
      types: pokemon.type,
      image: pokemon.url
    })
    await insertedPokemon.save(err => {
      if (err) {
        console.error(err);
      }
    });
  }

  // find pokemon based on keyword
  findPokemon(keyword) {
    return new Promise(function (resolve, reject) {
      Pokemon.find({ types: keyword })
        .then((res) => {
          //console.log(res);
          resolve(res)
        });
    });
  }

  findPokemonById(pokemonId, res) {
    Pokemon.find({id:pokemonId}, (err, pokemon) => {
      if (err) return res.status(500).send("Pokedex is broken.");
      res.status(200).send(pokemon);
    });
  }

  findPokemons(res) {
    Pokemon.find({}, (err, pokemons) => {
      if (err) return res.status(500).send("Pokedex is broken.");
      res.status(200).send(pokemons);
    });
  }

}
// eksport pliku z operacjami na bazie danych
module.exports = Database;
