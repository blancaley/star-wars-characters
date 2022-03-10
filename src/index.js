import { getData } from './data-service'

const getCharacterData = async (id) => {
  return await getData(`https://swapi.dev/api/people/${id}`);
}

// const createCharacter = async () => {
//   const data = await getCharacterData(1);
//   console.log(data)
// }

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