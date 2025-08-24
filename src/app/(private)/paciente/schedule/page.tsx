'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAgendamento, type AgendamentoRequest, type Especialidade, type Tratamento, type Medico } from '@/hooks/useAgendamento';
import { useUserProfile } from '@/hooks/useUserProfile';
import { format } from 'date-fns';
import { ArrowLeftCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function SchedulePacientePage() {
  const router = useRouter();
  const { profile } = useUserProfile();
  const {
    obterEspecialidadesDisponiveis,
    buscarMedicosPorEspecialidadeId,
    buscarMedicosPorNome,
    buscarTratamentosPorMedico,
    criarAgendamento
  } = useAgendamento();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEspecialidade, setSelectedEspecialidade] = useState('');
  const [selectedMedico, setSelectedMedico] = useState<Medico | null>(null);
  const [selectedTratamento, setSelectedTratamento] = useState<Tratamento | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [filteredMedicos, setFilteredMedicos] = useState<Medico[]>([]);
  const [filteredTratamentos, setFilteredTratamentos] = useState<Tratamento[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSearch = () => {
    // Busca de médicos por nome
    if (!searchTerm.trim()) {
      setFilteredMedicos([]);
      return;
    }
    const medicosPorNome = buscarMedicosPorNome(searchTerm);
    setFilteredMedicos(medicosPorNome);
    setFilteredTratamentos([]);
  };

  const handleEspecialidadeChange = (especialidadeId: string) => {
    setSelectedEspecialidade(especialidadeId);
    if (especialidadeId) {
      const medicosEspecialidade = buscarMedicosPorEspecialidadeId(especialidadeId);
      setFilteredMedicos(medicosEspecialidade);
    } else {
      setFilteredMedicos([]);
    }
    setFilteredTratamentos([]);
  };

  const handleSelectMedico = (medico: Medico) => {
    setSelectedMedico(medico);
    // Buscar tratamentos oferecidos pelo médico
    const tratamentosDoMedico = buscarTratamentosPorMedico(medico.id);
    setFilteredTratamentos(tratamentosDoMedico);
  };

  const handleSelectTratamento = (tratamento: Tratamento) => {
    setSelectedTratamento(tratamento);
  };

  const canSchedule = selectedMedico && selectedTratamento && selectedDate && selectedTime;

  const handleSchedule = async () => {
    if (!canSchedule) return;

    // Validar se a data não é anterior ao dia atual
    if (selectedDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to start of day

      const selectedDateTime = new Date(selectedDate);
      selectedDateTime.setHours(0, 0, 0, 0); // Reset time to start of day

      if (selectedDateTime < today) {
        toast.error('Não é possível agendar consultas para datas passadas');
        return;
      }
    }

    try {
      setIsSubmitting(true);

      const request: AgendamentoRequest = {
        medicoId: selectedMedico.id,
        tratamentoId: selectedTratamento.id,
        data: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
        horaInicio: selectedTime
      };

      await criarAgendamento(request);

      toast.success('Consulta agendada com sucesso!');

      // Redirecionar para página de confirmação ou lista de agendamentos
      router.push('/paciente');
    } catch (error) {
      toast.error('Erro ao agendar consulta. Tente novamente.');
      console.error('Erro ao agendar:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Gerar horários disponíveis (mock)
  const availableTimes = [
    '08:00', '09:00', '10:00', '11:00',
    '14:00', '15:00', '16:00', '17:00'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <section className='flex justify-between items-center mb-8'>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Agendar Consulta</h1>
            <p className="text-gray-600 mt-2">
              Olá, {profile?.name}! Selecione uma especialidade ou busque um médico pelo nome.
            </p>
          </div>
          <Button onClick={() => router.push("/paciente")} className="mb-6">
            <ArrowLeftCircle /> Voltar
          </Button>
        </section>

        {/* Busca */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Buscar Médico</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Dropdown para Especialidades */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Primeiro, selecione uma especialidade:
              </label>
              <Select value={selectedEspecialidade} onValueChange={handleEspecialidadeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma especialidade" />
                </SelectTrigger>
                <SelectContent>
                  {obterEspecialidadesDisponiveis().map((especialidade) => (
                    <SelectItem key={especialidade.id} value={especialidade.id}>
                      {especialidade.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Input para buscar médico por nome */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Ou busque por nome do médico:
              </label>
              <div className="flex gap-4">
                <Input
                  placeholder="Digite o nome do médico..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSearch}>Buscar</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lista de Médicos */}
          {filteredMedicos.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Médicos Disponíveis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredMedicos.map((medico) => (
                  <div
                    key={medico.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedMedico?.id === medico.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                    onClick={() => handleSelectMedico(medico)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{medico.nome}</h3>
                        <p className="text-sm text-gray-600">{medico.especialidade}</p>
                        <p className="text-sm text-gray-500">CRM: {medico.crm}</p>
                      </div>
                      {medico.avaliacoes && (
                        <Badge variant="secondary">
                          ⭐ {medico.avaliacoes}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Lista de Tratamentos */}
          {filteredTratamentos.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Tratamentos Disponíveis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredTratamentos.map((tratamento) => (
                  <div
                    key={tratamento.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedTratamento?.id === tratamento.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                    onClick={() => handleSelectTratamento(tratamento)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{tratamento.nome}</h3>
                        <p className="text-sm text-gray-600">{tratamento.descricao}</p>
                        <div className="flex gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {tratamento.duracao} min
                          </span>
                          {tratamento.preco && (
                            <span>R$ {tratamento.preco}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Seleção de Data e Hora */}
        {selectedMedico && selectedTratamento && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Escolha Data e Horário</CardTitle>
              <CardDescription>
                Agendando {selectedTratamento.nome} com {selectedMedico.nome}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Data</label>
                  <DatePicker
                    value={selectedDate}
                    onChange={setSelectedDate}
                    placeholder="Selecione uma data"
                    disabledDates={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const checkDate = new Date(date);
                      checkDate.setHours(0, 0, 0, 0);
                      return checkDate < today;
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Horário</label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimes.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleSchedule}
                disabled={!canSchedule || isSubmitting}
                className="w-full mt-6"
                size="lg"
              >
                {isSubmitting ? 'Agendando...' : 'Confirmar Agendamento'}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
