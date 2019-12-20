import { Handler, APIGatewayEvent } from "aws-lambda";
import axios from "axios";

export const handler: Handler = async (event: APIGatewayEvent) => {
  const { term, type } = JSON.parse(event.body);

  let result: any;
  if (type === "multi") {
    result = await axios.get(
      `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.API_TMDB}&language=en-US&query=${term}&page=1&include_adult=false`
    );
  }
  if (["person", "tv", "movie"].includes(type)) {
    result = await axios.get(
      `https://api.themoviedb.org/3/${type}/${term}?api_key=${process.env.API_TMDB}&language=en-US`
    );
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result.data)
  };
};
