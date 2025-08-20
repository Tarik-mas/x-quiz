import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ClipboardList, 
  Clock, 
  Star, 
  ArrowLeft,
  Play,
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

interface QuizListProps {
  onBack: () => void;
  onStartQuiz: (quiz: Quiz) => void;
}

const QuizList = ({ onBack, onStartQuiz }: QuizListProps) => {
  const [availableQuizzes, setAvailableQuizzes] = useState<Quiz[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);

  useEffect(() => {
    // Load quizzes from localStorage
    const savedQuizzes = JSON.parse(localStorage.getItem('savedQuizzes') || '[]');
    setAvailableQuizzes(savedQuizzes);

    // Load completed quiz IDs
    const savedResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    const completedIds = savedResults.map((result: any) => result.quizId);
    setCompletedQuizzes(completedIds);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "text-success";
      case "medium": return "text-warning"; 
      case "hard": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getAverageDifficulty = (questions: QuizQuestion[]) => {
    const difficultyScores = questions.map(q => {
      switch (q.difficulty) {
        case "easy": return 1;
        case "medium": return 2;
        case "hard": return 3;
        default: return 2;
      }
    });
    const average = difficultyScores.reduce((sum, score) => sum + score, 0) / difficultyScores.length;
    
    if (average <= 1.5) return "easy";
    if (average <= 2.5) return "medium";
    return "hard";
  };

  const getQuizResult = (quizId: string) => {
    const savedResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    return savedResults.find((result: any) => result.quizId === quizId);
  };

  if (availableQuizzes.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Available Quizzes</h1>
        </div>

        <Card className="shadow-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ClipboardList className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Quizzes Available</h3>
            <p className="text-muted-foreground text-center">
              No quizzes have been created yet. Ask your teacher to create some quizzes for you to take.
            </p>
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
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Available Quizzes</h1>
            <p className="text-muted-foreground">Select a quiz to start taking it</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{availableQuizzes.length} quiz{availableQuizzes.length !== 1 ? 'es' : ''} available</span>
        </div>
      </div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableQuizzes.map((quiz) => {
          const isCompleted = completedQuizzes.includes(quiz.id);
          const result = getQuizResult(quiz.id);
          const averageDifficulty = getAverageDifficulty(quiz.questions);
          const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);

          return (
            <Card key={quiz.id} className={`shadow-card transition-all duration-300 hover:shadow-elegant ${
              isCompleted ? 'border-success/30 bg-success/5' : 'hover:border-primary/30'
            }`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{quiz.title}</CardTitle>
                  {isCompleted && (
                    <Badge variant="secondary" className="bg-success/20 text-success">
                      Completed
                    </Badge>
                  )}
                </div>
                <CardDescription className="line-clamp-2">
                  {quiz.description || "No description provided"}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{quiz.timeLimit} min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-muted-foreground" />
                    <span>{quiz.questions.length} questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-muted-foreground" />
                    <span>{totalPoints} points</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${getDifficultyColor(averageDifficulty)}`}>
                      {averageDifficulty} level
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {quiz.adaptiveMode && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Brain className="w-3 h-3" />
                      Adaptive
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    Created {new Date(quiz.createdAt).toLocaleDateString()}
                  </Badge>
                </div>

                {isCompleted && result && (
                  <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-success">Previous Score</span>
                      <span className="text-sm font-bold text-success">{result.score}%</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {result.correctAnswers}/{result.totalQuestions} correct
                    </div>
                  </div>
                )}

                <Button 
                  className="w-full"
                  onClick={() => onStartQuiz(quiz)}
                  variant={isCompleted ? "outline" : "default"}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isCompleted ? "Retake Quiz" : "Start Quiz"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Results Summary */}
      {completedQuizzes.length > 0 && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Your Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{completedQuizzes.length}</div>
                <div className="text-sm text-muted-foreground">Quizzes Completed</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-success">
                  {(() => {
                    const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
                    const avgScore = results.length > 0 
                      ? Math.round(results.reduce((sum: number, r: any) => sum + r.score, 0) / results.length)
                      : 0;
                    return avgScore;
                  })()}%
                </div>
                <div className="text-sm text-muted-foreground">Average Score</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-accent">{availableQuizzes.length - completedQuizzes.length}</div>
                <div className="text-sm text-muted-foreground">Remaining</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuizList;