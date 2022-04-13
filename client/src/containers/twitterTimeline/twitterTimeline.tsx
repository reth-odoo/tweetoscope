import React, { useState, useEffect, useCallback, useRef } from "react";
import Tweet from "../../commons/models/tweet";
import TwitterService from "../../commons/services/twitterService";
import TweetArc from "../../components/tweetArc/tweetArc";
import TweetTree from "../tweetTree/tweetTree";
import {regenTrees, genTrees} from "./services/tweetTreeGenerator";
import {Container, SVGContainer} from "./styles";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {RawTweet} from "src/commons/models/rawTweet";


function TwitterTimeline({someProperty}: {someProperty: string}) {

    const twitter = new TwitterService();


    //handle scrolling

    const [offset, setOffset] = useState(0);

    const containerRef = useRef()  as React.MutableRefObject<HTMLDivElement>

    //no need to update callback, can just use "prev" from setState method
    const handleScroll = useCallback((event: WheelEvent) => {
      setOffset(prev => Math.min(prev-event.deltaY, 0));
    }, [])

    useEffect(() => {
      containerRef.current.addEventListener("wheel", handleScroll)
    }, [handleScroll]);




    function updateDisplay(offsetChange?: number){
      //just modifying the IDs
      //TODO: actually make 2 distinct arrays?
      setRenderedTweets(
        regenTrees(renderedTweets.map(arr => Array.from(arr)))
      )
      if(offsetChange){
        setOffset(prev => Math.min(prev+offsetChange,0))
      }
    }





    //assumes getTimeline returns a different object when timeline is updated
    const [timeline, setTimeline] = useState([] as RawTweet[]);

    useEffect(()=>{
      twitter.getTimeline().then(tweets => setTimeline(tweets));
    })



    //would filter to only a few tweets that can actually be displayed
    const [renderedTweets, setRenderedTweets] = useState(genTrees(timeline));


    //assume getTimeline is "free" and can be called multiple times
    return(
          <Container ref={containerRef} offset={offset}>
            <span>{offset}</span>
            <SVGContainer>
              {renderedTweets.flat().map(dTweet => {
                if(dTweet.displayParent!=null){
                  return <TweetArc rootTweet={dTweet.displayParent} childTweet={dTweet}></TweetArc>
                }
                return <></>
              })}
            </SVGContainer>
            {renderedTweets.map(tweetList => <TweetTree displayUpdateHandler={updateDisplay} key={tweetList[0]!.displayRoot.id} tweets={tweetList}></TweetTree>)}
          </Container>);
}

export default TwitterTimeline;
