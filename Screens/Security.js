import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Switch,
    Image,
    Modal,
    ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as LocalAuthentication from 'react-native-local-authentication';
import BottomNavBar from './BottomNavBar';
import { FontAwesome } from '@expo/vector-icons'; // For icons

const backButtonImage = require('../asserts/images/arrow.png'); // Ensure path is correct

const Security = ({ navigation }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
    const [biometricSupported, setBiometricSupported] = useState(false);
    const [biometricEnabled, setBiometricEnabled] = useState(false);

    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setBiometricSupported(compatible);
        })();
    }, []);

    const checkPasswordStrength = (password) => {
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
        const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

        if (strongRegex.test(password)) {
            setPasswordStrength('Strong');
        } else if (mediumRegex.test(password)) {
            setPasswordStrength('Medium');
        } else {
            setPasswordStrength('Weak');
        }
    };

    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
            alert('New passwords do not match');
            return;
        }
        if (currentPassword === '') {
            alert('Please enter your current password');
            return;
        }
        // Simulate password change logic
        ToastAndroid.show("Password changed successfully!", ToastAndroid.SHORT);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const TwoFactorSetupModal = ({ visible, onClose, onSetupComplete }) => {
        return (
            <Modal visible={visible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Set Up Two-Factor Authentication</Text>
                        <Text style={styles.infoText}>Enhance security with two-factor authentication. Use an authenticator app like Google Authenticator for added protection.</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={() => {
                            onSetupComplete();
                            onClose();
                        }}>
                            <Text style={styles.modalButtonText}>Complete Setup</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={onClose}>
                            <Text style={styles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    };

    return (
        <LinearGradient
            colors={['#507DBC', '#5986C4', '#508c9b']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Image source={backButtonImage} style={styles.backButtonImage} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Security Settings</Text>
                </View>

                {/* Password Change Section */}
                <View style={styles.settingsContainer}>
                    <Text style={styles.sectionTitle}>Change Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Current Password"
                        placeholderTextColor={'#ccc'}
                        secureTextEntry
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="New Password"
                        placeholderTextColor={'#ccc'}
                        secureTextEntry
                        value={newPassword}
                        onChangeText={(text) => {
                            setNewPassword(text);
                            checkPasswordStrength(text);
                        }}
                    />
                    <View style={styles.strengthContainer}>
                        <Text style={styles.strengthText}>Password Strength: </Text>
                        <Text style={[styles.strengthIndicator, 
                            passwordStrength === 'Strong' && styles.strong,
                            passwordStrength === 'Medium' && styles.medium,
                            passwordStrength === 'Weak' && styles.weak
                        ]}>{passwordStrength}</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm New Password"
                        placeholderTextColor={'#ccc'}
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity
                        style={styles.changePasswordButton}
                        onPress={handleChangePassword}
                    >
                        <Text style={styles.changePasswordText}>Change Password</Text>
                    </TouchableOpacity>
                </View>

                {/* Two-Factor Authentication Section */}
                <View style={styles.settingsContainer}>
                    <Text style={styles.sectionTitle}>Two-Factor Authentication</Text>
                    <View style={styles.twoFactorContainer}>
                        <Text style={styles.twoFactorText}>
                            {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                        </Text>
                        <TouchableOpacity
                            style={styles.twoFactorButton}
                            onPress={() => setShowTwoFactorSetup(true)}
                        >
                            <Text style={styles.twoFactorButtonText}>
                                {twoFactorEnabled ? 'Manage 2FA' : 'Set up 2FA'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.infoText}>
                        {twoFactorEnabled
                            ? 'Two-factor authentication is enabled for added security.'
                            : 'Enable two-factor authentication for enhanced security.'}
                    </Text>
                </View>

                {/* Biometric Authentication Section */}
                {biometricSupported && (
                    <View style={styles.settingsContainer}>
                        <Text style={styles.sectionTitle}>Biometric Authentication</Text>
                        <View style={styles.twoFactorContainer}>
                            <Text style={styles.twoFactorText}>
                                {biometricEnabled ? 'Enabled' : 'Disabled'}
                            </Text>
                            <Switch
                                value={biometricEnabled}
                                onValueChange={async (value) => {
                                    const isAuthenticated = await LocalAuthentication.authenticateAsync({
                                        promptMessage: 'Authenticate to enable biometric authentication',
                                        fallbackLabel: 'Use Passcode',
                                    });
                                    if (isAuthenticated.success) {
                                        setBiometricEnabled(value);
                                    } else {
                                        ToastAndroid.show("Biometric Authentication Failed", ToastAndroid.SHORT);
                                    }
                                }}
                            />
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Two-Factor Setup Modal */}
            {showTwoFactorSetup && (
                <TwoFactorSetupModal
                    visible={showTwoFactorSetup}
                    onClose={() => setShowTwoFactorSetup(false)}
                    onSetupComplete={() => setTwoFactorEnabled(true)}
                />
            )}

            <BottomNavBar />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        color: 'black',
    },
    backButton: {
        padding: 10,
    },
    backButtonImage: {
        width: 24,
        height: 24,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 16,
    },
    settingsContainer: {
        padding: 20,
        backgroundColor: '#f0f3f5',
        borderRadius: 8,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'black'
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    changePasswordButton: {
        backgroundColor: '#507DBC',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    changePasswordText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    strengthContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    strengthText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
        color:'black'
    },
    strengthIndicator: {
        fontSize: 16,
    },
    strong: {
        color: 'green',
    },
    medium: {
        color: 'orange',
    },
    weak: {
        color: 'red',
    },
    twoFactorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    twoFactorButton: {
        padding: 10,
        backgroundColor: '#507DBC',
        borderRadius: 8,
    },
    twoFactorButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    infoText: {
        fontSize: 14,
        color: '#555',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 30,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#507DBC',
        paddingVertical: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    cancelButton: {
        backgroundColor: '#999',
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Security;
