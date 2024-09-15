import fetch from 'node-fetch';

class FunctionService {

    async getPokemonFromPokedex(name) {

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);

        if (response.status === 200) {
            return await response.json();
        } else {
            return undefined;
        }

    }

}

export default FunctionService;