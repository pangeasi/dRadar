const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  console.log(event.queryStringParameters);
  const result = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_TMDB}&language=en-US&query=${event.queryStringParameters.term}&page=1&include_adult=false`
  ).then(data => data.json());
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
};
