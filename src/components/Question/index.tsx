import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router'; 
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Question } from '../types';

import styles from './styles';

/**
 * Props for the QuestionItem component.
 */
type QuestionProps = {
  question: Question;
};

/**
 * Renders a single question item.
 *
 * @param {QuestionProps} props - The component props.
 * @returns {JSX.Element} The rendered JSX element.
 */

const QuestionItem = ({ question }: QuestionProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [minutes, setMinutes] = useState<number>(0);
  const [answerStatus, setAnswerStatus] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<String>('');

  let intervalId;
  let minutesCount = 0;

  /**
   * Starts the timer.
   */
  function startTimer() {
    intervalId = setInterval(() => {
      minutesCount++;
      setMinutes(minutesCount);
    }, 60000); // 60000 milliseconds = 1 minute
  }

  useEffect(() => {
    startTimer();
  }, []);

  /**
   * Handles the like button press.
   */
  const onLikePress = () => {
    const likesToAdd = isLiked ? -1 : 1;
    console.warn('Question Liked!');
    setIsLiked(!isLiked);
  };

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ alignItems: 'center', flexDirection: 'row',}}>
          <FontAwesome
            name="clock-o"
            size={25}
            color={'#000000'}
            style={{ marginLeft: 15, opacity: 1, marginRight: 2 }}
          />
          <Text>{minutes}m</Text>
        </View>
      ),
    });
  }, [minutes]);

  /**
   * Handles the answer button press.
   *
   * @param {string} option - The selected option.
   */
  const handleAnswerPress = async (option: string) => {
    const response = await fetch(`https://cross-platform.rp.devfactory.com/reveal?id=${question.id}`, {
      method: 'GET',
    });

    const data = await response.json();
    const correct_option = data.correct_options[0];

    if (correct_option.id === option) {
      setAnswerStatus(1);
      setSelectedOption(option);
    } else {
      setAnswerStatus(2);
      setSelectedOption(option);
    }
  };

  if (
    question === undefined ||
    question === null
  ) {
    return (
      <View style={styles.container}>
        <Text>Loading..</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={require('../../../assets/images/background.png')} style={styles.container}>
      <View style={styles.uiContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>
        <View style={styles.answersContainer}>
          {question.options?.map((option) => (
            <TouchableOpacity
              onPress={() => handleAnswerPress(option.id)}
              style={styles.answerView}>
              <Text style={styles.answerText}>{option.answer}</Text>
              {answerStatus > 0 && answerStatus === 1 && selectedOption === option.id && (
                <FontAwesome name="thumbs-up" size={24} color="black" />
              )}
              {answerStatus > 0 && answerStatus === 2 && selectedOption === option.id && (
                <FontAwesome name="thumbs-down" size={24} color="black" />
              )}
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.profileView}>
            <Image style={styles.profilePicture} source={{ uri: question.user.avatar }} />
            <FontAwesome style={styles.profileIcon} name={'plus-circle'} size={24} color="#50C878" />
          </View>
          <TouchableOpacity style={styles.iconContainer} onPress={onLikePress}>
            <AntDesign name={'heart'} size={40} color={isLiked ? 'red' : 'white'} />
            <Text style={styles.statsLabel}>{87}</Text>
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <FontAwesome name={'commenting'} size={40} color="white" />
            <Text style={styles.statsLabel}>{5}</Text>
          </View>
          <View style={styles.iconContainer}>
            <FontAwesome name={'bookmark'} size={35} color="white" />
            <Text style={styles.statsLabel}>{203}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Fontisto name={'share-a'} size={35} color="white" />
            <Text style={styles.statsLabel}>{17}</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View>
            <Text style={styles.handle}>{question.user.name}</Text>
            <Text style={styles.description}>{question.description}</Text>
            <View style={styles.userRow}>
              <View style={styles.userView}>
                <MaterialIcons name="video-collection" size={24} color="white" />
                <Text style={styles.userName}>Playlist・{question.playlist}</Text>
              </View>
              <MaterialIcons name="navigate-next" size={24} color="white" />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default QuestionItem;
