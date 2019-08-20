import React, { useEffect } from 'react';

import { useGlobalState } from 'hooks';

const Results: React.FC = () => {
    const [state, setGlobalState] = useGlobalState();

    useEffect(() => {
        setGlobalState({ results: 'set results to global state' });
    });

    return (
        <>
            <div>Results view</div>
            <pre>{JSON.stringify(state, null, 4)}</pre>
        </>
    );
};

export default Results;
