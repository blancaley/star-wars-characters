import { getData } from './data-service'
let globalCache = {}
// Variables
const createCharacterPairBtn = document.getElementById("createCharacterPairBtn");

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
  const allCharacters = await getData(`https://swapi.dev/api/people/?page=2`);
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

const createCharacter = (mainCharacter, secondaryCharacter, allCharacters) => {
  const mainCharacterObj = allCharacters.find(char => char.name === mainCharacter);
  const secondaryCharacterObj = allCharacters.find(char => char.name === secondaryCharacter);
  const newCharacter = new Character(mainCharacterObj, secondaryCharacterObj);
  return newCharacter;
}

const createCharacterPair = async () => {
  // Get selected characters name
  const character1Name = document.getElementById("mainCharacter").value;
  const character2Name = document.getElementById("secondaryCharacter").value;
  // Get character data from API for selected names
  const allCharacters = await getAllCharacters();
  const character1 = await createCharacter(character1Name, character2Name, allCharacters);
  const character2 = await createCharacter(character2Name, character1Name, allCharacters);

  return [character1, character2];
}

const drawCompareBtn = attribute => {
  const button = document.createElement("button");
  const formattedAttribute = attribute.split("_").join(" ");
  button.innerText = `Compare ${formattedAttribute}`;
  button.id = `compare_${attribute}`;
  return button;
}

const drawCharacter = (character, container) => {
  const characterCard = document.createElement("article");
  const formattedName = character.mainName.split(" ").join("_");
  characterCard.id = `${formattedName}_Card`;
  
  const header = document.createElement("h2");
  header.innerText = character.mainName;

  // Draw buttons
  const buttonGroup = document.createElement("div");
  buttonGroup.classList.add = "button-group";
  const massBtn = drawCompareBtn("mass");
  const heightBtn = drawCompareBtn("height");
  const hairColorBtn = drawCompareBtn("hair_color");
  const genderBtn = drawCompareBtn("gender");

  buttonGroup.append(massBtn, heightBtn, hairColorBtn, genderBtn);
  characterCard.append(header, buttonGroup);
  container.append(characterCard);
}

createCharacterPairBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const characterSection = document.getElementById("characterSection");
  const characterPair = await createCharacterPair();
  characterPair.forEach(char => {
    drawCharacter(char, characterSection);
  })
})