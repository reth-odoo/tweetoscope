import React , {useState} from "react";
import { NavBarS,NavLogoContainer, NavLogo} from "./styles";
import SearchBar from "./Components/SearchBar";
import DropdownMenu from "./Components/Dropdown";
import logo from "../../assets/BirdLogo.png";


export default function NavBar ()  {

    return(
            <nav>
                <NavBarS>
                    <NavLogoContainer>
                        <NavLogo src={logo} alt="bird logo"/>
                    </NavLogoContainer>
                    <SearchBar/>
                    <DropdownMenu/>
                </NavBarS>  
            </nav>
        
    );
}