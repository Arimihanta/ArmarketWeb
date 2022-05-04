import {
    atom
} from 'recoil';

export const openDialogNouveauArticle = atom({
    key: 'dialogNouveauArticleOpen',
    default: false,
});
export const openDialogModifierArticle = atom({
    key: 'dialogModifierArticleOpen',
    default: false,
});
export const openDialogSupprimerArticle = atom({
    key: 'dialogSupprimerArticleOpen',
    default: false,
});

export const openMessageBox = atom({
    key: 'dialogMessageBoxOpen',
    default: false,
});

export const openModalLogin = atom({
    key: 'modalLoginOpen',
    default: false,
});
export const openModalSignin = atom({
    key: 'modalSigninOpen',
    default: false,
});
export const openModalLogout = atom({
    key: 'modalLogoutOpen',
    default: false,
});

export const openModalAbout = atom({
    key: 'dialogAboutOpen',
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