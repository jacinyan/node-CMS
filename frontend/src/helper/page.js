class Page {
    constructor() {
        this.currentPage = 1
        this.pageSize = 3,
        this.currentRoute = '#/index'
    }

    reset(){
        this.currentPage = 1
        this.pageSize = 3
    }

    setCurrentRoute(route){
        this.currentRoute = route
    }

    setCurrentPage(currentPage) {
        this.currentPage = currentPage
    }
}

export default new Page()