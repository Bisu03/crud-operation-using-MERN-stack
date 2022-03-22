import React, { createContext, useState } from 'react'

export const adddata = createContext("");

const ContextProvider = ({ children }) => {

    const [udata, setUdata] = useState("");
    const [updata, setUPdata] = useState("");
    const [dltdata, setDLTdata] = useState("");
    const [itemtdata, setitemdata] = useState("");


    return (
        <adddata.Provider value={{ udata, setUdata, updata, setUPdata, dltdata, setDLTdata,itemtdata, setitemdata }}>
            {children}
        </adddata.Provider>
    )
}

export default ContextProvider;