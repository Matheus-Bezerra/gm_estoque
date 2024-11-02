import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link, useLocation } from "react-router-dom";

export const BreadcrumbLayout = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean); // Divide o caminho em segmentos e remove entradas vazias
    const breadcrumbItems = pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`; // Gera o caminho acumulado

        return (
            <BreadcrumbItem key={index}>
                <BreadcrumbLink asChild>
                    <Link to={path}>
                        {segment.charAt(0).toUpperCase() + segment.slice(1) || 'Início'} {/* Capitaliza o primeiro caractere */}
                    </Link>
                </BreadcrumbLink>
                {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
            </BreadcrumbItem>
        );
    });

    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/">Início</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {pathSegments && pathSegments.length > 0 && <BreadcrumbSeparator />}
                {breadcrumbItems}
            </BreadcrumbList>
        </Breadcrumb>
    );
};
