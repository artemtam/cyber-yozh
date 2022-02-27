import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head title="Кибер-Ёж">
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="crossorigin"/>
                    <link href="https://fonts.googleapis.com/css2?family=Bitter:wght@400;700&display=swap"
                          rel="stylesheet"/>

                    <meta property="og:title" content="Кибер-Ёж"/>
                    <meta property="og:url" content="https://cyber-yozh.com/"/>
                    <meta property="og:image" content="https://cyber-yozh.com/og.png"/>

                    <meta name="twitter:title" content="Кибер-Ёж"/>
                    <meta name="twitter:description"
                          content="Сегодня мы даём всем вам настоящее кибер-оружие. Встречайте — это Кибер-Ёж. Нажимайте на кнопку «Атаковать» и Кибер-Ёж начнёт бомбить сайты противника хлеще, чем дроны Байрактар путинских оккупантов."/>
                    <meta name="twitter:image" content="https://cyber-yozh.com/og.png"/>
                    <meta name="twitter:card" content="summary_large_image"/>

                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument