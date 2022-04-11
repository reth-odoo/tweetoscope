import axios, { AxiosResponse } from 'axios';

async function apiRequest(url: string, id_token: string){

    async function getRequest() {

        var res: AxiosResponse<any, any>;

        await axios
        
        .get(url, {headers : {
            "User-Agent": "v2TweetLookupJS",
            "authorization": `Bearer ${id_token}`}
        })
        
        .then(function (response) {
          res = response.data;
        })

        .catch(function (error: any) {
          console.log(error);
        });

        if (res.data) {
            return res;
        } else {
            throw new Error('Unsuccessful request');
        }
    }
    
    try {
        const response = await getRequest();
        return response;
        } 
        
    catch (e) {
        console.log(e);
        process.exit(-1);
    };

}

async function routeRequest(url: string, id_token: string = process.env.BEARER_TOKEN){
    try {
        const response = await apiRequest(url, id_token);

        console.log("Route Request");
        console.dir(response, {
            depth: null
        });
        console.log("Route Request End");
        return response;
        

  } catch (e) {
        console.log(e);
        process.exit(-1);
    }
}; 

export default routeRequest;