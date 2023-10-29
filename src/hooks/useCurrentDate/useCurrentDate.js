import dayjs from 'dayjs';

export const useCurrentDate = () => {
    const dayjsDate = dayjs();

    const day = dayjsDate.date();
    const month = dayjsDate.month() + 1;
    const year = dayjsDate.year();

    return [dayjsDate, { year, month, day }];
};
