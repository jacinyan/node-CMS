export const usersList = () => {
    return $.ajax({
        url: '/api/users',
        headers: {
            'X-Access-Token': localStorage.getItem('crm-token') || ''
        },
        success(result) {
            return result
        }
    })
}

