import { StyleSheet, Text, View} from 'react-native';
import React  from 'react';
import { useState, useEffect } from 'react';
import { Flatlist } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import  styled from 'styled-components/native';
import Rating from './components/Rating';
import Genre from './components/Genre';
import { getMovies } from './api';
import * as CONSTANTS from './constants/constants'

const Container = styled.View` 
flex: 1;
`;
const PosterContainer = styled.View` 
width: ${CONSTANTS.ITEM_SIZE}px;
`;
const Poster = styled.View`
margin-horizontal : ${CONSTANTS.SPACING}px;
padding: ${CONSTANTS.SPACING * 2}px;
align-items: center;
background-color: #FFFFFF;
border-radius: 10px;
`;
const PosterImage = styled.Image`
width: 100%;
height: ${CONSTANTS.ITEM_SIZE * 1.2}px;
resize-mode: cover;
border-radius: 10px;
margin: 0 0 10px 0;
`;

const PosterTitle = styled.Text`
font-family: Inter-Black;
font-size: 18px;
`;
const PosterDescription = styled.Text`
font-family: ;
font-size: 18;
font-size: 12px;
`;
export default function App() {

  const [movies, setMovies] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMovies()
      setMovies(data)
      setLoaded(true)
    }
    fetchData()
  }, [])

  let [fontLoaded] = useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Black.ttf')
  })

  if (!loaded || !fontLoaded) {
    return <AppLoading />
  }
  return (
    <Container>
      <StatusBar />
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={item => item.key}
        horizontal
        contentContainerStyle={{
          alignItems: 'center'
        }}

        renderItem={({ item }) => {
          return (
            <PosterContainer>
              <Poster>
                <PosterImage source={{ uri: item.posterPath }} />
                <PosterTitle numberOfLines={1}>{item.originalTitle}</PosterTitle>
                <Rating rating={item.voteAverage} />
                <Genre genres={item.genres} />
                <PosterDescription numberOfLines={5}>{item.description}</PosterDescription>
              </Poster>
            </PosterContainer>
          )
        }}
      />
    </Container>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
