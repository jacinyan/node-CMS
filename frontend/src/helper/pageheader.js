import indexPageHeaderTpl from '../templates/index-pageheader.art'

const pageHeader = () => {
    const nav = {
        '#/index/users':{
            mainNav: 'User Management',
            subNav: 'users list'
        },
        '#/index/positions':{
            mainNav: 'Position Management',
            subNav: 'positions list'
        }
    }

    const hash = location.hash

    const html = indexPageHeaderTpl({
        mainNav: nav[hash]['mainNav'],
        subNav: nav[hash]['subNav']
    })
    $('#content').before(html)
}

export default pageHeader