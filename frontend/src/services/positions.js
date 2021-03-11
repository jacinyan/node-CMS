import http from '../utils/http'

export const positionsAdd = () => {
    return new Promise((resolve, reject) => {
        var options = {
            url: "/api/positions/add", //default: form action; replaced by explicit statement
            type: "post",   //default: get or post; replaced by explicit statement
            // beforeSubmit: beforeCheck, //callback before form submission
            success: (result) => {
                resolve(result)
            },  //callback after successful submission
            error: (error) => {
                reject(error)
            },
            // target: "#output",  //stuff response from server into element with certain id
            dataType: "json", //acceptContent type: html(default), xml, script, json...
            // clearForm: true,  
            resetForm: true,
            timeout: 10000
        };

        $('#positions-form').ajaxSubmit(options)
    })
}

export const positionsList = async () => {
    try {
        let { result } = await http({
            url: '/api/positions/list',
        })
        return result
    } catch (error) {
        console.log(error);
    }
}

export const positionsUpdate = () => {
    return new Promise((resolve, reject) => {
        var options = {
            url: "/api/positions/update", //default: form action; replaced by explicit statement
            type: "patch",   //default: get or post; replaced by explicit statement
            // beforeSubmit: beforeCheck, //callback before form submission
            success: (result) => {
                resolve(result)
            },  //callback after successful submission
            error: (error) => {
                reject(error)
            },
            // target: "#output",  //stuff response from server into element with certain id
            dataType: "json", //acceptContent type: html(default), xml, script, json...
            // clearForm: true,  
            resetForm: true,
            timeout: 10000
        };

        $('#positions-form-update').ajaxSubmit(options)
    })
}