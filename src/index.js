import { getData } from './data-service'

const getCharacterByID = async (id) => {
  if(!id) {
    throw new Error("ID was not provided");
  }
  return await getData(`https://swapi.dev/api/people/${id}`);
}

const getAllCharacters = async () => {
  const allCharacters = await getData(`https://swapi.dev/api/people`);
  return allCharacters.results;
}