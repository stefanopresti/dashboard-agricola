import styles from './FeatureCard.module.css'

function FeatureCard({ icon, title, description }) {
  return (
    <div className="brutal-summary-card">
      <div className={styles.featureIcon}>
        <span className={styles.featureIconText}>{icon}</span>
      </div>
      <h3 className={styles.featureTitle}>
        {title}
      </h3>
      <p className={styles.featureDescription}>
        {description}
      </p>
    </div>
  )
}

export default FeatureCard; 