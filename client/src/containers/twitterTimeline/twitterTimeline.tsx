import React, { useState, useEffect, useCallback, useRef } from "react";
import Tweet from "../../commons/models/tweet";
import TwitterService from "../../commons/services/twitterService";
import TweetArc from "../../components/tweetArc/tweetArc";
import TweetTree from "../tweetTree/tweetTree";
import {regenTrees, genTrees} from "./services/tweetTreeGenerator";
import {Container, LeftArrow, RightArrow, SVGContainer} from "./styles";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {RawTweet} from "src/commons/models/rawTweet";
import DisplayTweet from "src/commons/models/displayTweet";
import { isElementOfType } from "react-dom/test-utils";


function TwitterTimeline({someProperty}: {someProperty: string}) {

    const twitter = new TwitterService();
    const arrow_values = {"ArrowLeft": [-1, 0], "ArrowRight": [1, 0], "ArrowUp": [0, -1], "ArrowDown": [0, 1]};

    /*
    function handleKeys(event) {

      if(event.key in arrow_values) {
        break;
      }
    }
    */

    //handle scrolling

    //offset in pixels
    const [offset, setOffset] = useState(0);

    const containerRef = useRef()  as React.MutableRefObject<HTMLDivElement>


    //no need to update callback, can just use "prev" from setState method
    const handleScroll = useCallback((event: WheelEvent) => {
      setOffset(prev => Math.min(prev-event.deltaY, 0));
    }, [])

    useEffect(() => {
      containerRef.current.addEventListener("wheel", handleScroll)
    }, [handleScroll]);





    //handle moving between roots

    function getNextRoot(){
      if(!containerRef.current){
        return null;
      }
      let currentCenter = -(offset - containerRef.current.clientWidth/2);
      let nextGood = false;

      for(const currentRoot of renderedTweets.map(treeTweets => treeTweets[0].displayRoot)){
        if(nextGood){
          return currentRoot;
        }
        if(inBetween(currentCenter,currentRoot.subtreeSpan.startX,currentRoot.subtreeSpan.endX)){
          nextGood = true;
        }
      }

      return null;
    }

    function getPrevRoot(){
      if(!containerRef.current){
        return null;
      }
      let currentCenter = -(offset - containerRef.current.clientWidth/2);
      let prev = null;
      let prevPrev = null;
      let prevGood = false;

      for(const currentRoot of renderedTweets.map(treeTweets => treeTweets[0].displayRoot)){
        if(prevGood){
          return prev;
        }
        if(inBetween(currentCenter,currentRoot.subtreeSpan.startX,currentRoot.subtreeSpan.endX)){
          prevGood = true;
        }else{
          prev = currentRoot;
        }


      }
      //if outside of a tree, just go to the last one
      return prev;

    }

    function goToNextRoot(){
      let currentCenter = containerRef.current.clientWidth/2;
      let target = getNextRoot();
      if(target && target!==null){
        setOffset(prev => Math.min(0, currentCenter - target!.position.x - target!.dimension.width/2));
      }
    }

    function goToPrevRoot(){
      let currentCenter = containerRef.current.clientWidth/2;
      let target = getPrevRoot();
      if(target && target!==null){
        setOffset(prev => Math.min(0, currentCenter - target!.position.x - target!.dimension.width/2));
      }
    }


    async function updateDisplay(offsetChange?: number){
      //just modifying the IDs
      //TODO: actually make 2 distinct arrays?
      setRenderedTweets(
        await regenTrees(renderedTweets.map(arr => Array.from(arr)))
      )
      if(offsetChange){
        setOffset(prev => Math.min(prev+offsetChange,0))
      }
    }


    //assumes getTimeline returns a different object when timeline is updated

    useEffect(()=>{
      //apparently the only way to get async useEffect?
      async function getTl(){
        let tweets = await twitter.getTimeline()
        let tree = await genTrees(tweets)
        //can only use 1 setState here
        setRenderedTweets(tree);
      }
      getTl();
    },
    []
    )
    //NOTE: DO NOT REMOVE THE EMPTY DEPENDENCY ARRAY
    //reason: this should only run when the page is loaded


    //would filter to only a few tweets that can actually be displayed
    const [renderedTweets, setRenderedTweets]: [DisplayTweet[][], any] = useState([]);


    //assume getTimeline is "free" and can be called multiple times
    return(
          <Container ref={containerRef} offset={offset}>
            <SVGContainer>
              {renderedTweets.flat().map(dTweet => {
                if(dTweet.displayParent!=null){
                  return <TweetArc rootTweet={dTweet.displayParent} childTweet={dTweet}></TweetArc>
                }
                return <></>
              })}
            </SVGContainer>
            {renderedTweets.length===0?<span>loading...</span>:<></>}
            {renderedTweets.map(tweetList => <TweetTree displayUpdateHandler={updateDisplay} key={tweetList[0]!.displayRoot.id} tweets={tweetList}></TweetTree>)}
            <LeftArrow onClick={goToPrevRoot} hidden={getPrevRoot()===null}></LeftArrow>
            <RightArrow onClick={goToNextRoot} hidden={getNextRoot()===null}></RightArrow>
          </Container>);
}


function inBetween(x:number, a:number, b:number){
  if(x < a || x > b){
    return false;
  }
  return true;
}

export default TwitterTimeline;
