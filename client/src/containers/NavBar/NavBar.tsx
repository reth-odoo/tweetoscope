import React from "react";
import { NavBarS, NavLogo} from "./styles";
import SearchBar from "./Components/SearchBar";
import DropdownMenu from "./Components/Dropdown";
import logo from "../../assets/Tweetter_logo.png";


export default function NavBar ()  {
    return(
            <nav>
                <NavBarS>
                    <NavLogo src={logo} alt="Tweeter logo" height={70} width={70}/>
                    <SearchBar/>
                    <DropdownMenu/>
                </NavBarS>  
            </nav>
        
    );
}
