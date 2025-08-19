import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Plus, 
  Trash2, 
  Eye, 
  Save, 
  Sparkles, 
  Settings,
  GripVertical,
  HelpCircle,
  CheckCircle,
  Code,
  Timer,
  Brain,
  BarChart3
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

const QuizBuilder = () => {
  const [quizTitle, setQuizTitle] = useState("Untitled Quiz");
  const [quizDescription, setQuizDescription] = useState("");
  const [timeLimit, setTimeLimit] = useState([30]);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [adaptiveMode, setAdaptiveMode] = useState(false);

  const questionTypes = [
    { type: "multiple-choice", label: "Multiple Choice", icon: CheckCircle },
    { type: "short-answer", label: "Short Answer", icon: HelpCircle },
    { type: "coding", label: "Coding Exercise", icon: Code },
    { type: "true-false", label: "True/False", icon: CheckCircle },
  ];

  const addQuestion = (type: QuizQuestion["type"]) => {
    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      type,
      question: `Enter your ${type.replace('-', ' ')} question here...`,
      difficulty: "medium",
      points: 1,
      options: type === "multiple-choice" ? ["Option A", "Option B", "Option C", "Option D"] : 
               type === "true-false" ? ["True", "False"] : undefined,
      correctAnswer: type === "multiple-choice" ? 0 : type === "true-false" ? 0 : "",
    };
    setQuestions([...questions, newQuestion]);
    setSelectedQuestion(newQuestion.id);
  };

  const updateQuestion = (id: string, updates: Partial<QuizQuestion>) => {
    setQuestions(questions.map(question => 
      question.id === id ? { ...question, ...updates } : question
    ));
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(question => question.id !== id));
    if (selectedQuestion === id) setSelectedQuestion(null);
  };

  const aiQuestions = [
    { type: "multiple-choice", question: "What is the capital of France?", difficulty: "easy" },
    { type: "short-answer", question: "Explain the concept of photosynthesis", difficulty: "medium" },
    { type: "coding", question: "Write a function to reverse a string", difficulty: "hard" },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "text-success";
      case "medium": return "text-warning";
      case "hard": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Quiz & Assessment Builder</h1>
          <p className="text-muted-foreground">Create adaptive quizzes with AI-powered features</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview Quiz
          </Button>
          <Button className="bg-primary hover:bg-primary/90 shadow-glow">
            <Save className="w-4 h-4 mr-2" />
            Save Quiz
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question Types Panel */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-sm">Question Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {questionTypes.map((questionType) => (
              <Button
                key={questionType.type}
                variant="outline"
                className="w-full justify-start gap-2 h-12 text-left hover:bg-primary/10 hover:border-primary/30 transition-all"
                onClick={() => {
                  console.log('Adding question type:', questionType.type);
                  addQuestion(questionType.type as QuizQuestion["type"]);
                }}
              >
                <Plus className="w-4 h-4 text-primary" />
                <questionType.icon className="w-4 h-4" />
                <span className="flex-1">{questionType.label}</span>
              </Button>
            ))}
            <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-dashed border-muted-foreground/30">
              <p className="text-xs text-muted-foreground text-center">
                Click any button above to add a new question
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quiz Builder */}
        <div className="lg:col-span-2 space-y-4">
          {/* Quiz Settings */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Quiz Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Quiz Title</Label>
                  <Input
                    id="title"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    placeholder="Enter quiz title..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Time Limit (minutes)</Label>
                  <div className="px-3">
                    <Slider
                      value={timeLimit}
                      onValueChange={setTimeLimit}
                      max={120}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>5 min</span>
                      <span className="font-medium">{timeLimit[0]} min</span>
                      <span>120 min</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={quizDescription}
                  onChange={(e) => setQuizDescription(e.target.value)}
                  placeholder="Describe your quiz..."
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-accent" />
                  <div>
                    <Label>Adaptive Difficulty</Label>
                    <p className="text-xs text-muted-foreground">AI adjusts question difficulty based on responses</p>
                  </div>
                </div>
                <Switch
                  checked={adaptiveMode}
                  onCheckedChange={setAdaptiveMode}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span>Total Questions: {questions.length}</span>
                <span>Total Points: {totalPoints}</span>
                <span>Estimated Time: {Math.ceil(questions.length * 2)} min</span>
              </div>
            </CardContent>
          </Card>

          {/* Questions List */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Questions ({questions.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {questions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No questions added yet. Start by selecting a question type from the left panel.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {questions.map((question, index) => (
                    <div
                      key={question.id}
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        selectedQuestion === question.id 
                          ? "border-primary bg-primary-soft" 
                          : "border-border bg-background hover:border-muted"
                      }`}
                      onClick={() => setSelectedQuestion(question.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <GripVertical className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium text-sm">Question {index + 1}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {question.type.replace('-', ' ')}
                          </Badge>
                          <Badge className={`text-xs ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {question.points} pt{question.points !== 1 ? 's' : ''}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeQuestion(question.id);
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-foreground mb-2">{question.question}</p>
                      
                      {question.options && (
                        <div className="space-y-1">
                          {question.options.map((option, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span className={`w-2 h-2 rounded-full ${
                                question.correctAnswer === i ? 'bg-success' : 'bg-muted'
                              }`} />
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* AI Suggestions & Question Editor */}
        <div className="space-y-4">
          {/* AI Question Generator */}
          <Card className="shadow-card bg-gradient-to-b from-accent/5 to-primary/5 border-accent/20">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                AI Question Generator
              </CardTitle>
              <CardDescription>Auto-generate questions (Mock)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiQuestions.map((suggestion, index) => (
                <div key={index} className="p-3 rounded-lg bg-background border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {suggestion.type.replace('-', ' ')}
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => addQuestion(suggestion.type as QuizQuestion["type"])}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-foreground">{suggestion.question}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs ${getDifficultyColor(suggestion.difficulty)}`}>
                      {suggestion.difficulty}
                    </span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" size="sm">
                <Sparkles className="w-3 h-3 mr-1" />
                Generate More
              </Button>
            </CardContent>
          </Card>

          {/* Quiz Analytics Preview */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Quiz Analytics Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Difficulty Distribution</span>
                </div>
                <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-muted">
                  <div className="bg-success flex-1" style={{ width: '40%' }} />
                  <div className="bg-warning flex-1" style={{ width: '35%' }} />
                  <div className="bg-destructive flex-1" style={{ width: '25%' }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Easy</span>
                  <span>Medium</span>
                  <span>Hard</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <span className="text-xs font-medium">Predicted Performance</span>
                <div className="text-xs text-muted-foreground">
                  <div>Average Score: 78%</div>
                  <div>Completion Rate: 92%</div>
                  <div>Time Usage: 85%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Question Editor */}
          {selectedQuestion && (
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-sm">Question Editor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(() => {
                  const question = questions.find(q => q.id === selectedQuestion);
                  if (!question) return null;

                  return (
                    <>
                      <div className="space-y-2">
                        <Label>Question</Label>
                        <Textarea
                          value={question.question}
                          onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                          rows={3}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Difficulty</Label>
                          <Select 
                            value={question.difficulty} 
                            onValueChange={(value) => updateQuestion(question.id, { difficulty: value as QuizQuestion["difficulty"] })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="easy">Easy</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Points</Label>
                          <Input
                            type="number"
                            value={question.points}
                            onChange={(e) => updateQuestion(question.id, { points: parseInt(e.target.value) || 1 })}
                            min="1"
                          />
                        </div>
                      </div>

                      {(question.type === "multiple-choice" || question.type === "true-false") && (
                        <div className="space-y-2">
                          <Label>Options</Label>
                          {question.options?.map((option, i) => (
                            <div key={i} className="flex gap-2 items-center">
                              <Button
                                variant={question.correctAnswer === i ? "default" : "outline"}
                                size="sm"
                                onClick={() => updateQuestion(question.id, { correctAnswer: i })}
                                className="w-8 h-8 p-0"
                              >
                                {String.fromCharCode(65 + i)}
                              </Button>
                              <Input
                                value={option}
                                onChange={(e) => {
                                  const newOptions = [...(question.options || [])];
                                  newOptions[i] = e.target.value;
                                  updateQuestion(question.id, { options: newOptions });
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {question.type === "short-answer" && (
                        <div className="space-y-2">
                          <Label>Sample Answer</Label>
                          <Textarea
                            value={question.correctAnswer as string || ""}
                            onChange={(e) => updateQuestion(question.id, { correctAnswer: e.target.value })}
                            placeholder="Enter a sample correct answer..."
                            rows={2}
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label>Explanation (Optional)</Label>
                        <Textarea
                          value={question.explanation || ""}
                          onChange={(e) => updateQuestion(question.id, { explanation: e.target.value })}
                          placeholder="Explain the correct answer..."
                          rows={2}
                        />
                      </div>
                    </>
                  );
                })()}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizBuilder;