export const auth = () => {
    return $.ajax({
        url: '/api/users/isAuth',
        dataType: 'json',
        headers: {
            'X-Access-Token': localStorage.getItem('crm-token') || ''
        },
        success(result) {
            console.log(result);
            return result
        }
    })
}

