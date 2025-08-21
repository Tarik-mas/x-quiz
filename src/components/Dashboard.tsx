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
      <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-hero border border-border/30 shadow-xl animate-fade-in-up">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
              Welcome to QuizCraft, {userRole === "teacher" ? "Teacher" : userRole === "student" ? "Student" : "Admin"}! ✨
            </h1>
            <p className="text-white/90 text-lg leading-relaxed">
              {userRole === "teacher" && "Create engaging forms and quizzes with AI-powered insights to revolutionize learning."}
              {userRole === "student" && "Track your progress, complete assignments, and unlock your potential with smart learning."}
              {userRole === "admin" && "Monitor system performance and manage users with comprehensive analytics."}
            </p>
          </div>
          <div className="flex gap-3">
            {userRole === "teacher" && (
              <>
                <Button 
                  variant="premium"
                  size="lg"
                  className="shadow-2xl hover:shadow-glow"
                  onClick={() => onNavigate("form-builder")}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  New Form
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                  onClick={() => onNavigate("quiz-builder")}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  New Quiz
                </Button>
              </>
            )}
            {userRole === "admin" && (
              <Button 
                variant="premium"
                size="lg"
                className="shadow-2xl hover:shadow-glow"
              >
                <Eye className="w-5 h-5 mr-2" />
                System Overview
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getStats().map((stat, index) => (
          <Card 
            key={index} 
            className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up border-0 bg-gradient-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${
                  stat.color === 'primary' ? 'from-primary/20 to-primary-glow/20' :
                  stat.color === 'secondary' ? 'from-secondary/20 to-secondary/30' :
                  stat.color === 'accent' ? 'from-accent/20 to-accent/30' :
                  stat.color === 'success' ? 'from-success/20 to-success/30' :
                  stat.color === 'warning' ? 'from-warning/20 to-warning/30' :
                  'from-muted to-muted/80'
                } shadow-inner`}>
                  <stat.icon className={`w-6 h-6 ${
                    stat.color === 'primary' ? 'text-primary' :
                    stat.color === 'secondary' ? 'text-secondary' :  
                    stat.color === 'accent' ? 'text-accent' :
                    stat.color === 'success' ? 'text-success' :
                    stat.color === 'warning' ? 'text-warning' :
                    'text-muted-foreground'
                  }`} />
                </div>
                <Badge 
                  variant="secondary" 
                  className={`text-xs font-semibold px-3 py-1 ${
                    stat.change.includes('+') ? 'bg-success-soft text-success' :
                    stat.change.includes('-') ? 'bg-destructive-soft text-destructive' :
                    'bg-primary-soft text-primary'
                  }`}
                >
                  {stat.change}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-foreground tracking-tight">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
              </div>
            </CardContent>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 pointer-events-none" />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card className="shadow-lg border-0 bg-gradient-card animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 rounded-xl bg-primary/10">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              Quick Actions
            </CardTitle>
            <CardDescription className="text-base">
              Get started with common tasks and unlock your creativity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userRole === "teacher" && (
              <>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-4 h-16 text-left border-2 hover:border-primary/30 hover:bg-primary/5 hover:scale-105 transition-all duration-300 group"
                  onClick={() => onNavigate("form-builder")}
                >
                  <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Create Smart Form</p>
                    <p className="text-xs text-muted-foreground">Build intelligent forms with AI assistance</p>
                  </div>
                  <Badge className="bg-accent/10 text-accent border-accent/20 font-semibold">AI Enhanced</Badge>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-4 h-16 text-left border-2 hover:border-secondary/30 hover:bg-secondary/5 hover:scale-105 transition-all duration-300 group"
                  onClick={() => onNavigate("quiz-builder")}
                >
                  <div className="p-2 rounded-xl bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                    <ClipboardList className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Build Adaptive Quiz</p>
                    <p className="text-xs text-muted-foreground">Create dynamic quizzes that adapt to learners</p>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20 font-semibold">New</Badge>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-4 h-16 text-left border-2 hover:border-accent/30 hover:bg-accent/5 hover:scale-105 transition-all duration-300 group"
                >
                  <div className="p-2 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <BarChart3 className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">View AI Insights</p>
                    <p className="text-xs text-muted-foreground">Discover patterns and improve engagement</p>
                  </div>
                  <Badge className="bg-secondary/10 text-secondary border-secondary/20 font-semibold">Trending</Badge>
                </Button>
              </>
            )}
            {userRole === "student" && (
              <>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-4 h-16 text-left border-2 hover:border-primary/30 hover:bg-primary/5 hover:scale-105 transition-all duration-300 group"
                  onClick={() => onNavigate("quiz-list")}
                >
                  <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <ClipboardList className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Available Quizzes</p>
                    <p className="text-xs text-muted-foreground">Discover and take exciting quizzes</p>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20 font-bold">
                    {(() => {
                      const savedQuizzes = JSON.parse(localStorage.getItem('savedQuizzes') || '[]');
                      return savedQuizzes.length;
                    })()}
                  </Badge>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-4 h-16 text-left border-2 hover:border-success/30 hover:bg-success/5 hover:scale-105 transition-all duration-300 group"
                >
                  <div className="p-2 rounded-xl bg-success/10 group-hover:bg-success/20 transition-colors">
                    <BarChart3 className="w-5 h-5 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">My Results</p>
                    <p className="text-xs text-muted-foreground">Track your progress and achievements</p>
                  </div>
                  <Badge className="bg-success/10 text-success border-success/20 font-bold">
                    {(() => {
                      const savedResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
                      return savedResults.length;
                    })()} Completed
                  </Badge>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-4 h-16 text-left border-2 hover:border-warning/30 hover:bg-warning/5 hover:scale-105 transition-all duration-300 group"
                >
                  <div className="p-2 rounded-xl bg-warning/10 group-hover:bg-warning/20 transition-colors">
                    <Clock className="w-5 h-5 text-warning" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Pending Assignments</p>
                    <p className="text-xs text-muted-foreground">Stay on top of your deadlines</p>
                  </div>
                  <Badge className="bg-warning/10 text-warning border-warning/20 font-bold">3 Due</Badge>
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-lg border-0 bg-gradient-card animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 rounded-xl bg-primary/10">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              Recent Activity
            </CardTitle>
            <CardDescription className="text-base">
              Stay updated with your latest progress and achievements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-muted/30 to-transparent hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 hover:shadow-md border border-border/30 hover:border-primary/20 group cursor-pointer"
              >
                <div className={`w-3 h-3 rounded-full mt-2.5 shadow-sm ${
                  activity.type === 'ai' ? 'bg-gradient-to-r from-accent to-accent/80 shadow-accent/30' : 
                  activity.type === 'quiz' ? 'bg-gradient-to-r from-primary to-primary/80 shadow-primary/30' : 
                  activity.type === 'form' ? 'bg-gradient-to-r from-secondary to-secondary/80 shadow-secondary/30' : 
                  'bg-gradient-to-r from-muted-foreground to-muted-foreground/80'
                } animate-pulse-glow`} />
                <div className="flex-1 space-y-1.5">
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{activity.action}</p>
                  <p className="text-sm text-muted-foreground/90 font-medium">{activity.item}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity rounded-xl hover:bg-primary/10"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Preview */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-accent/10 via-primary/5 to-secondary/10 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/30 shadow-inner">
              <Star className="w-7 h-7 text-accent" />
            </div>
            <span className="gradient-text">AI Insights Preview</span>
          </CardTitle>
          <CardDescription className="text-base">
            Predictive analytics and smart recommendations powered by artificial intelligence
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3 p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/20">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Quiz Performance Trend</span>
                <span className="text-sm text-accent font-bold flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Improving
                </span>
              </div>
              <Progress value={78} className="h-3 bg-muted rounded-full" />
              <p className="text-xs text-muted-foreground font-medium">Students showing 15% improvement this week</p>
            </div>
            <div className="space-y-3 p-4 rounded-2xl bg-gradient-to-br from-secondary/5 to-transparent border border-secondary/20">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Form Completion Rate</span>
                <span className="text-sm text-primary font-bold">92%</span>
              </div>
              <Progress value={92} className="h-3 bg-muted rounded-full" />
              <p className="text-xs text-muted-foreground font-medium">Above average completion across all forms</p>
            </div>
            <div className="space-y-3 p-4 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent border border-accent/20">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">AI Suggestions Applied</span>
                <span className="text-sm text-secondary font-bold">24/30</span>
              </div>
              <Progress value={80} className="h-3 bg-muted rounded-full" />
              <p className="text-xs text-muted-foreground font-medium">High adoption of AI recommendations</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;