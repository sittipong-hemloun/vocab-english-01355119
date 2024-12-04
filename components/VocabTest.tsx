'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { vocabularyData } from '@/data/vocabulary';
import { Vocabulary } from '@/types/vocabulary';

interface VocabTestProps {
  category: string | null;
}

export default function VocabTest({ category }: VocabTestProps) {
  const [vocabList, setVocabList] = useState<Vocabulary[]>([]);
  const [currentVocab, setCurrentVocab] = useState<Vocabulary | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

  // Text-to-speech setup
  const speakText = useCallback((text: string, language: 'en-US' | 'th-TH' = 'en-US') => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    const filteredVocab = vocabularyData.filter((v) => v.category === category);
    setVocabList(filteredVocab);
    selectRandomVocab(filteredVocab);
  }, [category]);

  useEffect(() => {
    if (currentVocab) {
      speakText(currentVocab.english, 'en-US');
    }
  }, [currentVocab, speakText]);

  const selectRandomVocab = (list: Vocabulary[]) => {
    if (list.length > 0) {
      const randomIndex = Math.floor(Math.random() * list.length);
      setCurrentVocab(list[randomIndex]);
      setUserAnswer('');
      setIsCorrect(null);
      setCorrectAnswer(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentVocab) {
      const isAnswerCorrect = userAnswer.toLowerCase().trim() === currentVocab.english.toLowerCase().trim();
      setIsCorrect(isAnswerCorrect);

      if (isAnswerCorrect) {
        speakText(currentVocab.english);
        setTimeout(() => selectRandomVocab(vocabList), 500);
      } else {
        setCorrectAnswer(currentVocab.english);
        speakText(currentVocab.english);
      }
    }
  };

  const handleNext = () => {
    selectRandomVocab(vocabList);
  };

  if (!currentVocab) return <div>กำลังโหลด...</div>;

  return (
    <div className=" bg-white rounded-lg shadow-lg p-2">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        ทายคำศัพท์ภาษาอังกฤษ
      </h2>

      <div className="flex justify-center mb-4">
        <button
          onClick={() => speakText(currentVocab.english)}
          className="mr-2 px-3 py-1 bg-blue-400 text-white rounded"
        >
          🔊
        </button>
      </div>

      <div className="mb-4 text-center text-xl font-semibold text-blue-600">
        {currentVocab.thai}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder={"Type translation"}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200"
        >
          {'Check Answer'}
        </button>
      </form>

      {isCorrect !== null && (
        <div className={`mt-4 text-center font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
          {isCorrect ? '✅ ถูกต้อง!' : '❌ ผิด!'}
        </div>
      )}

      {correctAnswer && !isCorrect && (
        <div className="mt-4 text-center text-gray-700">
          <span className="font-medium">คำตอบที่ถูกต้อง:</span> {correctAnswer}
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
}