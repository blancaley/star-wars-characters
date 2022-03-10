const fetchData = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

class Character {
  constructor(name) {
    this.name = name,
    this.gender =,
    this.height =,
    this.mass =,
    this.hairColor =,
    this.picURL =
  }
}