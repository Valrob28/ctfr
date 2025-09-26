# 🐦 Configuration Twitter API

Pour avoir les **vraies photos de profil** et **derniers tweets** des influenceurs crypto, vous devez configurer l'API Twitter.

## 🔑 Obtenir un Token Twitter

### 1. Créer une application Twitter
1. Allez sur [developer.twitter.com](https://developer.twitter.com)
2. Créez un compte développeur
3. Créez une nouvelle application
4. Générez un **Bearer Token**

### 2. Configurer le token
Ajoutez votre token dans le fichier `.env.local` :

```env
NEXT_PUBLIC_TWITTER_BEARER_TOKEN=votre_token_ici
```

## 🚀 Fonctionnalités avec Token Twitter

Avec un token valide, l'application récupère :
- ✅ **Photos de profil réelles** des influenceurs
- ✅ **Derniers tweets** en temps réel
- ✅ **Données mises à jour** automatiquement
- ✅ **Cache intelligent** (5 minutes)

## 🔄 Sans Token Twitter

Sans token, l'application utilise :
- 🎨 **Avatars générés** avec les initiales
- 📝 **Messages génériques** pour les tweets
- 🔄 **Bouton de rafraîchissement** pour forcer la mise à jour

## 🛠️ Services alternatifs utilisés

L'application utilise plusieurs sources pour les avatars :
1. **Unavatar.io** - Avatars Twitter publics
2. **DiceBear** - Avatars générés
3. **UI-Avatars** - Avatars avec initiales

## 📊 Cache et Performance

- **Cache** : 5 minutes par influenceur
- **Timeout** : 3 secondes par requête
- **Fallback** : Avatar généré si échec
- **Rafraîchissement** : Bouton manuel disponible

## 🔧 Dépannage

### Problème : Avatars ne se chargent pas
```bash
# Vider le cache
npm run dev
# Ou cliquer sur "Rafraîchir"
```

### Problème : Tweets ne s'affichent pas
- Vérifiez votre token Twitter
- Redémarrez l'application
- Utilisez le bouton de rafraîchissement

### Problème : Données obsolètes
- Le cache se vide automatiquement après 5 minutes
- Utilisez le bouton "Rafraîchir" pour forcer la mise à jour

## 🎯 Résultat attendu

Avec la configuration complète :
- **40 influenceurs** crypto français
- **Photos de profil** réelles et à jour
- **Derniers tweets** synchronisés
- **Interface** fluide et responsive
- **Cache** intelligent pour les performances
