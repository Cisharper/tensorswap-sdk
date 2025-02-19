import { AccountMeta, Commitment, Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
export declare function getTransferHookExtraAccounts(connection: Connection, mint: PublicKey, instruction: TransactionInstruction, tansferHookProgramId: PublicKey, commitment?: Commitment): Promise<AccountMeta[]>;
export declare const WNS_DISTRIBUTION_PROGRAM_ID: PublicKey;
export declare const WNS_PROGRAM_ID: PublicKey;
export declare const getApprovalAccount: (mint: PublicKey) => PublicKey;
export declare const getDistributionAccount: (collection: PublicKey) => PublicKey;
export declare const getApproveAccountLen: () => number;
//# sourceMappingURL=token2022.d.ts.map