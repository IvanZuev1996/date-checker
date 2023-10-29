import { Input } from 'antd';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react'

import './DateInput.css'

export const DateInput = (props) => {
    const { 
        onSuccess, 
        setIsSuccess, 
        date, 
        onChangeDate, 
        error, 
        onChangeError 
    } = props;

    const handleChangeDate = useCallback((e) => {
        const newValue = e.target.value;
        const direction = newValue.length > date.length;
            
        if (!/^[0-9.]*$/.test(newValue) || newValue.includes('e')) return;
        if (newValue[newValue.length - 1] === '.' && direction) return;
        if (newValue.length > 10) return;
        setIsSuccess(false);
    
        const currentDate = dayjs(newValue, 'DD.MM.YYYY', true);
        const isValidDate = currentDate.isValid();
    
        if (!isValidDate) {
            onChangeError('Введите корректную дату');
        } 
    
        if (!newValue.length) {
            onChangeError('');
        }
            
        if (isValidDate) {
            if (newValue.length === 10) {
                onChangeDate(newValue);
                onSuccess(currentDate)
            };
        }
    
        if (!direction) {
            if (date[date.length - 1] === '.') {
                onChangeDate(newValue.slice(0, newValue.length - 1));
            } else {
                onChangeDate(newValue);
            }
            return;
        }
    
        if (newValue.length === 2 || newValue.length === 5) {
            onChangeDate(`${newValue}.`);
            return;
        }
     
        onChangeDate(newValue);
    }, [date, onChangeDate, onChangeError, onSuccess, setIsSuccess]);

    return (
        <Input 
            placeholder="DD.MM.YYYY" 
            type='text' 
            value={date} 
            size='large'
            status={error && 'error'}
            onChange={handleChangeDate} 
            className="date-input-main"
        />
    )
}


DateInput.propTypes = {
    onSuccess: PropTypes.func,
    setIsSuccess: PropTypes.func,
    date:PropTypes.string,
    onChangeDate: PropTypes.func, 
    error: PropTypes.string, 
    onChangeError: PropTypes.func
};