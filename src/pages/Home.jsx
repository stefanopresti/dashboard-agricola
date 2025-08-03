import Header from '../components/header/Header.jsx'
import Navlink from '../components/navbar/Navlink.jsx'
import FeatureCard from '../components/FeatureCard.jsx'
import styles from './Home.module.css'

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
    <div>
      <Header />
      
      {/* Hero Section */}
      <section className="brutal-section brutal-padding">
        <div className={styles.heroSection}>
          <h1 className={`brutal-header h1 ${styles.heroTitle}`}>
            Dashboard Agricola
          </h1>
          <p className={styles.heroSubtitle}>
            Il simulatore intelligente per il monitoraggio e l'analisi delle prestazioni aziendali agricole
          </p>
          <div className={styles.heroButtons}>
            <Navlink to="/dashboard">
              Testa subito la Dashboard
            </Navlink>
            <button className="brutal-btn">
              Scopri di più
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`brutal-section brutal-padding ${styles.featuresSection}`}>
        <div className={styles.featuresContainer}>
          <h2 className={styles.featuresTitle}>
            Potenzialità del Simulatore
          </h2>
          
          <div className={styles.featuresGrid}>
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
      <section className="brutal-section brutal-padding">
        <div className={styles.aboutContainer}>
          <h2 className={styles.aboutTitle}>
            Il Nostro Progetto
          </h2>
          <div className={styles.aboutContent}>
            <p className={styles.aboutParagraph}>
              La <strong className={styles.aboutHighlight}>Dashboard Agricola</strong> è un simulatore avanzato progettato per rivoluzionare la gestione aziendale nel settore agricolo. 
              La nostra piattaforma combina tecnologia moderna e analisi dati per fornire insights preziosi che supportano decisioni strategiche.
            </p>
            <p className={styles.aboutParagraph}>
              Attraverso la generazione automatica di dati simulati, il sistema permette di testare diversi scenari aziendali, 
              monitorare le performance in tempo reale e ottimizzare i processi produttivi. 
              I dati includono metriche su raccolti, qualità del suolo, condizioni meteorologiche e indicatori finanziari.
            </p>
            <p className={styles.aboutParagraph}>
              L'interfaccia intuitiva e i grafici interattivi rendono l'analisi dei dati semplice e immediata, 
              permettendo agli utenti di concentrarsi sulle decisioni strategiche piuttosto che sulla gestione tecnica.
            </p>
          </div>
          <Navlink to="/dashboard">
            Inizia a Esplorare la Dashboard
          </Navlink>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`brutal-section brutal-padding ${styles.ctaSection}`}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>
            Pronto a Trasformare la Tua Azienda Agricola?
          </h2>
          <p className={styles.ctaSubtitle}>
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