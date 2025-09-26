# 🚀 Solana Crypto Leaderboard - Édition Française

Une dApp Solana permettant de voter pour vos influenceurs crypto français préférés dans 3 catégories :
- ✅ **Best Call** - Les meilleures prédictions
- ❌ **Worst Call** - Les pires prédictions  
- 🤡 **Biggest SMA** - Les plus gros SMA (Social Media Attention)

## 🇫🇷 Influenceurs Crypto Français

L'application inclut **40 influenceurs crypto français** répartis en 5 catégories :
- 📈 **Traders** (15) - 0xAigri, Felchou ETH, Carlita Crypto, etc.
- 🔍 **Analystes** (10) - Crypto Picsou, Tagado BTC, etc.
- 🌟 **Influenceurs** (8) - Boubou SGC, Reine Calypso, etc.
- 📺 **YouTubeurs** (4) - Alan Trading, Capetel Vrai, etc.
- 💻 **Développeurs** (3) - Feyronn, Lowky, etc.

## 🛠️ Technologies

- **Frontend**: Next.js 14 + React + TypeScript + TailwindCSS
- **Blockchain**: Solana + Anchor Framework
- **Wallet**: Phantom Wallet via @solana/wallet-adapter
- **API**: Twitter API v2 pour les avatars et tweets

## 🚀 Installation

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd solana-crypto-leaderboard
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration de l'environnement**
```bash
cp env.example .env.local
```

4. **Déployer le programme Solana**
```bash
# Installer Anchor si pas déjà fait
npm install -g @coral-xyz/anchor-cli

# Construire et déployer le programme
anchor build
anchor deploy
```

5. **Lancer l'application**
```bash
npm run dev
```

## 📁 Structure du projet

```
├── app/                    # Pages Next.js
├── components/             # Composants React
├── programs/               # Programme Anchor Solana
├── utils/                  # Utilitaires
├── types/                  # Types TypeScript
└── public/                 # Assets statiques
```

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env.local` avec :

```env
# Configuration Solana
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_PROGRAM_ID=votre_program_id_ici

# Configuration Twitter API (optionnel)
NEXT_PUBLIC_TWITTER_BEARER_TOKEN=votre_token_twitter

# Configuration RPC (optionnel)
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
```

### Programme Solana

Le programme Anchor est situé dans `programs/crypto-leaderboard/` et contient :

- **Structure Influencer** : Stocke les votes pour chaque influenceur
- **Fonctions de vote** : `vote_best_call`, `vote_worst_call`, `vote_sma`
- **Gestion des comptes** : Initialisation automatique des influenceurs

## 🎨 Fonctionnalités

### Frontend
- ✅ Connexion wallet Phantom
- ✅ Interface responsive avec TailwindCSS
- ✅ Barres de progression animées
- ✅ Intégration Twitter API
- ✅ Mise à jour en temps réel
- ✅ **Filtrage par catégories** (Traders, Analystes, etc.)
- ✅ **40 influenceurs crypto français**
- ✅ **Avatars Twitter synchronisés**

### Blockchain
- ✅ Programme Anchor déployé
- ✅ Gestion des votes on-chain
- ✅ Structure de données optimisée
- ✅ Sécurité des transactions

### UX/UI
- ✅ Design moderne et responsive
- ✅ Animations fluides
- ✅ Feedback visuel des votes
- ✅ Gestion des états de chargement

## 🚀 Déploiement

### Frontend (Vercel)
```bash
npm run build
# Déployer sur Vercel
```

### Programme Solana
```bash
# Déployer sur mainnet
anchor deploy --provider.cluster mainnet
```

## 📱 Utilisation

1. **Connecter votre wallet Phantom**
2. **Parcourir la liste des influenceurs**
3. **Voter dans les 3 catégories** :
   - ✅ Best Call (vert)
   - ❌ Worst Call (rouge)  
   - 🤡 Biggest SMA (violet)
4. **Voir les résultats en temps réel**

## 🔒 Sécurité

- ✅ Validation des transactions
- ✅ Gestion des erreurs
- ✅ Protection contre les votes multiples
- ✅ Vérification des signatures

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commit vos changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

MIT License - voir le fichier LICENSE pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement

---

**Développé avec ❤️ pour la communauté Solana**
