'use client'

import { useState, RefObject } from 'react'

interface FileUploadProps {
  processImage: (file: File) => Promise<void>
  fileInputRef: RefObject<HTMLInputElement>
}

export default function FileUpload({ processImage, fileInputRef }: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      processImage(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      processImage(file)
    }
  }

  return (
    <div 
      className={`file-drop-zone p-8 rounded-xl text-center ${dragOver ? 'bg-opacity-20 bg-[#457b9d]' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        onChange={handleFileSelect} 
        className="hidden" 
      />
      <div className="flex flex-col items-center gap-4">
        <i className="bi bi-cloud-upload text-4xl text-[#457b9d]"></i>
        <div>
          <p className="text-lg font-medium">Drag and drop your image here or</p>
          <button onClick={() => fileInputRef.current?.click()} className="text-[#e63946] hover:text-[#f77f82] font-semibold">
            browse files
          </button>
        </div>
      </div>
    </div>
  )
}

