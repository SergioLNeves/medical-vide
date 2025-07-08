import { Button } from "@/components/ui/button";

interface CardFunctionProps {
    icon: any,
    title: string,
    description: string,
    buttonText: string;
    onClick: () => void;
}

export default function CardFunction(CardFunctionProps: CardFunctionProps) {
    return (
        <div className="bg-card overflow-hidden shadow rounded-lg">
            <div className="p-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                            <span className="text-primary-foreground text-sm">{CardFunctionProps.icon}</span>
                        </div>
                    </div>
                    <dl className="ml-5 w-0 flex-1">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                            {CardFunctionProps.title}
                        </dt>
                        <dd className="text-lg font-medium text-gray-900 dark:text-white">
                            {CardFunctionProps.description}
                        </dd>
                    </dl>
                </div>
                <div className="mt-4">
                    <Button className="w-full" variant="outline" onClick={CardFunctionProps.onClick}>
                        {CardFunctionProps.buttonText}
                    </Button>
                </div>
            </div>
        </div>
    );
}