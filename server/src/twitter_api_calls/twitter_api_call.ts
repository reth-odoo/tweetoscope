import axios, { AxiosResponse } from 'axios';

const bearerToken = "AAAAAAAAAAAAAAAAAAAAAKtGYQEAAAAAmetRHjeuMQcnpSorGI3FC1FJyzQ%3DsqjdVQKAgxAm6hW1HcupoPDbgn6ISkYFSfBPeJntGsBEi1h0LJ";

async function apiRequest(url: string){

    async function getRequest() {

        var res: AxiosResponse<any, any>;

        await axios
        
        .get(url, {headers : {
            "User-Agent": "v2TweetLookupJS",
            "authorization": `Bearer ${bearerToken}`}
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
        console.log("Server Request");
        console.dir(response, {
            depth: null
        });
        console.log("Server Request End");
        return response;
        } 
        
    catch (e) {
        console.log(e);
        process.exit(-1);
    };

}

async function routeRequest(url: string){
    try {
        const response = await apiRequest(url);

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