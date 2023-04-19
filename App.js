/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState,useEffect } from 'react';

import {
  SafeAreaView,
  Text,
  View,
  Button,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

function App() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState();

  useEffect(() => {
    const requestMovies = async () => {
      const req = await fetch('https://api.b7web.com.br/cinema/');
      const json = await req.json();

      if (json) {
        setMovies(json);
        setLoading(true);
      }
    };

    requestMovies()

  }, [])


  return (
    <SafeAreaView style={styles.container}>
      {/* <Button title="Carregar Filmes" onPress={handleLoadButton}></Button> */}
      {!loading ?
        <>
          <View style={styles.loadingArea}>
            <ActivityIndicator size="large" color="#ffffff" ></ActivityIndicator>
            <Text style={styles.loadingText}>Carregando...</Text>
          </View>
        </>
        :
        <>
          <Text style={styles.totalMoviesText}>
            Total de Filmes: {movies?.length}
          </Text>
          <FlatList
            style={styles.list}
            data={movies}
            renderItem={({ item }) => (
              <View style={styles.movieItem}>
                <Image
                  source={{ uri: item.avatar }}
                  style={styles.movieImage}
                />
                <Text style={styles.movieTitle}>{item.titulo}</Text>
              </View>
            )}
            keyExtractor={item => item.titulo}></FlatList>
        </>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333'
  },
  loadingArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    color: '#fff'
  },
  totalMoviesText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  movieItem: {
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieImage: {

    height: 400,
    width: 300,
    resizeMode: 'cover'
  },
  movieTitle: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default App;
