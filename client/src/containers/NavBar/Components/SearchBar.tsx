import React, {useState} from "react";// le useState est là pour quand on va le rattacher au vrai donnée.
import {SearchBarForm, SearchBarButton, SearBarInput, SearchBarContainer,
    SearchBarInputContainer } from "../styles";
import searchTweet from "src/apiRequests/searchTweets";

function SearchBar(props: SearchBarProps) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [dataTweet, setDataTweet] = useState([]);

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
