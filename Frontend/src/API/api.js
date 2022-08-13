import axios from "axios";

export const getRecommendations = (query) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=pk.eyJ1IjoibG95YXRhIiwiYSI6ImNremxwZDYxMTE0Mnkyd254ems4Nzg1aWIifQ.mLDsHjBUTgEhcBCTsJyU3g`
    const res = axios.get(url);
    return res;
}
