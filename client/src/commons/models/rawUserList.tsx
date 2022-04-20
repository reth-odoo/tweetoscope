import getFollowers from "../../apiRequests/getFollowers";

/**
 * List of Twitter Users. 
 * P_token is a pagination token used to navigate the list when calling the API
 */

 class RawFollowersList{

    private _user_id: string;
    private _list: Object;
    private _p_token: string;

    constructor(user_id: string, list: Object, p_token: string = "")  {
        
        this._user_id = user_id;
        this._list = list;
        this._p_token = p_token
        
    }

    get user_id(){
        return this._user_id;
    }

    get list(){
        return this._list;
    }

    get p_token(){
        return this._p_token;
    }

    async nextPage(){
        return await getFollowers(this.user_id, this._p_token);
    }

}

export default RawFollowersList;