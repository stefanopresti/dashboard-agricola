import DashboardComponent from '../components/dashboard/Dashboard.jsx'
import Header from '../components/header/Header.jsx'
import Footer from '../components/footer/Footer.jsx'

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <DashboardComponent />
      <Footer />
    </div>
  )
}

export default Dashboard;