import React from "react";// le useState est là pour quand on va le rattacher au vrai donnée.
import {SearchBarButton, SearBarInput, SearchBarContainer, SearchBarInputContainer } from "../styles";
import getUserByName from "src/apiRequests/getUserByName";

function SearchBar(props: SearchBarProps) {
    const inputArea = document.getElementById("searchbar") as HTMLInputElement;

    const changeTimeline = () => {
      if(inputArea) {
        if(inputArea.value) {
          checkValidity(inputArea.value);
        }
      }
    };

    const checkValidity = async (value: string) => {
      const user: any = await getUserByName(value);

      if(user) {
        props.SetTimelineId(user.id);
      }
      else {
        inputArea.value = "";
        inputArea.placeholder = "Invalid username.";
        //props.SetTimelineId(value);
      }
    };

    // enter key to search
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {

      if(inputArea) {
        if(event.key === "Enter") {
          changeTimeline();
        }
      }
    };

    return(
        <SearchBarContainer>
            <SearchBarInputContainer>
                <SearBarInput name="searchbar" id="searchbar" placeholder="Search for a username..." onKeyDown={handleKeyDown}/>
                <SearchBarButton onClick={changeTimeline}>Search Timeline</SearchBarButton>
            </SearchBarInputContainer>
        </SearchBarContainer>
    );
}

interface SearchBarProps{
    SetTimelineId: (id: string) => void
}

export default SearchBar
