import React, {useState} from "react";// le useState est là pour quand on va le rattacher au vrai donnée.
import {SearchBarForm, SearchBarButton, SearBarInput, SearchBarContainer, 
    SearchBarInputContainer, DataListContainer, DataList, DataListItem } from "../styles";
import searchTweet from "src/apiRequests/searchTweets";

function SearchBar() {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [dataTweet, setDataTweet] = useState([]);
    
    const handleFilter = (event : any) => {
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
                <SearchBarButton type="submit" form="searchbarinput" onClick={handleFilter}>Search</SearchBarButton>
            </SearchBarInputContainer>     
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
    </SearchBarContainer>
    
    );
}

export default SearchBar
