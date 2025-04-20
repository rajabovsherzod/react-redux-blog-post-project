import axios from "./api"
const ArticleService = {
    async getArticle(){
        const {data} = await axios.get('/articles')
        return data
    }
}

export default ArticleService