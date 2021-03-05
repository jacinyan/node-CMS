export const usersRemove = (id) => {
    return $.ajax({
        url: '/api/users',
        type: 'delete',
        headers: {
            'X-Access-Token': localStorage.getItem('crm-token') || ''
        },
        data: {
            // get dom named 'data-id', and then its value from backend 
            id
        },
        success(result) {
            return result
        }
    })
}