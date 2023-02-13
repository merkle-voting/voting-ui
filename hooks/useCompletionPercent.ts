import { useEffect, useState } from 'react';

const useCompletionPercent = (startDate: number, endDate: number) => {
    const duration = endDate - startDate;

    const timeElapsed = new Date().getTime() - startDate;

    const [percent, setPercent] = useState(Math.min((timeElapsed / duration) * 100, 100));

    useEffect(() => {
        const interval = setInterval(() => {
            setPercent(Math.min((timeElapsed / duration) * 100, 100));
        }, 1000);

        return () => clearInterval(interval);
    }, [duration, timeElapsed]);

    return percent;
};

export { useCompletionPercent };
