import { useTheme, Text, Spacer } from "@nextui-org/react";
import {useRouter} from "next/router";

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

            <div
                onClick={onClick}
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

            <Spacer css={{ flex: 1 }} />

            <Text color='white' >Favorites</Text>
        </div>
    )
}