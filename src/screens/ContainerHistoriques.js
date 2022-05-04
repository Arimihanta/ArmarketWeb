import { Route, 
    Switch
} from "react-router-dom"
import {HistoriquesHeaderPage} from './HistoriquesHeaderPage'
import {ListeAchatsPage} from "./ListeAchatsPage"
import {ListeVentesPage} from './ListeVentesPage'
import {VenteParJourPage} from './VenteParJourPage'

export const ContainerHistoriques = () => {
    return (
        <div>
            <HistoriquesHeaderPage/>
            <Switch>
                <Route path='/historiques' exact component={() => <ListeAchatsPage />}></Route>
                <Route path='/historiques/ventes' exact component={() => <ListeVentesPage />}></Route>
                <Route path='/historiques/ventes-par-jour' exact component={() => <VenteParJourPage />}></Route>
            </Switch>
        </div>
    )
}
