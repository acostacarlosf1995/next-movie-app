import { useState } from 'react'
import Image from 'next/image'
import {Button, Card, Col, Row, Text} from "@nextui-org/react";
import {useRouter} from "next/router";

export const MoviesCardSimple = ({ movie }) => {

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
        router.push(`/movie/${movie.id}`)
    }

    return (
        <Card
            isHoverable
            isPressable
            onClick={ onClick }
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            css={{ w: "100%", h: "300px" }}
        >
            <Card.Body css={{ p: 0, }}>
                <Card.Image
                    src={movie.poster}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    alt={movie.title}
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
                                    {movie.title}
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
                                        {movie.rate.toFixed(1)}
                                    </Text>
                                    <Image src="/imdb-logo.png" alt="IMDb Logo" width="40" height="37"/>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )
} 