import http from '../utils/http'

export const usersRemove = async (id) => {
    try {
        let {result} = await http({
            url: '/api/users',
            type: 'delete',
            data: {id}
        })
        return result
    } catch (error) {
        console.log(error);
    }
}

