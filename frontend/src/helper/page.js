class Page {
    constructor() {
        this.currentPage = 1
        this.pageSize = 10
    }

    setCurrentPage(currentPage) {
        this.currentPage = currentPage
    }
}

export default new Page()