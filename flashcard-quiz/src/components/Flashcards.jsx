import { useState } from "react";
import Flashcard from "./Flashcard";
import * as fuzz from "fuzzball";

const Flashcards = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [masteredCards, setMasteredCards] = useState([]);

  const handleNextCard = () => {
    if (flashcards.length === 0) return;  // Prevent errors
    setFlipped(false);
    setUserInput("");
    setFeedback(null);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    }, 300);
  };
  
  const handlePrevCard = () => {
    if (flashcards.length === 0) return;  // Prevent errors
    setFlipped(false);
    setUserInput("");
    setFeedback(null);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };
  

  const handleShuffle = () => {
    setFlipped(false);
    setUserInput("");
    setFeedback(null);
    setCurrentIndex(Math.floor(Math.random() * flashcards.length));
  };

  const checkAnswer = () => {
    const correctAnswer = flashcards[currentIndex].answer;
    const similarity = fuzz.ratio(userInput.toLowerCase(), correctAnswer.toLowerCase());
    if (similarity >= 80) {
      setFeedback("Correct!");
      setCorrectStreak(correctStreak + 1);
      if (correctStreak + 1 > longestStreak) {
        setLongestStreak(correctStreak + 1);
      }
    } else {
      setFeedback("Incorrect. Try again!");
      setCorrectStreak(0);
    }
  };

  const markAsMastered = () => {
    setMasteredCards([...masteredCards, flashcards[currentIndex]]);
  };
  console.log("Flashcards data:", flashcards);


  return (
    <div className="flashcards-container">
      {/* console.log("Current Flashcard:", flashcards[currentIndex]); */}
      <Flashcard flashcard={flashcards[currentIndex]} flipped={flipped} onFlip={() => setFlipped(!flipped)} />
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter your answer"
        className="input-box"
      />
      <button onClick={checkAnswer} className="submit-btn">Submit</button>
      {feedback && <p className="feedback">{feedback}</p>}
      <p>Current Streak: {correctStreak}</p>
      <p>Longest Streak: {longestStreak}</p>
      <div className="button-group">
        <button onClick={handlePrevCard} className="nav-btn">Back</button>
        <button onClick={handleNextCard} className="nav-btn">Next</button>
        <button onClick={handleShuffle} className="shuffle-btn">Shuffle</button>
        <button onClick={markAsMastered} className="master-btn">Mastered</button>
      </div>
    </div>
  );
};

export default Flashcards;
