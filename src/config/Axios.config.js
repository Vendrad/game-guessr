/**
 * Configuration for Axios calls. As there is only a single instance
 * the base URL for the API is set here.
 */
import Axios from 'axios';

switch (process.env.NODE_ENV) {
  case 'development':
    Axios.defaults.baseURL = 'http://localhost:3080/api/v1/';
    break;
  default:
    Axios.defaults.baseURL = 'https://api2.raredevil.co.uk/api/v1/';
}
