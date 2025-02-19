/// <reference types="node" />
/// <reference types="@metaplex-foundation/mpl-bubblegum/node_modules/@solana/web3.js" />
import { AnchorProvider, BorshCoder, Coder, EventParser, Instruction, Program } from "@coral-xyz/anchor";
import { AccountInfo, Commitment, PublicKey, TransactionResponse } from "@solana/web3.js";
import { AcctDiscHexMap, Cluster, ParsedAnchorIx, PnftArgs } from "@tensor-hq/tensor-common";
import BN from "bn.js";
import { AccountSuffix } from "../common";
import { ParsedAccount } from "../types";
import { TensorBid as TBid_v0_1_0 } from "./idl/tensor_bid_v0_1_0";
import { IDL as IDL_latest, TensorBid as TBid_latest } from "./idl/tensor_bid";
export declare const TBidIDL_v0_1_0: TBid_v0_1_0;
export declare const TBidIDL_v0_1_0_EffSlot_Mainnet = 183865849;
export declare const TBidIDL_latest: TBid_latest;
export declare const TBidIDL_latest_EffSlot_Mainnet = 184669012;
export declare const TBidIDL_latest_EffSlot_Devnet = 203536603;
export type TBidIDL = TBid_v0_1_0 | TBid_latest;
export declare const triageBidIDL: (slot: number | bigint, cluster: Cluster) => TBidIDL | null;
export declare const CURRENT_TBID_VERSION: number;
export declare const TBID_TAKER_FEE_BPS: number;
export declare const MAX_EXPIRY_SEC: number;
export declare const BID_STATE_SIZE: number;
export declare const APPROX_BID_STATE_RENT: number;
export type BidStateAnchor = {
    version: number;
    bidAmount: BN;
    nftMint: PublicKey;
    bidder: PublicKey;
    bump: number[];
    expiry: BN;
    margin: PublicKey | null;
    updatedAt: BN;
};
export type TensorBidPdaAnchor = BidStateAnchor;
export type TaggedTensorBidPdaAnchor = {
    name: "bidState";
    account: BidStateAnchor;
};
export type TBidIxName = (typeof IDL_latest)["instructions"][number]["name"];
export type TBidIx = Omit<Instruction, "name"> & {
    name: TBidIxName;
};
export type ParsedTBidIx = ParsedAnchorIx<TBid_latest>;
export type TBidPricedIx = {
    lamports: BN;
};
export declare class TensorBidSDK {
    program: Program<TBidIDL>;
    discMap: AcctDiscHexMap<TBidIDL>;
    coder: BorshCoder;
    eventParser: EventParser;
    constructor({ idl, addr, provider, coder, }: {
        idl?: any;
        addr?: PublicKey;
        provider?: AnchorProvider;
        coder?: Coder;
    });
    fetchBidState(bidState: PublicKey, commitment?: Commitment): Promise<BidStateAnchor>;
    decode(acct: AccountInfo<Buffer>): TaggedTensorBidPdaAnchor | null;
    bid({ bidder, nftMint, lamports, margin, expireIn, }: {
        bidder: PublicKey;
        nftMint: PublicKey;
        lamports: BN;
        margin?: PublicKey | null;
        expireIn?: BN | null;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TBidIDL, ({
            name: "bid";
            accounts: [{
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "bidder";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "rent";
                isMut: false;
                isSigner: false;
            }, {
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "lamports";
                type: "u64";
            }, {
                name: "expireInSec";
                type: {
                    option: "u64";
                };
            }, {
                name: "fundMargin";
                type: "bool";
            }];
        } & {
            name: "bid";
        }) | ({
            name: "bid";
            accounts: [{
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "bidder";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "rent";
                isMut: false;
                isSigner: false;
            }, {
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "lamports";
                type: "u64";
            }, {
                name: "expireInSec";
                type: {
                    option: "u64";
                };
            }];
        } & {
            name: "bid";
        })>;
        tx: {
            ixs: import("@solana/web3.js").TransactionInstruction[];
            extraSigners: never[];
        };
        bidState: PublicKey;
        bidStateBump: number;
        tswapPda: PublicKey;
        tswapPdaBump: number;
    }>;
    takeBid({ bidder, seller, nftMint, lamports, tokenProgram, margin, nftSellerAcc, meta, authData, compute, priorityMicroLamports, optionalRoyaltyPct, takerBroker, }: {
        bidder: PublicKey;
        seller: PublicKey;
        nftMint: PublicKey;
        lamports: BN;
        tokenProgram: PublicKey;
        margin?: PublicKey | null;
        nftSellerAcc: PublicKey;
        optionalRoyaltyPct?: number | null;
        takerBroker?: PublicKey | null;
    } & PnftArgs): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TBidIDL, ({
            name: "takeBid";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftBidderAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftSellerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftTempAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "bidder";
                isMut: true;
                isSigner: false;
            }, {
                name: "seller";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "rent";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "sellerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "bidderTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "tempTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "pnftShared";
                accounts: [{
                    name: "tokenMetadataProgram";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "instructions";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "authorizationRulesProgram";
                    isMut: false;
                    isSigner: false;
                }];
            }, {
                name: "tensorswapProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "authRules";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "takerBroker";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "lamports";
                type: "u64";
            }, {
                name: "rulesAccPresent";
                type: "bool";
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }, {
                name: "optionalRoyaltyPct";
                type: {
                    option: "u16";
                };
            }];
        } & {
            name: "takeBid";
        }) | ({
            name: "takeBid";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftBidderAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftSellerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftTempAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "bidder";
                isMut: true;
                isSigner: false;
            }, {
                name: "seller";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "rent";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "sellerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "bidderTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "tempTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "pnftShared";
                accounts: [{
                    name: "tokenMetadataProgram";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "instructions";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "authorizationRulesProgram";
                    isMut: false;
                    isSigner: false;
                }];
            }, {
                name: "tensorswapProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "authRules";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "takerBroker";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "lamports";
                type: "u64";
            }, {
                name: "rulesAccPresent";
                type: "bool";
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }, {
                name: "optionalRoyaltyPct";
                type: {
                    option: "u16";
                };
            }];
        } & {
            name: "takeBid";
        })>;
        tx: {
            ixs: import("@solana/web3.js").TransactionInstruction[];
            extraSigners: never[];
        };
        bidState: PublicKey;
        bidStateBump: number;
        tswapPda: PublicKey;
        tswapPdaBump: number;
        tempPda: PublicKey;
        tempPdaBump: number;
        meta: {
            address: PublicKey;
            metadata: import("@metaplex-foundation/mpl-token-metadata").Metadata;
        };
        ownerTokenRecordBump: number;
        ownerTokenRecordPda: PublicKey;
        destTokenRecordBump: number;
        destTokenRecordPda: PublicKey;
        tempDestTokenRecordBump: number;
        tempDestTokenRecordPda: PublicKey;
        ruleSet: PublicKey | undefined;
        nftEditionPda: PublicKey;
        authDataSerialized: {
            payload: {
                name: string;
                payload: any;
            }[];
        } | null;
        nftbidderAcc: PublicKey;
    }>;
    cancelBid({ bidder, nftMint, }: {
        bidder: PublicKey;
        nftMint: PublicKey;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TBidIDL, ({
            name: "cancelBid";
            accounts: [{
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "bidder";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "rent";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "cancelBid";
        }) | ({
            name: "cancelBid";
            accounts: [{
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "bidder";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "rent";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "cancelBid";
        })>;
        tx: {
            ixs: import("@solana/web3.js").TransactionInstruction[];
            extraSigners: never[];
        };
        bidState: PublicKey;
        bidStateBump: number;
    }>;
    closeExpiredBid({ bidder, nftMint, }: {
        bidder: PublicKey;
        nftMint: PublicKey;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TBidIDL, ({
            name: "closeExpiredBid";
            accounts: [{
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "bidder";
                isMut: true;
                isSigner: false;
            }, {
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "rent";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "closeExpiredBid";
        }) | ({
            name: "closeExpiredBid";
            accounts: [{
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "bidder";
                isMut: true;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "rent";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "closeExpiredBid";
        })>;
        tx: {
            ixs: import("@solana/web3.js").TransactionInstruction[];
            extraSigners: never[];
        };
        bidState: PublicKey;
        bidStateBump: number;
    }>;
    takeBidT22({ bidder, seller, nftMint, lamports, margin, nftSellerAcc, compute, priorityMicroLamports, takerBroker, }: {
        bidder: PublicKey;
        seller: PublicKey;
        nftMint: PublicKey;
        lamports: BN;
        margin?: PublicKey | null;
        nftSellerAcc: PublicKey;
        compute?: number | null | undefined;
        priorityMicroLamports?: number | null | undefined;
        takerBroker?: PublicKey | null;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TBidIDL, {
            name: "takeBidT22";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftBidderAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftSellerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "bidder";
                isMut: true;
                isSigner: false;
            }, {
                name: "seller";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "rent";
                isMut: false;
                isSigner: false;
            }, {
                name: "tensorswapProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "takerBroker";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "takeBidT22";
        }>;
        tx: {
            ixs: import("@solana/web3.js").TransactionInstruction[];
            extraSigners: never[];
        };
        bidState: PublicKey;
        bidStateBump: number;
        tswapPda: PublicKey;
        tswapPdaBump: number;
        tempPda: PublicKey;
        tempPdaBump: number;
        nftbidderAcc: PublicKey;
    }>;
    wnsTakeBid({ bidder, seller, nftMint, lamports, margin, nftSellerAcc, collectionMint, compute, priorityMicroLamports, takerBroker, }: {
        bidder: PublicKey;
        seller: PublicKey;
        nftMint: PublicKey;
        lamports: BN;
        margin?: PublicKey | null;
        nftSellerAcc: PublicKey;
        collectionMint: PublicKey;
        compute?: number | null | undefined;
        priorityMicroLamports?: number | null | undefined;
        takerBroker?: PublicKey | null;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TBidIDL, {
            name: "wnsTakeBid";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftBidderAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftSellerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "bidState";
                isMut: true;
                isSigner: false;
            }, {
                name: "bidder";
                isMut: true;
                isSigner: false;
            }, {
                name: "seller";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "rent";
                isMut: false;
                isSigner: false;
            }, {
                name: "tensorswapProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "takerBroker";
                isMut: true;
                isSigner: false;
            }, {
                name: "approveAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "distribution";
                isMut: true;
                isSigner: false;
            }, {
                name: "wnsProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "distributionProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "extraMetas";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "wnsTakeBid";
        }>;
        tx: {
            ixs: import("@solana/web3.js").TransactionInstruction[];
            extraSigners: never[];
        };
        bidState: PublicKey;
        bidStateBump: number;
        tswapPda: PublicKey;
        tswapPdaBump: number;
        tempPda: PublicKey;
        tempPdaBump: number;
        nftbidderAcc: PublicKey;
    }>;
    getBidStateRent(): Promise<number>;
    getError(name: (typeof IDL_latest)["errors"][number]["name"]): (typeof IDL_latest)["errors"][number];
    getErrorCodeHex(name: (typeof IDL_latest)["errors"][number]["name"]): string;
    /** This only works for the latest IDL. This is intentional: otherwise we'll need to switch/case all historical deprecated ixs downstream. */
    parseIxs(tx: TransactionResponse): ParsedTBidIx[];
    getFeeAmount(ix: ParsedTBidIx): BN | null;
    getSolAmount(ix: ParsedTBidIx): BN | null;
    getAccountByName(ix: ParsedTBidIx, name: AccountSuffix): ParsedAccount | undefined;
}
//# sourceMappingURL=sdk.d.ts.map