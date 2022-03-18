import { getData } from './data-service'
let globalCache = {}
// Variables
const createCharacterPairBtn = document.getElementById("createCharacterPairBtn");
const createCharactersForm = document.getElementById("createCharactersForm");

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

const images = [{
  characterName: "Anakin Skywalker",
  imgURL: "../assets/img/Anakin-Skywalker.png"
}, {
  characterName: "Wilhuff Tarkin",
  imgURL: "../assets/img/Wilhuff-Tarkin.png"
}, {
  characterName: "Chewbacca",
  imgURL: "../assets/img/Chewbacca.jpeg"
}, {
  characterName: "Han Solo",
  imgURL: "../assets/img/Han-Solo.jpg"
}, {
  characterName: "Greedo",
  imgURL: "../assets/img/Greedo.jpg"
}, {
  characterName: "Jabba Desilijic Tiure",
  imgURL: "../assets/img/Jabba-Desilijic-Tiure.jpg"
}, {
  characterName: "Yoda",
  imgURL: "../assets/img/Yoda.jpg"
}, {
  characterName: "Palpatine",
  imgURL: "../assets/img/Palpatine.jpg"
}]
class Character {
  constructor(mainCharacter, secondaryCharacter) {
    this.mainName = mainCharacter.name,
    this.mainGender = mainCharacter.gender,
    this.mainHeight = mainCharacter.height,
    this.mainMass = mainCharacter.mass,
    this.mainHairColor = mainCharacter.hair_color,
    this.mainPictureUrl = this.getPictureURL(mainCharacter),

    this.secondaryName = secondaryCharacter.name,
    this.secondaryGender = secondaryCharacter.gender,
    this.secondaryHeight = secondaryCharacter.height,
    this.secondaryMass = secondaryCharacter.mass,
    this.secondaryHairColor = secondaryCharacter.hair_color,
    this.secondaryPictureUrl = this.getPictureURL(secondaryCharacter)
  }
  getPictureURL(character) {
    const foundChar = images.find(charInImages => charInImages.characterName === character.name);
    return foundChar.imgURL;
  }
  // Write secondary character mass. As well as if secondary character weighs more/less/same as character and the difference in mass.
  compareMass() {
    // Destructure object
    const { secondaryName, mainMass, secondaryMass } = this;
    // Return this message if mass is unknown
    if(mainMass === "unknown" || secondaryMass === "unknown") {
      return `Sorry, I can't compare mass.`
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
    const comparisonString = `${secondaryName} weighs ${comparative} me ${`${comparative}` === "same as" ? "" : `${weightDifferenceString}`}.`

    return `${factString} ${comparisonString}`
  }
  // Write secondary character height. As well as if secondary character is longer, shorter or same as character and the difference in height.
  compareHeight() {
    // Destructure object
    const { secondaryName, mainHeight, secondaryHeight } = this;

    // Return if height is unknown
    if(mainHeight === "unknown" || secondaryHeight === "unknown") {
      return `Sorry, I can't compare height.`
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
    const comparisonString = `${secondaryName} ${comparative} me ${`${comparative}` === "same height as" ? "" : `${heightDifferenceString}`}.`

    return `${factString} ${comparisonString}`
  }
  // Write secondary character hair color. Write if both have same color.
  compareHairColor() {
    // Destructure object
    const { secondaryName, mainHairColor, secondaryHairColor } = this;

    // Return if hair color is unknown
    if(mainHairColor === "unknown" || secondaryHairColor === "unknown") {
      return `Sorry, I can't compare our hair color.`
    }
    const factString = 
      `${secondaryName}'s hair color is ${secondaryHairColor}.`
    const comparisonString = `${secondaryHairColor === mainHairColor ? "We have same hair color." : ""}`

      return `${factString} ${comparisonString}`
  }
  compareGender() {
    // Destructure object
    const { secondaryName, mainGender, secondaryGender } = this;
    // Return if hair color is unknown
    if(mainGender === "unknown" || secondaryGender === "unknown") {
      return `Sorry, I can't compare our gender.`
    }
    const factString = 
      `${secondaryName}'s is ${secondaryGender}.`
    const comparisonString = `${secondaryGender === mainGender ? "We have same gender." : ""}`

      return `${factString} ${comparisonString}`    
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
  //Execute both promises at the same time
  const [character1, character2] = await Promise.all([createCharacter(character1Name, character2Name, allCharacters), createCharacter(character2Name, character1Name, allCharacters)])

  return [character1, character2];
}

// Renders
const drawCompareBtn = attribute => {
  const button = document.createElement("button");
  const formattedTitle = attribute.split("_").join(" ");
  const compareIcon = document.createElement("i");
  compareIcon.classList.add("icon", `${attribute}`);
  button.innerText = `${formattedTitle}`;
  button.classList.add("compare", `${attribute}`);
  button.prepend(compareIcon);
  return button;
}

const drawDialogBox = (msg, character, container) => {
  const dialogBox = document.querySelector(".dialog-box");
  if(dialogBox) {
    dialogBox.remove();
  }
  const section = document.createElement("section");
  section.classList.add("dialog-box");   

  const imgContainer = document.createElement("div")
  imgContainer.classList.add("img-container"); 

  const dialogImage = document.createElement("img")
  dialogImage.src = `${character.mainPictureUrl}`

  const msgContainer = document.createElement("div");
  msgContainer.classList.add("msgContainer");

  const p = document.createElement("p");
  p.innerText = msg;

  imgContainer.append(dialogImage);
  msgContainer.append(p);
  section.append(imgContainer, msgContainer);
  container.appendChild(section);
}

const drawCharacter = (character, container) => {
  const characterCard = document.createElement("article");
  const formattedName = character.mainName.split(" ").join("_");
  characterCard.id = `${formattedName}_Card`;

  // Image
  const image = document.createElement("img")
  image.src = `${character.mainPictureUrl}`

  // Header
  const header = document.createElement("h3");
  header.innerText = character.mainName;

  const compareHeader = document.createElement("h4");
  compareHeader.innerText = "Compare";

  // Buttons
  const buttonGroup = document.createElement("div");
  buttonGroup.classList.add("button-group");
  const massBtn = drawCompareBtn("mass");
  const heightBtn = drawCompareBtn("height");
  const hairColorBtn = drawCompareBtn("hair_color");
  const genderBtn = drawCompareBtn("gender");

  buttonGroup.append(massBtn, heightBtn, hairColorBtn, genderBtn);
  characterCard.append(image, header, compareHeader, buttonGroup);
  container.append(characterCard);

  setEventListeners(character, massBtn, heightBtn, hairColorBtn, genderBtn);
}

// Event Listeners
const setEventListeners = (character, massBtn, heightBtn, hairColorBtn, genderBtn) => {
  massBtn.addEventListener("click", (e) => {
    const characterSection = e.target.closest("#characterSection");
    const massMsg = character.compareMass();
    drawDialogBox(massMsg, character, characterSection);
  })
  heightBtn.addEventListener("click", (e) => {
    const characterSection = e.target.closest("#characterSection");
    const heightMsg = character.compareHeight();
    drawDialogBox(heightMsg, character, characterSection);
  })
  hairColorBtn.addEventListener("click", (e) => {
    const characterSection = e.target.closest("#characterSection");
    const hairColorMsg = character.compareHairColor();
    drawDialogBox(hairColorMsg, character, characterSection);
  })
  genderBtn.addEventListener("click", (e) => {
    const characterSection = e.target.closest("#characterSection");
    const genderMsg = character.compareGender();
    drawDialogBox(genderMsg, character, characterSection);
  })
}

createCharacterPairBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const characterSection = document.getElementById("characterSection");
  const pairContainer = document.createElement("div");
  pairContainer.classList.add("pair-container");

  //Loader
  const loader = document.getElementById("loader");
  loader.classList.remove("hidden");

  const characterPair = await createCharacterPair();
  loader.classList.add("hidden");

  let names = characterPair.map(char => char.mainName).join(" vs ");

  characterPair.forEach(char => {
    drawCharacter(char, pairContainer);
    createCharactersForm.classList.add("hidden");
  })
  const subheader = document.getElementById("subheader");
  subheader.innerText = names;

  characterSection.appendChild(pairContainer);
});

const disableDuplicateCharacter = (e) => {
  const selectedCharacter = e.target.value;
  let selectInputID;
  // For targeting the other input 
  if(e.target.id === "mainCharacter") {
    selectInputID = "secondaryCharacter";
  } else {
    selectInputID = "mainCharacter";
  }
  // Remove disable on all options to avoid ending up with many disabled  
  // Select all options except the first one ("Select character")
  const allCharacterOptions = document.querySelectorAll(`#${selectInputID}  option:not(:first-child)`)
  allCharacterOptions.forEach(opt => {
    opt.disabled = false;
  }) 
  // Disable only duplicate character
  const duplicatedCharacter = document.querySelector(`#${selectInputID} [value="${selectedCharacter}"]`);
  duplicatedCharacter.disabled = true;
}

createCharactersForm.addEventListener("change", (e) => {
  disableDuplicateCharacter(e);
});