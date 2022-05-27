const axios = require('axios');

const calculate = ({ id, operation, left, right }) => {
    if (operation === 'subtraction') {
        return { id, result: left - right }
    } else if (operation === 'addition') {
        return { id, result: left + right }
    } else if (operation === 'multiplication') {
        return { id, result: left * right }
    } else if (operation === 'division') {
        return { id, result: left / right }
    } else {
        return { id, result: left % right }
    }
}


axios.get('https://interview.adpeai.com/api/v1/get-task')
    .then(res => {
        const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
        console.log('Status Code:', res.status);
        console.log('Date in Response header:', headerDate);

        const data = res.data;
        console.log('Data in Response data: ', data);
        console.log('Result ', calculate(data).result);

        axios.post('https://interview.adpeai.com/api/v1/submit-task', calculate(data)).then((res => {
            console.log('Returned Status Code after post request : ', res.status)
            console.log('Returned data in after post request : ', res.data)
        })).catch(err => {
            console.log('Error: ', err.message);
        })
    })
    .catch(err => {
        console.log('Error: ', err.message);
    });