import { useEffect, useState } from 'react';

import { SERVER_ROOT_URL } from '../constants/url';
import { IPoll } from '../types';

export const usePolls = (id: number | string | string | string[] | undefined) => {
    const [polls, setPolls] = useState<IPoll[]>([]);

    useEffect(() => {
        if (!id) return setPolls([]);

        try {
            fetch(`${SERVER_ROOT_URL}/poll/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    if (!data.success) return setPolls([]);
                    setPolls(data.poll);
                })
                .catch((err) => {
                    console.error(err);
                });
        } catch (error) {
            console.error('error getting polls: ', error);
        }
    }, [id]);

    return polls;
};
