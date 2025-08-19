import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import Dashboard from "@/components/Dashboard";
import FormBuilder from "@/components/FormBuilder";
import QuizBuilder from "@/components/QuizBuilder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, GraduationCap, Settings } from "lucide-react";

const Index = () => {
  const [currentView, setCurrentView] = useState<"role-select" | "dashboard" | "form-builder" | "quiz-builder">("role-select");
  const [userRole, setUserRole] = useState<"teacher" | "student" | "admin">("teacher");

  const handleNavigate = (view: "dashboard" | "quiz-builder" | "form-builder") => {
    setCurrentView(view);
  };

  if (currentView === "role-select") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-primary-soft flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome to X-EdTech</h1>
            <p className="text-xl text-muted-foreground">Choose your role to get started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card 
              className="cursor-pointer transition-all duration-300 hover:shadow-elegant hover:scale-105 border-2 hover:border-primary shadow-card"
              onClick={() => {
                setUserRole("teacher");
                setCurrentView("dashboard");
              }}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-primary-soft rounded-lg flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Teacher</CardTitle>
                <CardDescription>Create forms, quizzes, and manage students</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-full justify-center">Form Builder</Badge>
                  <Badge variant="secondary" className="w-full justify-center">Quiz Creator</Badge>
                  <Badge variant="secondary" className="w-full justify-center">AI Insights</Badge>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer transition-all duration-300 hover:shadow-elegant hover:scale-105 border-2 hover:border-secondary shadow-card"
              onClick={() => {
                setUserRole("student");
                setCurrentView("dashboard");
              }}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle className="text-lg">Student</CardTitle>
                <CardDescription>Take quizzes, submit assignments, track progress</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-full justify-center">Assignments</Badge>
                  <Badge variant="secondary" className="w-full justify-center">Quiz Taking</Badge>
                  <Badge variant="secondary" className="w-full justify-center">Progress Tracking</Badge>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer transition-all duration-300 hover:shadow-elegant hover:scale-105 border-2 hover:border-accent shadow-card"
              onClick={() => {
                setUserRole("admin");
                setCurrentView("dashboard");
              }}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Settings className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-lg">Admin</CardTitle>
                <CardDescription>Manage users, system settings, and analytics</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-full justify-center">User Management</Badge>
                  <Badge variant="secondary" className="w-full justify-center">System Analytics</Badge>
                  <Badge variant="secondary" className="w-full justify-center">Configuration</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              This is a demo version. All AI features are mocked for demonstration purposes.
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
      default:
        return <Dashboard userRole={userRole} onNavigate={handleNavigate} />;
    }
  };

  return (
    <DashboardLayout userRole={userRole}>
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant={currentView === "dashboard" ? "default" : "ghost"}
          onClick={() => setCurrentView("dashboard")}
        >
          Dashboard
        </Button>
        {userRole === "teacher" && (
          <>
            <Button
              variant={currentView === "form-builder" ? "default" : "ghost"}
              onClick={() => setCurrentView("form-builder")}
            >
              Form Builder
            </Button>
            <Button
              variant={currentView === "quiz-builder" ? "default" : "ghost"}
              onClick={() => setCurrentView("quiz-builder")}
            >
              Quiz Builder
            </Button>
          </>
        )}
        <Button
          variant="outline"
          onClick={() => setCurrentView("role-select")}
          className="ml-auto"
        >
          Switch Role
        </Button>
      </div>
      {renderContent()}
    </DashboardLayout>
  );
};

export default Index;
