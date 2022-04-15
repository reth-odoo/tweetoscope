import sendTweet from "./sendTweet";

async function sendBigTweet(text: string, response: string = "", quoted: string = ""){

    var data = text;

    const subdata = data.match(/(.|[\r\n]){1,140}/g);

    console.log(subdata);
    var conversation: any;

    if (subdata){

        conversation = await sendTweet(subdata[0], response, quoted);
        console.log("Conversation: ",conversation);
        for (let i = 1; i < subdata.length; i++){
            sendTweet(subdata[i],conversation.id)
        }

    }

    

    return conversation;

}

export default sendBigTweet;