"use client";

import { useState } from "react";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

type Question = {
  text: string;
  options: { text: string; animal: string }[];
};

const questions: Question[] = [
  {
    text: "What is your favorite type of activity?",
    options: [
      { text: "Chasing things", animal: "cat" },
      { text: "Playing fetch", animal: "dog" },
      { text: "Exploring", animal: "fox" },
      { text: "Napping in the sun", animal: "hamster" },
      { text: "Racing", animal: "horse" },
    ],
  },
  {
    text: "How do you prefer to spend your free time?",
    options: [
      { text: "Reading a book", animal: "cat" },
      { text: "Going for a walk", animal: "dog" },
      { text: "Hunting for food", animal: "fox" },
      { text: "Storing food", animal: "hamster" },
      { text: "Running", animal: "horse" },
    ],
  },
  {
    text: "What is your personality like?",
    options: [
      { text: "Independent", animal: "cat" },
      { text: "Friendly", animal: "dog" },
      { text: "Clever", animal: "fox" },
      { text: "Curious", animal: "hamster" },
      { text: "Strong", animal: "horse" },
    ],
  },
  {
    text: "Which environment do you feel most at home in?",
    options: [
      { text: "Indoor", animal: "cat" },
      { text: "Outdoor", animal: "dog" },
      { text: "Forest", animal: "fox" },
      { text: "Burrow", animal: "hamster" },
      { text: "Pasture", animal: "horse" },
    ],
  },
  {
    text: "What is your favorite food?",
    options: [
      { text: "Fish", animal: "cat" },
      { text: "Bones", animal: "dog" },
      { text: "Insects", animal: "fox" },
      { text: "Seeds", animal: "hamster" },
      { text: "Grass", animal: "horse" },
    ],
  },
];

const animalImages: Record<string, string> = {
  cat: "/cat.png",
  dog: "/dog.png",
  fox: "/fox.png",
  hamster: "/hamster.png",
  horse: "/horse.png",
};

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    cat: 0,
    dog: 0,
    fox: 0,
    hamster: 0,
    horse: 0,
  });
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (animal: string) => {
    setScores((prev) => ({ ...prev, [animal]: prev[animal] + 1 }));
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const best = Object.entries(scores).reduce((a, b) =>
        b[1] > a[1] ? b : a
      )[0];
      setResult(best);
    }
  };

  const retake = () => {
    setCurrent(0);
    setScores({
      cat: 0,
      dog: 0,
      fox: 0,
      hamster: 0,
      horse: 0,
    });
    setResult(null);
  };

  if (result) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold">
          You are most like a {result}!
        </h2>
        <img
          src={animalImages[result]}
          alt={result}
          width={256}
          height={256}
          className="rounded-md"
        />
        <Share text={`I am most like a ${result}! Check out this quiz: ${url}`} />
        <button
          onClick={retake}
          className="mt-4 rounded-md bg-primary px-4 py-2 text-white"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  const shuffledOptions = [...questions[current].options].sort(
    () => Math.random() - 0.5
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold">{questions[current].text}</h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt.animal)}
            className="rounded-md bg-secondary px-4 py-2 text-white"
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
