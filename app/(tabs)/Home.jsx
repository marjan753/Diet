import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { auth, db } from '../../services/FirebaseConfing';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import Colors from "./../../apparent/Colors";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const router = useRouter();

  // چک پروفایل کاربر
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();

        if (!userData || !userData.profileCompleted) {
          router.replace('/preferance/CompleteProfile');
        }
      } catch (error) {
        console.log('Error checking user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // گرفتن غذاها از TheMealDB
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then(res => res.json())
      .then(data => {
        setMeals(data.meals || []);
      });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderItem = ({ item }) => {
    const cookTime = Math.floor(Math.random() * 40) + 10; // تستی زمان پخت رندوم

    return (
      <TouchableOpacity onPress={() => router.push(`/details/${item.idMeal}`)} activeOpacity={0.8}>
  <View style={styles.card}>
    {/* عکس غذا */}
    <Image source={{ uri: item.strMealThumb }} style={styles.image} />

    {/* بخش اطلاعات پایین عکس */}
    <View style={styles.infoRow}>
      <View style={styles.textSection}>
        <Text style={styles.title}>{item.strMeal}</Text>
        <Text style={styles.subText}>⏱ Cooking time: {cookTime} mins</Text>
      </View>

      {/* دکمه اضافه کردن */}
      <TouchableOpacity
        onPress={() => alert(`${item.strMeal} اضافه شد`)}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>➕</Text>
      </TouchableOpacity>
    </View>
  </View>
</TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        renderItem={renderItem}
        keyExtractor={(item) => item.idMeal}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10, marginTop:40 },
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3, // برای سایه در اندروید
    shadowColor: '#000', // برای سایه در iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  textSection: {
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 3,
  },
  addButton: {
    backgroundColor: Colors.Primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
