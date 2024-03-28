# 🌍 GEO API Documentation
 Comprehensive Country Information Service


Welcome to GEO API documentation! 🎉 This API provides endpoints to retrieve information about countries and regions from a database. You can use these endpoints to fetch data about countries, search for specific countries, manage regions, and more.

---

## Base URL

The base URL for all endpoints is: `https://your-api-base-url.com` 🚀

## Authentication

This API does not require authentication for accessing the endpoints. 🛡️

## Country Endpoints

### Get All Countries

- **URL:** `/all-countries`
- **Method:** `GET`
- **Description:** Retrieve a list of all countries with basic information.
- **Response:** An array of country objects containing name, population, capital, languages, currency, and other details. 🌟

### Search Through Countries

- **URL:** `/countries-search`
- **Method:** `GET`
- **Description:** Search for countries based on a query string.
- **Query Parameters:** `q` (required) - Search query.
- **Response:** An array of country objects matching the search query. 🔍

### Get Country by Value

- **URL:** `/country/:value`
- **Method:** `GET`
- **Description:** Retrieve country details by its unique value.
- **URL Parameters:** `value` - Unique value of the country.
- **Response:** Details of the specified country. 📝



### Get All Countries with Capital City

- **URL:** `/countries/capital`
- **Method:** `GET`
- **Description:** Retrieve a list of all countries with their respective capital cities.
- **Response:** An array of country objects with name and capital city. 🌆


### Get Country Capital City by Value

- **URL:** `/countries/capital/:value`
- **Method:** `GET`
- **Description:** Retrieve the capital city of a country by its unique value.
- **URL Parameters:** `value` - Unique value of the country.
- **Response:** Capital city of the specified country. 🏙️


### Get All Countries with Currency

- **URL:** `/countries/currency`
- **Method:** `GET`
- **Description:** Retrieve a list of all countries with their respective currencies.
- **Response:** An array of country objects with name and currency details. 💱



### Get Country Currency by Value

- **URL:** `/countries/currency/:value`
- **Method:** `GET`
- **Description:** Retrieve the currency information of a country by its unique value.
- **URL Parameters:** `value` - Unique value of the country.
- **Response:** Currency details of the specified country. 💰



### Get All Countries with Languages

- **URL:** `/countries/languages`
- **Method:** `GET`
- **Description:** Retrieve a list of all countries with their respective languages.
- **Response:** An array of country objects with name and languages spoken. 🌐


### Get Country Languages by Value

- **URL:** `/countries/languages/:value`
- **Method:** `GET`
- **Description:** Retrieve the languages spoken in a country by its unique value.
- **URL Parameters:** `value` - Unique value of the country.
- **Response:** Languages spoken in the specified country. 🗣️



### Get All Countries with Telephone Codes

- **URL:** `/countries/telephone`
- **Method:** `GET`
- **Description:** Retrieve a list of all countries with their respective telephone codes.
- **Response:** An array of country objects with name and telephone codes. 📞

### Get Country Telephone Code by Value

- **URL:** `/countries/telephone/:value`
- **Method:** `GET`
- **Description:** Retrieve the telephone code of a country by its unique value.
- **URL Parameters:** `value` - Unique value of the country.
- **Response:** Telephone code of the specified country. 📞

### Get All Countries with Population

- **URL:** `/countries/population`
- **Method:** `GET`
- **Description:** Retrieve a list of all countries with their respective populations.
- **Response:** An array of country objects with name and population. 📊

### Get Country Population by Value

- **URL:** `/countries/population/:value`
- **Method:** `GET`
- **Description:** Retrieve the population of a country by its unique value.
- **URL Parameters:** `value` - Unique value of the country.
- **Response:** Population of the specified country. 📊


## Region Endpoints

### Get All Regions

- **URL:** `/regions`
- **Method:** `GET`
- **Description:** Retrieve a list of all regions with their names and values.
- **Response:** An array of region objects containing name and value. 🌍



### Get Region by Value

- **URL:** `/regions/:value`
- **Method:** `GET`
- **Description:** Retrieve region details by its unique value.
- **URL Parameters:** `value` - Unique value of the region.
- **Response:** Details of the specified region. 📝




---