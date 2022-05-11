import axios, { AxiosResponse } from 'axios';

export async function getRequest(
  url: string,
  id_token: string = process.env.BEARER_TOKEN,
) {
  try {
    let res: AxiosResponse<any, any>;

    await axios

      .get(url, {
        headers: {
          'User-Agent': 'v2TweetLookupJS',
          authorization: `Bearer ${id_token}`,
        },
      })

      .then(function (response) {
        res = response.data;
      })

      .catch(function (error: any) {
        console.error(error);
      });

    //console.log('Route Request');
    console.dir(res, {
      depth: null,
    });
    //console.log('Route Request End');
    return res;
  } catch (e) {
    console.error(e);
    process.exit(-1);
  }
}

export async function postRequest(
  url: string,
  id_token: string = process.env.BEARER_TOKEN,
  body: any = {},
) {
  //console.log('Body Request:', body);

  try {
    let res: AxiosResponse<any, any>;

    await axios

      .post(url, body, {
        headers: {
          'User-Agent': 'v2TweetLookupJS',
          authorization: `Bearer ${id_token}`,
          'Content-type': 'application/json',
        },
      })

      .then(function (response) {
        res = response.data;
      })

      .catch(function (error: any) {
        console.error(error);
      });

    //console.log('Route Request');
    console.dir(res, {
      depth: null,
    });
    //console.log('Route Request End');
    //console.log('Body Request:', body);
    return res;
  } catch (e) {
    console.error('Erreur:', e);
    process.exit(-1);
  }
}
