import {Button, Card, Col, Grid, Row, Text} from "@nextui-org/react";
import {useDispatch, useSelector} from "react-redux";
import {MouseEnterHover, MouseLeaveHover} from "../../actions/movies";
import {useRouter} from "next/router";

export const MoviesCard = ({ movies: { title, id, poster, rate } }) => {

    const moviesHover = useSelector((state) => state.movies);
    const dispatch = useDispatch();
    const router = useRouter();

    const hoverOnMouseEnter = (e) => {
        e.preventDefault();
        dispatch(MouseEnterHover());
        console.log(e.target)
    };

    const hoverOnMouseLeave = (e) => {
        e.preventDefault();
        dispatch(MouseLeaveHover());
    };

    const onClick  = () => {
        router.push(`/movie/${id}`)
    }

    return (
        <>
            <Grid
                key={id}
                // onMouseEnter={hoverOnMouseEnter}
                // onMouseLeave={hoverOnMouseLeave}
                xs={ 12 }
                sm={ 3 }
                md={ 2 }
                xl={ 2 }
            >
                <Card
                    hoverable
                    clickable
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
                        isHoverable
                        css={{
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
                                        <Text color="gold" size={12}>
                                            {rate} IMDb
                                        </Text>
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