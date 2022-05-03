import React, {useState} from 'react';
import {Main, DropDownContainer, DropDownHeader, DropDownList, DropDownListContainer, ListItem, TwitterLoggerLogOutButtonContainer, TwitterLoggerLogOutButton,TwitterLoggerSignInImg,TwitterLoggerUserImg} from '../styles';
import onClickOustide, { HandleClickOutside } from "react-onclickoutside"; //à implem
import axios from 'axios'
import queryString from 'query-string'
import twitter_sign_in from "../../../assets/twitter_sign_in.png"
const request_token_route = '' //Mettre ici la route du Request Token
const logout_route = ''//Mettre ici la route de Logout
const access_token_route = ''//Mettre ici la route de l'Access Token
const profile_banner_route = ''//Mettre ici la route de la profile banner de l'utilisateur connecté

function DropdownMenu(){
    //dropdown const
    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => setIsOpen(!isOpen);    

    //twitterlogger const
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [name, setName] = React.useState();
    const [imageUrl, setImageUrl] = React.useState();
    const [status, setStatus] = React.useState();
    const [url, setUrl] = React.useState();
    
    const login = () => {
        (async () => {
            
            try {
            //OAuth Step 1
            const response = await axios({
                url: `${request_token_route}`, 
                method: 'POST'
            });
            
            const { oauth_token } = response.data;
            //Oauth Step 2
            window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`;
            } catch (error) {
            console.error(error); 
            }
            
        })();
    }
        
    const logout = () => {
        (async () => {
            try {
            await axios({
                url: `${logout_route}`, 
                method: 'POST'
            });
            setIsLoggedIn(false);
            } catch (error) {
            console.error(error); 
            }
        })();
    }
        
    React.useEffect(() => {
        (async() => {
            
            const {oauth_token, oauth_verifier} = queryString.parse(window.location.search);  
            
            if (oauth_token && oauth_verifier) {
                try {
                //Oauth Step 3
                await axios({
                    url: `${access_token_route}`,  
                    method: 'POST',
                    data: {oauth_token, oauth_verifier}
                });
                } catch (error) {
                console.error(error); 
                }
            }
            
            try {
                //Authenticated Resource Access
                const {data: {name, profile_image_url_https, status, entities}} = await axios({
                url: `${profile_banner_route}`,
                method: 'GET'
                });
                
                setIsLoggedIn(true);
                setName(name);
                setImageUrl(profile_image_url_https);
                setStatus(status.text);
                setUrl(entities.url.urls[0].expanded_url);
                } catch (error) {
                console.error(error); 
                }
        
        
        })();
    },[]);

    return(
        <Main>
            {!isLoggedIn &&
                <TwitterLoggerSignInImg className='signin-btn' onClick={login} alt='Twitter login button' src={twitter_sign_in} />
            }
            {isLoggedIn &&
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

