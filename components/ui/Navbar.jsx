import { useTheme, Text, Spacer, Link, Button } from "@nextui-org/react";
import {useRouter} from "next/router";
import NextLink from 'next/link';

import { MoviesSearch } from "../movies/MoviesSearch";

export const Navbar = () => {

    const { theme } = useTheme()
    const router = useRouter();
    //
    // console.log(theme)

    const onClick  = () => {
        router.push('/')
    }

    return (
        <div
            style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'start',
            padding: '10px 20px',
            backgroundColor: theme?.colors.gray50.value
        }}>

            <NextLink href="/" passHref>
                <Link>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'start',
                            cursor: 'pointer'
                        }}
                    >
                        <Text color='white' h2 >M</Text>
                        <Text color='white' h3 >ovies</Text>
                    </div>
                </Link>
            </NextLink>

            <MoviesSearch />

            <Spacer css={{ flex: 1 }} />

            <NextLink href="/favorites" passHref>
                <Link>
                    <Button bordered color="gradient" auto>
                        Favorites
                    </Button>
                </Link>
            </NextLink>
        </div>
    )
}