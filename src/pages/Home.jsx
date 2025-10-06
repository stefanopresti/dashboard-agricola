import Header from '../components/header/Header.jsx'
import Navlink from '../components/navbar/Navlink.jsx'
import FeatureCard from '../components/FeatureCard.jsx'

// Array delle features
const features = [
  {
    icon: '📊',
    title: 'Analisi Avanzata',
    description: 'Monitora raccolti, qualità del suolo e metriche aziendali con grafici interattivi e report dettagliati.'
  },
  {
    icon: '⚡',
    title: 'Dati in Tempo Reale',
    description: 'Generazione automatica di dati simulati per testare scenari e ottimizzare le decisioni aziendali.'
  },
  {
    icon: '🔮',
    title: 'Previsioni Intelligenti',
    description: 'Analisi predittive basate su dati storici e condizioni meteorologiche per pianificare al meglio.'
  },
  {
    icon: '💰',
    title: 'Gestione Finanziaria',
    description: 'Monitora costi, ricavi e profitti con analisi dettagliate per ottimizzare la redditività.'
  },
  {
    icon: '📋',
    title: 'Report Personalizzati',
    description: 'Genera report su misura per le tue esigenze specifiche con filtri temporali avanzati.'
  },
  {
    icon: '💻',
    title: 'Interfaccia Moderna',
    description: 'Design responsive e intuitivo per un\'esperienza utente ottimale su tutti i dispositivi.'
  }
]

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-32 md:py-48">
        <div className="max-w-7xl mx-auto px-10 sm:px-14 lg:px-20">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 mb-10 tracking-tight leading-tight">
              Dashboard Agricola
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 mb-16 max-w-4xl mx-auto leading-relaxed">
              Il simulatore intelligente per il monitoraggio e l'analisi delle prestazioni aziendali agricole
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Navlink to="/dashboard">
                Testa subito la Dashboard
              </Navlink>
              <button className="px-12 py-5 text-xl font-bold text-emerald-700 bg-white border-2 border-emerald-600 rounded-2xl hover:bg-emerald-50 transition-all duration-200 shadow-lg hover:shadow-2xl hover:scale-105">
                Scopri di più
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 md:py-48 bg-white">
        <div className="max-w-7xl mx-auto px-10 sm:px-14 lg:px-20">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-gray-900 mb-24">
            Potenzialità del Simulatore
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 md:py-48 bg-gray-50">
        <div className="max-w-5xl mx-auto px-10 sm:px-14 lg:px-20 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-16">
            Il Nostro Progetto
          </h2>
          <div className="space-y-10 text-xl md:text-2xl text-gray-600 leading-relaxed">
            <p>
              La <strong className="text-gray-900 font-semibold">Dashboard Agricola</strong> è un simulatore avanzato progettato per rivoluzionare la gestione aziendale nel settore agricolo. 
              La nostra piattaforma combina tecnologia moderna e analisi dati per fornire insights preziosi che supportano decisioni strategiche.
            </p>
            <p>
              Attraverso la generazione automatica di dati simulati, il sistema permette di testare diversi scenari aziendali, 
              monitorare le performance in tempo reale e ottimizzare i processi produttivi. 
              I dati includono metriche su raccolti, qualità del suolo, condizioni meteorologiche e indicatori finanziari.
            </p>
            <p className="mb-16">
              L'interfaccia intuitiva e i grafici interattivi rendono l'analisi dei dati semplice e immediata, 
              permettendo agli utenti di concentrarsi sulle decisioni strategiche piuttosto che sulla gestione tecnica.
            </p>
          </div>
          <div className="mt-16">
            <Navlink to="/dashboard">
              Inizia a Esplorare la Dashboard
            </Navlink>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 md:py-48 bg-gradient-to-br from-emerald-600 to-emerald-700">
        <div className="max-w-5xl mx-auto px-10 sm:px-14 lg:px-20 text-center space-y-12">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-10">
            Pronto a Trasformare la Tua Azienda Agricola?
          </h2>
          <p className="text-2xl md:text-3xl text-emerald-50 mb-16 leading-relaxed">
            Testa subito la dashboard e scopri tutte le potenzialità del nostro simulatore intelligente.
          </p>
          <Navlink to="/dashboard">
            Testa ora la dashboard
          </Navlink>
        </div>
      </section>
    </div>
  )
}

export default Home;