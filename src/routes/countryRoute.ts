import express from "express";
import {
  // Importing controller functions for handling country routes
  getAllCountries,
  createCountries,
  getCountryByValue,
  getCountryPopByValue,
  getCountryLangByValue,
  getCountryCurrencyByValue,
  getCountryTelByValue,
  getCountryCapitalCityByValue,
  getAllCountriesCapitalCity,
  getAllCountriesCurrency,
  getAllCountriesLang,
  getAllCountriesTel,
  getAllCountriesPopulation,
  searchThroughCountries,
} from "../controllers/country.controller";

const router = express.Router();

// Routes for single country attributes
router.get("/all-countries", getAllCountries); // Route to get all countries
router.post("/countries", createCountries); // Route to create new countries
router.get("/countries-search", searchThroughCountries); // Route to search through countries
router.get("/country/:value", getCountryByValue); // Route to get country by value
router.get("/countries/population/:value", getCountryPopByValue); // Route to get country population by value
router.get("/countries/languages/:value", getCountryLangByValue); // Route to get country languages by value
router.get("/countries/currency/:value", getCountryCurrencyByValue); // Route to get country currency by value
router.get("/countries/telephone/:value", getCountryTelByValue); // Route to get country telephone code by value
router.get("/countries/capital/:value", getCountryCapitalCityByValue); // Route to get country capital city by value

// Routes for all countries with specific attributes
router.get("/countries/population", getAllCountriesPopulation); // Route to get all countries with population
router.get("/countries/capital", getAllCountriesCapitalCity); // Route to get all countries with capital city
router.get("/countries/currency", getAllCountriesCurrency); // Route to get all countries with currency
router.get("/countries/languages", getAllCountriesLang); // Route to get all countries with languages
router.get("/countries/telephone", getAllCountriesTel); // Route to get all countries with telephone codes

export default router;
