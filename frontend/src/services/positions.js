import http from '../utils/http'

export const positionsAdd = async (data) => {
    try {
        let {result} = await http({
            url: '/api/positions/add',
            type: 'POST',
            data,
        })
        return result
    } catch (error) {
        console.log(error);
    }
}  

export const positionsList = async () => {
    try {
        let {result} = await http({
            url: '/api/positions/list',
        })
        return result
    } catch (error) {
        console.log(error);
    }
}