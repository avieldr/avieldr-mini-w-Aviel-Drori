import React from 'react'
import { View, Text, StyleSheet, SectionList, TouchableOpacity, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { useTheme } from '../components/ThemeManager'




const SettingsScreen = () => {

    const { themeType, toggleSelectionMode, themeValue: { mainScreenTheme }, toggleTheme } = useTheme()

    const data = [
        {
            title: "image-section",
            data: []
        },
        {
            title: "Security",
            data: [
                {
                    title: "Keyless Backup",
                    icon: {
                        type: 'feather',
                        name: 'shield'
                    },
                    onPress: () => toggleSelectionMode()
                }
            ]
        },
        {
            title: "Settings",
            data: [
                {
                    title: "Background",
                    icon: {
                        type: 'feather',
                        name: 'image'
                    },
                    onPress: () => toggleTheme()
                },
                {
                    title: "Local Currency",
                    icon: {
                        type: 'feather',
                        name: 'globe'
                    }
                },
            ]
        },
        {
            title: "Other",
            data: [
                {
                    title: "Help Center",
                    icon: {
                        type: 'feather',
                        name: 'headphones'
                    }
                },
                {
                    title: "Rate Us",
                    icon: {
                        type: 'feather',
                        name: 'star'
                    }
                },
                {
                    title: "Take Survey",
                    icon: {
                        type: 'feather',
                        name: 'check-circle'
                    }
                },
                {
                    title: "Share Zengo",
                    icon: {
                        type: 'feather',
                        name: 'share-2'
                    }
                },
                {
                    title: "Export Activities",
                    icon: {
                        type: 'feather',
                        name: 'bell'
                    }
                },
                {
                    title: "About",
                    icon: {
                        type: 'feather',
                        name: 'info'
                    }
                },
            ]
        },
        {
            title: "",
            data: [
                {
                    title: "Delete Account",
                    icon: {
                        type: 'feather',
                        name: 'user-x'
                    }
                }
            ]
        },
        {
            title: "",
            data: []
        },
    ]


    const renderItem = ({ item }) => {
        const onPressCallback = item.onPress
        return <TouchableOpacity 
            style={styles.item}
            onPress={() => {
                onPressCallback
                ? onPressCallback()
                : console.log(item.title)
            }}
        >
            <View style={styles.iconContainer}>
                <Icon name={item.icon.name} type={item.icon.type} size={20} color='#52C6B6'/>
            </View>
            
            <Text>{item.title}</Text>
        </TouchableOpacity>
    }
    
    return <View style={{ flex: 1, paddingTop: 24 }}>
        <View style={styles.headerContainer}>
            <View style={{ flex: 1 }}>

            </View>
            <View style={{ flex: 1, alignContent: 'center' }}>
                <Text style={{fontSize: 20, textAlign: 'center'}}>Account</Text>
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
                <TouchableOpacity>
                    <Icon name="bell" type='feather' size={20} color='#52C6B6' style={[styles.iconContainer, {marginHorizontal: 5}]}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="headphones" type='feather' size={20} color='#52C6B6' style={[styles.iconContainer, {marginHorizontal: 5}]}/>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.contentsContainer}>
        <SectionList
            sections={data}
            keyExtractor={(item, index) => item + index}
            renderItem={renderItem}
            renderSectionHeader={(item) => {
                if (item.section.title === "image-section") {
                    return <View style={styles.imageContainer}>
                        <Image 
                            source={require('../../assets/images/account1.png')}
                            style={{ height: 100, width: 120}}
                        />
                    </View>
                } 
                else {
                    return <Text style={styles.listHeader}>{item.section.title}</Text>
                }
            }}
        />
        </View>
    </View>
}

SettingsScreen.navigationOptions = {
    title: 'Account',
    tabBarIcon: ({tintColor}) => <Icon name="md-person" type='ionicon' size={25} color={tintColor}/>
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    contentsContainer: {
        flex: 8,
    },
    listHeader: {
        fontSize: 14,
        backgroundColor: "#EFEFEF",
        paddingBottom: 12,
        paddingTop: 18,
        color: '#838383',
        paddingLeft: 20
    },
    item: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#EFEFEF',
        paddingVertical: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconContainer: {
        borderRadius: 30,
        backgroundColor: '#F3F3F3',
        marginHorizontal: 17,
        padding: 5,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        paddingVertical: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SettingsScreen