import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import Dashboard from "@/components/Dashboard";
import FormBuilder from "@/components/FormBuilder";
import QuizBuilder from "@/components/QuizBuilder";
import QuizList from "@/components/QuizList";
import QuizTaker from "@/components/QuizTaker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, GraduationCap, Settings } from "lucide-react";

interface Quiz {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  questions: any[];
  adaptiveMode: boolean;
  createdAt: string;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<"role-select" | "dashboard" | "form-builder" | "quiz-builder" | "quiz-list" | "quiz-taker">("role-select");
  const [userRole, setUserRole] = useState<"teacher" | "student" | "admin">("teacher");
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  const handleNavigate = (view: "dashboard" | "quiz-builder" | "form-builder" | "quiz-list") => {
    setCurrentView(view);
  };

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentView("quiz-taker");
  };

  const handleBackFromQuiz = () => {
    setSelectedQuiz(null);
    setCurrentView("quiz-list");
  };

  if (currentView === "role-select") {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-8">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="w-20 h-20 bg-gradient-hero rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce-subtle">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold gradient-text mb-4 tracking-tight">Welcome to QuizCraft</h1>
            <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Choose your role to unlock the power of intelligent quiz creation and learning analytics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card 
              className="cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 border-2 hover:border-primary/30 group animate-fade-in-up bg-gradient-card"
              style={{ animationDelay: '0.1s' }}
              onClick={() => {
                setUserRole("teacher");
                setCurrentView("dashboard");
              }}
            >
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl gradient-text">Teacher</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Create forms, quizzes, and manage students with AI-powered insights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge variant="secondary" className="w-full justify-center py-2 text-sm bg-primary-soft text-primary border-primary/20">
                  Form Builder
                </Badge>
                <Badge variant="secondary" className="w-full justify-center py-2 text-sm bg-secondary-soft text-secondary border-secondary/20">
                  Quiz Creator
                </Badge>
                <Badge variant="secondary" className="w-full justify-center py-2 text-sm bg-accent-soft text-accent border-accent/20">
                  AI Insights
                </Badge>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 border-2 hover:border-secondary/30 group animate-fade-in-up bg-gradient-card"
              style={{ animationDelay: '0.2s' }}
              onClick={() => {
                setUserRole("student");
                setCurrentView("dashboard");
              }}
            >
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-secondary/30 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="text-2xl gradient-text">Student</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Take quizzes, submit assignments, and track your learning progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge variant="secondary" className="w-full justify-center py-2 text-sm bg-primary-soft text-primary border-primary/20">
                  Assignments
                </Badge>
                <Badge variant="secondary" className="w-full justify-center py-2 text-sm bg-secondary-soft text-secondary border-secondary/20">
                  Quiz Taking
                </Badge>
                <Badge variant="secondary" className="w-full justify-center py-2 text-sm bg-success-soft text-success border-success/20">
                  Progress Tracking
                </Badge>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 border-2 hover:border-accent/30 group animate-fade-in-up bg-gradient-card"
              style={{ animationDelay: '0.3s' }}
              onClick={() => {
                setUserRole("admin");
                setCurrentView("dashboard");
              }}
            >
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/30 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Settings className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-2xl gradient-text">Admin</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Manage users, system settings, and comprehensive analytics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge variant="secondary" className="w-full justify-center py-2 text-sm bg-primary-soft text-primary border-primary/20">
                  User Management
                </Badge>
                <Badge variant="secondary" className="w-full justify-center py-2 text-sm bg-accent-soft text-accent border-accent/20">
                  System Analytics
                </Badge>
                <Badge variant="secondary" className="w-full justify-center py-2 text-sm bg-secondary-soft text-secondary border-secondary/20">
                  Configuration
                </Badge>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <p className="text-sm text-muted-foreground/70 max-w-md mx-auto leading-relaxed">
              This is a premium demo showcasing modern educational technology. 
              All AI features are simulated for demonstration purposes.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard userRole={userRole} onNavigate={handleNavigate} />;
      case "form-builder":
        return <FormBuilder />;
      case "quiz-builder":
        return <QuizBuilder />;
      case "quiz-list":
        return <QuizList onBack={() => setCurrentView("dashboard")} onStartQuiz={handleStartQuiz} />;
      case "quiz-taker":
        return selectedQuiz ? <QuizTaker quiz={selectedQuiz} onBack={handleBackFromQuiz} /> : <Dashboard userRole={userRole} onNavigate={handleNavigate} />;
      default:
        return <Dashboard userRole={userRole} onNavigate={handleNavigate} />;
    }
  };

  return (
    <DashboardLayout userRole={userRole} onNavigate={handleNavigate}>
      <div className="flex items-center gap-4 mb-8 p-1 bg-muted/30 rounded-2xl backdrop-blur-sm border border-border/50">
        <Button
          variant={currentView === "dashboard" ? "premium" : "ghost"}
          onClick={() => setCurrentView("dashboard")}
          className="rounded-xl"
        >
          Dashboard
        </Button>
        {userRole === "teacher" && (
          <>
            <Button
              variant={currentView === "form-builder" ? "premium" : "ghost"}
              onClick={() => setCurrentView("form-builder")}
              className="rounded-xl"
            >
              Form Builder
            </Button>
            <Button
              variant={currentView === "quiz-builder" ? "premium" : "ghost"}
              onClick={() => setCurrentView("quiz-builder")}
              className="rounded-xl"
            >
              Quiz Builder
            </Button>
          </>
        )}
        {userRole === "student" && (
          <Button
            variant={currentView === "quiz-list" ? "premium" : "ghost"}
            onClick={() => setCurrentView("quiz-list")}
            className="rounded-xl"
          >
            Available Quizzes
          </Button>
        )}
        <Button
          variant="outline"
          onClick={() => setCurrentView("role-select")}
          className="ml-auto rounded-xl border-2 hover:border-primary/30 hover:bg-primary/5"
        >
          Switch Role
        </Button>
      </div>
      {renderContent()}
    </DashboardLayout>
  );
};

export default Index;
