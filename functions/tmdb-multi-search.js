const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const result = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=e227fe5710a79491de90085098092028&language=en-US&query=dragon%20ball&page=1&include_adult=false`
  ).then(data => data.json());
  console.log(result);
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
};
