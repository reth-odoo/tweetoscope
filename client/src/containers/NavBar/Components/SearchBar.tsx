import React, {useState} from "react";// le useState est là pour quand on va le rattacher au vrai donnée.
import {SearchBarForm, SearchBarButton, SearBarInput, SearchBarContainer,
    SearchBarInputContainer, DataListContainer, DataList, DataListItem } from "../styles";
import searchTweet from "src/apiRequests/searchTweets";
import getSelf from "../../../apiRequests/getSelf";
import { getRelevantUsers } from "./services/getRelevantUsers";

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

    /*
    let followers = [];

    const getFollowers = async () => {
      followers = await getFollowers()
    };

    // searchbar text autocomletion
    const autocompleteText = async (event: React.KeyboardEvent<HTMLInputElement>) => {

      if(inputArea) {

        const text = inputArea?.value + event.key;
        const relevantUsers = await getRelevantUsers(text);
      }
    };
    */

    /*
    const handleFilter = async (event : any) => {

      let tweets = await twitter.getTimeline(data);
      console.log(tweets);
      let tree = await genTrees(tweets);
      setRenderedTweets(tree);
        (async () => {
            const searchWord = event.target.value;
            const data = await searchTweet(searchWord);
            setDataTweet(data.search);
            setWordEntered(searchWord);
            if (searchWord === "") {
                setFilteredData([]);
            } else {
                setFilteredData(dataTweet);
            }

        })()
      };
      */

    return(
        <SearchBarContainer>
            <SearchBarInputContainer>

                <SearBarInput name="searchbar" id="searchbar" placeholder="Search for a username or id..."/>

                <SearchBarButton onClick={changeTimeline}>Search Timeline</SearchBarButton>
            </SearchBarInputContainer>
                {/*
                <DataListContainer>
                    {filteredData.slice(0,15).map((value, key) => {
                            return (
                                <DataList>
                                    <DataListItem>
                                        <p>{value}</p>
                                    </DataListItem>
                                </DataList>
                            );
                        })}
                </DataListContainer>
                */}
    </SearchBarContainer>

    );
}

interface SearchBarProps{
    SetTimelineId: (id: string) => void
}

export default SearchBar
