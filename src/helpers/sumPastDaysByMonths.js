import dayjs from 'dayjs';

export const sumPastDaysByMonths = (dayjsDate, monthsCount) => (
    new Array(monthsCount)
        .fill(0)
        .reduce(
            (sum, item, index) => {
                const date = dayjs(`${dayjsDate.year()}-${index}-01`);
                const daysCount = date.daysInMonth();

                return sum + daysCount;
            }, 0
        )
)