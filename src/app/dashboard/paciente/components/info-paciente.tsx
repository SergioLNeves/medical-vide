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
        'ID do Paciente': user.id,
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

    const detailsToRender = Object.entries(fieldsToShow).filter(([_, value]) => value)

    return (
        <div className="mt-6 bg-card overflow-hidden shadow rounded-lg">
            <h3 className="text-xl font-bold text-primary-foreground bg-primary p-4">
                Suas Informações
            </h3>
            <div className="px-4 py-5 sm:p-6">
                <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {detailsToRender.map(([title, description], index) => (
                        <DetailList
                            key={index}
                            title={title}
                            description={description || ''}
                        />
                    ))}
                </section>
            </div>
        </div>
    )
}