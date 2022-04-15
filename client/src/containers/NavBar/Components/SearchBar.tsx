import React, {useState} from "react";// le useState est là pour quand on va le rattacher au vrai donnée.
import {SearchBarForm, SearchBarButton, SearBarInput, SearchBarContainer, SearchBarInputContainer } from "../styles";

function SearchBar({searchQuery, setSearchquery}: any ) {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const filterPosts = (posts: any, query:any) => {
        if (!query) {
            return posts;
        }
    
        return posts.filter((post: any) => {
            const postName = post.name.toLowerCase();
            return postName.includes(query);
        });
    };
    return(
        <SearchBarContainer>
            <SearchBarInputContainer>
                <SearchBarForm id="searchbarinput" action="/" method="get">
                  <SearBarInput
                  value={searchQuery}
                  onInput= {e => setSearchquery(e.target)}
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