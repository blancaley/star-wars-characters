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
  compareMass() {
    // Write secondary character mass. As well as if secondary character weighs more/less/same as character and the difference in mass.

    // Destructure object
    const { secondaryName, mainMass, secondaryMass } = this;

    // Return if mass is unknown
    if(mainMass === "unknown" || secondaryMass === "unknown") {
      console.log(`Sorry, I can't compare mass.`)
      return
    }

    const getComparative = (mainMass, secondaryMass) => {
      if(secondaryMass > mainMass) return "more than";
      if(secondaryMass < mainMass) return "less than";
      if(secondaryMass === mainMass) return "same as";
    }

    const calculateWeightDifference = (mainMass, secondaryMass) => {
      const weightDifference = Math.abs(mainMass - secondaryMass);
      return `by ${weightDifference} kg`;
    }

    const comparative = getComparative(mainMass, secondaryMass);
    const weightDifferenceString = calculateWeightDifference(mainMass, secondaryMass);

    const factString = 
      `${secondaryName} weighs ${secondaryMass} kg.`
    const comparisonString = `
      ${secondaryName} weighs ${comparative} me 
      ${`${comparative}` === "same as" ? "" : `${weightDifferenceString}`}.`

    console.log(`${factString} ${comparisonString}`)
  }
  compareHeight() {
    // Write secondary character height. As well as if secondary character is longer, shorter or same as character and the difference in height.

    // Destructure object
    const { secondaryName, mainHeight, secondaryHeight } = this;

    // Return if height is unknown
    if(mainHeight === "unknown" || secondaryHeight === "unknown") {
      console.log(`Sorry, I can't compare height.`)
      return
    }

    const getComparative = (mainHeight, secondaryHeight) => {
      if(secondaryHeight > mainHeight) return "is taller than";
      if(secondaryHeight < mainHeight) return "is shorter than";
      if(secondaryHeight === mainHeight) return "has same height as";
    }

    const calculateHeightDifference = (mainHeight, secondaryHeight) => {
      const heightDifference = Math.abs(mainHeight - secondaryHeight);
      return `by ${heightDifference} cm`;
    }

    const comparative = getComparative(mainHeight, secondaryHeight);
    const heightDifferenceString = calculateHeightDifference(mainHeight, secondaryHeight);

    const factString = 
      `${secondaryName}'s height is ${secondaryHeight} cm.`
    const comparisonString = `
      ${secondaryName} ${comparative} me 
      ${`${comparative}` === "same as" ? "" : `${heightDifferenceString}`}.`

    console.log(`${factString} ${comparisonString}`)
  }
  // Write secondary character hair color. Write if both have same color.
  compareHairColor() {
    // Destructure object
    const { secondaryName, mainHairColor, secondaryHairColor } = this;

    // Return if hair color is unknown
    if(mainHairColor === "unknown" || secondaryHairColor === "unknown") {
      console.log(`Sorry, I can't compare our hair color.`)
      return
    }

    const factString = 
      `${secondaryName}'s hair color is ${secondaryHairColor}.`
    const comparisonString = `
      ${secondaryHairColor === mainHairColor ? "We have same hair color." : ""}`

    console.log(`${factString} ${comparisonString}`)
  }
  compareGender() {
    // Destructure object
    const { secondaryName, mainGender, secondaryGender } = this;

    // Return if hair color is unknown
    if(mainGender === "unknown" || secondaryGender === "unknown") {
      console.log(`Sorry, I can't compare our gender.`)
      return
    }

    const factString = 
      `${secondaryName}'s is ${secondaryGender}.`
    const comparisonString = `
      ${secondaryGender === mainGender ? "We have same gender." : ""}`

    console.log(`${factString} ${comparisonString}`)    
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

  setEventListeners(character, massBtn, heightBtn, hairColorBtn, genderBtn);
}

const setEventListeners = (character, massBtn, heightBtn, hairColorBtn, genderBtn) => {
  massBtn.addEventListener("click", () => {
    character.compareMass();
  })
  heightBtn.addEventListener("click", () => {
    character.compareHeight();
  })
  hairColorBtn.addEventListener("click", () => {
    character.compareHairColor();
  })
  genderBtn.addEventListener("click", () => {
    character.compareGender();
  })
}

createCharacterPairBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const characterSection = document.getElementById("characterSection");
  const characterPair = await createCharacterPair();
  characterPair.forEach(char => {
    drawCharacter(char, characterSection);
  })
})