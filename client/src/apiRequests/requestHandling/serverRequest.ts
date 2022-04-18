import axios, { AxiosResponse } from 'axios'
import { DEFAULT_SERVER_URL } from 'src/AppParameters';

/*
This module makes the call to the server of the application
*/

const serverURL = DEFAULT_SERVER_URL;

async function serverRequest(route: string, body: any): Promise<any>{

  var res: AxiosResponse<any, any>;

  async function getRequest() {

    await axios

      .post(serverURL+route, body)

      .then(function (response) {
        res = response;
      })

      .catch(function (error: any) {
        console.error(error);
      });
      
      if (res) {
          //console.log("Final Result");
          //console.log(res);
          return res;
      } else {
          console.error(body);
          throw new Error(`Unsuccessful request at ${route} with logged body`);
      }
    }

  try {
      const response = await getRequest();
      if(response.status < 200 || response.status>202){
        console.error(body);
        throw new Error(`Received status ${response.status} for ${route} with logged body. Expected [200-202].`);
      }
      return response.data;

  } catch (e) {
      console.error(e);
  };

}

export default serverRequest;