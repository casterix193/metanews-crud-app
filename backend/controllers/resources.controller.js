import Resource from "../models/Resource";

export const getResources = async (req, res) => {
  try {
    const { category } = req.query || {};

    const filter = category ? { category: category } : {};
    const resources = await Resource.find(filter);
    res.status(200).json(resources);
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ error: "Error While Fetching Data" });
  }
};

export async function getResource(req, res) {
  try {
    const { resourceId } = req.query || {};

    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res
        .status(404)
        .json({ error: "Resource was not found with given Id" });
    }

    res.status(200).json(resource);
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ error: "Cannot get the Resource...!" });
  }
}

export const createResource = async (req, res) => {
  try {
    const data = req.body;

    if (!data) {
      return res.status(400).json({ error: "Please provide form Data" });
    }

    const resource = await Resource.create(data);
    return res.status(200).json(resource);
  } catch (error) {
    return res.status(404).json({ error });
  }
};

export async function updateResource(req, res) {
  try {
    const { resourceId } = req.query || {};
    const data = req.body;

    if (!resourceId || !data) {
      res
        .status(400)
        .json({ error: "Please provide valid data to update resource" });
    }

    const resource = await Resource.findByIdAndUpdate(resourceId, data);
    res.status(200).json(resource);
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ error: "Error While Updating the Data...!" });
  }
}

export async function deleteResource(req, res) {
  try {
    const { resourceId } = req.query || {};

    const resource = await Resource.findByIdAndDelete(resourceId);
    return res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ error: "Error While Deleting the Resource...!" });
  }
}
