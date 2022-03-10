import axios from 'axios';

export const getData = async () => {
  const response = await axios.get("https://swapi.dev/api/people");
  console.log(response);
}