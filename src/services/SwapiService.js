class SwapiService {

  _apiBase = 'https://swapi.co/api';

  async getResource (url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, Res status: ${res.status}`);
    }

    return await res.json();
  }

  async getUsers () {
    const users = await this.getResource('/people/');
    return users.results.map(this._transformUser);
  }

  async getUser (id) {
    const user = await this.getResource(`/people/${id}`);
    return this._transformUser(user);
  }

  async getPlanets () {
    const planets = await this.getResource('/planets/');
    return planets.results.map(this._transformPlanet);
  }

  async getPlanet (id) {
    const planet = await this.getResource(`/planets/${id}`);
    return this._transformPlanet(planet);
  }

  async getStarShips () {
    const starship = await this.getResource('/starships/');
    return starship.results.map(this._transformStarship);
  }

  async getStarShip (id) {
    const starship = await this.getResource(`/starships/${id}`);
    return this._transformStarship(starship);
  }

  _getId(url) {
    return url.match(/\/([0-9]*)\/$/)[1];
  }

  _transformPlanet = (planet) => {
    return {
      id: this._getId(planet.url),
      name: planet.name,
      population: planet.population,
      rotationPereiud: planet.rotation_period,
      diameter: planet.diameter,
    }
  };

  _transformStarship = (starship) => {
    return {
      id: this._getId(starship.url),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity
    }
  }

  _transformUser = (user) => {
    return {
      id: this._getId(user.url),
      name: user.name,
      gender: user.gender,
      birthYear: user.birth_year,
      eyeColor: user.eye_color
    }
  }
}

export default SwapiService;
