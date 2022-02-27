import React from 'react';
import Dropdown, {Option} from 'react-dropdown';
import 'react-dropdown/style.css';

const options = [
    { value: 'en', label: 'English' },
    { value: 'uk', label: 'Українська' },
    { value: 'ru', label: 'Русский' },
];

const LanguageDropdown = ({onChange, locale}: {onChange: (option: Option) => void; locale: string}) => {
    return (
        <Dropdown
            options={options}
            onChange={onChange}
            value={options.find(({value}) => value === locale)}
            placeholder="Select language"
        />
    )
}

export default LanguageDropdown
