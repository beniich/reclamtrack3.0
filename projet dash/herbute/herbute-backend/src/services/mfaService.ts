import { authenticator } from 'otplib';
import QRCode from 'qrcode';
import crypto from 'crypto';

export class MfaService {
  /**
   * Generates a new TOTP secret for a user
   */
  static generateSecret(): string {
    return authenticator.generateSecret();
  }

  /**
   * Generates a QR Code data URL for the user to scan in their authenticator app
   */
  static async generateQrCode(email: string, secret: string): Promise<string> {
    const otpauth = authenticator.keyuri(email, 'Herbute Compliance', secret);
    return QRCode.toDataURL(otpauth);
  }

  /**
   * Verifies a TOTP token against a secret
   */
  static verifyToken(token: string, secret: string): boolean {
    return authenticator.verify({ token, secret });
  }

  /**
   * Generates a set of backup codes for recovery
   */
  static generateBackupCodes(count: number = 8): string[] {
    const codes: string[] = [];
    for (let i = 0; i < count; i++) {
        // Format: XXXX-XXXX
        const part1 = crypto.randomBytes(2).toString('hex').toUpperCase();
        const part2 = crypto.randomBytes(2).toString('hex').toUpperCase();
        codes.push(`${part1}-${part2}`);
    }
    return codes;
  }
}
