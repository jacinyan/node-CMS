import positionsTpl from '../../templates/positions.art'
import positionsListTpl from '../../templates/positions-list.art'

import pagination from '../../helper/pagination'
import page from '../../helper/page'

import { auth } from '../../services/auth'
import { positionsList } from '../../services/positions'

import { addPosition } from './addPosition'
import { updatePosition, fillPositionsUpdateTpl } from './updatePosition'

import { remove } from '../../helper/remove'


const pageSize = page.pageSize

let state = {
  source: []
}

const listPositions = (router) => {
  return async (req, res, next) => {
    let result = await auth()
    if (result.result) {
      next()
      res.render(positionsTpl({}))

      // fetch users data
      _loadData()

      // 
      _subscribe()

      // 
      addPosition()

      remove({
        $box: $('#positions-list'),
        state,
        url: '/api/positions/remove',
        loadData: _loadData
      })

      updatePosition()

      $('#positions-list ').off('click','.positions-update' ).on('click', '.positions-update', function() {
        // update position
        fillPositionsUpdateTpl($(this).data('id'))
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
    _loadData()
  })
}

// fetch positions data
const _loadData = async () => {
  const list = await positionsList()

  state.source = list
  // pagination once only with each data fetching
  pagination(list)
  // data rendering when login and new registered user
  _list(page.currentPage)
}

// calculate pages index with each operation
const _list = (pageNum) => {
  let start = (pageNum - 1) * pageSize
  // render positions list
  $('#positions-list').html(positionsListTpl({
    data: state.source.slice(start, start + pageSize)
  }))
}

export default listPositions