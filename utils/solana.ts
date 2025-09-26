import { 
  Connection, 
  PublicKey, 
  Transaction, 
  SystemProgram,
  LAMPORTS_PER_SOL 
} from '@solana/web3.js'
import { Program, AnchorProvider, web3 } from '@coral-xyz/anchor'
import { WalletContextState } from '@solana/wallet-adapter-react'
import { InfluencerData, VoteCategory } from '@/types'

// ID du programme (à remplacer par l'ID réel après déploiement)
const PROGRAM_ID = new PublicKey('Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS')

export async function getInfluencerData(
  connection: Connection, 
  name: string
): Promise<InfluencerData> {
  try {
    // Générer la PDA pour l'influenceur
    const [influencerPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from('influencer'), Buffer.from(name)],
      PROGRAM_ID
    )

    // Récupérer les données du compte
    const accountInfo = await connection.getAccountInfo(influencerPDA)
    
    if (!accountInfo) {
      // Si le compte n'existe pas, retourner des valeurs par défaut
      return {
        name,
        handle: name.toLowerCase().replace(/\s+/g, ''),
        bestCall: 0,
        worstCall: 0,
        sma: 0
      }
    }

    // Décoder les données (structure simplifiée)
    // Dans un vrai projet, vous utiliseriez l'IDL pour décoder
    const data = accountInfo.data
    const bestCall = data.readUInt32LE(4) // Offset pour best_call
    const worstCall = data.readUInt32LE(12) // Offset pour worst_call  
    const sma = data.readUInt32LE(20) // Offset pour sma

    return {
      name,
      handle: name.toLowerCase().replace(/\s+/g, ''),
      bestCall,
      worstCall,
      sma
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error)
    return {
      name,
      handle: name.toLowerCase().replace(/\s+/g, ''),
      bestCall: 0,
      worstCall: 0,
      sma: 0
    }
  }
}

export async function voteInfluencer(
  connection: Connection,
  publicKey: PublicKey,
  signTransaction: WalletContextState['signTransaction'],
  influencerName: string,
  category: VoteCategory
): Promise<void> {
  try {
    // Créer la transaction
    const transaction = new Transaction()

    // Générer la PDA pour l'influenceur
    const [influencerPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from('influencer'), Buffer.from(influencerName)],
      PROGRAM_ID
    )

    // Vérifier si le compte existe, sinon l'initialiser
    const accountInfo = await connection.getAccountInfo(influencerPDA)
    if (!accountInfo) {
      // Instruction d'initialisation
      const initInstruction = SystemProgram.createAccount({
        fromPubkey: publicKey,
        newAccountPubkey: influencerPDA,
        lamports: await connection.getMinimumBalanceForRentExemption(1000),
        space: 1000,
        programId: PROGRAM_ID,
      })
      transaction.add(initInstruction)
    }

    // Ajouter l'instruction de vote
    // Note: Dans un vrai projet, vous utiliseriez l'IDL pour créer les instructions
    const voteInstruction = {
      programId: PROGRAM_ID,
      keys: [
        { pubkey: influencerPDA, isSigner: false, isWritable: true },
        { pubkey: publicKey, isSigner: true, isWritable: false },
      ],
      data: Buffer.from([category === 'bestCall' ? 1 : category === 'worstCall' ? 2 : 3])
    }
    
    transaction.add(voteInstruction)

    // Signer et envoyer la transaction
    const { blockhash } = await connection.getLatestBlockhash()
    transaction.recentBlockhash = blockhash
    transaction.feePayer = publicKey

    const signedTransaction = await signTransaction(transaction)
    const signature = await connection.sendRawTransaction(signedTransaction.serialize())
    
    // Attendre la confirmation
    await connection.confirmTransaction(signature)
    
    console.log('Vote enregistré avec succès:', signature)
  } catch (error) {
    console.error('Erreur lors du vote:', error)
    throw error
  }
}
