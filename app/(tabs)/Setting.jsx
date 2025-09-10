import { useAuth, useClerk } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { COLORS } from "../../constants/colors";
import { useRouter } from "expo-router";

const Setting = () => {
    const { signOut, user } = useClerk();
    const { isSignedIn, isLoaded } = useAuth();
    const router = useRouter();

    console.log("userDetails", user)

    const handleLogout = () => {
        Alert.alert(
            "Sign Out",
            "Are you sure you want to sign out?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Sign Out",
                    style: "destructive",
                    onPress: () => {
                        signOut();
                        router.push("/(auth)/sign-in");
                    }
                },
            ]
        );
    };

    const handleSignIn = () => {
        router.push("/(auth)/sign-in");
    };

    // Show loading state while auth is loading
    if (!isLoaded) {
        return (
            <View style={[styles.container, styles.centerContent, { backgroundColor: COLORS.background }]}>
                <Text style={[styles.loadingText, { color: COLORS.textLight }]}>Loading...</Text>
            </View>
        );
    }

    // Show sign-in prompt for unauthenticated users
    if (!isSignedIn) {
        return (
            <View style={[styles.container, styles.centerContent, { backgroundColor: COLORS.background }]}>
                <View style={[styles.signInCard, { backgroundColor: COLORS.card, shadowColor: COLORS.shadow }]}>
                    <Ionicons name="person-circle-outline" size={80} color={COLORS.primary} />
                    <Text style={[styles.signInTitle, { color: COLORS.text }]}>Welcome to Settings</Text>
                    <Text style={[styles.signInSubtitle, { color: COLORS.textLight }]}>
                        Sign in to access your account settings and personalize your experience
                    </Text>
                    <TouchableOpacity
                        style={[styles.signInButton, { backgroundColor: COLORS.primary }]}
                        onPress={handleSignIn}
                    >
                        <Ionicons name="log-in-outline" size={20} color="white" style={styles.buttonIcon} />
                        <Text style={styles.signInButtonText}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // Show full settings for authenticated users
    return (
        <ScrollView style={[styles.container, { backgroundColor: COLORS.background }]}>
            {/* Profile Section */}
            <View style={[styles.profileCard, { backgroundColor: COLORS.card, shadowColor: COLORS.shadow }]}>
                <Image
                    source={{
                        uri: user?.imageUrl
                    }}
                    style={styles.avatar}
                />
                <View style={styles.profileInfo}>
                    <Text style={[styles.name, { color: COLORS.text }]}>
                        {user?.fullName || user?.firstName || "User"}
                    </Text>
                    <Text style={[styles.email, { color: COLORS.textLight }]}>
                        {user?.primaryEmailAddress?.emailAddress || "No email available"}
                    </Text>
                    <View style={[styles.statusBadge, { backgroundColor: COLORS.primary + '20' }]}>
                        <View style={[styles.statusDot, { backgroundColor: COLORS.primary }]} />
                        <Text style={[styles.statusText, { color: COLORS.primary }]}>Active</Text>
                    </View>
                </View>
            </View>

            {/* Account Settings */}
            <View style={[styles.section, { backgroundColor: COLORS.card, shadowColor: COLORS.shadow }]}>
                <Text style={[styles.sectionTitle, { color: COLORS.textLight }]}>Account</Text>

                <TouchableOpacity style={[styles.item, { borderTopColor: COLORS.border }]}>
                    <Ionicons name="person-outline" size={22} color={COLORS.text} />
                    <View style={styles.itemContent}>
                        <Text style={[styles.itemText, { color: COLORS.text }]}>Edit Profile</Text>
                        <Text style={[styles.itemSubtext, { color: COLORS.textLight }]}>
                            Update your personal information
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.item, { borderTopColor: COLORS.border }]}>
                    <Ionicons name="shield-outline" size={22} color={COLORS.text} />
                    <View style={styles.itemContent}>
                        <Text style={[styles.itemText, { color: COLORS.text }]}>Security</Text>
                        <Text style={[styles.itemSubtext, { color: COLORS.textLight }]}>
                            Password, 2FA, and security settings
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.item, { borderTopColor: COLORS.border }]}>
                    <Ionicons name="notifications-outline" size={22} color={COLORS.text} />
                    <View style={styles.itemContent}>
                        <Text style={[styles.itemText, { color: COLORS.text }]}>Notifications</Text>
                        <Text style={[styles.itemSubtext, { color: COLORS.textLight }]}>
                            Manage your notification preferences
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
                </TouchableOpacity>
            </View>

            {/* Preferences */}
            <View style={[styles.section, { backgroundColor: COLORS.card, shadowColor: COLORS.shadow }]}>
                <Text style={[styles.sectionTitle, { color: COLORS.textLight }]}>Preferences</Text>

                <TouchableOpacity style={[styles.item, { borderTopColor: COLORS.border }]}>
                    <Ionicons name="moon-outline" size={22} color={COLORS.text} />
                    <View style={styles.itemContent}>
                        <Text style={[styles.itemText, { color: COLORS.text }]}>Theme</Text>
                        <Text style={[styles.itemSubtext, { color: COLORS.textLight }]}>
                            Light, dark, or system
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.item, { borderTopColor: COLORS.border }]}>
                    <Ionicons name="language-outline" size={22} color={COLORS.text} />
                    <View style={styles.itemContent}>
                        <Text style={[styles.itemText, { color: COLORS.text }]}>Language</Text>
                        <Text style={[styles.itemSubtext, { color: COLORS.textLight }]}>
                            English
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
                </TouchableOpacity>
            </View>

            {/* Support */}
            <View style={[styles.section, { backgroundColor: COLORS.card, shadowColor: COLORS.shadow }]}>
                <Text style={[styles.sectionTitle, { color: COLORS.textLight }]}>Support</Text>

                <TouchableOpacity style={[styles.item, { borderTopColor: COLORS.border }]}>
                    <Ionicons name="help-circle-outline" size={22} color={COLORS.text} />
                    <View style={styles.itemContent}>
                        <Text style={[styles.itemText, { color: COLORS.text }]}>Help & Support</Text>
                        <Text style={[styles.itemSubtext, { color: COLORS.textLight }]}>
                            FAQs, contact us, and documentation
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.item, { borderTopColor: COLORS.border }]}>
                    <Ionicons name="information-circle-outline" size={22} color={COLORS.text} />
                    <View style={styles.itemContent}>
                        <Text style={[styles.itemText, { color: COLORS.text }]}>About</Text>
                        <Text style={[styles.itemSubtext, { color: COLORS.textLight }]}>
                            App version and legal information
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleLogout}
                    style={[styles.item, styles.logoutItem, { borderTopColor: COLORS.border }]}
                >
                    <Ionicons name="exit-outline" size={22} />
                    <View style={styles.itemContent}>
                        <Text style={[styles.itemText,]}>Sign Out</Text>
                        <Text style={[styles.itemSubtext, { color: COLORS.textLight }]}>
                            Sign out of your account
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Footer spacing */}
            <View style={styles.footer} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
    },

    // Sign-in screen styles
    signInCard: {
        alignItems: 'center',
        padding: 32,
        borderRadius: 20,
        marginHorizontal: 20,
        elevation: 3,
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
    },
    signInTitle: {
        fontSize: 24,
        fontWeight: '700',
        marginTop: 16,
        marginBottom: 8,
    },
    signInSubtitle: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 32,
    },
    signInButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
        elevation: 2,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    buttonIcon: {
        marginRight: 8,
    },
    signInButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },

    // Profile card styles
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 16,
        marginBottom: 24,
        elevation: 2,
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 16,
    },
    profileInfo: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        marginBottom: 8,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },

    // Section styles
    section: {
        borderRadius: 16,
        marginBottom: 20,
        paddingVertical: 8,
        elevation: 1,
        shadowOpacity: 0.06,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        paddingHorizontal: 16,
        paddingVertical: 12,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    itemContent: {
        flex: 1,
        marginLeft: 16,
    },
    itemText: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 2,
    },
    itemSubtext: {
        fontSize: 13,
        lineHeight: 18,
    },
    logoutItem: {
        marginTop: 8,
    },
    footer: {
        height: 40,
    },
});

export default Setting;