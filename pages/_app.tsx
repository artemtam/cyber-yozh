import type {AppProps} from 'next/app'
import {IntlProvider} from "react-intl";

import messagesRU from '../locales/ru.json'
import messagesEN from '../locales/en.json'
import messagesUA from '../locales/uk.json'

import "./style.css"
import React, {useEffect, useMemo, useState} from "react";
import LanguageDropdown from "../components/LanguageDropdown";


const LANGUAGES: Record<string, {[x: string]: string;}> = {
    uk: messagesUA,
    ru: messagesRU,
    en: messagesEN,
};

function MyApp({Component, pageProps}: AppProps) {
    const [locale, setLocale] = useState('ru');
    const messages = useMemo(() => LANGUAGES[locale] || LANGUAGES.en,  [locale]);

    useEffect(() => {
        const navigatorLanguage = navigator.language.slice(0, 2)
        const detectedLocale = Object.keys(LANGUAGES).includes(navigatorLanguage) ? navigatorLanguage : 'en'
        setLocale(detectedLocale);
    }, []);

    return (
        <IntlProvider locale={locale} defaultLocale="ru" messages={messages}>
            <LanguageDropdown onChange={({value}) => setLocale(value)} locale={locale}/>
            <Component {...pageProps} />
        </IntlProvider>
    )
}

export default MyApp
