import type {NextPage} from 'next'

import AttackForm from '../components/AttackForm';
import {FormattedMessage} from "react-intl";

const Home: NextPage = () => {
    return (
        <div className="container">
            <div className="content">
                <h1 className="title">
                    <FormattedMessage id="title"/>
                </h1>
                <div className="details">
                    <p>
                        <FormattedMessage id="p1"/>
                    </p>

                    <p>
                        <FormattedMessage id="p2"/>
                    </p>

                    <p>
                        <FormattedMessage id="p3"/>
                    </p>

                    <p>
                        <FormattedMessage id="p4"/><></>
                    </p>
                </div>

                <AttackForm/>

                <div className="social">
                    <a href="https://twitter.com/artemtam" target="_blank" rel="noopener noreferrer">@artemtam</a>
                    <a href="https://twitter.com/alexlitreev" target="_blank" rel="noopener noreferrer">@alexlitreev</a>
                </div>
            </div>
        </div>
    )
}

export default Home
