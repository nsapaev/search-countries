
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {filterByCode, searcbyCountryName} from "../del/api.ts";
import { IoArrowBack } from "react-icons/io5";
import Info from "./Info.tsx";

interface ICountryInfo {
    name:string,
    population:number,
    region: string,
    subRegion:string,
    capital:string,
    currencies:any,
    languages:any,
    borderCountries:Array<string>,
    flag:string,
}

export default function Details(){
    const {name} = useParams()
    const [state,setState] = useState<ICountryInfo | any > ({})
    const navigate = useNavigate()

    useEffect(() => {
        if(!state.length){
            fetch(searcbyCountryName(name))
                .then(data => data.json())
                .then(data => {
                    const dataObj:ICountryInfo = {
                        name:data[0]?.name.common,
                        population:data[0].population,
                        region:data[0].region,
                        languages:Object.values(data[0].languages),
                        capital: data[0].capital[0],
                        currencies:Object.values(data[0].currencies[`${Object.keys(data[0].currencies)}`]),
                        subRegion:data[0].subregion,
                        borderCountries: data[0].borders,
                        flag:data[0].flags.svg
                    }
                    setState(dataObj)
                })
        }
    }, [name]);



    return(
        <div className={"details"}>
            <div className={"container"}>
                <button className={"details__goBack"} onClick={() => {
                    navigate(-1)
                }}>
                    <IoArrowBack/> Go Back
                </button>

                <Info {...state} navigate={navigate}/>
            </div>

        </div>
    )
}
