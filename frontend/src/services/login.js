export const login = (data) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/api/users/login',
            type: 'POST',
            dataType: 'json',
            data,
            success: (result, textStatus, jqXHR) => {
                resolve({
                    result,
                    jqXHR
                })
            }
        })
    })
}