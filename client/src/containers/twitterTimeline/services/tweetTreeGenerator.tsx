import DisplayTweet from "../../../commons/models/diplayTweet";
import Tweet from "../../../commons/models/tweet";

const TreeSpacing = 15;
const Dimensions = {width: 500, height: 400}
const NodeSpacingX = 10;
const NodeSpacingY = 300;

const TopSpacing = 100;

function genTrees(rootTweets: Tweet[]): DisplayTweet[][]{

  let prevTreeStartX = 0;
  let prevTreeWidth = 0;

  let treeOffset = () => prevTreeStartX + prevTreeWidth + TreeSpacing;
  let ret: DisplayTweet[][] = [];
  for(const tweet of rootTweets.map(displayTweetify)){
    let arr: DisplayTweet[] = []
    let res = layout(tweet, treeOffset(), TopSpacing, arr);
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

  //otherwise place in the middle of the children
  tweet.position = {x:(lastOffset+offset)/2-Dimensions.width/2,y:depth};
  tweet.subtreeSpan.startX = offset;
  tweet.subtreeSpan.endX = lastOffset;

  outputArray.push(tweet);



  return {tweet: tweet, startX: offset, width: lastOffset-offset}
}
/**
 * turn a tweet tree into a displayTweet tree
 * preserving links (replies -> displayChildren)
 */
function displayTweetify(tweet: Tweet): DisplayTweet{
  let baseDT = new DisplayTweet(tweet, {x:0, y:0});
  if(tweet.replies.length==0){
    return baseDT;
  }

  for(const child of tweet.replies){
    let dChild = displayTweetify(child);
    dChild.setDisplayParent(baseDT);
    baseDT.addDisplayChild(dChild); 
  }
  
  return baseDT;
}

export default genTrees;
