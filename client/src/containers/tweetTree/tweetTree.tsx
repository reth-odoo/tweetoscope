import DisplayTweet from "../../commons/models/displayTweet";
import TweetNode from "../tweetNode/tweetNode";
import { TweetTreeDiv } from "./styles";

function TweetTree(props: TweetTreeProps) {


  function handleTweetClick(tweet: DisplayTweet){
    //assumed that all children are switched to the same state
    let offset = 0;
    let new_offset = 0;
    for(const child of tweet.displayChildren){
      offset = child.position.x+child.subtreeSpan.endX;
      child.setHidden(!child.isHidden);
      new_offset = tweet.position.x+tweet.dimension.width/2;
    }

    let offsetDiff = offset-new_offset;
    //if unhiding
    if(tweet.displayChildren.length>0 && !tweet.displayChildren[0].isHidden){
      offsetDiff = -offsetDiff/2;
    }
    props.displayUpdateHandler(offsetDiff);
  }

  return <TweetTreeDiv>
            {props.tweets.map(tweet => <TweetNode onClick={() => handleTweetClick(tweet)} key={tweet.id} data={tweet}/>)}
        </TweetTreeDiv>;
}

export interface TweetTreeProps{
  tweets: DisplayTweet[],
  displayUpdateHandler: (offsetChange?: number) => any;
}

export default TweetTree;
