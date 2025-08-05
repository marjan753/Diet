import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import Colors from "./../../apparent/Colors";
import { Link } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/FirebaseConfing';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const db = getFirestore(); // گرفتن instance از firestore

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignup = () => {
    if (!email || !password || !name) {
      Alert.alert('Enter all field values');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // ذخیره اطلاعات یوزر در Firestore
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          name: name,
          email: user.email,
          createdAt: new Date(),
        });

        Alert.alert('Signup successful!');
        console.log('User saved:', user.uid);
      })
      .catch((error) => {
        Alert.alert('Signup failed');
        console.log('Error:', error.message);
      });
  };

  return (
    <View style={{
      display: 'flex',
      alignItems: 'center',
      padding: 20
    }}>

      <Image source={require('./../../assets/images/logo.jpg')}
        style={{
          width: 150,
          height: 150,
          marginTop: 60
        }}
      />

      <Text style={{
        fontSize: 35,
        fontWeight: 'bold'
      }}>Create New Account!</Text>

      <TextInput
        style={inputStyle}
        placeholder="Full Name"
        autoFocus={true}
        onChangeText={setName}
      />

      <TextInput
        style={inputStyle}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <TextInput
        style={inputStyle}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        onPress={onSignup}
        style={{
          backgroundColor: Colors.Primary,
          paddingVertical: 20,
          paddingHorizontal: 100,
          borderRadius: 25,
          marginTop: 40,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
          SignUp
        </Text>
      </TouchableOpacity>

      <Link style={{ marginTop: 10 }} href={'/Sign/signin'}>
        <Text style={{ marginTop: 15, fontSize: 16 }}>Already have an account</Text>
      </Link>

    </View>
  );
}

const inputStyle = {
  width: '100%',
  borderWidth: 1,
  borderRadius: 10,
  fontSize: 18,
  paddingVertical: 20,
  marginTop: 15,
  padding: 10
};
