import positionsAddTpl from '../../templates/positions-add.art'
import page from "../../helper/page";

import { positionsAdd } from '../../services/positions'

export const addPosition = () => {
    $('#positions-list-box').after(positionsAddTpl())

    // collect form data
    const _save = async () => {
        try {
            let result = await positionsAdd()
            if (result.result) {
                // render first page with newly added user
                page.setCurrentPage(1)
                // publish for _list to re-render
                $('body').trigger('addPosition')
            }

            // trigger close event
            $('#positions-close').click()
        } catch (error) {
            console.log(error);
        }
    }

    // _register callback onclick with popup modal
    $('#positions-save').off('click').on('click', _save)

}





