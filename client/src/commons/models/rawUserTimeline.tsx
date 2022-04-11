import RawTimeline from "./rawTimeline";
import getUserTimeline from "../../apiRequests/getUserTimeline";

/**
 * List of tweets generated from a UserTimeline
 */

class RawUserTimeline extends RawTimeline{


    async nextPage(): Promise<RawUserTimeline>{
        return await getUserTimeline(this.id,this.pagination_token);
    }

}

export default RawUserTimeline;