export const usersAdd = (data) => {
    return $.ajax({
        url: '/api/users',
        type: 'POST',
        headers: {
            'X-Access-Token': localStorage.getItem('crm-token') || ''
        },
        data,
        success: (result) => {
            return result
        }
    })
}