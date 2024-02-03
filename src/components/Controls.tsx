import {CustomSelect, SearchInput} from "../App.tsx";
import {useEffect, useState} from "react";

export default function Controls({onSearch}){
    let [region,setRegion] = useState<any>('')
    let [search, setSearch] = useState("")

    useEffect(() => {

        const regionValue =region?.value || ""
        onSearch(search,regionValue)

    }, [search,region]);

    return(
        <>
            <SearchInput search={search} setSearch={setSearch}/>
            <CustomSelect region={region} setRegion={setRegion}/>
        </>
    )
}