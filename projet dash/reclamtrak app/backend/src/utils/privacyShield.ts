/**
 * Utilitaire de protection des données personnelles (Privacy Shield - SOC 2)
 */
export class PrivacyShield {
    /**
     * Masque un numéro de téléphone
     */
    static maskPhone(phone: string): string {
        if (!phone) return '';
        return phone.replace(/(\d{2})(\d{4})(\d{2})/, '$1 **** $3');
    }

    /**
     * Masque une adresse email
     */
    static maskEmail(email: string): string {
        if (!email) return '';
        const [user, domain] = email.split('@');
        return `${user.charAt(0)}****@${domain}`;
    }

    /**
     * Masque les coordonnées GPS détaillées (floutage)
     */
    static blurLocation(lat: number, lng: number): { lat: number, lng: number } {
        // Garde 2 décimales pour la zone sans donner le point exact (approx 1km)
        return {
            lat: Math.round(lat * 100) / 100,
            lng: Math.round(lng * 100) / 100
        };
    }
}
