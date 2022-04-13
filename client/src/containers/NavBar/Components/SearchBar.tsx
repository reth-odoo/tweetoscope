import React, {useState} from "react";// le useState est là pour quand on va le rattacher au vrai donnée.
import {SearchBarForm, SearchBarButton, SearBarInput, SearchBarContainer, SearchBarInputContainer } from "../styles";

function SearchBar() {
    return(
        <SearchBarContainer>
            <SearchBarInputContainer>
                <SearchBarForm id="searchbarinput">
                  <SearBarInput
                  type="search"
                  name="searchbar"
                  id="searchbar"
                  placeholder="Search"
                  />
                </SearchBarForm>
                <SearchBarButton type="submit" form="searchbarinput">Search</SearchBarButton>
            </SearchBarInputContainer>     
        </SearchBarContainer>
    );
}
  
export default SearchBar;