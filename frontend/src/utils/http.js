const http = ({
    url,
    type = 'get',
    data = {}
}) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url,
            dataType: 'json',
            type,
            data,
            headers: {
                'X-Access-Token': localStorage.getItem('crm-token') || ''
            },
            success(result, textStatus, jqXHR) {
                resolve({
                    result,
                    textStatus,
                    jqXHR
                })
            },
            error(error) {
                reject(error.message)
            }
        })
    })
}

export default http