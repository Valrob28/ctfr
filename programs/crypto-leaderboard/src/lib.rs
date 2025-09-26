use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod crypto_leaderboard {
    use super::*;

    pub fn initialize_influencer(
        ctx: Context<InitializeInfluencer>,
        name: String,
    ) -> Result<()> {
        let influencer = &mut ctx.accounts.influencer;
        influencer.name = name;
        influencer.best_call = 0;
        influencer.worst_call = 0;
        influencer.sma = 0;
        influencer.authority = ctx.accounts.authority.key();
        influencer.bump = ctx.bumps.influencer;
        Ok(())
    }

    pub fn vote_best_call(ctx: Context<Vote>) -> Result<()> {
        let influencer = &mut ctx.accounts.influencer;
        influencer.best_call += 1;
        Ok(())
    }

    pub fn vote_worst_call(ctx: Context<Vote>) -> Result<()> {
        let influencer = &mut ctx.accounts.influencer;
        influencer.worst_call += 1;
        Ok(())
    }

    pub fn vote_sma(ctx: Context<Vote>) -> Result<()> {
        let influencer = &mut ctx.accounts.influencer;
        influencer.sma += 1;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(name: String)]
pub struct InitializeInfluencer<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 4 + name.len() + 8 + 8 + 8 + 32 + 1,
        seeds = [b"influencer", name.as_bytes()],
        bump
    )]
    pub influencer: Account<'info, Influencer>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(mut)]
    pub influencer: Account<'info, Influencer>,
    pub voter: Signer<'info>,
}

#[account]
pub struct Influencer {
    pub name: String,
    pub best_call: u64,
    pub worst_call: u64,
    pub sma: u64,
    pub authority: Pubkey,
    pub bump: u8,
}
