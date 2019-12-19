const axios = require("axios");

exports.handler = async (event, context) => {
  const result = await axios.get(
    `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_TMDB}&language=en-US&query=${event.queryStringParameters.term}&page=1&include_adult=false`
  );

  console.log(result.data);

  return {
    statusCode: 200,
    body: JSON.stringify(result.data)
  };
};
