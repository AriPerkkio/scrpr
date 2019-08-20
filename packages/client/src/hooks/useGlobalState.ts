import { useReducer, useEffect } from 'react';

interface SubsriberOptions {
    shouldUpdate?: (previousState: {}, state: {}) => boolean;
}

interface Subscriber extends SubsriberOptions {
    render: React.Dispatch<void>;
}

type SetGlobalState = (value: {}) => void;
type UseGlobalStateOutput = [{}, SetGlobalState];
type UseGlobalStateType = (options?: SubsriberOptions) => UseGlobalStateOutput;

const createGlobalState = (): UseGlobalStateType => {
    let state = {};
    const subscribers: Subscriber[] = [];

    const setState: SetGlobalState = value => {
        const previousState = { ...state };
        state = { ...state, ...value };

        subscribers.forEach(updateSubscriber(previousState, state));
    };

    const useGlobalState: UseGlobalStateType = options => {
        const [, render] = useReducer(s => !s, true);

        useEffect(() => {
            const { shouldUpdate }: SubsriberOptions = options || {};
            const subscriber = { render, shouldUpdate };

            subscribers.push(subscriber);

            return () => {
                subscribers.splice(subscribers.indexOf(subscriber), 1);
            };
        });

        return [state, setState];
    };

    return useGlobalState;
};

const defaultCompare = (): boolean => true;
const updateSubscriber = (
    previousState: {},
    state: {}
): ((subscriber: Subscriber) => void) => subsriber => {
    const { render, shouldUpdate }: Subscriber = subsriber || {};

    if ((shouldUpdate || defaultCompare)(previousState, state)) {
        render();
    }
};

const useGlobalState = createGlobalState();

export default useGlobalState;
