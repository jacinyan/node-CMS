import http from '../utils/http'

export const login = async (data) => {
    try {
        let { result, jqXHR } = await http({
            url: '/api/users/login',
            data,
            type: 'post'
        })
        return {
            result,
            jqXHR
        }
    } catch (error) {
        console.log(error);
    }
}

