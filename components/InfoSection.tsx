export default function InfoSection() {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-center text-sky-400 mb-8">How it Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="info-card p-6 rounded-xl text-center">
          <i className="bi bi-camera text-4xl mb-4"></i>
          <h3 className="text-xl font-semibold mb-2">Capture</h3>
          <p>Use your camera or upload an image that needs analysis</p>
        </div>
        <div className="info-card p-6 rounded-xl text-center">
          <i className="bi bi-brain text-4xl mb-4"></i>
          <h3 className="text-xl font-semibold mb-2">Process</h3>
          <p>Our AI system analyzes the content of your image</p>
        </div>
        <div className="info-card p-6 rounded-xl text-center">
          <i className="bi bi-lightbulb text-4xl mb-4"></i>
          <h3 className="text-xl font-semibold mb-2">Learn</h3>
          <p>Get detailed explanations and step-by-step solutions</p>
        </div>
      </div>
    </section>
  )
}

