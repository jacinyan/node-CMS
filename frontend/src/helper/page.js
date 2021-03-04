class Page {
    constructor(){
        this.currentPage = 1
        this.pageSize = 3
    }

    setCurrentPage(currentPage){
        this.currentPage = currentPage
    }
}

export default new Page()