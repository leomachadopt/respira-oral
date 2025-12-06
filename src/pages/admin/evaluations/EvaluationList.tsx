import { useState, useMemo } from 'react'
import { FileText, Download, Eye, Users, CheckCircle, Clock, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import useAppStore from '@/stores/useAppStore'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import jsPDF from 'jspdf'

export default function EvaluationList() {
  const { evaluations, specialists } = useAppStore()
  const [filter, setFilter] = useState<'all' | 'started' | 'completed'>('all')
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null)

  // Estatísticas
  const stats = useMemo(() => {
    const total = evaluations.length
    const completed = evaluations.filter(e => e.analysisResult).length
    const started = total - completed

    // Contar profissionais recomendados
    const professionalsCount: Record<number, number> = {}
    evaluations.forEach(e => {
      if (e.recommendedSpecialistId) {
        professionalsCount[e.recommendedSpecialistId] =
          (professionalsCount[e.recommendedSpecialistId] || 0) + 1
      }
    })

    return {
      total,
      completed,
      started,
      professionalsCount,
    }
  }, [evaluations])

  // Filtrar avaliações
  const filteredEvaluations = useMemo(() => {
    switch (filter) {
      case 'started':
        return evaluations.filter(e => !e.analysisResult)
      case 'completed':
        return evaluations.filter(e => e.analysisResult)
      default:
        return evaluations
    }
  }, [evaluations, filter])

  // Função para download em PDF
  const handleDownloadPDF = async (evaluation: any) => {
    if (!evaluation.analysisResult?.report) {
      return
    }

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 20
    const maxWidth = pageWidth - 2 * margin
    let yPosition = margin

    // Função auxiliar para adicionar texto com quebra de linha
    const addText = (text: string, fontSize: number, isBold: boolean = false, isTitle: boolean = false) => {
      doc.setFontSize(fontSize)
      doc.setFont('helvetica', isBold ? 'bold' : 'normal')

      // Remover marcadores de markdown
      const cleanText = text.replace(/\*\*/g, '')

      const lines = doc.splitTextToSize(cleanText, maxWidth)

      lines.forEach((line: string) => {
        // Verificar se precisa de nova página
        if (yPosition + 10 > pageHeight - margin) {
          doc.addPage()
          yPosition = margin
        }

        doc.text(line, margin, yPosition)
        yPosition += fontSize * 0.5 // Espaçamento entre linhas
      })

      yPosition += isTitle ? 8 : 5 // Espaçamento extra após títulos
    }

    // Cabeçalho
    doc.setFillColor(37, 99, 235) // Cor primária
    doc.rect(0, 0, pageWidth, 40, 'F')

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text('Respira Oral', margin, 15)

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text('Relatório de Avaliação', margin, 25)

    doc.setTextColor(0, 0, 0)
    yPosition = 50

    // Informações do paciente
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('Informações do Paciente:', margin, yPosition)
    yPosition += 7

    doc.setFont('helvetica', 'normal')
    doc.text(`Nome: ${evaluation.name}`, margin, yPosition)
    yPosition += 6
    doc.text(`Idade: ${evaluation.age || 'Não informada'}`, margin, yPosition)
    yPosition += 6
    doc.text(`Telefone: ${evaluation.phone}`, margin, yPosition)
    yPosition += 6
    doc.text(`Região: ${evaluation.location?.region || 'Não informada'}`, margin, yPosition)
    yPosition += 6
    doc.text(
      `Data da Avaliação: ${format(new Date(evaluation.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`,
      margin,
      yPosition
    )
    yPosition += 12

    // Linha separadora
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 10

    // Relatório
    const report = evaluation.analysisResult.report
    const paragraphs = report.split('\n').filter((p: string) => p.trim())

    paragraphs.forEach((paragraph: string) => {
      if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
        // Título
        addText(paragraph, 14, true, true)
      } else if (paragraph.trim()) {
        // Parágrafo normal
        addText(paragraph, 10, false, false)
      }
    })

    // Rodapé
    const totalPages = doc.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(128, 128, 128)
      doc.text(
        `Página ${i} de ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      )
      doc.text(
        'Respira Oral - www.respiraoral.pt',
        pageWidth / 2,
        pageHeight - 5,
        { align: 'center' }
      )
    }

    // Salvar PDF
    const fileName = `relatorio_${evaluation.name.replace(/\s+/g, '_')}_${format(new Date(evaluation.createdAt), 'yyyyMMdd')}.pdf`
    doc.save(fileName)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Avaliações</h1>
        <p className="text-muted-foreground">Gestão e análise de avaliações realizadas</p>
      </div>

      {/* Estatísticas */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Avaliações</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Todas as avaliações</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Iniciadas</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.started}</div>
            <p className="text-xs text-muted-foreground">Aguardando conclusão</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Finalizadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">Com relatório gerado</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Avaliações concluídas</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          Todas ({stats.total})
        </Button>
        <Button
          variant={filter === 'started' ? 'default' : 'outline'}
          onClick={() => setFilter('started')}
        >
          Iniciadas ({stats.started})
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          onClick={() => setFilter('completed')}
        >
          Finalizadas ({stats.completed})
        </Button>
      </div>

      {/* Lista de Avaliações */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Avaliações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEvaluations.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhuma avaliação encontrada
              </p>
            ) : (
              filteredEvaluations.map((evaluation) => {
                const specialist = specialists.find(s => s.id === evaluation.recommendedSpecialistId)
                const isCompleted = !!evaluation.analysisResult

                return (
                  <div
                    key={evaluation.id}
                    className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{evaluation.name}</h3>
                          {isCompleted ? (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                              Finalizada
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                              Iniciada
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Telefone:</span> {evaluation.phone}
                          </div>
                          {evaluation.age && (
                            <div>
                              <span className="font-medium">Idade:</span> {evaluation.age}
                            </div>
                          )}
                          {evaluation.location?.region && (
                            <div>
                              <span className="font-medium">Região:</span> {evaluation.location.region}
                            </div>
                          )}
                          <div>
                            <span className="font-medium">Data:</span>{' '}
                            {format(new Date(evaluation.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                          </div>
                        </div>

                        {specialist && (
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Profissional recomendado:</span>{' '}
                            {specialist.name} - {specialist.role}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {isCompleted && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedEvaluation(evaluation)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Ver Relatório
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadPDF(evaluation)}
                            >
                              <Download className="w-4 h-4 mr-1" />
                              PDF
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal de visualização do relatório */}
      {selectedEvaluation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Relatório de Avaliação</h2>
                <p className="text-muted-foreground">{selectedEvaluation.name}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownloadPDF(selectedEvaluation)}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download PDF
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedEvaluation(null)}
                >
                  Fechar
                </Button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="prose max-w-none">
                {selectedEvaluation.analysisResult?.report?.split('\n').map((paragraph: string, idx: number) => {
                  if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                    return (
                      <h2 key={idx} className="text-xl font-bold text-primary mt-4 mb-2">
                        {paragraph.replace(/\*\*/g, '')}
                      </h2>
                    )
                  }
                  if (paragraph.trim()) {
                    return <p key={idx} className="mb-4">{paragraph}</p>
                  }
                  return null
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profissionais mais recomendados */}
      {Object.keys(stats.professionalsCount).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Profissionais Mais Recomendados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(stats.professionalsCount)
                .sort(([, a], [, b]) => (b as number) - (a as number))
                .map(([specialistId, count]) => {
                  const specialist = specialists.find(s => s.id === Number(specialistId))
                  if (!specialist) return null

                  return (
                    <div
                      key={specialistId}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{specialist.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {specialist.role} - {specialist.region}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{count}</p>
                        <p className="text-xs text-muted-foreground">recomendações</p>
                      </div>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
