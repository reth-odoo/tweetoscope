import React, { useState, useEffect, useCallback, useRef } from "react";
import Tweet from "../../commons/models/tweet";
import TwitterService from "../../commons/services/twitterService";
import TweetArc from "../../components/tweetArc/tweetArc";
import TweetTree from "../tweetTree/tweetTree";
import {regenTrees, genTrees} from "./services/tweetTreeGenerator";
import {Container, SVGContainer} from "./styles";
import DisplayTweet from "src/commons/models/displayTweet";


function TwitterTimeline(props: TimelineProps) {

    const twitter = props.twitterService;

    //handle scrolling

    //offset in pixels
    const [offsets, setOffsets] = useState({x:0,y:0});
    const boundShiftOffsets = (shifts: {x:number, y:number}) => setOffsets(prev=>{
      return {x: Math.min(prev.x+shifts.x,0), y: Math.min(prev.y+shifts.y,0)}
    })
    const boundSetOffsets = (new_offsets: {x:number, y:number}) => setOffsets({
      x:Math.min(new_offsets.x, 0),
      y: Math.min(new_offsets.y,0)
    });

    const containerRef = useRef()  as React.MutableRefObject<HTMLDivElement>


    //no need to update callback, can just use "prev" from setState method
    const handleScroll = useCallback((event: WheelEvent) => {
      boundShiftOffsets( {x: -event.deltaY, y:0});
    }, [])

    useEffect(() => {
      containerRef.current.addEventListener("wheel", handleScroll)
    }, [handleScroll]);





    //handle moving between tweets

    const [selected, setSelected]: [DisplayTweet|null, any] = useState(null);

    /**
     * Unselects previous tweet and selects new one if not null
     * @param dp the new selected tweet, or null if none
     */
    function select(dp: DisplayTweet|null){
      if(selected){
        selected.unSelect()
      }
      setSelected(dp);
      if(dp){
        dp.select();
        centerTweet(dp);
        props.SelectTweet(dp.referencedTweet);
      }else{
        props.SelectTweet(null);
      }
    }


    const centerTweet = (tweet: DisplayTweet) => {
      boundSetOffsets(
      {x: -(tweet.position.x+tweet.dimension.width/2-containerRef.current.offsetWidth/2) ,
       y: -(tweet.position.y+tweet.dimension.height/2-containerRef.current.offsetHeight/2)});
      };

    async function handleKeyPress(event: React.KeyboardEvent){
      //if no tweet selected and not unselecting, select one
      if(!selected && event.key!=="Escape"){
        selectClosest();
        return;
      }

      const s = selected!;

      switch(event.key){
        case("Escape"):
          select(null);
        break;
        case("ArrowLeft"):
          const left = await getNextDT(true, s, null, s, 0);
          if(left){
            select(left);
          }
        break;
        case("ArrowRight"):
          const right = await getNextDT(false, s, null, s, 0);
          if(right){
            select(right);
          }
        break;
        case("ArrowUp"):
          if(s.displayParent){
            select(s.displayParent!)
          }
        break;
        case("ArrowDown"):
          //if hiding, just show children
          if(s.isHiding){
            setHideTweet(s!, false);
            break;
          }

          const current_children = s.displayedChildren;
          const nb_cr_children = current_children.length;
          if(nb_cr_children>0){
            const new_select = current_children[Math.floor(nb_cr_children/2)]
            select(new_select);
          }
        break;

        case("SpaceBar"):
        case(" "):
          setHideTweet(s, !s.isHiding);
        break;
      }
    }

    function handleClick(dp: DisplayTweet){
      if(selected && selected.id === dp.id){
        select(null);
      }else{
        select(dp);
      }
    }

    async function getNextDT(left: boolean, orig: DisplayTweet, prev: DisplayTweet|null, current: DisplayTweet|null, depth: number): Promise<DisplayTweet|null>{
      //if depth 0 and not the start, ok
      if(depth===0 && current && current.id!==orig.id){
        return current;
      }else{
        //if current is null, assume we're 1 level above roots => children = roots
        const children = (current===null?getRoots():(await current.displayedChildren)).slice();

        //if looking for first to left, go through array in reverse
        if(left){
          children.reverse();
        }

        let prev_encountered = false;
        for(const child of children){
          if(prev_encountered || prev===null){
            let ret = getNextDT(left, orig, null, child, depth-1)
            return ret;
          }
          else if(prev && child.id===prev.id){
            prev_encountered = true;
            continue;
          }
        }

        if(!current){
          return null;
        }
        return getNextDT(left, orig, current, current.displayParent, depth+1);
      }
    }

    const getRoots = () => renderedTweets.map((d: DisplayTweet[])=> d[d.length-1].displayRoot);

    /**
     * Selects the first tweet on display, if any
     */
    function selectFirst(){
      if(renderedTweets.length>0){
         select(renderedTweets[0][renderedTweets[0].length-1]);
      }
    }

    /**
     * Selects the closest root to the container center
     */
    function selectClosest(): void{
      const roots = getRoots();
      const pos = -offsets.x+containerRef.current.offsetWidth/2
      let prev = null;
      //iterating over increasing offset
      for(const root of roots){
        //when between two roots, select the closest one
        if(prev && pos>prev.position.x && pos<root.position.x){
          if(pos-prev.position.x < root.position.x-pos){
            select(prev);
          }else{
            select(root);
          }
          return;
        }

        prev=root;
      }

      //select the last root or null
      select(prev);
    }

    /**
     * Hides/shows tweets and computes the new offset for tweets to look still
     * @param tweet the tweet of which the children will be hidden/shown
     * @param hide whether the tweets will be hidden or shown
     */
    async function setHideTweet(tweet: DisplayTweet, hide: boolean){
      tweet.setHiding(hide);
      await updateDisplay();
      centerTweet(tweet);
    }



    async function updateDisplay(){
      //just modifying the IDs
      //TODO: actually make 2 distinct arrays?
      setRenderedTweets(
        await regenTrees(renderedTweets.map(arr => Array.from(arr)))
      )
    }

    useEffect(()=>props.SetRefreshHandle(updateDisplay),[])



    
 
    useEffect(()=>{
      async function updateTl(){
        let tweets = await twitter.getTimeline(props.timelineId)
        let tree = await genTrees(tweets)
        setRenderedTweets(tree);
        console.log(tree);
      }
      setRenderedTweets([]);
      updateTl();
    },
    [props.timelineId])


    //would filter to only a few tweets that can actually be displayed
    const [renderedTweets, setRenderedTweets]: [DisplayTweet[][], any] = useState([]);

    //update selected if no selected tweet
    useEffect(()=>{
      //should only trigger if tweet was unloaded
      //(requires selected to be set to null when selected tweet unloaded)
      if(!selected){
        selectFirst()
      }
    },[renderedTweets]);

    //assume getTimeline is "free" and can be called multiple times
    return(
          <Container id={"timeline-div"} onKeyDown={handleKeyPress} tabIndex={0} ref={containerRef} offsets={offsets}>
            <span>{props.timelineId}</span>
            <SVGContainer>
              {renderedTweets.flat().map(dTweet => {
                if(dTweet.displayParent!=null){
                  return <TweetArc rootTweet={dTweet.displayParent} childTweet={dTweet}></TweetArc>
                }
                return <></>
              })}
            </SVGContainer>
            {renderedTweets.length===0?<span>loading...</span>:<></>}
            {renderedTweets.map(tweetList => <TweetTree clickNotifier={handleClick} key={tweetList[tweetList.length-1]!.displayRoot.id} tweets={tweetList}></TweetTree>)}
          </Container>);
}

interface TimelineProps{
  twitterService: TwitterService
  timelineId: string
  SelectTweet: (tweet: Tweet|null) => void
  SetRefreshHandle: (f: ()=>void) => void
}

export default TwitterTimeline;
