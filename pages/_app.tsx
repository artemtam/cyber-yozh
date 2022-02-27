import type {AppProps} from 'next/app'
import {IntlProvider} from "react-intl";

import messagesRU from '../locales/ru.json'
import messagesEN from '../locales/en.json'

import "./style.css"
import {useEffect, useMemo, useState} from "react";


function MyApp({Component, pageProps}: AppProps) {
    const [locale, setLocale] = useState('ru');
    const messages = useMemo(() => locale === 'ru' ? messagesRU : messagesEN, [locale]);

    useEffect(() => {
        setLocale(navigator.language.slice(0, 2) === 'ru' ? 'ru' : 'en');
    }, []);

    return (
        <IntlProvider locale={locale} defaultLocale="ru" messages={messages}>
            <Component {...pageProps} />
        </IntlProvider>
    )
}

export default MyApp
