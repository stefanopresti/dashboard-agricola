/**
 * Componente FeatureCard
 * 
 * Card utilizzata nella home page per visualizzare le funzionalità principali
 * dell'applicazione Dashboard Agricola.
 */

/**
 * FeatureCard Component
 * 
 * @param {string} icon - Emoji o icona da visualizzare
 * @param {string} title - Titolo della funzionalità
 * @param {string} description - Descrizione dettagliata della funzionalità
 * 
 * Caratteristiche:
 * - Design card con effetti hover (ombra, bordo, traduzione)
 * - Icona animata in un contenitore con gradiente
 * - Layout pulito e leggibile
 * - Transizioni smooth su tutti gli effetti
 */
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-emerald-300 group hover:-translate-y-1">
      {/* Contenitore icona con animazione */}
      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
        <span className="text-4xl">{icon}</span>
      </div>
      
      {/* Titolo della feature */}
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        {title}
      </h3>
      
      {/* Descrizione della feature */}
      <p className="text-gray-600 leading-relaxed text-base">
        {description}
      </p>
    </div>
  )
}

export default FeatureCard; 