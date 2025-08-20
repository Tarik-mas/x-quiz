import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  XCircle,
  Timer,
  Brain
} from "lucide-react";

interface QuizQuestion {
  id: string;
  type: "multiple-choice" | "short-answer" | "coding" | "true-false";
  question: string;
  options?: string[];
  correctAnswer?: string | number;
  explanation?: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  questions: QuizQuestion[];
  adaptiveMode: boolean;
  createdAt: string;
}

interface QuizTakerProps {
  quiz: Quiz;
  onBack: () => void;
}

const QuizTaker = ({ quiz, onBack }: QuizTakerProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit * 60); // Convert to seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState<{ score: number; correctAnswers: number; totalQuestions: number } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (timeRemaining > 0 && !isSubmitted) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeRemaining, isSubmitted]);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (answer: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateResults = () => {
    let correctAnswers = 0;
    let totalPoints = 0;
    let earnedPoints = 0;

    quiz.questions.forEach(question => {
      totalPoints += question.points;
      const userAnswer = answers[question.id];
      
      if (question.type === "multiple-choice" || question.type === "true-false") {
        if (userAnswer === question.correctAnswer) {
          correctAnswers++;
          earnedPoints += question.points;
        }
      } else if (question.type === "short-answer") {
        // Simple text comparison for short answers
        const correctText = (question.correctAnswer as string)?.toLowerCase().trim();
        const userText = (userAnswer as string)?.toLowerCase().trim();
        if (correctText && userText && userText.includes(correctText)) {
          correctAnswers++;
          earnedPoints += question.points;
        }
      }
    });

    const score = Math.round((earnedPoints / totalPoints) * 100);
    return { score, correctAnswers, totalQuestions: quiz.questions.length };
  };

  const handleSubmit = () => {
    const quizResults = calculateResults();
    setResults(quizResults);
    setIsSubmitted(true);

    // Save results to localStorage
    const savedResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    savedResults.push({
      quizId: quiz.id,
      quizTitle: quiz.title,
      ...quizResults,
      answers,
      completedAt: new Date().toISOString(),
    });
    localStorage.setItem('quizResults', JSON.stringify(savedResults));

    toast({
      title: "Quiz Submitted!",
      description: `You scored ${quizResults.score}% (${quizResults.correctAnswers}/${quizResults.totalQuestions})`,
    });
  };

  if (isSubmitted && results) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Quizzes
          </Button>
        </div>

        <Card className="shadow-card">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <CheckCircle className="w-6 h-6 text-success" />
              Quiz Completed!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-primary">{results.score}%</div>
              <div className="text-muted-foreground">
                {results.correctAnswers} out of {results.totalQuestions} correct
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-success">{results.correctAnswers}</div>
                  <div className="text-sm text-muted-foreground">Correct</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-destructive">{results.totalQuestions - results.correctAnswers}</div>
                  <div className="text-sm text-muted-foreground">Incorrect</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{results.score}%</div>
                  <div className="text-sm text-muted-foreground">Score</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Review Your Answers</h3>
              {quiz.questions.map((question, index) => {
                const userAnswer = answers[question.id];
                const isCorrect = question.type === "multiple-choice" || question.type === "true-false" 
                  ? userAnswer === question.correctAnswer
                  : question.type === "short-answer" 
                    ? (userAnswer as string)?.toLowerCase().includes((question.correctAnswer as string)?.toLowerCase())
                    : false;

                return (
                  <Card key={question.id} className={`border-2 ${isCorrect ? 'border-success/30' : 'border-destructive/30'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive mt-0.5" />
                        )}
                        <div className="flex-1 space-y-2">
                          <p className="font-medium">Question {index + 1}: {question.question}</p>
                          
                          <div className="space-y-2">
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Your answer: </span>
                              <span className={isCorrect ? 'text-success' : 'text-destructive'}>
                                {question.options && typeof userAnswer === 'number' 
                                  ? `${String.fromCharCode(65 + userAnswer)}. ${question.options[userAnswer]}`
                                  : userAnswer || 'No answer provided'
                                }
                              </span>
                            </div>
                            
                            {!isCorrect && (
                              <div>
                                <span className="text-sm font-medium text-muted-foreground">Correct answer: </span>
                                <span className="text-success">
                                  {question.options && typeof question.correctAnswer === 'number'
                                    ? `${String.fromCharCode(65 + question.correctAnswer)}. ${question.options[question.correctAnswer]}`
                                    : question.correctAnswer
                                  }
                                </span>
                              </div>
                            )}
                            
                            {question.explanation && (
                              <div className="p-3 bg-accent/10 rounded-lg">
                                <span className="text-sm font-medium text-muted-foreground">Explanation: </span>
                                <span className="text-sm">{question.explanation}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{quiz.title}</h1>
            <p className="text-muted-foreground">{quiz.description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Timer className="w-4 h-4" />
            <span className={timeRemaining < 300 ? 'text-destructive font-medium' : ''}>
              {formatTime(timeRemaining)}
            </span>
          </div>
          {quiz.adaptiveMode && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Brain className="w-3 h-3" />
              Adaptive
            </Badge>
          )}
        </div>
      </div>

      {/* Progress */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Question */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Question {currentQuestionIndex + 1}</CardTitle>
            <Badge variant="outline">{currentQuestion.points} point{currentQuestion.points !== 1 ? 's' : ''}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg">{currentQuestion.question}</p>

          {/* Multiple Choice / True-False */}
          {(currentQuestion.type === "multiple-choice" || currentQuestion.type === "true-false") && (
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Button
                    variant={answers[currentQuestion.id] === index ? "default" : "outline"}
                    className="w-8 h-8 p-0 rounded-full"
                    onClick={() => handleAnswerChange(index)}
                  >
                    {String.fromCharCode(65 + index)}
                  </Button>
                  <span className="flex-1 cursor-pointer" onClick={() => handleAnswerChange(index)}>
                    {option}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Short Answer */}
          {currentQuestion.type === "short-answer" && (
            <div className="space-y-2">
              <Textarea
                placeholder="Enter your answer here..."
                value={answers[currentQuestion.id] as string || ""}
                onChange={(e) => handleAnswerChange(e.target.value)}
                rows={4}
              />
            </div>
          )}

          {/* Coding Exercise */}
          {currentQuestion.type === "coding" && (
            <div className="space-y-2">
              <Textarea
                placeholder="Write your code here..."
                value={answers[currentQuestion.id] as string || ""}
                onChange={(e) => handleAnswerChange(e.target.value)}
                rows={8}
                className="font-mono"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={previousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        <div className="flex gap-2">
          {currentQuestionIndex === quiz.questions.length - 1 ? (
            <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
              Submit Quiz
            </Button>
          ) : (
            <Button onClick={nextQuestion}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizTaker;