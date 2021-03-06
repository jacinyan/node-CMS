import positionsTpl from '../../templates/positions.art'
import positionsAddTpl from '../../templates/positions-add.art'
import positionsListTpl from '../../templates/positions-list.art'

import pagination from '../../helper/pagination'
import page from '../../helper/page'


import { auth } from '../../services/auth'
import { positionsList } from '../../services/positions-list'

const pageSize = page.pageSize

const listPositions = (router) => {
  return async (req, res, next) => {
    let result = await auth()
    if (result.result) {
      next()
      res.render(positionsTpl({}))

      const list = await positionsList()
      console.log(list);

        // render positions list
        $('#positions-list').html(positionsListTpl({
          data: list
        }))

      pagination(list, pageSize)

      // add position
      $('#positions-list-box').after(positionsAddTpl())
      $('#positions-save').off('click').on('click', () => {
        const formBody = $('#positions-form').serialize()
        console.log(formBody);

        $('#positions-close').click()
      })
      
    } else {
      router.go('/login')
    }
  }
}

export default listPositions