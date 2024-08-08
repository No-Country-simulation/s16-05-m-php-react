import React, { createContext, useState, useEffect } from 'react';
import { getTables } from '@/axios/fetch';

const TablesContext = createContext();

const TablesProvider = ({ children }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const tables = async () => {
            try {
                const response = await getTables();
                setData(response);
            } catch (error) {
                console.error('Error al obtener los datos de la Base de Datos:', error);
            }
        }
        tables();
    }, []);

    return (
        <TablesContext.Provider value={data}>
        {children}
        </TablesContext.Provider>
    );
};

export { TablesContext, TablesProvider };
