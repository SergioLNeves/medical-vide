import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User } from '@/mocks/types'



const DetailList = ({ title, description }: { title: string; description: string }) => {
    return (
        <dl>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {title}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {description}
            </dd>
        </dl>
    );
}

export default function InfoPaciente({ user }: { user: User }) {


    const fieldsToShow = {
        'Nome Completo': user.name,
        'Email': user.email,
        'CPF': user.complementInfo?.cpf,
        'RG': user.complementInfo?.rg,
        'Endereço': user.complementInfo?.endereco,
        'Telefone': user.complementInfo?.telefone,
        'Contato de Emergência': user.complementInfo?.contatoEmergencia,
        'Convênio': user.complementInfo?.convenio,
        'Data de Nascimento': user.complementInfo?.dataNascimento,

    };

    const detailsToRender = Object.entries(fieldsToShow).filter(([, value]) => value)

    return (
        <Card>
            <CardHeader className='flex items-center justify-between'>
                <CardTitle>
                    Suas Informações
                </CardTitle>
                <CardAction>
                    <Button variant="link"> Editar </Button>
                </CardAction>
            </CardHeader>
            <Separator />
            <CardContent>
                <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {detailsToRender.map(([title, description], index) => (
                        <DetailList
                            key={index}
                            title={title}
                            description={description || ''}
                        />
                    ))}
                </section>
            </CardContent>
        </Card>
    )
}