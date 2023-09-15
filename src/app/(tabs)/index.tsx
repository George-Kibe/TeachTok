import { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Dimensions } from 'react-native';

import { Text, View } from '../../components/Themed';
import Question from '../../components/Question';
import { Question as QuestionType } from '../../components/types';

/**
 * Props for the Question component.
 */
type QuestionProps = {
  question: QuestionType;
};

/**
 * TabOneScreen component renders a list of questions fetched from an API.
 *
 * @returns {JSX.Element} The rendered JSX element.
 */
export default function HomeScreen() {
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const height = Dimensions.get('window').height;
  const numberOfRequests = 10;

  /**
   * Makes multiple API requests to fetch questions and updates the state.
   */
  async function makeMultipleRequests() {
    for (let i = 0; i < numberOfRequests; i++) {
      // if (questions.length === numberOfRequests) {
      //   break;
      // }
      try {
        const response = await fetch(
          'https://cross-platform.rp.devfactory.com/for_you'
        );
        const data = await response.json();
        // console.log(data);
        setQuestions((prev) => [...prev, data]);
      } catch (error) {
        console.error(`Error in API Request ${i + 1}:`, error);
      }
    }
  }

  useEffect(() => {
    makeMultipleRequests();
  }, []);

  if (questions.length < 10) {
    return <Text>Loading..</Text>;
  }
  // Function to generate random number in case  question is fetched twice
  function getRandomNumber(min:number, max:number) {
    // Use Math.random() to generate a random decimal between 0 (inclusive) and 1 (exclusive)
    const randomDecimal = Math.random();
  
    // Scale the random decimal to the desired range and round it to an integer
    const randomInteger = Math.floor(randomDecimal * (max - min + 1)) + min;
  
    return randomInteger;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={questions}
        renderItem={({ item, index }) => <Question question={item} />}
        snapToInterval={height}
        showsVerticalScrollIndicator={false}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 500,
  },
});
