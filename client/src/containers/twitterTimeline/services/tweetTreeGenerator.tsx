import DisplayTweet from "../../../commons/models/displayTweet";
import Tweet from "../../../commons/models/tweet";

const TreeSpacing = 15;
const Dimensions = {width: 500, height: 160}
const NodeSpacingX = 100;
const NodeSpacingY = 300;

const TopSpacing = 100;

const UnhiddenDefault = 4;

/**
 * Creates a list of displaytweets for each root tweet tree
 * @param rootTweets list of root tweets to display on the timeline
 * @returns a list of the display tweets for each root tweet tree
 */
export function genTrees(rootTweets: Tweet[]): DisplayTweet[][]{
  return layoutTrees(rootTweets.map(t => displayTweetify(t,1)));
}

export function regenTrees(tweetArrays: DisplayTweet[][]): DisplayTweet[][]{
  return layoutTrees(tweetArrays.map(arr => arr[0].displayRoot));
}

function layoutTrees(rootTweets: DisplayTweet[]): DisplayTweet[][]{
  let prevTreeStartX = 0;
  let prevTreeWidth = 0;

  let treeOffset = () => prevTreeStartX + prevTreeWidth + TreeSpacing;
  let ret: DisplayTweet[][] = [];
  for(const tweet of rootTweets){
    //TODO assert root (not sure if possible outside testing framework)
    let arr: DisplayTweet[] = []
    let res = layout(tweet, treeOffset() + NodeSpacingX, TopSpacing, arr);
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
function layout(tweet: DisplayTweet, offset: number, depth: number, outputArray: DisplayTweet[]): {tweet: DisplayTweet, startX: number, width: number} {


  let lastOffset = offset;

  let displayChildren = [];
  //go to the bottom and progressively move the offset
  for(const child of tweet.displayChildren){
    if(child.isHidden){
      continue;
    }
    let res = layout(child, lastOffset, depth+NodeSpacingY, outputArray);
    displayChildren.push(res.tweet);
    lastOffset = res.startX+res.width+NodeSpacingX;
  }
  //if leaf node, just place it at the offset
  if(tweet.displayChildren.length === 0){
    tweet.position = {x:offset,y:depth};
    outputArray.push(tweet);
    return {tweet:tweet, startX: offset, width: Dimensions.width}
  }

  let width = 0;
  //otherwise place in the middle of the children
  if(tweet.displayChildren.filter(dTweet => !dTweet.isHidden).length>0){
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
/**
 * turn a tweet tree into a displayTweet tree
 * preserving links (replies -> displayChildren)
 */
function displayTweetify(tweet: Tweet, depth:number): DisplayTweet{
  let baseDT = new DisplayTweet(tweet, {x:0, y:0});
  if(tweet.replies.length==0){
    return baseDT;
  }

  for(const child of tweet.replies){
    let dChild = displayTweetify(child,depth+1);
    dChild.setDisplayParent(baseDT);
    baseDT.addDisplayChild(dChild);

    if(depth>=UnhiddenDefault){
      dChild.setHidden(true);
    }
  }

  return baseDT;
}
