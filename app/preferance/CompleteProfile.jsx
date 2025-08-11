import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';
import Colors from "../../apparent/Colors";
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../services/FirebaseConfing';
import { useRouter } from 'expo-router';

export default function CompleteProfile() {

   const router = useRouter();

  const [familySize, setFamilySize] = useState('');
  const [mealsPerWeek, setMealsPerWeek] = useState('');
  const [mealTypes, setMealTypes] = useState({
    lunch: false,
    dinner: false,
  });

  const handleSubmit = async () => {
  if (!familySize || !mealsPerWeek || (!mealTypes.lunch && !mealTypes.dinner)) {
    Alert.alert('Please fill in all fields');
    return;
  }

  try {
    const uid = auth.currentUser.uid;

    await updateDoc(doc(db, 'users', uid), {
      familySize: parseInt(familySize),
      mealsPerWeek: parseInt(mealsPerWeek),
      mealTypes: [
        mealTypes.lunch ? 'Lunch' : null,
        mealTypes.dinner ? 'Dinner' : null,
      ].filter(Boolean),
      profileCompleted: true,
    });

    Alert.alert('Success', 'Your information has been saved successfully.');
    router.replace('/(tabs)/Home');

  } catch (error) {
    console.log(error);
    Alert.alert('Error', 'There was a problem saving your information.');
  }
};

  return (
    <View style={{ padding: 20  ,marginTop:100}}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Family Size:</Text>
      <TextInput
        keyboardType="numeric"
        value={familySize}
        onChangeText={setFamilySize}
        style={{ borderWidth: 1, padding: 10, marginBottom: 15 }}
      />

      <Text style={{ fontSize: 18, marginBottom: 10 }}>Meals per Week:</Text>
      <TextInput
        keyboardType="numeric"
        value={mealsPerWeek}
        onChangeText={setMealsPerWeek}
        style={{ borderWidth: 1, padding: 10, marginBottom: 15 }}
      />

      <Text style={{ fontSize: 18, marginBottom: 10 }}>Preferred Meal Types:</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Checkbox
          value={mealTypes.lunch}
          onValueChange={(value) =>
            setMealTypes((prev) => ({ ...prev, lunch: value }))
          }
        />
        <Text style={{ marginLeft: 8 }}>Lunch</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Checkbox
          value={mealTypes.dinner}
          onValueChange={(value) =>
            setMealTypes((prev) => ({ ...prev, dinner: value }))
          }
        />
        <Text style={{ marginLeft: 8 }}>Dinner</Text>
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: Colors.Primary,
          paddingVertical: 20,
          paddingHorizontal: 40,
          borderRadius: 25,
          marginTop: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
          Submit Info
        </Text>
      </TouchableOpacity>
    </View>
  );
}
