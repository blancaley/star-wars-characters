const fetchData = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

const createCharacter = async () => {
  const getData = await fetchData("https://swapi.dev/api/people");
  console.log(getData);
}

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