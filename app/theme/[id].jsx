import { useEffect, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackButton from '../../components/Backbutton';
import { getCurrentTheme, setTheme, THEMES } from '../../constants/colors';

const { width } = Dimensions.get('window');

// ✅ Define all your themes


const Theme = () => {


   const [currentTheme, setcurrentTheme] = useState('')
    const [scaleAnim] = useState(new Animated.Value(1));

    const handleThemeChange = (theme, themeKey) => {

        console.log("themeKeythemeKey",themeKey)
        // Animation when changing theme
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();

        setcurrentTheme(theme);
        setTheme(themeKey)
    };

    const ThemePreviewCard = ({ theme, themeKey, isSelected }) => (
        <TouchableOpacity
            onPress={() => handleThemeChange(theme, themeKey)}
/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Theme component that displays all available themes and allows the user to select one.
 * @returns {JSX.Element} Theme component
 */
/*******  c5edf45b-7150-4981-b7fd-c7a6511387a3  *******/ activeOpacity={0.7}
        >
            <View style={[
                styles.themePreviewContainer,
                {
                    borderColor: isSelected ? theme.primary : theme.border,
                    backgroundColor: isSelected ? `${theme.primary}15` : theme.card,
                }
            ]}>
                {/* Theme preview */}
                <View style={styles.themePreview}>
                    <View style={[styles.previewHeader, { backgroundColor: theme.primary }]} />
                    <View style={styles.previewContent}>
                        <View style={[styles.previewText, { backgroundColor: theme.text }]} />
                        <View style={[styles.previewTextSmall, { backgroundColor: theme.textLight }]} />
                    </View>
                </View>

                {/* Theme name */}
                <Text style={[
                    styles.themeName,
                    {
                        color: isSelected ? theme.primary : theme.text,
                        fontWeight: isSelected ? '700' : '500'
                    }
                ]}>
                    {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
                </Text>

                {/* Selection indicator */}
                {isSelected && (
                    <View style={[styles.selectedIndicator, { backgroundColor: theme.primary }]}>
                        <Text style={styles.checkmark}>✓</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );


    console.log("getCurrentTheme",getCurrentTheme())

    useEffect(()=>{
    setcurrentTheme(getCurrentTheme())
    },[])


    return (
        <Animated.ScrollView
            style={[styles.container, { backgroundColor: currentTheme.background, transform: [{ scale: scaleAnim }] }]}
            contentContainerStyle={styles.contentContainer}
        >
            {/* Header */}
            <BackButton/>
            <View style={styles.header}>
                <Text style={[styles.title, { color: currentTheme.text }]}>
                    Choose Your Theme
                </Text>
                <Text style={[styles.subtitle, { color: currentTheme.textLight }]}>
                    Select a theme that matches your style
                </Text>
            </View>

            {/* Theme Grid */}
            <View style={styles.themeGrid}>
                {Object.keys(THEMES).map((themeKey) => {
                    const theme = THEMES[themeKey];
                    const isSelected = theme === currentTheme;

                    return (
                        <ThemePreviewCard
                            key={themeKey}
                            theme={theme}
                            themeKey={themeKey}
                            isSelected={isSelected}
                        />
                    );
                })}
            </View>

            {/* Current Theme Display */}
            <View style={styles.currentThemeSection}>
                <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>
                    Current Theme: {Object.keys(THEMES).find(key => THEMES[key] === currentTheme)}
                </Text>

                <View style={[
                    styles.demoCard,
                    {
                        backgroundColor: currentTheme.card,
                        borderColor: currentTheme.border,
                        shadowColor: currentTheme.shadow,
                    },
                ]}>
                    <View style={[styles.demoHeader, { backgroundColor: currentTheme.primary }]}>
                        <Text style={[styles.demoHeaderText, { color: currentTheme.white }]}>
                            Preview Card
                        </Text>
                    </View>

                    <View style={styles.demoContent}>
                        <Text style={[styles.demoTitle, { color: currentTheme.text }]}>
                            Beautiful Theme
                        </Text>
                        <Text style={[styles.demoText, { color: currentTheme.textLight }]}>
                            This is how your app will look with the {Object.keys(THEMES).find(key => THEMES[key] === currentTheme)} theme.
                        </Text>

                        <View style={[styles.demoButton, { backgroundColor: currentTheme.primary }]}>
                            <Text style={[styles.demoButtonText, { color: currentTheme.white }]}>
                                Sample Button
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Animated.ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        opacity: 0.8,
    },
    themeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    themePreviewContainer: {
        width: (width - 60) / 2,
        padding: 16,
        borderRadius: 20,
        borderWidth: 3,
        marginBottom: 16,
        alignItems: 'center',
        position: 'relative',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 3,
    },
    themePreview: {
        width: '100%',
        height: 80,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 12,
        backgroundColor: '#FFFFFF',
    },
    previewHeader: {
        height: 20,
        width: '100%',
    },
    previewContent: {
        padding: 8,
        flex: 1,
        justifyContent: 'space-around',
    },
    previewText: {
        height: 6,
        borderRadius: 3,
        width: '70%',
    },
    previewTextSmall: {
        height: 4,
        borderRadius: 2,
        width: '50%',
    },
    themeName: {
        fontSize: 14,
        fontWeight: '500',
    },
    selectedIndicator: {
        position: 'absolute',
        top: -8,
        right: -8,
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmark: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    currentThemeSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 16,
        textAlign: 'center',
    },
    demoCard: {
        borderRadius: 20,
        borderWidth: 1,
        overflow: 'hidden',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
        elevation: 5,
    },
    demoHeader: {
        padding: 16,
    },
    demoHeaderText: {
        fontSize: 18,
        fontWeight: '600',
    },
    demoContent: {
        padding: 20,
    },
    demoTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    demoText: {
        fontSize: 14,
        marginBottom: 20,
        lineHeight: 20,
    },
    demoButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    demoButtonText: {
        fontSize: 14,
        fontWeight: '600',
    },
});

export default Theme;