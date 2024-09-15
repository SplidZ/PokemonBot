import fetch from 'node-fetch';

class FunctionService {

    async getPokemonFromPokedex(name) {

        try {

            const [pokemonResponse, speciesResponse] = await Promise.all([
                fetch(`https://pokeapi.co/api/v2/pokemon/${name}`),
                fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
            ]);

            if (pokemonResponse.status === 200 && speciesResponse.status === 200) {

                const pokemonData = await pokemonResponse.json();
                const speciesData = await speciesResponse.json();

                return {
                    pokemon: pokemonData,
                    species: speciesData
                };

            } else {

                return undefined;

            }

        } catch (error) {

            console.error("[ERROR] Erreur lors de la récupération des données :", error);
            return undefined;
        }

    }

    createProgressBar(completionChar, nonCompletionChar, totalChars, currentValue, maxValue) {

        const completionRatio = currentValue / maxValue;
        const completedChars = Math.round(completionRatio * totalChars);
        const completed = completionChar.repeat(completedChars);
        const remaining = nonCompletionChar.repeat(totalChars - completedChars);

        return `[${completed}${remaining}]`;

    }

}

export default FunctionService;