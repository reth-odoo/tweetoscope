import DisplayTweet from "../../commons/models/displayTweet";
import { TweetDiv, HeaderDiv } from "./styles";

function TweetNode(props:TweetNodeProps) {

  return(
    <TweetDiv onClick={props.onClick} backgroundColor={props.backgroundColor!} borderColor={props.borderColor!} pos={props.data.position} dimensions={props.data.dimension}>
      {/* HeaderDiv is used for the icon and the user data */}
      <HeaderDiv>
        {/* img has constant style for now, can be changed if needed to zoom */}
        <img src={require("../../commons/services/temp_icons/icon_1.jpg")} style={{ width:"30px", borderRadius:"50%" }}/>
        {/* &nbsp are inline spaces */}
        <span style={{ color: props.nameColor }}>&nbsp;&nbsp;&nbsp;{props.data.name} @{props.data.username} - {props.data.stringDate}</span>
      </HeaderDiv>
      <br/>
      {/* This paragraph is for nb of likes, retweets and comments (using span for inline) */}
      <p style={{ color: props.textColor }}>
        <span style={{ color: props.likeColor}}>{props.data.likes} Likes &nbsp;&nbsp;&nbsp;</span>
        <span style={{ color: props.retweetColor}}>{props.data.retweets} Retweets &nbsp;&nbsp;&nbsp;</span>
        <span style={{ color: props.commentColor}}>{props.data.nb_replies} Comments &nbsp;&nbsp;&nbsp;</span>
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
  backgroundColor?: string,
  borderColor?: string
}


TweetNode.defaultProps = {
  nameColor: "#55acee",
  textColor: "#e8f5fd",
  likeColor: "#f56342",
  retweetColor: "#c842f5",
  commentColor: "#42f5aa",
  backgroundColor: "#292f33",
  borderColor: "#66757f",
};

export default TweetNode;
