import Head from 'next/head'
import dynamic from 'next/dynamic'
import {Navbar} from "../ui";

const Scene = dynamic(() => import('../three/Scene').then((mod) => mod.Scene), {
    ssr: false,
});

const Stars = dynamic(() => import('../three/Stars').then((mod) => mod.Stars), {
    ssr: false,
});

export const Layout = ({children, title}) => {
    return (
        <>
            <Head>
                <title>{title || "Movies App"}</title>
                <meta name="author" content="Carlos Acosta"/>
                <meta name="description" content={`Informacion sobre la pelicula ${title}`}/>
                <meta name="keywords" content={`${title}, movies, ${title || "genre"}`}/>
            </Head>

            <Scene/>

            <div style={{position: 'relative', zIndex: 1}}>
                <Navbar/>
                <main style={{
                    padding: '0px 20px'
                }}>
                    {children}
                </main>
            </div>
        </>
    )
}