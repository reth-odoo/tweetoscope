import React from "react";
import { Navbar} from "react-bootstrap";
import { NavBarS, ItemsList, SearBarS } from "./styles";
import SearchBar from "./SearchBar";
import logo from "../../assets/Tweetter_logo.png";


export default function NavBar ()  {
    return(
            <Navbar>
                <NavBarS>
                     <img src={logo} alt="Tweeter logo" height={70} width={70}/>
                    <SearchBar/>
                </NavBarS>      
            </Navbar>
        
    );
}
