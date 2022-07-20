import {Container, Image, Text} from "@nextui-org/react";

export const NoFavorites = () => {
    return (
        <Container
            css={{
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100vh - 100px)',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center'
            }}
        >
            <Text h1>No Favorites</Text>
            <Image
                src="https://i.vimeocdn.com/video/1051978273-1d816dd172f6da0f1bdb21690470ee37bd56b83780bcfe0b30089318bd757477-d_640x360.jpg"
                width={250}
                height={200}
                css={{
                    opacity: 0.3
                }}
            >

            </Image>
        </Container>
    )
}