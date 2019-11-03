import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://ddragon.leagueoflegends.com/cdn/9.21.1/data/en_US',
});

export default instance;