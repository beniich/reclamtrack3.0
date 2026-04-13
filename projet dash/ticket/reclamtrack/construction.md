# Système de Contrôle Interne — Niveau Industriel (SOC 2 / ISO 27001)

Ce document détaille la mise en œuvre des contrôles de sécurité industriels au sein de ReclamTrack, visant la conformité SOC 2 Type II et ISO 27001.

## 🏗️ Phase 1 : Infrastructure d'Audit & Immuabilité
- [x] **Audit Trail Centralisé** : Middleware capturant 100% des requêtes sensibles sur `/api`.
- [x] **Tamper-Proofing** : Hachage cryptographique SHA-256 de chaque entrée de log (`integrityHash`).
- [x] **Rétention SOC 2** : Index MongoDB TTL configuré pour une conservation automatique de 7 ans.

## 🔐 Phase 2 : IAM & Gouvernance des Accès
- [x] **Hardening Utilisateur** : Champs MFA, historique de mots de passe et verbot de connexion après échecs multiples.
- [x] **Session Tracking** : Monitoring des sessions actives et détection d'anomalies.
- [x] **Active Directory Sync** : Intégration backend pour la synchronisation des permissions.

## 📊 Phase 3 : Reporting & Monitoring de Conformité
- [x] **Compliance Center** : Dashboard de gouvernance avec score en temps réel.
- [x] **Export Dossier d'Audit** : Génération automatisée de rapports Excel (Preuve de contrôle).
- [x] **Network Pulse** : Monitoring pfSense et scans réseau intégrés.

## 🚀 Évolutions Futures
- [ ] Enregistrement des consentements RGPD (Consent Ledger).
- [ ] Automatisation de la remédiation via isolation réseau (pfSense Rules API).
- [ ] Dashboard d'auto-évaluation ISO 27001 interactif.

---
*Dernière mise à jour : 13 Avril 2026*
*Statut de la Conformité : **Opérationnel / Tier Industriel***
