import React, { useEffect } from 'react';

import { useGlobalState } from 'hooks';

const Home: React.FC = () => {
    const [state, setGlobalState] = useGlobalState();

    useEffect(() => {
        setGlobalState({ home: 'set home to global state' });
    }, [setGlobalState]);

    return (
        <>
            <div>Home view</div>
            <pre>{JSON.stringify(state, null, 4)}</pre>
        </>
    );
};

export default Home;
