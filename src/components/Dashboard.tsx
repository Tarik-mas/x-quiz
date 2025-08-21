import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Users, 
  FileText, 
  ClipboardList, 
  BarChart3,
  Plus,
  Eye,
  Edit,
  Star,
  Clock,
  CheckCircle
} from "lucide-react";

interface DashboardProps {
  userRole: "teacher" | "student" | "admin";
  onNavigate: (view: "dashboard" | "quiz-builder" | "form-builder" | "quiz-list") => void;
}

const Dashboard = ({ userRole, onNavigate }: DashboardProps) => {
  const teacherStats = [
    { title: "Active Forms", value: "12", change: "+3", icon: FileText, color: "primary" },
    { title: "Quiz Templates", value: "8", change: "+2", icon: ClipboardList, color: "secondary" },
    { title: "Students", value: "156", change: "+12", icon: Users, color: "accent" },
    { title: "Completion Rate", value: "89%", change: "+5%", icon: TrendingUp, color: "success" },
  ];

  const studentStats = [
    { title: "Assignments Due", value: "3", change: "Due Today", icon: Clock, color: "warning" },
    { title: "Completed Quizzes", value: "24", change: "+2", icon: CheckCircle, color: "success" },
    { title: "Average Score", value: "87%", change: "+3%", icon: Star, color: "primary" },
    { title: "Course Progress", value: "76%", change: "+8%", icon: BarChart3, color: "secondary" },
  ];

  const adminStats = [
    { title: "Total Users", value: "1,234", change: "+89", icon: Users, color: "primary" },
    { title: "Active Courses", value: "45", change: "+5", icon: FileText, color: "secondary" },
    { title: "System Usage", value: "92%", change: "+2%", icon: TrendingUp, color: "success" },
    { title: "Support Tickets", value: "12", change: "-3", icon: ClipboardList, color: "accent" },
  ];

  const getStats = () => {
    switch (userRole) {
      case "teacher": return teacherStats;
      case "student": return studentStats;
      case "admin": return adminStats;
      default: return teacherStats;
    }
  };

  const recentActivity = [
    { action: "Created new quiz", item: "Mathematics Assessment #3", time: "2 hours ago", type: "quiz" },
    { action: "Form submitted", item: "Student Registration Form", time: "4 hours ago", type: "form" },
    { action: "AI suggestion applied", item: "Question Auto-generation", time: "1 day ago", type: "ai" },
    { action: "Analytics updated", item: "Weekly Performance Report", time: "2 days ago", type: "analytics" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-soft to-secondary/20 rounded-xl p-6 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Welcome to X-EdTech, {userRole === "teacher" ? "Teacher" : userRole === "student" ? "Student" : "Admin"}!
            </h1>
            <p className="text-muted-foreground">
              {userRole === "teacher" && "Create engaging forms and quizzes with AI-powered insights."}
              {userRole === "student" && "Track your progress and complete assignments efficiently."}
              {userRole === "admin" && "Monitor system performance and manage users effectively."}
            </p>
          </div>
          <div className="flex gap-2">
            {userRole === "teacher" && (
              <>
                <Button 
                  className="bg-primary hover:bg-primary/90 shadow-glow"
                  onClick={() => onNavigate("form-builder")}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Form
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => onNavigate("quiz-builder")}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Quiz
                </Button>
              </>
            )}
            {userRole === "admin" && (
              <Button className="bg-primary hover:bg-primary/90 shadow-glow">
                <Eye className="w-4 h-4 mr-2" />
                System Overview
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getStats().map((stat, index) => (
          <Card key={index} className="relative overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg bg-${stat.color}-soft`}>
                  <stat.icon className={`w-4 h-4 text-${stat.color}`} />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Get started with common tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {userRole === "teacher" && (
              <>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2 h-12"
                  onClick={() => onNavigate("form-builder")}
                >
                  <FileText className="w-4 h-4" />
                  Create Smart Form
                  <Badge className="ml-auto bg-accent text-accent-foreground">AI Enhanced</Badge>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2 h-12"
                  onClick={() => onNavigate("quiz-builder")}
                >
                  <ClipboardList className="w-4 h-4" />
                  Build Adaptive Quiz
                  <Badge className="ml-auto bg-primary text-primary-foreground">New</Badge>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 h-12">
                  <BarChart3 className="w-4 h-4" />
                  View AI Insights
                  <Badge className="ml-auto bg-secondary text-secondary-foreground">Trending</Badge>
                </Button>
              </>
            )}
            {userRole === "student" && (
              <>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2 h-12"
                  onClick={() => onNavigate("quiz-list")}
                >
                  <ClipboardList className="w-4 h-4" />
                  Available Quizzes
                  <Badge className="ml-auto bg-primary text-primary-foreground">
                    {(() => {
                      const savedQuizzes = JSON.parse(localStorage.getItem('savedQuizzes') || '[]');
                      return savedQuizzes.length;
                    })()}
                  </Badge>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 h-12">
                  <BarChart3 className="w-4 h-4" />
                  My Results
                  <Badge className="ml-auto bg-success">
                    {(() => {
                      const savedResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
                      return savedResults.length;
                    })()} Completed
                  </Badge>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 h-12">
                  <Clock className="w-4 h-4" />
                  View Pending Assignments
                  <Badge className="ml-auto bg-warning text-warning-foreground">3 Due</Badge>
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates and actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 bg-${
                  activity.type === 'ai' ? 'accent' : 
                  activity.type === 'quiz' ? 'primary' : 
                  activity.type === 'form' ? 'secondary' : 'muted-foreground'
                }`} />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.item}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Preview */}
      <Card className="shadow-card bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-accent" />
            AI Insights Preview
          </CardTitle>
          <CardDescription>
            Predictive analytics and smart recommendations (Mock Data)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Quiz Performance Trend</span>
                <span className="text-sm text-accent">↗ Improving</span>
              </div>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-muted-foreground">Students showing 15% improvement</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Form Completion Rate</span>
                <span className="text-sm text-primary">92%</span>
              </div>
              <Progress value={92} className="h-2" />
              <p className="text-xs text-muted-foreground">Above average completion</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">AI Suggestions Applied</span>
                <span className="text-sm text-secondary">24/30</span>
              </div>
              <Progress value={80} className="h-2" />
              <p className="text-xs text-muted-foreground">High adoption of AI recommendations</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;