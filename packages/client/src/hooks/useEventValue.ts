import { useState, ChangeEvent, useCallback } from 'react';

type onChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export const RESET_EVENT = { target: { value: '' } } as onChangeEvent;

const useEventValue = (
    initialValue = ''
): [string, (event: onChangeEvent) => void] => {
    const [value, setValue] = useState(initialValue);

    const onChange = useCallback((event: onChangeEvent) => {
        const target = event.target as HTMLTextAreaElement;
        const { value } = target || {};

        setValue(value);
    }, []);

    return [value, onChange];
};

export default useEventValue;
