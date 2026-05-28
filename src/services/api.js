import axios from 'axios';

// Creamos una instancia de Axios con la URL base de la API de Rick & Morty
const API = axios.create({
  baseURL: 'https://rickandmortyapi.com/api'
});

// 👥 VISTA 1: Listar personajes con paginación y filtro de estado (Vivo/Muerto)
export const getCharacters = (page = 1, status = '') => {
  return API.get(`/character?page=${page}&status=${status}`);
};

// 👤 VISTA 2: Obtener el detalle de un personaje según su ID
export const getCharacterById = (id) => {
  return API.get(`/character/${id}`);
};

// 🎬 VISTA 3: Obtener el detalle de un episodio según su ID
export const getEpisodeById = (id) => {
  return API.get(`/episode/${id}`);
};

// 🛸 POWER UP 1: Buscar episodios por nombre
export const getEpisodesByName = (name) => {
  return API.get(`/episode/?name=${name}`);
};

// 🌍 POWER UP 3: Obtener locaciones con paginación integrada
export const getLocations = (page = 1) => {
  return API.get(`/location?page=${page}`);
};