import React from "react";// le useState est là pour quand on va le rattacher au vrai donnée.
import {SearchBarButton, SearBarInput, SearchBarContainer,
    SearchBarInputContainer } from "../styles";

function SearchBar(props: SearchBarProps) {
    const inputArea = document.getElementById("searchbar") as HTMLInputElement;

    const changeTimeline = () => {
      if(inputArea) {
        if(inputArea.value) {
          props.SetTimelineId(inputArea.value);
        }
      }
    };

    return(
        <SearchBarContainer>
            <SearchBarInputContainer>
                <SearBarInput name="searchbar" id="searchbar" placeholder="Search for a username or id..."/>
                <SearchBarButton onClick={changeTimeline}>Search Timeline</SearchBarButton>    
            </SearchBarInputContainer>
        </SearchBarContainer>
    );
}

interface SearchBarProps{
    SetTimelineId: (id: string) => void
}

export default SearchBar
