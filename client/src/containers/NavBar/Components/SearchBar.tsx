import React from "react";
import { SearBarS } from "../styles";

export default function SearchBar() {
    return(
        <>
            <SearBarS
            type="search"
            name="searchbar"
            id="searchbar"
            placeholder="Rechercher"
            />
        </>
    );
}