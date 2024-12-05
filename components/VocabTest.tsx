'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { vocabularyData } from '@/data/vocabulary';
import { Vocabulary } from '@/types/vocabulary';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface VocabTestProps {
  category: string | null;
}

interface DictionaryDefinition {
  definition: string;
  example?: string;
}

export default function VocabTest({ category }: VocabTestProps) {
  const [vocabList, setVocabList] = useState<Vocabulary[]>([]);
  const [currentVocab, setCurrentVocab] = useState<Vocabulary | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

  // New state for dictionary hints
  const [hint, setHint] = useState<DictionaryDefinition | null>(null);
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [hintError, setHintError] = useState<string | null>(null);

  // Text-to-speech setup
  const speakText = useCallback((text: string, language: 'en-US' = 'en-US') => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    window.speechSynthesis.speak(utterance);
  }, []);

  // Function to fetch dictionary definition
  const fetchWordDefinition = useCallback(async (word: string) => {
    if (!word) return;

    setIsHintLoading(true);
    setHint(null);
    setHintError(null);

    try {
      // Using free dictionary API
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

      if (response.data && response.data.length > 0) {
        const firstMeaning = response.data[0].meanings[0];
        setHint({
          definition: firstMeaning?.definitions[0]?.definition || 'No definition found',
          example: firstMeaning?.definitions[0]?.example
        });
      } else {
        setHintError('No definition found');
      }
    } catch (error) {
      console.error('Error fetching dictionary definition:', error);
      setHintError('Failed to fetch definition');
    } finally {
      setIsHintLoading(false);
    }
  }, []);

  useEffect(() => {
    const filteredVocab = vocabularyData.filter((v) => v.category === category);
    setVocabList(filteredVocab);
    selectRandomVocab(filteredVocab);
  }, [category]);

  useEffect(() => {
    if (currentVocab) {
      speakText(currentVocab.english, 'en-US');
      // Fetch definition when a new vocab word is selected
      fetchWordDefinition(currentVocab.english);
    }
  }, [currentVocab, speakText, fetchWordDefinition]);

  const selectRandomVocab = (list: Vocabulary[]) => {
    if (list.length > 0) {
      const randomIndex = Math.floor(Math.random() * list.length);
      setCurrentVocab(list[randomIndex]);
      setUserAnswer('');
      setIsCorrect(null);
      setCorrectAnswer(null);
      setHint(null);
      setHintError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentVocab) {
      const isAnswerCorrect = userAnswer.toLowerCase().trim() === currentVocab.english.toLowerCase().trim();
      setIsCorrect(isAnswerCorrect);

      if (isAnswerCorrect) {
        speakText(currentVocab.english);
        setTimeout(() => selectRandomVocab(vocabList), 1000);
      } else {
        setCorrectAnswer(currentVocab.english);
        speakText(currentVocab.english);
      }
    }
  };

  const handleNext = () => {
    selectRandomVocab(vocabList);
  };

  if (!currentVocab) return <div>Loading...</div>;

  return (
    <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-extrabold mb-6 text-center text-gray-900">
        🌟 Guess the Word! 🌟
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentVocab.thai}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className='flex justify-between items-center'
        >
          
          <div className="text-center text-2xl font-bold text-purple-700">
            {currentVocab.thai}
          </div>
          <button
            onClick={() => speakText(currentVocab.english)}
            className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
          >
            🔊
          </button>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center mb-4 space-x-2">
        
      </div>

      {/* Hint Section */}
      {isHintLoading && (
        <div className="mt-4 text-center text-gray-600">Loading hint...</div>
      )}
      {hintError && (
        <div className="mt-4 text-center text-red-600">{hintError}</div>
      )}
      {hint && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 bg-white p-4 rounded-lg shadow-md"
        >
          <h3 className="font-bold text-gray-800 mb-2">Dictionary Hint:</h3>
          <p className="text-gray-700 mb-2">{hint.definition}</p>
          {hint.example && (
            <p className="text-gray-600 italic text-sm">
              Example: {hint.example}
            </p>
          )}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 text-black"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
        >
          Check Answer
        </button>
      </form>

      {isCorrect !== null && (
        <motion.div
          className={`mt-4 text-center text-lg font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isCorrect ? '✅ Correct!' : '❌ Wrong!'}
        </motion.div>
      )}

      {correctAnswer && !isCorrect && (
        <div className="mt-4 text-center text-gray-700">
          <span className="font-medium">Correct Answer:</span> {correctAnswer}
        </div>
      )}

      <div className="mt-6 text-end">
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
        >
          Next Word
        </button>
      </div>
    </div>
  );
}