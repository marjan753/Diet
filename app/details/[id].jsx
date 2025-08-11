// app/details/[id].jsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator, StyleSheet } from 'react-native';
import Colors from '../../apparent/Colors';
import { useLocalSearchParams } from 'expo-router';

export default function Details() {
  const { id } = useLocalSearchParams();
  console.log('id:', id);
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => setMeal(data.meals ? data.meals[0] : null))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.Primary} />
      </View>
    );
  }

  if (!meal) {
    return (
      <View style={styles.loader}>
        <Text>Meal not found.</Text>
      </View>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure ? measure : ''} ${ingredient}`.trim());
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 15 }}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{meal.strMeal}</Text>

      <Text style={styles.sectionTitle}>Ingredients</Text>
      {ingredients.map((item, idx) => (
        <Text key={idx} style={styles.ingredient}>• {item}</Text>
      ))}

      <Text style={styles.sectionTitle}>Instructions</Text>
      <Text style={styles.instructions}>{meal.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  ingredient: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
  },
});
