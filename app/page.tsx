import AIVisualLearningAssistant from '../components/AIVisualLearningAssistant'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <header className="bg-[#e63946] text-white py-8 px-4 text-center border-b-4 border-[#f1faee]">
        <h1 className="text-4xl font-bold mb-2">AI Visual Learning Assistant</h1>
        <p className="text-lg opacity-90">Upload your images or use camera for instant solutions!</p>
      </header>
      <main className="max-w-4xl mx-auto p-4 space-y-8">
        <AIVisualLearningAssistant />
      </main>
    </div>
  )
}

