import dotenv from "dotenv";
import { User } from "../models/User";
import { UserForm } from "./../components/InputList/index";
import TwitterApi from "twitter-api-v2";

// console.log(process.env.TWITTER_APP_KEY);

export async function getStaticProps() {
  // `getStaticProps()` の中で `fs` を少しでも利用すれば OK
  dotenv.config();
  return {
    props: {
      appKey: process.env.TWITTER_APP_KEY!,
      appSecret: process.env.TWITTER_APP_SECRET!,
    },
  };
}

const searchFollow = async (data: UserForm, user: User, props: any) => {
  const client = new TwitterApi({
    appKey: props.appKey,
    appSecret: props.appSecret,
    // appKey: process.env.TWITTER_APP_KEY!,
    // appSecret: process.env.TWITTER_APP_SECRET!,
    accessToken: user.accessToken!,
    accessSecret: user.accessTokenSecret!,
  });

  const foundUsers = await client.v1.searchUsers("岸田文雄");

  // use an async for-of to iterate over the multiple result pages!
  for await (const user of foundUsers) {
    console.log("User matching search:", user.screen_name);
  }

  //   const userClient = new TwitterApi({
  //     appKey: process.env.TWITTER_APP_KEY!,
  //     appSecret: process.env.TWITTER_APP_SECRET!,
  //     // Following access tokens are not required if you are
  //     // at part 1 of user-auth process (ask for a request token)
  //     // or if you want a app-only client (see below)
  //     accessToken: user["accessToken"]!,
  //     accessSecret: user["accessTokenSecret"]!,
  //   });

  //   return "hoge";
};

export default searchFollow;
