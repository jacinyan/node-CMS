import positionsUpdateTpl from '../../templates/positions-update.art'
import page from "../../helper/page";

import { positionsUpdate } from '../../services/positions'

export const updatePosition = () => {
    $('#positions-list-box').after(positionsUpdateTpl())

    // collect form data
    const _save = async () => {
        try {
            // let result = await positionsAdd()
            // if (result.result) {
            //     // render first page with newly added user
            //     page.setCurrentPage(1)
            //     // publish for _list to re-render
            //     $('body').trigger('addPosition')
            // }

            // trigger close event
            $('#positions-close').click()
        } catch (error) {
            console.log(error);
        }
    }

    // _register callback onclick with popup modal
    $('#positions-save-update').off('click').on('click', _save)

}





