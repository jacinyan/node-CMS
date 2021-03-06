import positionsTpl from '../../templates/positions.art'
import positionsAddTpl from '../../templates/positions-add.art'
import positionsListTpl from '../../templates/positions-list.art'

import pagination from '../../helper/pagination'

import { auth } from '../../services/auth'

const listPositions = (router) => {
  return async (req, res, next) => {
    let result = await auth()
    if (result.result) {
      next()
      res.render(positionsTpl({}))

      // render positions list
      $('#positions-list').html(positionsListTpl({
        data:['a','b','c']
      }))

      pagination(['a', 'b', 'c'], 3)
      
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