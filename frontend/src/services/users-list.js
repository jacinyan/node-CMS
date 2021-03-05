import http from '../utils/http'

export const usersList = async () => {
    try {
        let {result} = await http({
            url: '/api/users',
        })
        return result
    } catch (error) {
        console.log(error);
    }
}






