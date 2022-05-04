import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image
} from "@react-pdf/renderer";

import logo_shop_mihaja from './img/logo_shop_mihaja.png'
const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff",
        padding: 10
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    rowContainer: {
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "row",
        padding: 5
    },
    priceContainer: {
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "row",
        margin: 2,
        padding:5,
        width:270
    },
    priceTitle: {
        fontSize:11,
        marginTop: 4
    },
    priceValue: {
        fontSize:30,
        marginTop: 10
    },

    image: {
        width: 90,
        height: 63
    },
    
});

export const PDFDocPrice=(props)=>{
    console.log("pdf props", props.data);
    return (
        <Document>
            <Page style={styles.page}>
                {props.data
                    ? props.data.map((a, index) => {
                            return (
                                <View key={index} style={styles.rowContainer}>
                                    <View style={styles.priceContainer}>
                                        <Image
                                            style={styles.image}
                                            source={logo_shop_mihaja}
                                        />
                                        <View style={styles.priceDetails}>
                                            <Text style={styles.priceTitle}>{a.designation}</Text>
                                            <Text style={styles.priceValue}>{a.prix_vente_unitaire}{' '}Ar</Text>
                                        </View>
                                    </View>
                                    <View style={styles.priceContainer}>
                                        <Image
                                            style={styles.image}
                                            source={logo_shop_mihaja}
                                        />
                                        <View style={styles.priceDetails}>
                                            <Text style={styles.priceTitle}>{a.designation}</Text>
                                            <Text style={styles.priceValue}>{a.prix_vente_unitaire}{' '}Ar</Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        })
                : ""}
            </Page>
        </Document>
    );
}