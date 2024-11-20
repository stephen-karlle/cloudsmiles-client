import { useEffect, useState } from "react";
import { IAnimatedText } from '@interfaces/chatbot.types'

const AnimatedText = ({ message, isGenerating, setIsGenerating }: IAnimatedText) => {
  const staggerDelay = 100;
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  
  useEffect(() => {
    if (isGenerating && message) {
      let timeout: number | undefined = undefined;
      let index = 0;
      const words = message.split(" "); // Split once to optimize

      const addWord = () => {
        if (index < words.length) { // Adjust condition to include the last word
          setDisplayedWords((prevWords) => [...prevWords, words[index]]);
          index++;
          timeout = setTimeout(addWord, staggerDelay);       
        } else {
          setIsGenerating(false);
        }
      };

      addWord();

      return () => {
        if (timeout) clearTimeout(timeout);
      };
    } else {
      // Reset displayedWords when isGenerating is false or message is empty
      setDisplayedWords([]);
    }
  }, [isGenerating, message]); // Include message in the dependency array

  return (
    <p className="ring-1 ring-gray-200 py-2 px-4 rounded-tl-none rounded-3xl w-fit text-base text-gray-700 whitespace-pre-line [overflow-wrap:anywhere] ">
      {displayedWords.map((word, index) => (
        word === undefined ? null : (
          <span key={index}>
            {word + " "}
          </span>
        )
      ))}
      {isGenerating && <span className="text-gray-700 animate-pulse">●</span>}
    </p>
  );
};

export default AnimatedText;