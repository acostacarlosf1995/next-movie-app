import { useState } from 'react'
import { Button } from "@nextui-org/react";
import {useRouter} from "next/router";

const API_KEY = "dfa1345af4b42814b7229dbfa7ab4cfc"

export const MoviesSearch = () => {

    // const moviesHover = useSelector((state) => state.searchMovie);
    // const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState('');

    const router = useRouter();

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const urlParamsTranform = searchTerm.split(' ').join('-')
        router.push(`/search/${urlParamsTranform}`)
    }

    return (
        <div>
            <form
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingLeft: '30px'
                }}
                onSubmit={handleSubmit}
            >
                <input
                    style={{ borderRadius: '10px 0px 0px 10px', border: 'none', color: 'black', paddingLeft: '15px' }}
                    onChange={handleChange}
                    value={searchTerm}
                    placeholder="Search movie..."
                    type="text"
                    autoComplete="off"
                />
                <Button
                    css={{ borderRadius: '0px 10px 10px 0px' }}
                    className="btn-search"
                    flat
                    color="secondary"
                    auto
                    type="submit"
                >
                    Search
                </Button>
            </form>
        </div>
    )
}