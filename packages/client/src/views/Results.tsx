import React, { useEffect } from 'react';

import Api from 'api';
import { useGlobalState } from 'hooks';

const Results: React.FC = () => {
    const [state, setGlobalState] = useGlobalState();

    useEffect(() => {
        Api.getHelloWorld()
            .then(result => setGlobalState({ result }))
            .catch(error => setGlobalState({ error }));
    }, [setGlobalState]);

    return (
        <>
            <div>Results view</div>
            <pre>{JSON.stringify(state, null, 4)}</pre>
        </>
    );
};

export default Results;
