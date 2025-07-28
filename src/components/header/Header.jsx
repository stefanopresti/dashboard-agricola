import Navbar from '../navbar/Navbar'
function Header() {
  return (
    <div>
      <div className="brutal-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-8">
            <div>
              <h1 className="brutal-header h1">Dashboard Agricola</h1>
              <p style={{ color: 'var(--brutal-gray)', fontWeight: '600', marginTop: '0.5rem' }}>
                Monitoraggio prestazioni aziendali - Generazione dati automatica
              </p>
            </div>
            <Navbar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;