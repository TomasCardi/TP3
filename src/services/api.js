import axios from 'axios';

// Creamos una instancia de Axios con la URL base de la API de Rick & Morty
const API = axios.create({
  baseURL: 'https://rickandmortyapi.com/api'
});

// Petición GET para listar personajes con paginación y filtro de estado (Vivo/Muerto)
export const getCharacters = (page = 1, status = '') => {
  return API.get(`/character?page=${page}&status=${status}`);
};

// Petición GET para el detalle de un personaje según su ID
export const getCharacterById = (id) => {
  return API.get(`/character/${id}`);
};

// Petición GET para el detalle de un episodio según su ID
export const getEpisodeById = (id) => {
  return API.get(`/episode/${id}`);
};