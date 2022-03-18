/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ (() => {

eval("throw new Error(\"Module build failed: Error: ENOENT: no such file or directory, open '/Users/blancaley/Documents/JavaScript/_Nackademin/_Javascript 2/star-wars-trivia/node_modules/axios/index.js'\");\n\n//# sourceURL=webpack://star-wars-trivia/./node_modules/axios/index.js?");

/***/ }),

/***/ "./src/data-service.js":
/*!*****************************!*\
  !*** ./src/data-service.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getData\": () => (/* binding */ getData)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n\n\nconst getData = async (url) => {\n  const response = await axios__WEBPACK_IMPORTED_MODULE_0__.get(url);\n  return response.data;\n}\n\n//# sourceURL=webpack://star-wars-trivia/./src/data-service.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data-service */ \"./src/data-service.js\");\n\nlet globalCache = {}\n// Variables\nconst createCharacterPairBtn = document.getElementById(\"createCharacterPairBtn\");\nconst createCharactersForm = document.getElementById(\"createCharactersForm\");\n\nconst getCharacterByID = async (id) => {\n  if(!id) {\n    throw new Error(\"ID was not provided\");\n  }\n  return await (0,_data_service__WEBPACK_IMPORTED_MODULE_0__.getData)(`https://swapi.dev/api/people/${id}`);\n}\n\nconst getAllCharacters = async () => {\n  // Check if we already have the data from API\n  if (Object.keys(globalCache).length > 0) {\n    return globalCache;\n  }\n  // Get data from API and save it in globalCache\n  const allCharacters = await (0,_data_service__WEBPACK_IMPORTED_MODULE_0__.getData)(`https://swapi.dev/api/people/?page=2`);\n  globalCache = allCharacters.results;\n  return allCharacters.results;\n}\n\nconst images = [{\n  characterName: \"Anakin Skywalker\",\n  imgURL: \"../assets/img/Anakin-Skywalker.png\"\n}, {\n  characterName: \"Wilhuff Tarkin\",\n  imgURL: \"../assets/img/Wilhuff-Tarkin.png\"\n}, {\n  characterName: \"Chewbacca\",\n  imgURL: \"../assets/img/Chewbacca.jpeg\"\n}, {\n  characterName: \"Han Solo\",\n  imgURL: \"../assets/img/Han-Solo.jpg\"\n}, {\n  characterName: \"Greedo\",\n  imgURL: \"../assets/img/Greedo.jpg\"\n}, {\n  characterName: \"Jabba Desilijic Tiure\",\n  imgURL: \"../assets/img/Jabba-Desilijic-Tiure.jpg\"\n}, {\n  characterName: \"Yoda\",\n  imgURL: \"../assets/img/Yoda.jpg\"\n}, {\n  characterName: \"Palpatine\",\n  imgURL: \"../assets/img/Palpatine.jpg\"\n}]\nclass Character {\n  constructor(mainCharacter, secondaryCharacter) {\n    this.mainName = mainCharacter.name,\n    this.mainGender = mainCharacter.gender,\n    this.mainHeight = mainCharacter.height,\n    this.mainMass = mainCharacter.mass,\n    this.mainHairColor = mainCharacter.hair_color,\n    this.mainPictureUrl = this.getPictureURL(mainCharacter),\n\n    this.secondaryName = secondaryCharacter.name,\n    this.secondaryGender = secondaryCharacter.gender,\n    this.secondaryHeight = secondaryCharacter.height,\n    this.secondaryMass = secondaryCharacter.mass,\n    this.secondaryHairColor = secondaryCharacter.hair_color,\n    this.secondaryPictureUrl = this.getPictureURL(secondaryCharacter)\n  }\n  getPictureURL(character) {\n    const foundChar = images.find(charInImages => charInImages.characterName === character.name);\n    return foundChar.imgURL;\n  }\n  // Write secondary character mass. As well as if secondary character weighs more/less/same as character and the difference in mass.\n  compareMass() {\n    // Destructure object\n    const { secondaryName, mainMass, secondaryMass } = this;\n    // Return this message if mass is unknown\n    if(mainMass === \"unknown\" || secondaryMass === \"unknown\") {\n      return `Sorry, I can't compare mass.`\n    }\n    const getComparative = (mainMass, secondaryMass) => {\n      if(secondaryMass > mainMass) return \"more than\";\n      if(secondaryMass < mainMass) return \"less than\";\n      if(secondaryMass === mainMass) return \"same as\";\n    }\n    const calculateWeightDifference = (mainMass, secondaryMass) => {\n      const weightDifference = Math.abs(mainMass - secondaryMass);\n      return `by ${weightDifference} kg`;\n    }\n    const comparative = getComparative(mainMass, secondaryMass);\n    const weightDifferenceString = calculateWeightDifference(mainMass, secondaryMass);\n\n    const factString = \n      `${secondaryName} weighs ${secondaryMass} kg.`\n    const comparisonString = `${secondaryName} weighs ${comparative} me ${`${comparative}` === \"same as\" ? \"\" : `${weightDifferenceString}`}.`\n\n    return `${factString} ${comparisonString}`\n  }\n  // Write secondary character height. As well as if secondary character is longer, shorter or same as character and the difference in height.\n  compareHeight() {\n    // Destructure object\n    const { secondaryName, mainHeight, secondaryHeight } = this;\n\n    // Return if height is unknown\n    if(mainHeight === \"unknown\" || secondaryHeight === \"unknown\") {\n      return `Sorry, I can't compare height.`\n    }\n    const getComparative = (mainHeight, secondaryHeight) => {\n      if(secondaryHeight > mainHeight) return \"is taller than\";\n      if(secondaryHeight < mainHeight) return \"is shorter than\";\n      if(secondaryHeight === mainHeight) return \"has same height as\";\n    }\n    const calculateHeightDifference = (mainHeight, secondaryHeight) => {\n      const heightDifference = Math.abs(mainHeight - secondaryHeight);\n      return `by ${heightDifference} cm`;\n    }\n    const comparative = getComparative(mainHeight, secondaryHeight);\n    const heightDifferenceString = calculateHeightDifference(mainHeight, secondaryHeight);\n\n    const factString = \n      `${secondaryName}'s height is ${secondaryHeight} cm.`\n    const comparisonString = `${secondaryName} ${comparative} me ${`${comparative}` === \"same height as\" ? \"\" : `${heightDifferenceString}`}.`\n\n    return `${factString} ${comparisonString}`\n  }\n  // Write secondary character hair color. Write if both have same color.\n  compareHairColor() {\n    // Destructure object\n    const { secondaryName, mainHairColor, secondaryHairColor } = this;\n\n    // Return if hair color is unknown\n    if(mainHairColor === \"unknown\" || secondaryHairColor === \"unknown\") {\n      return `Sorry, I can't compare our hair color.`\n    }\n    const factString = \n      `${secondaryName}'s hair color is ${secondaryHairColor}.`\n    const comparisonString = `${secondaryHairColor === mainHairColor ? \"We have same hair color.\" : \"\"}`\n\n      return `${factString} ${comparisonString}`\n  }\n  compareGender() {\n    // Destructure object\n    const { secondaryName, mainGender, secondaryGender } = this;\n    // Return if hair color is unknown\n    if(mainGender === \"unknown\" || secondaryGender === \"unknown\") {\n      return `Sorry, I can't compare our gender.`\n    }\n    const factString = \n      `${secondaryName}'s is ${secondaryGender}.`\n    const comparisonString = `${secondaryGender === mainGender ? \"We have same gender.\" : \"\"}`\n\n      return `${factString} ${comparisonString}`    \n  }\n}\n\nconst createCharacter = (mainCharacter, secondaryCharacter, allCharacters) => {\n  const mainCharacterObj = allCharacters.find(char => char.name === mainCharacter);\n  const secondaryCharacterObj = allCharacters.find(char => char.name === secondaryCharacter);\n  const newCharacter = new Character(mainCharacterObj, secondaryCharacterObj);\n  return newCharacter;\n}\n\nconst createCharacterPair = async () => {\n  // Get selected characters name\n  const character1Name = document.getElementById(\"mainCharacter\").value;\n  const character2Name = document.getElementById(\"secondaryCharacter\").value;\n  \n  // Get character data from API for selected names\n  const allCharacters = await getAllCharacters();\n  const character1 = await createCharacter(character1Name, character2Name, allCharacters);\n  const character2 = await createCharacter(character2Name, character1Name, allCharacters);\n\n  return [character1, character2];\n}\n\n// Renders\nconst drawCompareBtn = attribute => {\n  const button = document.createElement(\"button\");\n  const formattedTitle = attribute.split(\"_\").join(\" \");\n  const compareIcon = document.createElement(\"i\");\n  compareIcon.classList.add(\"icon\", `${attribute}`);\n  button.innerText = `${formattedTitle}`;\n  button.classList.add(\"compare\", `${attribute}`);\n  button.prepend(compareIcon);\n  return button;\n}\n\nconst drawDialogBox = (msg, character, container) => {\n  const dialogBox = document.querySelector(\".dialog-box\");\n  if(dialogBox) {\n    dialogBox.remove();\n  }\n  const section = document.createElement(\"section\");\n  section.classList.add(\"dialog-box\");   \n\n  const imgContainer = document.createElement(\"div\")\n  imgContainer.classList.add(\"img-container\"); \n\n  const dialogImage = document.createElement(\"img\")\n  dialogImage.src = `${character.mainPictureUrl}`\n\n  const msgContainer = document.createElement(\"div\");\n  msgContainer.classList.add(\"msgContainer\");\n\n  const p = document.createElement(\"p\");\n  p.innerText = msg;\n\n  imgContainer.append(dialogImage);\n  msgContainer.append(p);\n  section.append(imgContainer, msgContainer);\n  container.appendChild(section);\n}\n\nconst drawCharacter = (character, container) => {\n  const characterCard = document.createElement(\"article\");\n  const formattedName = character.mainName.split(\" \").join(\"_\");\n  characterCard.id = `${formattedName}_Card`;\n\n  // Image\n  const image = document.createElement(\"img\")\n  image.src = `${character.mainPictureUrl}`\n\n  // Header\n  const header = document.createElement(\"h3\");\n  header.innerText = character.mainName;\n\n  const compareHeader = document.createElement(\"h4\");\n  compareHeader.innerText = \"Compare\";\n\n  // Buttons\n  const buttonGroup = document.createElement(\"div\");\n  buttonGroup.classList.add(\"button-group\");\n  const massBtn = drawCompareBtn(\"mass\");\n  const heightBtn = drawCompareBtn(\"height\");\n  const hairColorBtn = drawCompareBtn(\"hair_color\");\n  const genderBtn = drawCompareBtn(\"gender\");\n\n  buttonGroup.append(massBtn, heightBtn, hairColorBtn, genderBtn);\n  characterCard.append(image, header, compareHeader, buttonGroup);\n  container.append(characterCard);\n\n  setEventListeners(character, massBtn, heightBtn, hairColorBtn, genderBtn);\n}\n\n// Event Listeners\nconst setEventListeners = (character, massBtn, heightBtn, hairColorBtn, genderBtn) => {\n  massBtn.addEventListener(\"click\", (e) => {\n    const characterSection = e.target.closest(\"#characterSection\");\n    const massMsg = character.compareMass();\n    drawDialogBox(massMsg, character, characterSection);\n  })\n  heightBtn.addEventListener(\"click\", (e) => {\n    const characterSection = e.target.closest(\"#characterSection\");\n    const heightMsg = character.compareHeight();\n    drawDialogBox(heightMsg, character, characterSection);\n  })\n  hairColorBtn.addEventListener(\"click\", (e) => {\n    const characterSection = e.target.closest(\"#characterSection\");\n    const hairColorMsg = character.compareHairColor();\n    drawDialogBox(hairColorMsg, character, characterSection);\n  })\n  genderBtn.addEventListener(\"click\", (e) => {\n    const characterSection = e.target.closest(\"#characterSection\");\n    const genderMsg = character.compareGender();\n    drawDialogBox(genderMsg, character, characterSection);\n  })\n}\n\ncreateCharacterPairBtn.addEventListener(\"click\", async (e) => {\n  e.preventDefault();\n  const characterSection = document.getElementById(\"characterSection\");\n  const pairContainer = document.createElement(\"div\");\n  pairContainer.classList.add(\"pair-container\");\n\n  //Loader\n  const loader = document.getElementById(\"loader\");\n  loader.classList.remove(\"hidden\");\n\n  const characterPair = await createCharacterPair();\n  loader.classList.add(\"hidden\");\n  \n  characterPair.forEach(char => {\n    drawCharacter(char, pairContainer);\n    createCharactersForm.classList.add(\"hidden\");\n  })\n  characterSection.appendChild(pairContainer);\n});\n\nconst disableDuplicateCharacter = (e) => {\n  const selectedCharacter = e.target.value;\n  let selectInputID;\n  // For targeting the other input \n  if(e.target.id === \"mainCharacter\") {\n    selectInputID = \"secondaryCharacter\";\n  } else {\n    selectInputID = \"mainCharacter\";\n  }\n  // Remove disable on all options to avoid ending up with many disabled  \n  // Select all options except the first one (\"Select character\")\n  const allCharacterOptions = document.querySelectorAll(`#${selectInputID}  option:not(:first-child)`)\n  allCharacterOptions.forEach(opt => {\n    opt.disabled = false;\n  }) \n  // Disable only duplicate character\n  const duplicatedCharacter = document.querySelector(`#${selectInputID} [value=\"${selectedCharacter}\"]`);\n  duplicatedCharacter.disabled = true;\n}\n\ncreateCharactersForm.addEventListener(\"change\", (e) => {\n  disableDuplicateCharacter(e);\n});\n\n//# sourceURL=webpack://star-wars-trivia/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;