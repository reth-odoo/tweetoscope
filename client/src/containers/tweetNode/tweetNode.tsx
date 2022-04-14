import { useState } from 'react';
import DisplayTweet from "../../commons/models/displayTweet";
import { TweetDiv, HeaderDiv } from "./styles";
import { genAnalytics } from "./services/analyticsGen";

function TweetNode(props:TweetNodeProps) {

  // commented state here and mouse enter/leave in TweetDiv kept if needed to enhance hover (which is currently handled in the styles.ts)
  //const [hover, setHover] = useState(false);

  let top_words = genAnalytics(props.data.text);

  return(
    <TweetDiv onClick={props.onClick} backgroundColor={props.backgroundColor!} borderColor={props.borderColor!} pos={props.data.position} dimensions={props.data.dimension}>
    {/*onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ overflow: hover ? "visible" : "hidden", height: hover ? "auto" : "" }}*/}
      {/* If retweet */}
      {props.data.is_retweet ? <p style={{ color: props.nameColor }}>@{props.data.is_retweet} retweeted</p> : null}
      {props.data.is_retweet ? <br/> : null}
      {/* HeaderDiv is used for the icon and the user data */}
      <HeaderDiv>
        {/* img has constant style for now, can be changed if needed to zoom */}
        <img src={require("../../commons/services/temp_icons/icon_1.jpg")} style={{ width:"30px", borderRadius:"50%" }}/>
        {/* &nbsp are inline spaces */}
        <span style={{ color: props.nameColor }}>&nbsp;&nbsp;&nbsp;{props.data.name} @{props.data.username} - {props.data.stringDate}</span>
      </HeaderDiv>
      <br/>
      {/* This paragraph is for the reply */}
      {props.data.displayParent ? <p style={{ color: props.nameColor }}>Replying to @{props.data.displayParent.username}</p> : null}
      {/* This paragraph is for nb of likes, retweets and comments (using span for inline) */}
      <p style={{ color: props.textColor }}>
        <span style={{ color: props.likeColor}}>{props.data.likes} Likes &nbsp;&nbsp;&nbsp;</span>
        <span style={{ color: props.retweetColor}}>{props.data.retweets} Retweets &nbsp;&nbsp;&nbsp;</span>
        <span style={{ color: props.commentColor}}>{props.data.nb_replies} Comments &nbsp;&nbsp;&nbsp;</span>
      </p>
      <br/>
      {/* Analytics */}
      <p style={{ color: props.nameColor }}>
        Recurring Words: {top_words.map((word) => (<span style={{ color: props.recurringColor }}> &nbsp;{word}</span>))}
      </p>
      <br/>
      {/* Last paragraph for text */}
      <p style={{ color: props.textColor }}>{props.data.text}</p>
    </TweetDiv>
  );
}

export interface TweetNodeProps extends React.HTMLAttributes<HTMLDivElement>{
  data: DisplayTweet,
  color?: string,
  nameColor?: string,
  textColor?: string,
  likeColor?: string,
  retweetColor?: string,
  commentColor?: string,
  recurringColor?: string,
  backgroundColor?: string,
  borderColor?: string
}


TweetNode.defaultProps = {
  nameColor: "#55acee",
  textColor: "#e8f5fd",
  likeColor: "#f56342",
  retweetColor: "#c842f5",
  commentColor: "#42f5aa",
  recurringColor: "#fad369",
  backgroundColor: "#292f33",
  borderColor: "#66757f",
};

export default TweetNode;
