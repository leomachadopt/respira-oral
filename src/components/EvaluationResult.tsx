import { EvaluationResult, Specialist } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, AlertTriangle, MapPin, Phone, Mail, MessageCircle, TrendingUp } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface EvaluationResultProps {
  result: EvaluationResult
  specialist: Specialist | null
}

export function EvaluationResultComponent({
  result,
  specialist,
}: EvaluationResultProps) {
  const scoreColor =
    result.score >= 70
      ? 'text-green-600'
      : result.score >= 40
        ? 'text-yellow-600'
        : 'text-blue-600'

  const confidenceColor = {
    alta: 'bg-green-100 text-green-800 border-green-300',
    média: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    baixa: 'bg-blue-100 text-blue-800 border-blue-300',
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Score Card */}
      <Card className="border-2 border-primary/20 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Resultado da Avaliação</CardTitle>
            <Badge className={confidenceColor[result.confidence]}>
              Confiança: {result.confidence}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score Visual */}
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(result.score / 100) * 351.86} 351.86`}
                  className={scoreColor}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={cn('text-3xl font-bold', scoreColor)}>
                  {result.score}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Score de Indicação</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {result.reasoning}
              </p>
            </div>
          </div>

          {/* Treatment Recommendation */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-xl border border-primary/20">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-6 h-6 text-primary mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">
                  Recomendação de Tratamento
                </h4>
                <p className="text-foreground">{result.treatmentRecommendation}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Specialist Card */}
      {specialist ? (
        <Card className="border-2 border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              Especialista Recomendado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Specialist Info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20 border-2 border-primary/20">
                    <AvatarImage
                      src={
                        specialist.customImage ||
                        `https://img.usecurling.com/ppl/thumbnail?gender=${specialist.image}&seed=${specialist.seed}`
                      }
                      alt={specialist.name}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-2xl">
                      {specialist.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {specialist.name}
                    </h3>
                    <p className="text-muted-foreground">{specialist.role}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">
                        {specialist.city}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {specialist.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <a
                      href={`tel:${specialist.phone}`}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      {specialist.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <a
                      href={`mailto:${specialist.email}`}
                      className="text-foreground hover:text-primary transition-colors text-sm"
                    >
                      {specialist.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 md:w-64">
                <Button
                  asChild
                  className="w-full rounded-full bg-primary hover:bg-primary/90"
                >
                  <a
                    href={`https://wa.me/${specialist.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full"
                >
                  <a href={`tel:${specialist.phone}`}>Ligar Agora</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full"
                >
                  <a href={`mailto:${specialist.email}`}>Enviar Email</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-2 border-yellow-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
              Especialista Não Encontrado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Não foi possível encontrar um especialista próximo da sua
              localização. Entre em contato conosco através da página de
              contactos para mais informações.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Disclaimer */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Nota importante:</strong> Esta avaliação é apenas para fins
            informativos e de triagem. Não substitui uma consulta médica
            profissional e diagnóstico clínico. Recomendamos sempre uma avaliação
            presencial com um especialista qualificado.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

