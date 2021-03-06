import http from '../utils/http'

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






