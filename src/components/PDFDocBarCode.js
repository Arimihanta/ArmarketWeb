import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image
} from "@react-pdf/renderer";
const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff",
        padding: 5
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
    barcodeContainer: {
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        margin: 2,
        padding:5
    },
    barcodeTitle: {
        fontSize:9,
        marginTop: 4,
        alignSelf:"center",
    },
    barcodeValue: {
        fontSize:10,
        marginTop: -10,
        paddingLeft:20,
        paddingRight:20,
        borderRadius:7,
        alignSelf:"center",
        backgroundColor: "#ffffff",
    },

    image: {
        height: 30,
        width:180
    },
    
});

export const PDFDocBarCode=(props)=>{
    console.log("pdf props", props.data);
    return (
        <Document>
            <Page style={styles.page}>
                {props.data
                    ? props.data.map((a, index) => {
                            return (
                                <View>
                                    <View style={styles.rowContainer}>
                                        <View style={styles.barcodeContainer}>
                                            <Text style={styles.barcodeTitle}>{a.designation}</Text>
                                            <Image
                                                style={styles.image}
                                                source={"data:image/png;base64,"+a.barcode}
                                            />
                                            <Text style={styles.barcodeValue}>{a.ref_article}</Text>
                                        </View>
                                        <View style={styles.barcodeContainer}>
                                            <Text style={styles.barcodeTitle}>{a.designation}</Text>
                                            <Image
                                                style={styles.image}
                                                source={"data:image/png;base64,"+a.barcode}
                                            />
                                            <Text style={styles.barcodeValue}>{a.ref_article}</Text>
                                        </View>
                                        <View style={styles.barcodeContainer}>
                                            <Text style={styles.barcodeTitle}>{a.designation}</Text>
                                            <Image
                                                style={styles.image}
                                                source={"data:image/png;base64,"+a.barcode}
                                            />
                                            <Text style={styles.barcodeValue}>{a.ref_article}</Text>
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