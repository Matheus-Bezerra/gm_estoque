import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Importação dos componentes do shadcn
import { ExternalLink, LucideIcon } from "lucide-react";

interface CardInfoProps {
  title: string;
  value: number;
  linkText: string;
  linkUrl: string;
  Icon: LucideIcon;
}

const CardInfo: React.FC<CardInfoProps> = ({ title, value, linkText, linkUrl, Icon }) => {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>{title}</CardTitle>
        <Icon className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">{value}</span>
        <Link to={linkUrl} className="text-xs text-muted-foreground flex items-center gap-1">
          <ExternalLink className="h-4 w-4" /> {linkText}
        </Link>
      </CardContent>
    </Card>
  );
};

export default CardInfo;
