import { DEFAULT_TWEET_DIMENSIONS, DEFAULT_TWEET_UNWRAP_DEPTH } from "src/AppParameters";
import DisplayTweet from "../../../commons/models/displayTweet";
import Tweet from "../../../commons/models/tweet";

const TreeSpacing = 15;
const Dimensions = DEFAULT_TWEET_DIMENSIONS
const NodeSpacingX = 100;
const NodeSpacingY = 300;

const TopSpacing = 100;

/**
 * Creates a list of displaytweets for each root tweet tree
 * @param rootTweets list of root tweets to display on the timeline
 * @returns a list of the display tweets for each root tweet tree
 */
export async function genTrees(rootTweets: Tweet[]): Promise<DisplayTweet[][]>{
  return layoutTrees(rootTweets.map(t => new DisplayTweet(t, {x:0, y:0})));
}

export async function regenTrees(tweetArrays: DisplayTweet[][]): Promise<DisplayTweet[][]>{
  return layoutTrees(tweetArrays.map(arr => arr[0].displayRoot));
}

async function layoutTrees(rootTweets: DisplayTweet[]): Promise<DisplayTweet[][]>{
  let prevTreeStartX = 0;
  let prevTreeWidth = 0;

  let treeOffset = () => prevTreeStartX + prevTreeWidth + TreeSpacing;
  let ret: DisplayTweet[][] = [];
  for(const tweet of rootTweets){
    //TODO assert root (not sure if possible outside testing framework)
    let arr: DisplayTweet[] = []
    let res = await layout(tweet, treeOffset() + NodeSpacingX, TopSpacing, arr);
    prevTreeStartX = res.startX;
    prevTreeWidth = res.width;
    ret.push(arr);
  }

  return ret;
}

/**
 *
 * @param tweet the tweet being handled (pass in root tweet)
 * @param offset the x offset for the current tweet
 * @param depth the y offset for the current tweet
 * @param outputArray the actual result
 * @returns the start and end around (sub)tree, and the root DisplayTweet
 */
async function layout(tweet: DisplayTweet, offset: number, depth: number, outputArray: DisplayTweet[]): Promise<{tweet: DisplayTweet, startX: number, width: number}> {

  let lastOffset = offset;

  //this is the one place you CANNOT use displayedTweet (this is where the request is implicitly made)
  if(!tweet.isHiding){
    let displayChildren = await tweet.displayChildren;
    //go to the bottom and progressively move the offset
    for(const child of displayChildren){
      let res = await layout(child, lastOffset, depth+NodeSpacingY, outputArray);
      lastOffset = res.startX+res.width+NodeSpacingX;
    }
    //remove the last spacing
    if(lastOffset!==offset){
      lastOffset-=NodeSpacingX;
    }
  }

  //if leaf node, just place it at the offset
  if(tweet.displayedChildren.length === 0){
    tweet.position = {x:offset,y:depth};
    outputArray.push(tweet);
    return {tweet:tweet, startX: offset, width: Dimensions.width}
  }

  let width = 0;
  //otherwise place in the middle of the children
  if(tweet.displayedChildren.length>0){
    tweet.position = {x:(lastOffset+offset)/2-Dimensions.width/2,y:depth};
    width = lastOffset-offset;
  }
  else{
    tweet.position = {x:lastOffset, y: depth};
    width = tweet.dimension.width;
  }

  tweet.subtreeSpan.startX = offset;
  tweet.subtreeSpan.endX = lastOffset;

  outputArray.push(tweet);



  return {tweet: tweet, startX: offset, width: width}
}
