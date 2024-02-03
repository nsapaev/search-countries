import React, {useEffect, useState} from "react";
import {Cart} from "../App.tsx";
import {ALL_COUNTRIES} from "../del/api.ts";
import Controls from "./Controls.tsx";
import {useNavigate} from "react-router-dom";


export default function HomePage({state,setState}) {
    const navigate = useNavigate()
    const [filteredCountries, setFilteredCountries] = useState(state)

    const heandlerSearch = (search,region ) => {
        let data = [...state]
        if(region) {
            data = data.filter(c => c.region.toLowerCase().includes(region.toLowerCase()))
        }
        if(search){
            data = data.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()))
        }
        setFilteredCountries(data)
    }


    useEffect(() => {
        if (!state.length) {
            fetch(ALL_COUNTRIES).then(data => data.json())
                .then(data => {
                    setState(data)
                    setFilteredCountries(data)
                })
        }

    }, []);



    return (

        <>
            <div className={"main__container"}>
                <section className={"section-inputs"}>
                    <Controls onSearch={heandlerSearch}/>
                </section>

                <main className={"main"}>
                    <div className={"main__content"}>
                        {
                            filteredCountries.map(country => {
                                return <Cart key={country.name.common}
                                             name={country.name.common}
                                             capital={country.capital[0]}
                                             region={country.region}
                                             population={country.population}
                                             flag={country.flags.svg}
                                             navigate={navigate}
                                />
                            })
                        }
                    </div>
                </main>
            </div>
        </>
    )
}