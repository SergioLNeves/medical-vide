import { Button } from "@/components/ui/button";
import { JSX } from "react";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface CardFunctionProps {
    icon: JSX.Element,
    title: string,
    description: string,
    buttonText: string;
    onClick: () => void;
}

export default function CardFunction(CardFunctionProps: CardFunctionProps) {
    return (
        <Card className="bg-card overflow-hidden shadow rounded-lg">
            <CardHeader className="flex items-center">
                <CardContent className="bg-accent p-2 rounded-md border border-foreground/5 mr-4">
                    <span className="text-accent-foreground">{CardFunctionProps.icon}</span>
                </CardContent>
                <CardContent className=" flex flex-col gap-0.5">
                    <CardTitle>
                        {CardFunctionProps.title}
                    </CardTitle>
                    <CardDescription >
                        {CardFunctionProps.description}
                    </CardDescription>
                </CardContent>
            </CardHeader>
            <CardContent>
                <CardAction className="w-full">
                    <Button className="w-full" variant="default" onClick={CardFunctionProps.onClick}>
                        {CardFunctionProps.buttonText}
                    </Button>
                </CardAction>
            </CardContent>
        </Card>
    );
}