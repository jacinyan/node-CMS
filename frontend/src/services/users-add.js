import http from '../utils/http'

export const usersAdd = async (data) => {
    try {
        let {result} = await http({
            url: '/api/users',
            type: 'POST',
            data,
        })
        return result
    } catch (error) {
        console.log(error);
    }
}  