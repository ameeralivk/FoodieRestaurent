export const searchLocation = async (query: string) => {
  if (!query.trim()) return null;

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}`
    );
    const data = await response.json();
    if (data.length > 0) {
      const { lat, lon } = data[0];
      return {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
      };
    } else {
      console.warn("Location not found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
};
