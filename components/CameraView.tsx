'use client'

import { useEffect, useRef } from 'react'

interface CameraViewProps {
  imageCapture: string | null
  setImageCapture: (capture: string | null) => void
  processImage: (file: File) => Promise<void>
}

export default function CameraView({ imageCapture, setImageCapture, processImage }: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        console.error('Camera access error:', err)
      }
    }
    initCamera()
  }, [])

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0)
      const dataUrl = canvas.toDataURL('image/jpeg')
      setImageCapture(dataUrl)
      canvas.toBlob((blob) => {
        if (blob) {
          processImage(new File([blob], 'capture.jpg', { type: 'image/jpeg' }))
        }
      }, 'image/jpeg')
    }
  }

  return (
    <div className="relative rounded-xl overflow-hidden bg-gray-900 camera-container">
      {!imageCapture ? (
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform scale-x-[-1]" />
      ) : (
        <img src={imageCapture} className="w-full h-full object-contain" alt="Captured" />
      )}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
        {!imageCapture ? (
          <button onClick={captureImage} className="capture-btn px-6 py-3 rounded-full font-semibold text-white shadow-lg flex items-center gap-2">
            <i className="bi bi-camera-fill"></i>
            <span>Capture</span>
          </button>
        ) : (
          <button onClick={() => setImageCapture(null)} className="capture-btn px-6 py-3 rounded-full font-semibold text-white shadow-lg flex items-center gap-2">
            <i className="bi bi-arrow-counterclockwise"></i>
            <span>Retake</span>
          </button>
        )}
      </div>
    </div>
  )
}

