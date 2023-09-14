import { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Dimensions, ScrollView } from 'react-native';

import { Text, View } from '../../components/Themed';
import Question from '../../components/Question';
import { Question as QuestionType  } from '../../components/types';

type QuestionProps = {
  question: QuestionType;
};


export default function TabOneScreen() {
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const numberOfRequests = 10; // Number of times you want to call the API same as number of questions needed

  async function makeMultipleRequests() {
    for (let i = 0; i < numberOfRequests; i++) {
      if (questions.length === numberOfRequests) {
        break;
      }
      try {
        const response = await fetch(
          'https://cross-platform.rp.devfactory.com/for_you'
        );
        const data = await response.json();
        console.log(data);
        setQuestions((prev) => [...prev, data]);
      } catch (error) {
        console.error(`Error in API Request ${i + 1}:`, error);
      }
    }
  }

  useEffect(() => {
    makeMultipleRequests();;
  }, []);

  if (!questions.length < 10) {
    <Text>Loading..</Text>
  }
  console.log(questions);
  return (
    <View style={styles.container}>
      <FlatList
        data={questions}
        renderItem={({item, index}) => <Question question={item} key={index} />}
        showsVerticalScrollIndicator={false}
        // snapToInterval={Dimensions.get('window').height}
        // snapToInterval={Dimensions.get('window').height - 130}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
      /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
