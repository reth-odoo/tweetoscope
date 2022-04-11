import React from 'react'
import axios, {AxiosResponse} from 'axios'
import queryString from 'query-string'
import { CookiesProvider, useCookies } from "react-cookie"
import getSelf from '../apiRequests/getSelf'

const base_url = 'http://127.0.0.1:4000'
const request_token_route = `${base_url}/twitter` //Mettre ici la route du Request Token

function TwitterLogger() {

    const [name, setName] = React.useState<string>("");
    const [username, setUserName] = React.useState<string>("");
    const [imageUrl, setImageUrl] = React.useState<string>("");
    const [status, setStatus] = React.useState<string>("");
    const [url, setUrl] = React.useState<string>("");
    const [cookies, setCookie, removeCookie] = useCookies();

    const login = () => {

        (async () => {

            try {
                
                window.open(`${request_token_route}`);

            } 
            
            catch (error) {

                console.error(error); 

            }
            
        })();
    }
        
    const logout = () => {

        try {

            removeCookie('auth-cookie');

        } 
            
        catch (error) {

            console.error(error); 

        }

    }
        
    React.useEffect(() => {
        (async() => {
            
            try {

                //Authenticated Resource Access
                const data: any = await getSelf();

                console.log("Data: ", data);

                const user = data.data;
                
                setName(user.name);
                setUserName(user.username);
                setImageUrl(user.profile_image_url);
                setStatus(user.description);
                setUrl(user.url);

            } 
                
            catch (error) {

                console.error(error); 

            }
        
        })();
        
    },[]);

    return  <header className="App-header">
                <CookiesProvider>
                    { !cookies["auth-cookie"] &&
                    <img className='signin-btn' onClick={login} alt='Twitter login button' src='https://assets.klaudsol.com/twitter.png' />
                    }
                    
                    { cookies["auth-cookie"] &&
                    <div>
                        <div><img alt='User profile' src={imageUrl}/></div> 
                        <div>Name: {name} ({username})</div>
                        <div>URL: {url}</div>
                        <div>Description: {status}</div>
                        <button className='signout-btn' onClick={logout}>Sign Out</button>
                    </div>
                    }
                </CookiesProvider>
            </header>;

}

export default TwitterLogger;
