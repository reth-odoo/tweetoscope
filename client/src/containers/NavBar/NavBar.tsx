import React , {useState} from "react";
import { NavBarS,NavLogoContainer, NavLogo} from "./styles";
import SearchBar from "./Components/SearchBar";
import DropdownMenu from "./Components/Dropdown";
import logo from "../../assets/BirdLogo.png";


export default function NavBar ()  {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredPosts = filterPosts(posts, searchQuery);

    return(
            <nav>
                <NavBarS>
                    <NavLogoContainer>
                        <NavLogo src={logo} alt="bird logo"/>
                    </NavLogoContainer>
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                    <DropdownMenu/>
                </NavBarS>  
            </nav>
        
    );
}
function posts(posts: any, searchQuery: string) {
    throw new Error("Function not implemented.");
}

