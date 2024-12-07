import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {copyToClipboard} from "tsutilbox/dist/helpers/dom";

function OwnIpInfoWidget() {
    const [ipv4Loading, setIpv4Loading] = useState(true)
    const [ipv6Loading, setIpv6Loading] = useState(true)
    const [ipv4, setIpv4] = useState<string | null>(null)
    const [ipv6, setIpv6] = useState<string | null>(null)

    useEffect(() => {
        const fetchIpv4 = async () => {
            try {
                const response = await fetch("https://ipv4.devtoys.biz/api/ip");
                if (response.status === 200) {
                    const data = await response.json();
                    setIpv4(data.ip || "Not available");
                } else {
                    setIpv4("Not available");
                }
            } catch (e) {
                console.log(e)
                setIpv4("Not available");
            } finally {
                setIpv4Loading(false);
            }
        };

        const fetchIpv6 = async () => {
            try {
                const response = await fetch("https://ipv6.devtoys.biz/api/ip");
                if (response.status === 200) {
                    const data = await response.json();
                    setIpv6(data.ip || "Not available");
                } else {
                    setIpv6("Not available");
                }
            } catch (e) {
                console.log(e)
                setIpv6("Not available");
            } finally {
                setIpv6Loading(false);
            }
        };

        fetchIpv4();
        fetchIpv6();
    }, []); // Leere Abhängigkeitsliste sorgt dafür, dass useEffect nur einmal ausgeführt wird.




    return (
        <div>
            <span>
                <strong className="me-2">Your IPv4:</strong>
                {ipv4Loading && (
                    <FontAwesomeIcon icon={faSpinner} className="h-4" spin/>
                )}
                {!ipv4Loading && (
                    <span onChange={() => copyToClipboard(ipv4!)}>{ipv4}</span>
                )}
            </span>
            <br/>
            <span>
                <strong className="me-2">Your IPv6:</strong>
                {ipv6Loading && (
                    <FontAwesomeIcon icon={faSpinner} className="h-4" spin/>
                )}
                {!ipv6Loading && (
                    <span onChange={() => copyToClipboard(ipv6!)}>{ipv6}</span>
                )}
            </span>
        </div>
    );
}

export default OwnIpInfoWidget;