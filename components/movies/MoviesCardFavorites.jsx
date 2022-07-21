import { useState } from 'react'
import Image from 'next/image'
import {Button, Card, Col, Grid, Row, Text} from "@nextui-org/react";
import {useRouter} from "next/router";

export const MoviesCardFavorites = ({ title, id, poster, rate }) => {

    const router = useRouter();

    const [hovered, setHovered] = useState('none')

    const handleMouseEnter = (e) => {
        e.preventDefault();
        setHovered('')
    };

    const handleMouseLeave = (e) => {
        e.preventDefault();
        setHovered('none')
    };

    const onClick  = () => {
        router.push(`/movie/${id}`)
    }

    return (
        <>
            <Grid
                key={id}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                xs={ 12 }
                sm={ 3 }
                md={ 2 }
                xl={ 2 }
            >
                <Card
                    isHoverable
                    isPressable
                    onClick={ onClick }
                >
                    <Card.Body css={{ p: 0, }}>
                        <Card.Image
                            src={poster}
                            objectFit="cover"
                            width="100%"
                            height="100%"
                            alt={title}
                        />
                    </Card.Body>
                    <Card.Footer
                        className="animate__animated animate__fadeInUp animate__faster 700ms"
                        isBlurred
                        css={{
                            display: hovered,
                            position: "absolute",
                            bgBlur: "#0f111466",
                            borderTop: "$borderWeights$light solid $gray800",
                            bottom: 0,
                            zIndex: 1,
                        }}
                    >
                        <Row>
                            <Col>
                                <Row>
                                    <Col>
                                        <Text color="#d1d1d1" size={12}>
                                            {title}
                                        </Text>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                alignItems: "center",
                                                width: "100%",
                                                height: "25px"
                                            }}>
                                            <Text color="rgb(237, 178, 28)" size={14} css={{ paddingRight: "10px"}}>
                                                {rate}
                                            </Text>
                                            <Image src="/imdb-logo.png" alt="IMDb Logo" width="40" height="37"/>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row justify="flex-end">
                                    <Button
                                        flat
                                        auto
                                        rounded
                                        css={{ color: "#94f9f0", bg: "#94f9f026" }}
                                    >
                                        <Text
                                            css={{ color: "inherit" }}
                                            size={12}
                                            weight="bold"
                                            transform="uppercase"
                                            onClick={ onClick }
                                        >
                                            Ver mas
                                        </Text>
                                    </Button>
                                </Row>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>
            </Grid>
        </>
    )
}