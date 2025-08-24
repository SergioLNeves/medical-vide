'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar/navbar';
import { MockDatabase } from '@/mocks/database';
import { ComplementInfo } from '@/mocks/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, User, Heart } from 'lucide-react';
import { toast } from 'sonner';
import Loading from '@/components/loading/loading';

export default function PacienteComplementInfoPage() {
    const { user, refreshUser } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<ComplementInfo>({
        cpf: '',
        rg: '',
        telefone: '',
        endereco: '',
        dataNascimento: '',
        convenio: '',
        contatoEmergencia: '',
    });

    // Carregar dados existentes do usuário
    useEffect(() => {
        if (user?.complementInfo) {
            setFormData({
                cpf: user.complementInfo.cpf || '',
                rg: user.complementInfo.rg || '',
                telefone: user.complementInfo.telefone || '',
                endereco: user.complementInfo.endereco || '',
                dataNascimento: user.complementInfo.dataNascimento || '',
                convenio: user.complementInfo.convenio || '',
                contatoEmergencia: user.complementInfo.contatoEmergencia || '',
            });
        }
    }, [user]);

    const handleInputChange = (field: keyof ComplementInfo, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsLoading(true);

        try {
            console.log('Tentando atualizar informações do usuário:', user.id, formData);
            const success = MockDatabase.updateUserComplementInfo(user.id, formData);

            if (success) {
                console.log('Informações atualizadas com sucesso no MockDatabase');

                // Aguardar um pouco para garantir que a atualização foi processada
                setTimeout(() => {
                    console.log('Chamando refreshUser...');
                    refreshUser(); // Atualizar dados do usuário no contexto
                }, 100);

                toast.success('Informações atualizadas com sucesso!');

                // Aguardar um pouco antes de navegar de volta
                setTimeout(() => {
                    router.back(); // Voltar para a página anterior
                }, 500);
            } else {
                throw new Error('Falha ao atualizar informações');
            }
        } catch (error) {
            toast.error('Erro ao atualizar informações. Tente novamente.');
            console.error('Erro ao atualizar complement info:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="mb-4 text-gray-600 hover:text-gray-800"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Voltar
                    </Button>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Informações Pessoais
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Complete seu perfil com informações importantes para seu atendimento
                    </p>
                </div>



                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Informações Pessoais */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <User className="h-5 w-5 mr-2" />
                            Informações Pessoais
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="cpf">CPF</Label>
                                <Input
                                    id="cpf"
                                    type="text"
                                    placeholder="000.000.000-00"
                                    value={formData.cpf}
                                    onChange={(e) => handleInputChange('cpf', e.target.value)}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="rg">RG</Label>
                                <Input
                                    id="rg"
                                    type="text"
                                    placeholder="00.000.000-0"
                                    value={formData.rg}
                                    onChange={(e) => handleInputChange('rg', e.target.value)}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="telefone">Telefone</Label>
                                <Input
                                    id="telefone"
                                    type="tel"
                                    placeholder="(00) 00000-0000"
                                    value={formData.telefone}
                                    onChange={(e) => handleInputChange('telefone', e.target.value)}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                                <Input
                                    id="dataNascimento"
                                    type="date"
                                    value={formData.dataNascimento}
                                    onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                                    className="mt-1"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <Label htmlFor="endereco">Endereço</Label>
                            <Textarea
                                id="endereco"
                                placeholder="Rua, número, bairro, cidade, CEP"
                                value={formData.endereco}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('endereco', e.target.value)}
                                className="mt-1"
                                rows={2}
                            />
                        </div>
                    </div>

                    {/* Informações Médicas */}
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <Heart className="h-5 w-5 mr-2" />
                            Informações Médicas
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="convenio">Convênio/Plano de Saúde</Label>
                                <Input
                                    id="convenio"
                                    type="text"
                                    placeholder="Ex: Unimed, Bradesco Saúde, Particular"
                                    value={formData.convenio}
                                    onChange={(e) => handleInputChange('convenio', e.target.value)}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="contatoEmergencia">Contato de Emergência</Label>
                                <Input
                                    id="contatoEmergencia"
                                    type="text"
                                    placeholder="Nome e telefone do contato"
                                    value={formData.contatoEmergencia}
                                    onChange={(e) => handleInputChange('contatoEmergencia', e.target.value)}
                                    className="mt-1"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Botões de ação */}
                    <div className="flex justify-end space-x-4 pt-6 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                            disabled={isLoading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                    Salvando...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4 mr-2" />
                                    Salvar Informações
                                </>
                            )}
                        </Button>
                    </div>
                </form>


            </div>
        </div>
    );
}
