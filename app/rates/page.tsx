import styles from "./rates.module.css"; // Importa los estilos de CSS Modules

export default function RatesPage() {
    return (
        <div className={styles.container}>
            {/* Logo con una CLASE en vez de un ID */}
            <img 
                src="https://rates-nwpc.s3.us-east-2.amazonaws.com/LOGO_NWFG-.png" 
                alt="Logo NWFG" 
                className={styles.logo} 
            />
        </div>
    );
}
