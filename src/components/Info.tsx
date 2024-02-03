import {useEffect, useState} from "react";
import {filterByCode} from "../del/api.ts";

export default function Info(props) {
    const {
        name,
        population,
        region,
        subRegion,
        capital,
        currencies,
        languages,
        borderCountries,
        flag,
        navigate
    } = props

    const [neighbords, setNeighbords] = useState([])
    useEffect(() => {
        if (borderCountries) {
            fetch(filterByCode(borderCountries)).then(request => request.json())
                .then(data => {
                    setNeighbords(data.map(c => c.name.common))
                })
        }


    }, [borderCountries]);


    return (
        <div className={"details"}>
            <div className={"details__container"}>
                <div className={"details__flag"}>
                    <img src={flag}/>
                </div>
                <div className={"details__infoBlock"}>
                    <div className={"details__infoBlock-main"}>
                        <div className={"details__name"}>{name}</div>
                        <div className={"details__population"}><b>Population</b> {population}</div>
                        <div className={"details__region"}><b>Region</b> {region}</div>
                        <div className={"details__sub-region"}><b>Sub Region</b> {subRegion}</div>
                        <div className={"details__capital"}><b>Capital</b> {capital}</div>
                    </div>
                    <div className={"details__infoBlock-other"}>
                        <div className={"details__currencies"}><b>Currencies</b> {currencies ? currencies[0] : ""}</div>
                        <div className={"details__languages"}><b>Languages</b> {languages?.map((l) =>
                            <span>{`${l},`}</span>)}</div>
                    </div>
                    <div className={"details__borders"}>
                        <b>borders</b>
                        {neighbords?.map((c:any) => <span onClick={() => {
                        navigate(`/country/${c.toLowerCase()}`)
                    }

                    }>{c}</span>)} </div>
                </div>
            </div>
        </div>
    )
}
