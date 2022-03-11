import { getData } from './data-service'

// Variables
const createCharacterPairBtn = document.getElementById("createCharacterPair");

const getCharacterByID = async (id) => {
  if(!id) {
    throw new Error("ID was not provided");
  }
  return await getData(`https://swapi.dev/api/people/${id}`);
}

const getAllCharacters = async () => {
  // Check if we already have the data from API
  if (Object.keys(globalCache).length > 0) {
    return globalCache;
  }
  // Get data from API and save it in globalCache
  const allCharacters = await getData(`https://swapi.dev/api/people`);
  globalCache = allCharacters.results;
  return allCharacters.results;
}
class Character {
  constructor(mainCharacter, secondaryCharacter) {
    this.mainName = mainCharacter.name,
    this.mainGender = mainCharacter.gender,
    this.mainHeight = mainCharacter.height,
    this.mainMass = mainCharacter.mass,
    this.mainHairColor = mainCharacter.hair_color,
    this.mainPicURL = "",

    this.secondaryName = secondaryCharacter.name,
    this.secondaryGender = secondaryCharacter.gender,
    this.secondaryHeight = secondaryCharacter.height,
    this.secondaryMass = secondaryCharacter.mass,
    this.secondaryHairColor = secondaryCharacter.hair_color,
    this.secondaryPicURL = ""
  }
}

const createCharacterPair = async () => {
  // Get selected characters name
  const characterOneName = document.getElementById("mainCharacter").value;
  const characterTwoName = document.getElementById("secondaryCharacter").value;
  
  // Get character data from API for selected names
  const allCharacters = await getAllCharacters();
  const characterOne = allCharacters.find(char => char.name === characterOneName);
  const characterTwo = allCharacters.find(char => char.name === characterTwoName);

  // Create Character object. 
  const characterOneObject = new Character(characterOne, characterTwo);
  const characterTwoObject = new Character(characterTwo, characterOne);
}

createCharacterPairBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createCharacterPair();
})