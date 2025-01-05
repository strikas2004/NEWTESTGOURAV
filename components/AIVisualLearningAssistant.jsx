'use client'

import { useState, useRef, useEffect } from 'react'
import CameraView from './CameraView'
import FileUpload from './FileUpload'
// import ResultDisplay from './ResultDisplay'
import InfoSection from './InfoSection'
import axios from 'axios'
import SolutionDisplay from './ResultDisplay'

export default function AIVisualLearningAssistant() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [imageCapture, setImageCapture] = useState(null)
  const [text,setText]  = useState("")
  const fileInputRef = useRef(null)

  const processImage = async (file) => {
    setLoading(true);
    setResult(null);
  
    try {
      // Step 1: Extract text using Tesseract.js (OCR)
      const { createWorker } = await import('tesseract.js');
      const worker = await createWorker();
  
      // Initialize the worker with the language
      await worker.load();
      // await worker?.loadLanguage('eng');
      // await worker?.initialize('eng');
  
      // Perform OCR on the image
      const {
        data: { text },
      } = await worker.recognize(file);
      await worker.terminate();
  
      console.log('Extracted Text:', text);
  
      if (!text.trim()) {
        throw new Error('No text detected in the image.');
      }
  
      setText(`Extracted Text:\n${text}\n\nAnalyzing...`);
  
      // Step 2: Send extracted text to API route for OpenAI analysis
      const aiResponse = await axios.post('/api/analyze-text', { text });
      const aiData = aiResponse.data;
  
      console.log('AI Data:', aiData);
      setResult(aiData.data);
    } catch (error) {
      console.error('Error:', error);
      setResult('Sorry, there was an error processing your image. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  // Automatically process image when `imageCapture` changes
  useEffect(() => {
    if (imageCapture) {
      const imageFile = dataURLToFile(imageCapture, 'captured-image.png')
      processImage(imageFile)
    }
  }, [imageCapture])

  const dataURLToFile = (dataUrl, filename) => {
    const [header, base64] = dataUrl.split(',')
    const mimeMatch = header.match(/:(.*?);/)
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/png'
    const byteString = atob(base64)
    const arrayBuffer = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++) {
      arrayBuffer[i] = byteString.charCodeAt(i)
    }
    return new File([arrayBuffer], filename, { type: mimeType })
  }

  return (
    <>
      <CameraView
        imageCapture={imageCapture}
        setImageCapture={setImageCapture}
        processImage={processImage}
      />
      <FileUpload processImage={processImage} fileInputRef={fileInputRef} />
      {loading && (
        <div className="flex justify-center items-center gap-3 py-6">
          <i className="bi bi-arrow-repeat text-3xl text-[#e63946] loading-spinner"></i>
          <span className="text-lg">Analyzing your image...</span>
        </div>
      )}
      <div className='my-5'>
         {text}
        
        </div>
      {result && <SolutionDisplay result={result} />}
      <InfoSection />
    </>
  )
}
