import axios from "axios"
// Function to get place name from coordinates
async function getPlaceName(lat: number, lon: number): Promise<void> {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse`,
      {
        params: {
          format: "json",
          lat,
          lon,
        },
        headers: {
          "User-Agent": "TypeScriptApp" // Required by Nominatim
        },
      }
    );

    if (response.data && response.data.display_name) {
      return response.data.display_name; 
    } else {
      return
    }
  } catch (error) {
    console.error("Error fetching place name:", error);
  }
}
export default getPlaceName