import {CustomSelect, SearchInput} from "../App.tsx";
import React, {useEffect, useState} from "react";

export default function Controls({onSearch}){
    let [region,setRegion] = useState("")
    let [search, setSearch] = useState("")

    useEffect(() => {
        const regionValue = region?.value || ""
        onSearch(search,regionValue)
        //eslint-disable-next-line
    }, [search,region]);

    return(
        <>
            <SearchInput search={search} setSearch={setSearch}/>
            <CustomSelect region={region} setRegion={setRegion}/>
        </>
    )
}