import { Alert, Card } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayOfYearfrom from 'dayjs/plugin/dayOfYear';
import duration from 'dayjs/plugin/duration';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import React, { useCallback, useEffect, useState } from 'react'

import { getDurationFeedback } from '../../helpers/getDurationFeedback';
import { sumPastDaysByMonths } from '../../helpers/sumPastDaysByMonths';
import { useCurrentDate } from '../../hooks/useCurrentDate/useCurrentDate'
import { DateInput } from '../DateInput/DateInput'

import './CheckedDateInput.css';

dayjs.extend(customParseFormat);
dayjs.extend(dayOfYearfrom);
dayjs.extend(weekOfYear);
dayjs.extend(duration);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
    weekStart: 1
})

export const CheckedDateInput = () => {
    const [currentDayjsDate, { year }] = useCurrentDate();
    const [date, setDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [betweenDiff, setBetweenDiff] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const inputDayjsDate = dayjs(date, 'DD.MM.YYYY');
    const diff = dayjs.duration(inputDayjsDate.diff(currentDayjsDate));

    const getBetweenDiff = useCallback(() => {
        const months = diff.months();
        const prevDays = sumPastDaysByMonths(inputDayjsDate, months);
        const days = diff.days() + prevDays;
        
        const years = diff.years();
        const hours = diff.hours();
        const minutes = diff.minutes();
        const seconds = diff.seconds();
    
        const formattedDuration = getDurationFeedback(years, days, hours, minutes, seconds)
        setBetweenDiff(formattedDuration);
        setIsLoading(false);
    }, [diff, inputDayjsDate])

    useEffect(() => {
        let intervalId;

        if (!isSuccess || diff <= 0) {
            clearTimeout(intervalId);
            return;
        };

        intervalId = setInterval(getBetweenDiff, 1000);

        return () => {
            clearTimeout(intervalId);
        }

    }, [diff, getBetweenDiff, isSuccess])

    const onSuccess = useCallback((date) => {
        if (date.isBefore(currentDayjsDate)) {
            setError('Введенная дата уже наступила');
            return;
        }

        if (date.year() - year > 10) {
            setError(`Необходимо, чтобы дата была не позже ${year + 10} года`);
            return;
        }

        setError('');
        setIsSuccess(true);
        setIsLoading(true);
    }, [currentDayjsDate, year])

    return (
        <>
            <DateInput 
                onSuccess={onSuccess} 
                setIsSuccess={setIsSuccess}
                date={date}
                error={error}
                onChangeDate={setDate}
                onChangeError={setError}
            />
            <div className='info-wrap'>
                {
                    error && (
                        <Alert 
                            message={error}
                            type="error"
                            showIcon 
                            className="input-alert"
                        />
                    )
                }
                {
                    isSuccess && (
                        <Card 
                            title="Информация о введенной дате" 
                            loading={isLoading}
                            className="content-info-wrap"
                        >
                            <div className='content-info-list'>
                                <div className='content-list-item'>
                                    <p>Номер дня в году:</p>
                                    <p className='list-item-value'>
                                        {inputDayjsDate.dayOfYear()}
                                    </p>
                                </div>
                                <div className='content-list-item'>
                                    <p>Номер недели в году:</p>
                                    <p className='list-item-value'>
                                        {inputDayjsDate.week()}
                                    </p>
                                </div>
                                <div className='content-list-item'>
                                    <p>Расстояние до текущего дня:</p>
                                    <p className='list-item-value'>
                                        {betweenDiff}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    )
                }
            </div>
        </>
    )
}
