import { Handler, APIGatewayEvent } from "aws-lambda";
import faunadb from "faunadb";

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

export const handler: Handler = async (event: APIGatewayEvent) => {
  const { data, classes } = JSON.parse(event.body);
  const media = {
    data: data
  };
  client
    .query(q.Get(q.Match(q.Index(`${classes}_by_id`), data.id)))
    .then((res: any) => {
      console.log(res);
      client
        .query(q.Update(q.Ref(`classes/${classes}/${res.ref.id}`), media))
        .then(response => {
          console.log("success", response);
          return {
            statusCode: 200,
            body: JSON.stringify(response)
          };
        })
        .catch(error => {
          console.log("error", error);
          return {
            statusCode: 400,
            body: JSON.stringify(error)
          };
        });
    })
    .catch(() => {
      client
        .query(q.Create(q.Ref(`classes/${classes}`), media))
        .then(response => {
          console.log("success", response);
          return {
            statusCode: 200,
            body: JSON.stringify(response)
          };
        })
        .catch(error => {
          console.log("error", error);
          return {
            statusCode: 400,
            body: JSON.stringify(error)
          };
        });
    });
};
