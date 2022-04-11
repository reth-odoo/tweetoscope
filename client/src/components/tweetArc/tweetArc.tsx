import DisplayTweet from "../../commons/models/displayTweet";

//const Curve = 10;
const Padding = 10;

function TweetArc({rootTweet, childTweet}: {rootTweet: DisplayTweet, childTweet: DisplayTweet}) {
    let Curve = (-(rootTweet.position.y + rootTweet.dimension.height+Padding) + childTweet.position.y)/3
    return connectClean(
        rootTweet.position.x + rootTweet.dimension.width / 2,
        rootTweet.position.y + rootTweet.dimension.height+2*Padding,
        childTweet.position.x + childTweet.dimension.width / 2,
        childTweet.position.y+2*Padding,
        Curve);
}

function connectBezier(x1:number,y1:number,x2:number,y2:number, offset:number){
    return <path stroke="black" fill="transparent"
                d={`M${x1},${y1} C${x1},${y2/2} ${x2},${y2/2} ${x2},${y2}`}
                >
            </path>

}

function connectClean(x1:number,y1:number,x2:number,y2:number, offset:number){
    let curveSize = offset;
    //if node on left of root, modify curve offset
    let horizontalCurve = x2<x1?-curveSize:curveSize;
    //SHOULD NEVER HAPPEN\
    //TODO: throw an error
    if(Math.abs(x2-x1) < curveSize*2){
        return <path stroke="black" fill="transparent" d={`M${x1},${y1} L${x1},${y2}`}></path>
    }
    return <path stroke="black" fill="transparent"
        d={`M${x1},${y1}
            L${x1},${y2-offset-curveSize}
            C${x1},${y2-offset} ${x1+horizontalCurve},${y2-offset} ${x1+horizontalCurve},${y2-offset}
            L${x2-horizontalCurve},${y2-offset}
            C${x2},${y2-offset} ${x2},${y2} ${x2},${y2}
            `}
            ></path>
}

export default TweetArc;
