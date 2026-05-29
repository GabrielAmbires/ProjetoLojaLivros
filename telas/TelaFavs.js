import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

const favoritos = [
    {
        id: '1',
        titulo: 'Powerless',
        preco: '40,00',
        imagem: require('./imagenslivros/2.png'),
    },
    {
        id: '2',
        titulo: 'Eu beijei...',
        preco: '30,00',
        imagem: require('./imagenslivros/3.png'),
    },
    {
        id: '3',
        titulo: 'Eu beijei...',
        preco: '30,00',
        imagem: require('./imagenslivros/3.png'),
    },
    {
        id: '4',
        titulo: 'Eu beijei...',
        preco: '30,00',
        imagem: require('./imagenslivros/3.png'),
    },
];

export default function TelaFavs() {
    const renderItem = ({ item }) => (
        <View style={estilos.card}>
            <Image source={item.imagem} style={estilos.cardImage} />
            <View style={estilos.cardBody}>
                <Text style={estilos.cardTitle}>{item.titulo}</Text>
                <Text style={estilos.cardPrice}>R$ {item.preco}</Text>
                <View style={estilos.cardActions}>
                    <TouchableOpacity style={[estilos.iconButton, estilos.cardActionsIcon]}>
                        <MaterialCommunityIcons name="cart-outline" size={20} color="#4A5938" />
                    </TouchableOpacity>
                    <TouchableOpacity style={estilos.iconButton}>
                        <AntDesign name="hearto" size={20} color="#B45D5D" />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={estilos.buyButton}>
                <Text style={estilos.buyText}>Comprar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={estilos.container}>
            <View style={estilos.header}>
                <View style={estilos.headerContent}>
                    <Text style={estilos.title}>Favoritos</Text>
                    <Text style={estilos.subtitle}>Olá, Nome do usuário</Text>
                </View>
                <View style={estilos.decorationTop} />
                <View style={estilos.decorationBottom} />
            </View>

            <FlatList
                data={favoritos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={estilos.listContent}
                numColumns={2}
                columnWrapperStyle={estilos.columnWrapper}
                showsVerticalScrollIndicator={false}
            />

            <View style={estilos.tabBar}>
                <TouchableOpacity style={estilos.tabButton}>
                    <Ionicons name="home-outline" size={24} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity style={estilos.tabButton}>
                    <Ionicons name="cart-outline" size={24} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity style={estilos.tabButton}>
                    <MaterialCommunityIcons name="shield-outline" size={24} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity style={[estilos.tabButton, estilos.tabButtonActive]}>
                    <Ionicons name="heart" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4EDD7',
    },
    header: {
        backgroundColor: '#E3DAB4',
        paddingBottom: 20,
        paddingTop: 32,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        overflow: 'hidden',
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#37513E',
    },
    subtitle: {
        marginTop: 5,
        color: '#5C6C44',
        fontSize: 13,
    },
    decorationTop: {
        position: 'absolute',
        right: -35,
        top: -35,
        width: 100,
        height: 100,
        backgroundColor: '#37513E',
        borderRadius: 100,
        opacity: 0.22,
    },
    decorationBottom: {
        position: 'absolute',
        left: -50,
        top: 25,
        width: 130,
        height: 130,
        backgroundColor: '#8EA57A',
        borderRadius: 100,
        opacity: 0.24,
    },
    listContent: {
        paddingHorizontal: 8,
        paddingTop: 14,
        paddingBottom: 90,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    card: {
        backgroundColor: '#FFF8E5',
        borderRadius: 18,
        padding: 12,
        flex: 1,
        marginHorizontal: 4,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },
    cardImage: {
        width: '100%',
        height: 160,
        borderRadius: 14,
        marginBottom: 10,
        resizeMode: 'cover',
    },
    cardBody: {
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#35462E',
    },
    cardPrice: {
        marginTop: 4,
        fontSize: 13,
        fontWeight: '600',
        color: '#5C6C44',
    },
    cardActions: {
        flexDirection: 'row',
        marginTop: 10,
    },
    cardActionsIcon: {
        marginRight: 8,
    },
    iconButton: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#E8E0C7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buyButton: {
        backgroundColor: '#758A5E',
        borderRadius: 14,
        paddingVertical: 9,
        alignItems: 'center',
    },
    buyText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '700',
    },
    tabBar: {
        position: 'absolute',
        left: 14,
        right: 14,
        bottom: 16,
        height: 56,
        backgroundColor: '#5B7A4C',
        borderRadius: 22,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 5 },
        elevation: 6,
    },
    tabButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabButtonActive: {
        backgroundColor: '#41623A',
        width: 44,
        height: 44,
        borderRadius: 12,
    },
});