import Tweet from "../models/tweet";

const Duplicates = 3;

class TwitterService{

    profile: Tweet[] = [];
    timeline: Tweet[] = [];

    constructor(){
    //Start stump data
    function* idGen(){
       let i = 0;
       while(true){
           i++;
           yield i;
       }
    }
    let nextId = idGen();
    for(let i = 0; i<Duplicates; i++){
        let temp_tweet: Tweet|null = null;
        let temp_res: Tweet[]|null = null;

        temp_tweet = new Tweet(nextId.next().value!.toString(), "Mary Sue", "themarysue", new Date(2022, 3, 3, 14, 52), "Hello Twitter, this is my first Tweet! So happy to share this moment with you! #noob #firsttweet Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at enim at leo congue maximus. Nulla lacinia auctor mauris, condimentum tempor nibh facilisis vitae. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean sollicitudin elit suscipit sagittis molestie. Etiam quis nibh porttitor, eleifend augue eget, scelerisque tortor. Morbi vitae lacus ligula. Quisque in luctus arcu. Cras ac hendrerit velit. Etiam sollicitudin nulla convallis eros consequat, sit amet convallis velit sodales. Vestibulum eleifend sem quis nisi posuere, et vehicula purus mollis. Aenean elementum laoreet magna. Donec molestie, enim ac pharetra blandit, metus arcu consectetur lacus, convallis laoreet elit orci eu elit. Cras viverra, ex at tristique auctor, velit nunc rutrum lorem, in vestibulum libero velit sed velit. Nunc non tincidunt velit. Donec condimentum mi ac malesuada maximus. Cras consectetur nibh accumsan orci aliquet, sit amet dapibus felis rhoncus. Vivamus aliquam tellus massa.", 5, 2);

        temp_res = [
            new Tweet(nextId.next().value!.toString(), "Bob Hank", "hankbob123", new Date(2022, 3, 3, 14, 58), "Hey Mary, great to have you on Twitter. Can't wait to start debating on interesting topics with you!", 1, 0, temp_tweet),
            new Tweet(nextId.next().value!.toString(), "Justine Dupont", "dptju2000", new Date(2022, 3, 4, 10, 15), "Omg Mary hi!!! Great new member for Twitter!", 2, 1, temp_tweet),
            new Tweet(nextId.next().value!.toString(),"Robotott", "robyy", new Date(2022, 3, 3, 15, 9), "Hello Mary Sue!", 0, 0, temp_tweet)
        ];
        let t = new Tweet(nextId.next().value!.toString(),"Hamidoty", "hamidd57", new Date(2022, 3, 3, 15, 9), "I agree, Bob. Welcome to Twitter Mary Sue!", 1, 0, temp_res[0])
        t.addReply(new Tweet(nextId.next().value!.toString(),"Hamidoty", "hamidd57", new Date(2022, 3, 3, 15, 9), "I agree, Bob. Welcome to Twitter Mary Sue!", 1, 0, temp_res[0]));
        t.addReply(new Tweet(nextId.next().value!.toString(),"Hamidoty", "hamidd57", new Date(2022, 3, 3, 15, 9), "I agree, Bob. Welcome to Twitter Mary Sue!", 1, 0, temp_res[0]));
        let t2 = new Tweet(nextId.next().value!.toString(),"Hamidoty", "hamidd57", new Date(2022, 3, 3, 15, 9), "I agree, Bob. Welcome to Twitter Mary Sue!", 1, 0, temp_res[0])
        t.addReply(new Tweet(nextId.next().value!.toString(),"Hamidoty", "hamidd57", new Date(2022, 3, 3, 15, 9), "I agree, Bob. Welcome to Twitter Mary Sue!", 1, 0, temp_res[0]));
        t.addReply(new Tweet(nextId.next().value!.toString(),"Hamidoty", "hamidd57", new Date(2022, 3, 3, 15, 9), "I agree, Bob. Welcome to Twitter Mary Sue!", 1, 0, temp_res[0]));
        temp_res[0].addReply(t);
        temp_res[0].addReply(t2);

        temp_res.forEach(tweet => temp_tweet!.addReply(tweet));


        this.timeline.push(temp_tweet);
    }
    }

    getTimeline(){
        return this.timeline;
    }
}

export default TwitterService;
