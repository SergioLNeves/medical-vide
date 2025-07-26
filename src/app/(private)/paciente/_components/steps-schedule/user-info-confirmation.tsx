import { useState } from "react";
import { User } from "@/mocks/types";

type UserInfoConfirmationProps = {
    user: User;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function UserInfoConfirmation({ user, onChange }: UserInfoConfirmationProps) {
    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Confirme suas Informações </h2>
            <div className="space-y-2">
                <label>
                    <strong>Nome:</strong>
                    <input
                        className="ml-2 border rounded px-2 py-1"
                        name="name"
                        value={user.name}
                        onChange={onChange}
                    />
                </label>
                <label>
                    <strong>Email:</strong>
                    <input
                        className="ml-2 border rounded px-2 py-1"
                        name="email"
                        value={user.email}
                        onChange={onChange}
                    />
                </label>
                <label>
                    <strong>CPF:</strong>
                    <input
                        className="ml-2 border rounded px-2 py-1"
                        name="cpf"
                        value={user.complementInfo?.cpf}
                        onChange={onChange}
                    />
                </label>
                <label>
                    <strong>RG:</strong>
                    <input
                        className="ml-2 border rounded px-2 py-1"
                        name="rg"
                        value={user.complementInfo?.rg}
                        onChange={onChange}
                    />
                </label>
                <label>
                    <strong>Endereço:</strong>
                    <input
                        className="ml-2 border rounded px-2 py-1"
                        name="endereco"
                        value={user.complementInfo?.endereco}
                        onChange={onChange}
                    />
                </label>
                <label>
                    <strong>Telefone:</strong>
                    <input
                        className="ml-2 border rounded px-2 py-1"
                        name="telefone"
                        value={user.complementInfo?.telefone}
                        onChange={onChange}
                    />
                </label>
                <label>
                    <strong>Contato de Emergência:</strong>
                    <input
                        className="ml-2 border rounded px-2 py-1"
                        name="contatoEmergencia"
                        value={user.complementInfo?.contatoEmergencia}
                        onChange={onChange}
                    />
                </label>
                <label>
                    <strong>Convênio:</strong>
                    <input
                        className="ml-2 border rounded px-2 py-1"
                        name="convenio"
                        value={user.complementInfo?.convenio}
                        onChange={onChange}
                    />
                </label>
                <label>
                    <strong>Data de Nascimento:</strong>
                    <input
                        className="ml-2 border rounded px-2 py-1"
                        name="dataNascimento"
                        value={user.complementInfo?.dataNascimento}
                        onChange={onChange}
                        type="date"
                    />
                </label>
            </div>
        </div>
    );
}