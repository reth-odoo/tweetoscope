import DisplayTweet from "../../commons/models/displayTweet";
import TweetNode from "../tweetNode/tweetNode";
import { TweetTreeDiv } from "./styles";

function TweetTree(props: TweetTreeProps) {


  async function handleTweetClick(tweet: DisplayTweet){
    props.clickNotifier(tweet);
  }

  return <TweetTreeDiv>
            {props.tweets.map(tweet => <TweetNode onClick={() => handleTweetClick(tweet)} key={tweet.id} data={tweet}/>)}
        </TweetTreeDiv>;
}

export interface TweetTreeProps{
  tweets: DisplayTweet[],
  clickNotifier: (dp: DisplayTweet  ) => any;
}

export default TweetTree;
