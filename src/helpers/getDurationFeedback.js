const yearEnding = ['год', 'года', 'лет'];
const dayEnding = ['день', 'дня', 'дней'];
const hoursEnding = ['час', 'часа', 'часов'];
const minutesEnding = ['минута', 'минуты', 'минут'];
const secondsEnding = ['секунда', 'секунды', 'секунд'];

const getDurationTextByValue = (value, variants) => {
    const num = Math.abs(value);

    if (num % 10 === 1 && num % 100 !== 11) {
        return `${num} ${variants[0]}`;
    } 
    
    if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {
        return `${num} ${variants[1]}`;
    } 

    return `${num} ${variants[2]}`;
    
}

export const getDurationFeedback = (years, days, hours, minutes, seconds) => {
    const yearsText =  getDurationTextByValue(years, yearEnding)
    const daysText =  getDurationTextByValue(days, dayEnding)
    const hoursText =  getDurationTextByValue(hours, hoursEnding)
    const minutesText =  getDurationTextByValue(minutes, minutesEnding)
    const secondsText =  getDurationTextByValue(seconds, secondsEnding)

    return `${yearsText} ${daysText} ${hoursText} ${minutesText} ${secondsText}`
}