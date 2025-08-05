import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import Colors from "./../../apparent/Colors";
import { Link, useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../services/FirebaseConfing';  


export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const onSignin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // گرفتن اطلاعات کاربر از Firestore
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        console.log('User data:', userSnap.data());
        Alert.alert('Success', 'Logged in successfully!');
        router.push('/Home'); // مسیر دلخواهت برای بعد از ورود
      } else {
        Alert.alert('Error', 'User profile not found in database.');
      }
    } catch (error) {
      Alert.alert('Login Error', error.message);
      console.log('Error:', error);
    }
  }

  return (
    <View style={{ display: 'flex', alignItems: 'center', padding: 20 }}>
      <Image source={require('./../../assets/images/logo.jpg')}
        style={{ width: 150, height: 150, marginTop: 60 }}
      />

      <Text style={{ fontSize: 35, fontWeight: 'bold' }}>Welcome back!</Text>

      <TextInput
        style={{
          width: '100%',
          borderWidth: 1,
          borderRadius: 10,
          fontSize: 18,
          paddingVertical: 20,
          marginTop: 15,
          padding: 10
        }}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={{
          width: '100%',
          borderWidth: 1,
          borderRadius: 10,
          fontSize: 18,
          paddingVertical: 20,
          marginTop: 15,
          padding: 10
        }}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        onPress={onSignin}
        style={{
          backgroundColor: Colors.Primary,
          paddingVertical: 20,
          paddingHorizontal: 100,
          borderRadius: 25,
          marginTop: 40,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
          Sign In
        </Text>
      </TouchableOpacity>

      <Link style={{ marginTop: 10 }} href={'/Sign/signup'}>
        <Text style={{ marginTop: 15, fontSize: 16 }}>Create New Account</Text>
      </Link>
    </View>
  );
}
