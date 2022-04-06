import axios, { AxiosResponse } from 'axios'

/*
This module makes the call to the server of the application
*/

const serverURL = "http://localhost:4000";

function serverRequest(route: string, body: any){

  var res: AxiosResponse<any, any>;

  async function getRequest() {

    await axios

      .post(serverURL+route, body)

      .then(function (response) {
        console.log("Request Answer")
        console.log(response);
        res = response.data;
      })

      .catch(function (error: any) {
        console.log(error);
      });

      if (res) {
          return res;
      } else {
          throw new Error('Unsuccessful request');
      }
    }

  (async () => {

      try {
          const response = await getRequest();
          console.log("Client Request");
          console.dir(response, {
              depth: null
          });
          console.log("Client Request End");
          return response;

      } catch (e) {
          console.log(e);
      }
  })();

}

export default serverRequest;