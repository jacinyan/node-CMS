export const routeGuard = () => {
   return $.ajax({
        url: '/api/users/isAuth',
        dataType: 'json',
        headers:{
            'X-Access-Token': localStorage.getItem('crm-token') || ''
        },
        success(result) {
           return result
        }
    })
}

