import Navbar from '../navbar/Navbar'

function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-row md:justify-between md:items-center py-8 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Dashboard Agricola
            </h1>
            <p className="text-base md:text-lg text-gray-600 mt-3">
              Monitoraggio prestazioni aziendali - Generazione dati automatica
            </p>
          </div>
          <Navbar />
        </div>
      </div>
    </header>
  )
}

export default Header;