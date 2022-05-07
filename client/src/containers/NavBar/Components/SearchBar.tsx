import React, {useState} from "react";// le useState est là pour quand on va le rattacher au vrai donnée.
import {SearchBarForm, SearchBarButton, SearBarInput, SearchBarContainer, 
    SearchBarInputContainer, DataListContainer, DataList, DataListItem } from "../styles";

function SearchBar() {
    const SearchSubmit = (event: any) => {
        const research = (document.getElementById('searchbarinput') as HTMLInputElement);
        if (research){
            if(research.value){
                const data = research.value.toLowerCase;
                //fonction d'envoie et de traitement
                // à implem
                research.value = "";
            }

        }
    }
    return(
        <SearchBarContainer>
            <SearchBarInputContainer>
                <SearchBarForm id="searchbarinput" action="/" method="get">
                  <SearBarInput
                  type="search"
                  name="searchbar"
                  id="searchbar"
                  placeholder="Search"
                  />
                </SearchBarForm>
                <SearchBarButton type="submit" form="searchbarinput" onClick={SearchSubmit}>Search</SearchBarButton>
            </SearchBarInputContainer>     
        
            
    </SearchBarContainer>
    );
}

export default SearchBar
