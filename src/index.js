import axios from 'axios';

axios.get("https://swapi.dev/api/people")
  .then(response => {
    console.log(response.data)
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