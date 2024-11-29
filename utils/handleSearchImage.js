import axios from "axios";

export const handleSearchImage = async (imageLink) => {
  try {
    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        engine: "google_reverse_image",
        api_key:
          "eacf9830124c4436d686a2e8961d6ddd3b59ecaa757d6eb2404223075beed878",
        image_url: imageLink,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
