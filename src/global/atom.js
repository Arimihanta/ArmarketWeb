import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

export const openDialogNouveauArticle = atom({
    key: 'dialogNouveauArticleOpen',
    default: false,
});
export const openDialogModifierArticle = atom({
    key: 'dialogModifierArticleOpen',
    default: false,
});
export const listeArticles = atom({
    key: 'liste_articles',
    default: [],
});
export const listeVentesEnCours = atom({
    key: 'liste_ventes_en_cours',
    default: [],
});
export const listeCategoriesArticles = atom({
    key: 'liste_categories_articles',
    default:{},
})
export const listeSousCategoriesArticles = atom({
    key: 'liste_sous_categories_articles',
    default:{},
})
export const listeUnitesArticles = atom({
    key: 'liste_unites_articles',
    default:{},
})
export const propsArticle = atom({
    key: 'props_article',
    default:{},
})