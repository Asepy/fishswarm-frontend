import { fetchCities } from "utils/useCitiesByDep";

export default async function handler(req, res) {
  try {
    const response = await fetchCities(req.query);
    const { success, message = "" } = response;
    if (success === "false") {
      res.status(400).json(response);
      return;
    }
    if (message.toLowerCase().includes("internal server error")) {
      res.status(500).json(response);
      return;
    }
    res.status(200).json(response);
    return;
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
}
