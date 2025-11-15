// Simple icon components using lucide-react (monochrome line icons)
import {
  Menu,
  X,
  Calendar,
  Target,
  Utensils,
  CheckSquare,
  Users,
  Settings,
  Clock,
  MapPin,
  DollarSign,
  Baby,
  Heart,
  Plus,
  Minus,
  Trash2,
  Search,
  ArrowRight,
  Check,
  AlertTriangle,
  Info,
  Star,
  ChevronDown,
  Home,
} from 'lucide-react';

export const Icons = {
  Menu,
  X,
  Calendar,
  Target,
  Utensils,
  CheckSquare,
  Users,
  Settings,
  Clock,
  MapPin,
  DollarSign,
  Baby,
  Pregnant: Heart, // Using Heart as placeholder for pregnant
  Plus,
  Minus,
  Trash: Trash2,
  Search,
  ArrowRight,
  Check,
  Warning: AlertTriangle,
  Info,
  Star,
  ChevronDown,
  Home,
};

export type IconName = keyof typeof Icons;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 16, className = '' }) => {
  const IconComponent = Icons[name];
  return <IconComponent size={size} className={className} />;
};
