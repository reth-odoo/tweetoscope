import axios, { AxiosResponse } from 'axios'

/*
This module makes the call to the server of the application
*/

const serverURL = "http://127.0.0.1:3000";

function serverRequest(route: string, body: any): Promise<AxiosResponse> | undefined{

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
          throw new Error(`Unsuccessful request at ${route} with this body ^`);
      }
    }

  try {
      const response = getRequest();
      return response;

  } catch (e) {
      console.error(e);
  };

}

export default serverRequest;