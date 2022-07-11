import Head from 'next/head'

export const Layout = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{ title || "Movies App" }</title>
                <meta name="author" content="Carlos Acosta" />
                <meta name="description" content={`Informacion sobre la pelicula ${ title }`} />
                <meta name="keywords" content={`${ title }, movies, ${ title || "genre" }`} />
            </Head>

            <main>
                { children }
            </main>

        </>
    )
}