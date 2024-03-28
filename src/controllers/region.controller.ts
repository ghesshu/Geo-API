import { Country } from "../models/country";
import { Region } from "../models/region";
import { Request, Response } from "express";

// Function to convert name to a sanitized value
const getValueFromName = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, "_");
};

// Controller function to get all regions
export const getAllRegions = async (req: Request, res: Response) => {
  try {
    // Query all regions from the database
    const regions = await Region.find({}, { _id: 0, name: 1, value: 1 });

    // Extract name and value fields from each region document
    const sanitizedRegions = regions.map((region) => ({
      name: region.name,
      value: region.value,
    }));

    // Return only name and value fields
    return res.json(sanitizedRegions);
  } catch (error) {
    return res.status(500).json({ error: "Could not fetch regions" });
  }
};

// Controller function to create a region
export const createRegion = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const reqbody = { name: name, value: getValueFromName(name) };
    const region = await Region.create(reqbody);

    // Omitting ObjectId fields from response
    const sanitizedRegion = {
      ...region.toObject(),
      _id: undefined,
      countries: undefined,
    };
    return res.status(201).json(sanitizedRegion);
  } catch (error) {
    return res.status(500).json({ error: "Could not create region" });
  }
};

// Controller function to get region by value
export const getRegionByValue = async (req: Request, res: Response) => {
  try {
    const { value } = req.params;
    const region = await Region.findOne({ value });

    if (!region) {
      return res.status(404).json({ error: "Region not found" });
    }

    // Fetch details of countries in the region
    const countries = await Country.find(
      { _id: { $in: region.countries } },
      { name: 1, value: 1 }
    );

    // Extract name and value of each country
    const countryDetails = countries.map((country) => ({
      name: country.name,
      value: country.value,
    }));

    // Prepare sanitized region object
    const sanitizedRegion = {
      name: region.name,
      value: region.value,
      countries: countryDetails,
    };

    return res.json(sanitizedRegion);
  } catch (error) {
    return res.status(500).json({ error: "Could not retrieve region" });
  }
};

// Controller function to update region by ID
export const updateRegionById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const { name } = req.body;

    const reqbody = { name: name, value: getValueFromName(name) };

    const updatedRegion = await Region.findByIdAndUpdate(id, reqbody, {
      new: true,
    });

    if (!updatedRegion) {
      return res.status(404).json({ error: "Region not found" });
    }

    // Omitting ObjectId fields from response
    const sanitizedRegion = {
      ...updatedRegion.toObject(),
      _id: undefined,
      countries: undefined,
    };
    return res.json(sanitizedRegion);
  } catch (error) {
    return res.status(500).json({ error: "Could not update region" });
  }
};

// Controller function to delete region by ID
export const deleteRegionById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    // Check if there are any countries associated with the region
    const region = await Region.findById(id).populate("countries");
    if (!region) {
      return res.status(404).json({ error: "Region not found" });
    }

    if (region.countries.length > 0) {
      return res
        .status(400)
        .json({ error: "Cannot delete region with associated countries" });
    }

    // Delete the region if there are no associated countries
    await Region.findByIdAndDelete(id);

    return res.json({ message: "Region Deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Could not delete region" });
  }
};
