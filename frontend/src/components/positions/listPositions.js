import positionsTpl from '../../templates/positions.art'
import positionsAddTpl from '../../templates/positions-add.art'
import positionsListTpl from '../../templates/positions-list.art'

import pagination from '../../helper/pagination'
import page from '../../helper/page'

import { auth } from '../../services/auth'
import { positionsList, positionsAdd } from '../../services/positions'

const pageSize = page.pageSize

let sourcePositions = []

const listPositions = (router) => {
  return async (req, res, next) => {
    let result = await auth()
    if (result.result) {
      next()
      res.render(positionsTpl({}))

      // fetch users data
      _getPositions()

      // 
      _subscribe()

      // add position
      $('#positions-list-box').after(positionsAddTpl())
      $('#positions-save').off('click').on('click', async() => {
        const formBody = $('#positions-form').serialize()
         await positionsAdd(formBody)
        $('#positions-close').click()
      })

    } else {
      router.go('/login')
    }
  }
}

// PubSub
const _subscribe = () => {
  $('body').off('changeCurrentPage').on('changeCurrentPage', (e, index) => {
    _list(index);
    // console.log(page.currentPage);
  })
  $('body').off('addPosition').on('addPosition', (e) => {
    _getPositions()
  })
}

// fetch users data
const _getPositions = async () => {
  const list = await positionsList()

  sourcePositions = list
  // pagination once only with each data fetching
  pagination(sourcePositions)
  // data rendering when login and new registered user
  _list(page.currentPage)
}

// calculate pages num with each operation
const _list = (pageNum) => {
  let start = (pageNum - 1) * pageSize
  // render positions list
  $('#positions-list').html(positionsListTpl({
    data: sourcePositions.slice(start, start + pageSize)
  }))
}

export default listPositions