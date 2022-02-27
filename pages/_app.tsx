import type {AppProps} from 'next/app'
import {IntlProvider} from "react-intl";

import messagesRU from '../locales/ru.json'
import messagesEN from '../locales/en.json'
import messagesUA from '../locales/uk.json'

import "./style.css"
import React, {useEffect, useMemo, useState} from "react";
import LanguageDropdown from "../components/LanguageDropdown";

const LANGUAGES = [{value: 'uk', file: messagesUA}, {value: 'ru', file:messagesRU}, {value: 'en', file: messagesEN}];

function MyApp({Component, pageProps}: AppProps) {
    const [locale, setLocale] = useState('ru');
    const messages = useMemo(() => {
        const lang = LANGUAGES.find(({value}) => value === locale)
        return lang ? lang?.file : messagesEN
    }, [locale]);

    useEffect(() => {
        const navigatorLanguage = navigator.language.slice(0, 2)
        const langCodes = LANGUAGES.map(({value}) => value)
        const language = langCodes.includes(navigatorLanguage) ? navigatorLanguage : 'en'
        setLocale(language);
    }, []);

    return (
        <IntlProvider locale={locale} defaultLocale="ru" messages={messages}>
            <LanguageDropdown onChange={({value}) => setLocale(value)} locale={locale}/>
            <Component {...pageProps} />
        </IntlProvider>
    )
}

export default MyApp
