import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LayoutDashboard, 
  FileText, 
  ClipboardList, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  GraduationCap,
  Users,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: "teacher" | "student" | "admin";
  onNavigate?: (view: "dashboard" | "quiz-builder" | "form-builder" | "quiz-list") => void;
}

const DashboardLayout = ({ children, userRole, onNavigate }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigationItems = {
    teacher: [
      { icon: LayoutDashboard, label: "Dashboard", action: "dashboard" },
      { icon: FileText, label: "Form Builder", action: "form-builder" },
      { icon: ClipboardList, label: "Quiz Builder", action: "quiz-builder" },
    ],
    student: [
      { icon: LayoutDashboard, label: "Dashboard", action: "dashboard" },
      { icon: ClipboardList, label: "Available Quizzes", action: "quiz-list" },
    ],
    admin: [
      { icon: LayoutDashboard, label: "Dashboard", action: "dashboard" },
    ]
  };

  const currentNav = navigationItems[userRole];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 glass-effect border-r border-border/30 transition-all duration-300 ease-spring shadow-xl",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/30 bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-md animate-pulse-glow">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">QuizCraft</h1>
                <p className="text-xs text-muted-foreground capitalize bg-primary-soft px-2 py-0.5 rounded-full">{userRole}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden hover:bg-primary/10 rounded-xl"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-3">
            {currentNav.map((item, index) => (
              <Button
                key={item.action}
                variant="ghost"
                className="w-full justify-start gap-4 h-12 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:text-primary hover:shadow-md hover:scale-105 group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => onNavigate?.(item.action as any)}
              >
                <item.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="font-medium">{item.label}</span>
              </Button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-border/30 bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 cursor-pointer group">
              <Avatar className="w-10 h-10 ring-2 ring-primary/20 transition-all duration-300 group-hover:ring-primary/40">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">John Doe</p>
                <p className="text-xs text-muted-foreground/80 truncate">john@quizcraft.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn(
        "transition-all duration-300 ease-spring",
        sidebarOpen ? "lg:ml-64" : "ml-0"
      )}>
        {/* Top Navigation */}
        <header className="sticky top-0 z-40 glass-effect border-b border-border/30 shadow-lg">
          <div className="flex items-center justify-between h-18 px-6">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hover:bg-primary/10 rounded-xl p-3 transition-all duration-300 hover:scale-105"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="animate-fade-in-up">
                <h2 className="text-2xl font-bold gradient-text">Dashboard</h2>
                <p className="text-sm text-muted-foreground/80">Welcome back, create amazing quizzes! ✨</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                className="rounded-xl border-primary/20 hover:bg-primary/5 transition-all duration-300 hover:scale-105"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Avatar className="w-10 h-10 ring-2 ring-primary/20 transition-all duration-300 hover:ring-primary/40">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/90 backdrop-blur-md lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;