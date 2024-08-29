class FunctionService {

    async getPokemonFromPokedex(name) {

        const fetch = require("node-fetch");

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);

        if(response.status === 200) {
            return await response.json();
        } else {
            return undefined;
        }

    }

}


module.exports = FunctionService;