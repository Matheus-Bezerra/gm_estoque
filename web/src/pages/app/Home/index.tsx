import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ArrowUpRight, Boxes, Tag, Upload, Users } from "lucide-react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import CardInfo from "@/pages/app/Home/components/CardInfo/index"

export const Home = () => {
    return (
        <>
            <Helmet title="Inicial" />
            <div className="grid gap-6">
                <div className="grid grid-cols-4 gap-3">
                    <CardInfo
                        title="Produtos cadastrados"
                        value={48}
                        linkText="produtos"
                        linkUrl="/produtos"
                        Icon={Boxes} // Usando o ícone do Lucide
                    />
                    <CardInfo
                        title="Produtos zerados"
                        value={3}
                        linkText="produtos"
                        linkUrl="/produtos"
                        Icon={Upload}
                    />
                    <CardInfo
                        title="Total de Fornecedores"
                        value={12}
                        linkText="Fornecedores"
                        linkUrl="/fornecedores"
                        Icon={Users}
                    />
                    <CardInfo
                        title="Total de Categorias"
                        value={24}
                        linkText="Categorias"
                        linkUrl="/categorias"
                        Icon={Tag}
                    />
                </div>

                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    <Card
                        className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
                    >

                        <CardHeader className="flex flex-row items-center">
                            <div className="grid gap-2">
                                <CardTitle>Produtos</CardTitle>
                                <CardDescription>
                                    Os produtos mais recentes adicionados ao seu estoque
                                </CardDescription>
                            </div>
                            <Button asChild size="sm" className="ml-auto gap-1">
                                <Link to="/produtos">
                                    Ver todos
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nome</TableHead>
                                        <TableHead className="text-right">Estoque</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">Hambúrgueres</div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge className="hidden md:inline-block rounded-3xl px-3 text-xs leading-none">
                                                    Comida
                                                </Badge>
                                                <Badge className="hidden md:inline-block rounded-3xl px-3 text-xs leading-none">
                                                    Fast Food
                                                </Badge>
                                                <Badge className="hidden md:inline-block rounded-3xl px-3 text-xs leading-none">
                                                    Principais
                                                </Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">14</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">Arroz</div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge className="hidden md:inline-block rounded-3xl px-3 text-xs leading-none">
                                                    Comida
                                                </Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">10</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">Filé de Frango</div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge className="hidden md:inline-block rounded-3xl px-3 text-xs leading-none">
                                                    Mistura
                                                </Badge>
                                                <Badge className="hidden md:inline-block rounded-3xl px-3 text-xs leading-none">
                                                    Fritura
                                                </Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">9</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">Sobrecoxa</div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge className="hidden md:inline-block rounded-3xl px-3 text-xs leading-none">
                                                    Assado
                                                </Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">7</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">Pacote petiscos</div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge className="hidden md:inline-block rounded-3xl px-3 text-xs leading-none">
                                                    Aperitivo
                                                </Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">5</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-5">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle className="">Fornecedores</CardTitle>
                                <p>Produtos Associados</p>
                            </div>
                        </CardHeader>
                        <CardContent className="grid gap-8">
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                    <AvatarFallback>OM</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        Olivia Martin
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        olivia.martin@email.com
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">13</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src="/avatars/02.png" alt="Avatar" />
                                    <AvatarFallback>JL</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        Jackson Lee
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        jackson.lee@email.com
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">11</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src="/avatars/03.png" alt="Avatar" />
                                    <AvatarFallback>IN</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        Isabella Nguyen
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        isabella.nguyen@email.com
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">9</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src="/avatars/04.png" alt="Avatar" />
                                    <AvatarFallback>WK</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        William Kim
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        will@email.com
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">6</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src="/avatars/05.png" alt="Avatar" />
                                    <AvatarFallback>SD</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        Sofia Davis
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        sofia.davis@email.com
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">4</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}
