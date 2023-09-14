import React, {useEffect,useState, useLayoutEffect} from 'react';
import {View, Text, Image, ImageBackground, TouchableOpacity} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';

import {Entypo} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';
import {Fontisto} from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Question } from '../types';

import Colors from '../../constants/Colors';
import styles from './styles';

type QuestionProps = {
    question: Question;
  };

 // { question }: QuestionProps
const QuestionItem = ({question}: QuestionProps)  => { 
console.log(question)
  // const question = {"type":"mcq","id":3794,"playlist":"Period 6: 1865-1898","description":"5.5 Sectional Conflict: Regional Differences #apush","image":"https://cross-platform-rwa.rp.devfactory.com/images/3794%20-%20industrial%20vs%20agricultural%20economy.png","question":"Aside from slavery, what was the most significant difference betweent the North and South during the mid-1800s?","options":[{"id":"A","answer":"An industrial vs. agricultural economy"},{"id":"B","answer":"Income inequality"},{"id":"C","answer":"Dependence on imports"}],"user":{"name":"AP US History","avatar":"https://cross-platform-rwa.rp.devfactory.com/avatars/apush.png"}}
  const [isLiked, setIsLiked] = useState(false);
  // const [question, setQuestion] = useState()
  const [minutes, setMinutes] = useState<number>(0);
  const [answerStatus, setAnswerStatus] = useState<number>(0)
  const [selectedOption, setSelectedOption] = useState<String>("")
  let intervalId;
  let minutesCount = 0;

  // Function to start the timer
  function startTimer() {
    intervalId = setInterval(() => {
        minutesCount++;
        setMinutes(minutesCount);
    }, 60000); // 60000 milliseconds = 1 minute
  }

  useEffect(() => {
    startTimer();
  }, [])  
  const onLikePress = () => {
    const likesToAdd = isLiked ? -1 : 1;
    console.warn("Question Liked!")
    setIsLiked(!isLiked);
  };
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
        headerLeft: () => (
          <View style={{alignItems: 'center', flexDirection: 'row', marginRight:100}}>
            <FontAwesome
            name="clock-o"
            size={25}
            color={"#00000"}
            style={{ marginLeft: 15, opacity: 1 , marginRight:2}}
            />
          <Text>{minutes}m</Text>
          </View>
          ),
        })   
  }, [minutes]);
  const handleAnswerPress = async(option: string) => {
    const response = await fetch(`https://cross-platform.rp.devfactory.com/reveal?id=${question.id}`, {
        method: 'GET',
    }
    )
    const data = await response.json()
    const correct_option = data.correct_options[0]
    if (correct_option.id === option) {  
        setAnswerStatus(1)
        setSelectedOption(option)
    
    }else{
        setAnswerStatus(2)
        setSelectedOption(option)
    }
  };
  if (question === undefined || question === null || question.question === undefined || question.question === null || question.question === "" || question.options === undefined || question.options === null || question.options.length === 0 || question.options[0].answer === undefined || question.options[0].answer === null || question.options[0].answer === "" || question.user === undefined || question.user === null || question.user.name === undefined || question.user.name === null || question.user.name === "" || question.user.avatar === undefined || question.user.avatar === null || question.user.avatar === "") {
    return (
      <View style={styles.container}>
        <Text>Loading..</Text>
      </View>
    );
  } null
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={{
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
          }}>
        <View style={styles.uiContainer}>
            <View style={styles.leftContainer}>
                <Text style={styles.questionText}>{question.question}</Text>
            </View>
            <View style={styles.answersContainer}>
                {
                    question.options?.map((option) =>
                    <TouchableOpacity onPress={() => handleAnswerPress(option.id)} style={styles.answerView}>
                        <Text style={styles.answerText}>{option.answer}</Text>
                        {
                            answerStatus > 0 && answerStatus === 1 && selectedOption === option.id && <FontAwesome name="thumbs-up" size={24} color="black" />
                        }
                        {
                            answerStatus > 0 && answerStatus === 2 && selectedOption === option.id && <FontAwesome name="thumbs-down" size={24} color="black" />
                        }
                    </TouchableOpacity> 
                    )
                }
                               
            </View>
        <View style={styles.rightContainer}>
            <View style={styles.profileView}>
                <Image
                    style={styles.profilePicture}
                    source={{uri: question.user.avatar}}
                />
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
    </View>
  );
};

export default QuestionItem;


