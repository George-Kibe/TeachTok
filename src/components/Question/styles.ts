import {StyleSheet, Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: Dimensions.get('window').height - 130,
    backgroundColor: '#000',
  },
  uiContainer: {
    height: '100%',
    justifyContent: 'flex-end',
    padding: 0
  },
  leftContainer: {
    backgroundColor: "#353935",
    padding: 10,
    marginBottom: 20,
    borderRadius: 10
  },
  questionText: {
    color: '#fff',
    padding: 10,
    fontSize: 30,
    fontWeight: '500',
    marginBottom: 0,
  },
  answersContainer:{
    width: screenWidth*0.80,
    marginBottom: 10,
    gap:20
  },
  answerView: {
    backgroundColor: "#e7e7e7",
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10,
    gap: 20,
  },
  answerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10,
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 1 },
    textShadowRadius: 5, 
  },
  profileView: {
    position: 'relative',
    marginBottom: 20
  },
  profileIcon: {
    position: 'absolute',
    backgroundColor: "#FFF",
    borderRadius: 500,
    zIndex: 999,
    bottom: -10,
    left: 15
  },
  bottomContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  handle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  description: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 10,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userView: {
    flexDirection: 'row',
  },
  userName: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },

  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: '#4c4c4c',
  },

  //  right container
  rightContainer: {
    alignSelf: 'flex-end',
    height: 300,
    justifyContent: 'space-between',
    marginRight: 0,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },

  iconContainer: {
    alignItems: 'center',
    marginHorizontal: 0,
    marginRight: 0
  },
  statsLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },
});

export default styles;