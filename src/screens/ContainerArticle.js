import { Route, 
    Switch
} from "react-router-dom"
import {ArticleHeaderPage} from './ArticleHeaderPage'
import {StocksPage} from './StocksPage'
import {ListeArticlesPage} from "./ListeArticlesPage"
import {QRCodeArticlePage} from './QRCodeArticlePage'

export const ContainerArticle = () => {
    return (
        <div>
            <ArticleHeaderPage/>
            <Switch>
                <Route path='/articles' exact component={() => <ListeArticlesPage />}></Route>
                <Route path='/articles/stocks' exact component={() => <StocksPage />}></Route>
                <Route path='/articles/qrcode' exact component={() => <QRCodeArticlePage />}></Route>
            </Switch>
        </div>
    )
}
