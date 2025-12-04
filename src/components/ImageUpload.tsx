import { useState, useRef } from 'react'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface ImageUploadProps {
  value?: string
  onChange: (url: string | undefined) => void
  className?: string
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | undefined>(value)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione uma imagem válida')
      return
    }

    // Validar tamanho (máx 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('A imagem deve ter no máximo 5MB')
      return
    }

    setIsUploading(true)

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

      if (!cloudName || !uploadPreset) {
        throw new Error('Configuração do Cloudinary não encontrada')
      }

      // Criar FormData para Cloudinary
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', uploadPreset)
      formData.append('folder', 'respira-oral/specialists')

      // Upload direto para Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Erro Cloudinary:', errorData)
        throw new Error(errorData.error?.message || 'Erro ao fazer upload')
      }

      const data = await response.json()

      // Atualizar preview e chamar onChange
      setPreview(data.secure_url)
      onChange(data.secure_url)

      toast.success('Foto enviada com sucesso!')
    } catch (error) {
      console.error('Erro no upload:', error)
      const message = error instanceof Error ? error.message : 'Erro desconhecido'

      if (message.includes('Configuração')) {
        toast.error('Configure o Cloudinary primeiro. Veja CLOUDINARY_QUICK_SETUP.md')
      } else {
        toast.error(`Erro no upload: ${message}`)
      }
    } finally {
      setIsUploading(false)
      // Limpar input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemove = () => {
    setPreview(undefined)
    onChange(undefined)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-4">
        {/* Preview */}
        <div className="relative w-32 h-32 rounded-lg border-2 border-dashed border-border overflow-hidden bg-muted">
          {preview ? (
            <>
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 w-6 h-6 rounded-full"
                onClick={handleRemove}
                disabled={isUploading}
              >
                <X className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-muted-foreground">
              <ImageIcon className="w-12 h-12" />
            </div>
          )}
        </div>

        {/* Upload Button */}
        <div className="flex-1 space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />

          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                A enviar...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Escolher foto
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground">
            JPG, PNG ou WEBP até 5MB
          </p>
        </div>
      </div>
    </div>
  )
}
