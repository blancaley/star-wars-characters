import { getData } from './data-service'

// Variables
const compareBtn = document.getElementById("compareBtn");

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

const createCharacter = async () => {
  // Get selected characters name
  const mainCharacterName = document.getElementById("mainCharacter").value;
  const secondaryCharacterName = document.getElementById("secondaryCharacter").value;
  
  // Get character data from API for selected names
  const allCharacters = await getAllCharacters();
  const mainCharacter = allCharacters.find(char => char.name === mainCharacterName);
  const secondaryCharacter = allCharacters.find(char => char.name === secondaryCharacterName);

  // Create Character object. 
  const newCharacter = new Character(mainCharacter, secondaryCharacter);
  return newCharacter;
}

compareBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createCharacter();
})
// class Character {
//   constructor(name) {
//     this.name = name,
//     this.gender =,
//     this.height =,
//     this.mass =,
//     this.hairColor =,
//     this.picURL =
//   }
// }