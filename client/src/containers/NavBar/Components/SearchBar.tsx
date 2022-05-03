import React, {useState} from "react";// le useState est là pour quand on va le rattacher au vrai donnée.
import {SearchBarForm, SearchBarButton, SearBarInput, SearchBarContainer, 
    SearchBarInputContainer, DataListContainer, DataList, DataListItem } from "../styles";

function SearchBar(data: any) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    
    const handleFilter = (event : any) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value: { title: string; }) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
  };

    return(
        <SearchBarContainer>
            <SearchBarInputContainer>
                <SearchBarForm id="searchbarinput" action="/" method="get">
                  <SearBarInput
                  value={wordEntered}
                  type="search"
                  name="searchbar"
                  id="searchbar"
                  placeholder="Search"
                  onChange={handleFilter}
                  />
                </SearchBarForm>
                <SearchBarButton type="submit" form="searchbarinput">Search</SearchBarButton>
            </SearchBarInputContainer>     
        
            
    </SearchBarContainer>
    );
}

export default SearchBar

/*{filteredData.length != 0 && (
    <DataListContainer>
        {filteredData.slice(0,15).map((value, key) => {
            return (
                <DataList>
                    <DataListItem href={value.link} target="_blank"> 
                        <p>{value.title} </p>
                    </DataListItem> 
                </DataList>
            );
        })}
    </DataListContainer>
)}*/