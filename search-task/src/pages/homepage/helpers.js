import axios from "axios";
import { Watch } from "react-loader-spinner";

export const fetchCharacters = async (offset) => {
  const results = await axios.get(
    `https://www.breakingbadapi.com/api/characters?limit=5&offset=${offset}`
  );
  return results.data;
};

export const fetchCharactersByName = async (data, offset) => {
  const results = await axios.get(
    `https://www.breakingbadapi.com/api/characters?name=${data}&limit=5&offset=${offset}`
  );
  return results.data;
};

export const loading = (
  <div className="loader">
    <Watch
      height="100"
      width="100"
      className="loader"
      color="#1f7ae0"
      ariaLabel="loading"
    />
  </div>
);
