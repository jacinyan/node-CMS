import usersAddTpl from '../../templates/users-add.art'
import page from "../../helper/page";

import { usersAdd } from '../../services/users-add'

export const addUser = () => {
    // new modal popup on click(clear filled content)
    const htmlAddUsers = usersAddTpl()
    $('#users-list-box').after(htmlAddUsers)

    // collect form data
    const _save = async () => {
        const data = $('#users-form').serialize()
        let result = await usersAdd(data)
        if (result.result) {
            // render first page with newly added user
            page.setCurrentPage(1)
            // publish for _list to re-render
            $('body').trigger('addUser')
        }
        // trigger close event
        const $btn_close = $('#users-close')
        $btn_close.click()
    }

    // _register callback onclick with popup modal
    $('#users-save').on('click', _save)

}

