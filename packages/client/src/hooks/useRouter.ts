import { useContext } from 'react';
import { __RouterContext, RouteComponentProps } from 'react-router';

const useRouter = (): RouteComponentProps => {
    const context = useContext(__RouterContext);

    return context;
};

export default useRouter;
