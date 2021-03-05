import usersAddTpl from '../../views/users-add.art'
import page from "../../helper/page";

export const addUser = () => {
    // new modal popup on click(clear filled content)
    const html = usersAddTpl()
    $('#users-list-box').after(html)

    // collect form data
    const _save = () => {
        console.log('_save');
        const data = $('#users-form').serialize()
        $.ajax({
            url: '/api/users',
            type: 'POST',
            headers: {
                'X-Access-Token': localStorage.getItem('crm-token') || ''
            },
            data,
            success: (result) => {
                console.log(result);

                // render first page with newly added user
                page.setCurrentPage(1)

                // publish for _list to re-render
                $('body').trigger('addUser')
            }
        })
        // trigger close event
        const $btn_close = $('#users-close')
        $btn_close.click()
    }

    // _register callback onclick with popup modal
    $('#users-save').on('click', _save)

}

