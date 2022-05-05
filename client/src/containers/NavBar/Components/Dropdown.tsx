import React, {useState} from 'react';
import {Main, DropDownContainer, DropDownHeader, DropDownList, DropDownListContainer, ListItem, TwitterLoggerLogOutButtonContainer, TwitterLoggerLogOutButton,TwitterLoggerSignInImg,TwitterLoggerUserImg} from '../styles';
import onClickOustide, { HandleClickOutside } from "react-onclickoutside"; //à implem
import axios from 'axios'
import queryString from 'query-string'
import twitter_sign_in from "../../../assets/twitter_sign_in.png"
import { CookiesProvider, useCookies } from "react-cookie"
import getSelf from 'src/apiRequests/getSelf';
const base_url = 'http://127.0.0.1:3000'
const request_token_route = `${base_url}/twitter` //Mettre ici la route du Request Token

function DropdownMenu(){
    //dropdown const
    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => setIsOpen(!isOpen);    

    //twitterlogger const
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

                //console.log("Data: ", data);

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

    return(
        <Main>
            {!cookies["auth-cookie"] &&
                <TwitterLoggerSignInImg className='signin-btn' onClick={login} alt='Twitter login button' src={twitter_sign_in} />
            }
            {cookies["auth-cookie"] &&
                <DropDownContainer>
                    <DropDownHeader onClick={toggling}>
                    <TwitterLoggerUserImg alt='User profile' src={imageUrl}/> {name}
                    </DropDownHeader>
                    {isOpen && (
                        <DropDownListContainer>
                            <DropDownList>
                                <ListItem>Name: {name}</ListItem>
                                <ListItem>URL: {url}</ListItem>
                                <ListItem>Status: {status}</ListItem>
                                <TwitterLoggerLogOutButtonContainer>
                                    <TwitterLoggerLogOutButton className='signout-btn' onClick={logout}>Sign Out</TwitterLoggerLogOutButton>
                                </TwitterLoggerLogOutButtonContainer>
                            </DropDownList>
                        </DropDownListContainer>
                    )}
                </DropDownContainer>
            }
        </Main>  
    );
}




export default DropdownMenu;

