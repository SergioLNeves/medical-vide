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
import { ArrowLeft, Save, User, Stethoscope } from 'lucide-react';
import { toast } from 'sonner';
import Loading from '@/components/loading/loading';

export default function MedicoComplementInfoPage() {
    const { user, refreshUser } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<ComplementInfo>({
        cpf: '',
        rg: '',
        telefone: '',
        endereco: '',
        dataNascimento: '',
        crm: '',
        especialidade: '',
        formacao: '',
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
                crm: user.complementInfo.crm || '',
                especialidade: user.complementInfo.especialidade || '',
                formacao: user.complementInfo.formacao || '',
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
            const success = MockDatabase.updateUserComplementInfo(user.id, formData);

            if (success) {
                // Aguardar um pouco para garantir que a atualização foi processada
                setTimeout(() => {
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
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
            <Navbar />
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
                        Informações Profissionais
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Complete seu perfil profissional com informações importantes
                    </p>
                </div>

                <Card className="max-w-4xl mx-auto shadow-lg border-0 bg-white/50 backdrop-blur">
                    <CardHeader className="text-center border-b bg-gradient-to-r from-green-600 to-blue-600 text-white">
                        <div className="flex justify-center mb-4">
                            <Stethoscope className="h-12 w-12" />
                        </div>
                        <CardTitle className="text-2xl">Perfil do Médico</CardTitle>
                        <CardDescription className="text-green-100">
                            Mantenha suas informações profissionais atualizadas
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-6">
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

                            {/* Informações Profissionais */}
                            <div className="border-t pt-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <Stethoscope className="h-5 w-5 mr-2" />
                                    Informações Profissionais
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="crm">CRM</Label>
                                        <Input
                                            id="crm"
                                            type="text"
                                            placeholder="000000/UF"
                                            value={formData.crm}
                                            onChange={(e) => handleInputChange('crm', e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="especialidade">Especialidade</Label>
                                        <Input
                                            id="especialidade"
                                            type="text"
                                            placeholder="Ex: Cardiologia, Pediatria, Clínico Geral"
                                            value={formData.especialidade}
                                            onChange={(e) => handleInputChange('especialidade', e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Label htmlFor="formacao">Formação Acadêmica</Label>
                                    <Textarea
                                        id="formacao"
                                        placeholder="Descreva sua formação acadêmica, residência, especializações..."
                                        value={formData.formacao}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('formacao', e.target.value)}
                                        className="mt-1"
                                        rows={3}
                                    />
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
                                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
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
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
