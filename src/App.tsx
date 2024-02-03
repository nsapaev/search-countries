import './App.scss'
import {FaRegMoon, FaMoon, FaSearch} from "react-icons/fa";
import {useEffect, useState} from "react";
import Select from 'react-select'
import {ALL_COUNTRIES} from "./del/api.ts";
import HomePage from "./components/HomePage.tsx";
import {Routes, Route, useNavigate, Link} from "react-router-dom"
import Details from "./components/Details.tsx";
import NotFound from "./components/NotFound.tsx";

export default function App() {
    let [state, setState] = useState([])

    return (
        <div className={"wrapper"}>
            <Header/>
            <main>
                <Routes>
                    <Route path={"/"} element={<HomePage  state={state} setState={setState}/>}/>
                    <Route path={"/country/:name"} element={<Details/>}/>
                    <Route element={<NotFound/>}/>
                </Routes>

            </main>

        </div>
    )
}


export function Header() {

    let [theme, setTheme] = useState("light")
    useEffect(() => {
        document.body.setAttribute("data-theme", theme)

    }, [theme])

    return (
        <header className={"header"}>
            <div className={"header__container"}>
                <Link to={"/"} className={"header__logo"}>Home</Link>
                <div className={"header__mode"}>
                    {
                        theme === "light" && <div onClick={() => {
                            setTheme("dark")
                        }} className={"header__mode"}><FaMoon/> Dark Theme </div>
                    }

                    {
                        theme === "dark" && <div onClick={() => {
                            setTheme("light")
                        }} className={"header__mode"}><FaRegMoon/> Light Theme</div>
                    }
                </div>


            </div>

        </header>
    )
}

export function Main({state, setState,filteredCountries}) {
    const navigate = useNavigate()

    if (!state.length) {
        fetch(ALL_COUNTRIES).then(data => data.json())
            .then(data => {
                setState(data)
            })
    }


    return (
        <div className={"main"}>
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
        </div>
    )
}

export function Footer() {
    return (
        <footer className={"footer"}>
            <div className={"footer__container"}>
                i am footer
            </div>


        </footer>
    )
}

export function Cart({name, population, region, capital, flag,navigate}) {
    return (
        <div onClick={()=>{navigate(`/country/${name.toLowerCase()}`) }} className={"cart"}>
            <div className={"cart__image"}>
                <img
                    src={`${flag}`}/>
            </div>
            <div className={"cart__infoBlock"}>
                <h2 className={"cart__title"}>{name}</h2>
                <h3 className={"cart__population"}><strong>population</strong> {population}</h3>
                <h3 className={"cart__region"}><strong>region</strong> {region}</h3>
                <h3 className={"cart__capital"}><strong>capital</strong> {capital}</h3>
            </div>
        </div>
    )
}

export function SearchInput({search,setSearch}) {

    return (
        <div className={"searchInput"}>
            <label>
                <input value={search}
                       onChange={(e) => {setSearch(e.target.value)
                }}/>
                <span><FaSearch/></span>

            </label>
        </div>
    )
}
export function CustomSelect({region,setRegion}) {
    const options = [
        {value: 'africa', label: 'Africa'},
        {value: 'america', label: 'America'},
        {value: 'asia', label: 'Asia'},
        {value: 'europe', label: 'Europe'},
        {value: 'oceania', label: 'Oceania'},
    ]
    const optionStyles = (styles) => ({
        ...styles,
        background: "var(--color-bg)",
        border: "none",
        color: "var(--color-text)"
    })
    return (
        <div className={"customSelect"}>
            <Select options={options}
                    isClearable
                    isSearchable={false}
                    placeholder={"find for continents"}
                    styles={{
                        option: optionStyles,
                        control: (styles) => ({...styles, width: "200px", outline: "none"})
                    }}
                    value={region}
                    onChange={setRegion}
            />
        </div>
    )
}