import type { FC } from 'react';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Calendar,
  Sparkles,
  CheckSquare,
  ShieldCheck,
  BookOpen,
  Settings,
  Users,
  Building,
  Award,
  BarChart3,
  Database,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  User,
  SlidersHorizontal,
  GraduationCap,
  HelpCircle,
  Menu,
  X,
  ExternalLink,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface NavIconProps {
  name: string;
  className?: string;
}

export const NavIcon: FC<NavIconProps> = ({ name, className = 'w-4 h-4' }) => {
  switch (name) {
    case 'LayoutDashboard':
      return <LayoutDashboard className={className} />;
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'FileText':
      return <FileText className={className} />;
    case 'Calendar':
      return <Calendar className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'CheckSquare':
      return <CheckSquare className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'Settings':
      return <Settings className={className} />;
    case 'Users':
      return <Users className={className} />;
    case 'Building':
      return <Building className={className} />;
    case 'Award':
      return <Award className={className} />;
    case 'BarChart3':
      return <BarChart3 className={className} />;
    case 'Database':
      return <Database className={className} />;
    case 'Search':
      return <Search className={className} />;
    case 'Bell':
      return <Bell className={className} />;
    case 'ChevronDown':
      return <ChevronDown className={className} />;
    case 'LogOut':
      return <LogOut className={className} />;
    case 'User':
      return <User className={className} />;
    case 'SlidersHorizontal':
      return <SlidersHorizontal className={className} />;
    case 'GraduationCap':
      return <GraduationCap className={className} />;
    case 'HelpCircle':
      return <HelpCircle className={className} />;
    case 'Menu':
      return <Menu className={className} />;
    case 'X':
      return <X className={className} />;
    case 'ExternalLink':
      return <ExternalLink className={className} />;
    case 'Plus':
      return <Plus className={className} />;
    case 'ArrowRight':
      return <ArrowRight className={className} />;
    case 'Clock':
      return <Clock className={className} />;
    case 'CheckCircle2':
      return <CheckCircle2 className={className} />;
    case 'AlertCircle':
      return <AlertCircle className={className} />;
    default:
      return <LayoutDashboard className={className} />;
  }
};
