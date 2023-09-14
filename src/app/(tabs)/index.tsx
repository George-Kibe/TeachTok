import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import Question from '../../components/Question';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Question />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
