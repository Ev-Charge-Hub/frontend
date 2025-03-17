"use client";
import React, { useEffect, useState } from "react";
function ConnectorDetail({ connector }) {

    const [connectorImg, setConnectorImg] = useState('');
    useEffect(() => {
        if (connector.plug_name === 'Type 1') {
            setConnectorImg("ac_type_1.png")
        } else if (connector.plug_name === 'Type 2') {
            setConnectorImg("ac_type_1.png")
        } else if (connector.plug_name === 'CHAdeMO') {
            setConnectorImg("dc_CHAdeMo.png")
        } else if (connector.plug_name === 'CCS1') {
            setConnectorImg("dc_ccs_1.png")
        } else if (connector.plug_name === 'CCS2') {
            setConnectorImg("dc_ccs_2.png")
        }
    }, [connector.plug_name])

    return (
        <div className="grid grid-cols-2 text-center border-2 border-custom-gray rounded-lg my-2 relative">
            <div className="my-4">
                <img className="w-11 mx-auto my-1" src={`/connector_types/${connectorImg}`} />
                <div className="font-semibold">{`${connector.plug_name} (${connector.type})`}</div>
                <div>{`${connector?.power_output} kW`}</div>
            </div>
            {connector.is_available && (
                <div className="content-center">
                    <div className={`content-center text-custom-green`}>
                        Available
                    </div>
                </div>
            )}
            {connector.is_available === false && (<div className={`content-center text-gray-500`}>
                Unavailable
                <div>{connector.is_available ? "" : "20 mins remaining"}</div>
            </div>)}
        </div>
    );
}

export default ConnectorDetail;
