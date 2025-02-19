/// <reference types="node" />
import { AnchorProvider, BorshCoder, Coder, Event, EventParser, Instruction, Program } from "@coral-xyz/anchor";
import { AccountInfo, Commitment, PublicKey, TransactionInstruction, TransactionResponse } from "@solana/web3.js";
import { AcctDiscHexMap, Cluster, ParsedAnchorIx, PnftArgs } from "@tensor-hq/tensor-common";
import BN from "bn.js";
import { AccountSuffix } from "../common";
import { ParsedAccount, PoolConfig } from "../types";
import { IDL as IDL_latest, Tensorswap as TSwap_latest } from "./idl/tensorswap";
import { Tensorswap as TSwap_v0_1_32 } from "./idl/tensorswap_v0_1_32";
import { Tensorswap as TSwap_v0_2_0 } from "./idl/tensorswap_v0_2_0";
import { Tensorswap as TSwap_v0_3_0 } from "./idl/tensorswap_v0_3_0";
import { Tensorswap as TSwap_v0_3_5 } from "./idl/tensorswap_v0_3_5";
import { Tensorswap as TSwap_v1_0_0 } from "./idl/tensorswap_v1_0_0";
import { Tensorswap as TSwap_v1_1_0 } from "./idl/tensorswap_v1_1_0";
import { Tensorswap as TSwap_v1_3_0 } from "./idl/tensorswap_v1_3_0";
import { Tensorswap as TSwap_v1_4_0 } from "./idl/tensorswap_v1_4_0";
import { Tensorswap as TSwap_v1_5_0 } from "./idl/tensorswap_v1_5_0";
import { Tensorswap as TSwap_v1_6_0 } from "./idl/tensorswap_v1_6_0";
import { Tensorswap as TSwap_v1_7_0 } from "./idl/tensorswap_v1_7_0";
import { MarginAccountAnchor, NftAuthorityAnchor, NftDepositReceiptAnchor, OrderType, PoolAnchor, PoolConfigAnchor, SingleListingAnchor, SolEscrowAnchor, TaggedTensorSwapPdaAnchor, TSwapAnchor, TSwapConfigAnchor } from "./types";
export declare const TSwapIDL_v0_1_32: TSwap_v0_1_32;
export declare const TSwapIDL_v0_1_32_EffSlot_Mainnet = 150855169;
export declare const TSwapIDL_v0_2_0: TSwap_v0_2_0;
export declare const TSwapIDL_v0_2_0_EffSlot_Mainnet = 153016663;
export declare const TSwapIDL_v0_3_0: TSwap_v0_3_0;
export declare const TSwapIDL_v0_3_0_EffSlot_Mainnet = 154762923;
export declare const TSwapIDL_v0_3_5: TSwap_v0_3_5;
export declare const TSwapIDL_v0_3_5_EffSlot_Mainnet = 154963721;
export declare const TSwapIDL_v1_0_0: TSwap_v1_0_0;
export declare const TSwapIDL_v1_0_0_EffSlot_Mainnet = 172173995;
export declare const TSwapIDL_v1_1_0: TSwap_v1_1_0;
export declare const TSwapIDL_v1_1_0_EffSlot_Mainnet = 173144552;
export declare const TSwapIDL_v1_3_0: TSwap_v1_3_0;
export declare const TSwapIDL_v1_3_0_EffSlot_Mainnet = 176096448;
export declare const TSwapIDL_v1_4_0: TSwap_v1_4_0;
export declare const TSwapIDL_v1_4_0_EffSlot_Mainnet = 177428733;
export declare const TSwapIDL_v1_5_0: TSwap_v1_5_0;
export declare const TSwapIDL_v1_5_0_EffSlot_Mainnet = 182023294;
export declare const TSwapIDL_v1_6_0: TSwap_v1_6_0;
export declare const TSwapIDL_v1_6_0_EffSlot_Mainnet = 182972833;
export declare const TSwapIDL_v1_7_0: TSwap_v1_7_0;
export declare const TSwapIDL_v1_7_0_EffSlot_Mainnet = 183869296;
export declare const TSwapIDL_v1_7_0_EffSlot_Devnet = 213361116;
export declare const TSwapIDL_latest: TSwap_latest;
export declare const TSwapIDL_latest_EffSlot_Mainnet = 186744215;
export declare const TSwapIDL_latest_EffSlot_Devnet = 265356431;
export type TSwapIDL = TSwap_v0_1_32 | TSwap_v0_2_0 | TSwap_v0_3_0 | TSwap_v0_3_5 | TSwap_v1_0_0 | TSwap_v1_1_0 | TSwap_v1_3_0 | TSwap_v1_4_0 | TSwap_v1_5_0 | TSwap_v1_6_0 | TSwap_v1_7_0 | TSwap_latest;
export declare const triageIDL: (slot: number | bigint, cluster: Cluster) => TSwapIDL | null;
export declare const SNIPE_FEE_BPS: number;
export declare const SNIPE_PROFIT_SHARE_BPS: number;
export declare const TAKER_BROKER_PCT: number;
export declare const SNIPE_MIN_FEE: number;
export declare const TSWAP_SIZE: number;
export declare const POOL_SIZE: number;
export declare const MARGIN_SIZE: number;
export declare const SINGLE_LISTING_SIZE: number;
export declare const DEPOSIT_RECEIPT_SIZE: number;
export declare const NFT_AUTHORITY_SIZE: number;
export declare const APPROX_TSWAP_RENT: number;
export declare const APPROX_POOL_RENT: number;
export declare const APPROX_SOL_MARGIN_RENT: number;
export declare const APPROX_SINGLE_LISTING_RENT: number;
export declare const APPROX_DEPOSIT_RECEIPT_RENT: number;
export declare const APPROX_NFT_AUTHORITY_RENT: number;
export declare const APPROX_SOL_ESCROW_RENT = 946560;
export type BuySellEventAnchor = Event<(typeof IDL_latest)["events"][0]>;
export type DelistEventAnchor = Event<(typeof IDL_latest)["events"][1]>;
export type TSwapIxName = (typeof IDL_latest)["instructions"][number]["name"];
export type TSwapIx = Omit<Instruction, "name"> & {
    name: TSwapIxName;
};
export type ParsedTSwapIx = ParsedAnchorIx<TSwap_latest>;
export type TSwapIxData = {
    config: PoolConfigAnchor;
};
export type EditPoolIxData = {
    oldConfig: PoolConfigAnchor;
    newConfig: PoolConfigAnchor;
};
export type WithdrawDepositSolData = TSwapIxData & {
    lamports: BN;
};
export type WithdrawTSwapOwnedSplData = TSwapIxData & {
    amount: BN;
};
export type ListEditListingData = TSwapIxData & {
    price: BN;
};
export declare class TensorSwapSDK {
    program: Program<TSwapIDL>;
    discMap: AcctDiscHexMap<TSwapIDL>;
    coder: BorshCoder;
    eventParser: EventParser;
    constructor({ idl, addr, provider, coder, }: {
        idl?: TSwapIDL;
        addr?: PublicKey;
        provider?: AnchorProvider;
        coder?: Coder;
    });
    fetchTSwap(tswap: PublicKey, commitment?: Commitment): Promise<TSwapAnchor>;
    fetchPool(pool: PublicKey, commitment?: Commitment): Promise<PoolAnchor>;
    fetchReceipt(receipt: PublicKey, commitment?: Commitment): Promise<NftDepositReceiptAnchor>;
    fetchSolEscrow(escrow: PublicKey, commitment?: Commitment): Promise<SolEscrowAnchor>;
    fetchNftAuthority(authority: PublicKey, commitment?: Commitment): Promise<NftAuthorityAnchor>;
    fetchMarginAccount(marginAccount: PublicKey, commitment?: Commitment): Promise<MarginAccountAnchor>;
    fetchSingleListing(singleListing: PublicKey, commitment?: Commitment): Promise<SingleListingAnchor>;
    decode(acct: AccountInfo<Buffer>): TaggedTensorSwapPdaAnchor | null;
    initUpdateTSwap({ owner, newOwner, config, feeVault, cosigner, }: {
        owner?: PublicKey;
        newOwner: PublicKey;
        config: TSwapConfigAnchor;
        feeVault?: PublicKey;
        cosigner?: PublicKey;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, ({
            name: "initUpdateTswap";
            accounts: [{
                name: "tswap";
                isMut: true;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We ask also for a signature just to make sure this wallet can actually sign things"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "newOwner";
                isMut: false;
                isSigner: true;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "TSwapConfig";
                };
            }];
        } & {
            name: "initUpdateTswap";
        }) | ({
            name: "initUpdateTswap";
            accounts: [{
                name: "tswap";
                isMut: true;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We ask also for a signature just to make sure this wallet can actually sign things"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "newOwner";
                type: "publicKey";
            }, {
                name: "config";
                type: {
                    defined: "TSwapConfig";
                };
            }];
        } & {
            name: "initUpdateTswap";
        }) | ({
            name: "initUpdateTswap";
            accounts: [{
                name: "tswap";
                isMut: true;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We ask also for a signature just to make sure this wallet can actually sign things"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "newOwner";
                type: "publicKey";
            }, {
                name: "config";
                type: {
                    defined: "TSwapConfig";
                };
            }];
        } & {
            name: "initUpdateTswap";
        }) | ({
            name: "initUpdateTswap";
            accounts: [{
                name: "tswap";
                isMut: true;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We ask also for a signature just to make sure this wallet can actually sign things"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "newOwner";
                type: "publicKey";
            }, {
                name: "config";
                type: {
                    defined: "TSwapConfig";
                };
            }];
        } & {
            name: "initUpdateTswap";
        }) | ({
            name: "initUpdateTswap";
            accounts: [{
                name: "tswap";
                isMut: true;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We ask also for a signature just to make sure this wallet can actually sign things"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "newOwner";
                type: "publicKey";
            }, {
                name: "config";
                type: {
                    defined: "TSwapConfig";
                };
            }];
        } & {
            name: "initUpdateTswap";
        }) | ({
            name: "initUpdateTswap";
            accounts: [{
                name: "tswap";
                isMut: true;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We ask also for a signature just to make sure this wallet can actually sign things"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "newOwner";
                type: "publicKey";
            }, {
                name: "config";
                type: {
                    defined: "TSwapConfig";
                };
            }];
        } & {
            name: "initUpdateTswap";
        }) | ({
            name: "initUpdateTswap";
            accounts: [{
                name: "tswap";
                isMut: true;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We ask also for a signature just to make sure this wallet can actually sign things"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "newOwner";
                type: "publicKey";
            }, {
                name: "config";
                type: {
                    defined: "TSwapConfig";
                };
            }];
        } & {
            name: "initUpdateTswap";
        }) | ({
            name: "initUpdateTswap";
            accounts: [{
                name: "tswap";
                isMut: true;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We ask also for a signature just to make sure this wallet can actually sign things"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "newOwner";
                type: "publicKey";
            }, {
                name: "config";
                type: {
                    defined: "TSwapConfig";
                };
            }];
        } & {
            name: "initUpdateTswap";
        }) | ({
            name: "initUpdateTswap";
            accounts: [{
                name: "tswap";
                isMut: true;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We ask also for a signature just to make sure this wallet can actually sign things"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "newOwner";
                type: "publicKey";
            }, {
                name: "config";
                type: {
                    defined: "TSwapConfig";
                };
            }];
        } & {
            name: "initUpdateTswap";
        }) | ({
            name: "initUpdateTswap";
            accounts: [{
                name: "tswap";
                isMut: true;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We ask also for a signature just to make sure this wallet can actually sign things"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "newOwner";
                type: "publicKey";
            }, {
                name: "config";
                type: {
                    defined: "TSwapConfig";
                };
            }];
        } & {
            name: "initUpdateTswap";
        }) | ({
            name: "initUpdateTswap";
            accounts: [{
                name: "tswap";
                isMut: true;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We ask also for a signature just to make sure this wallet can actually sign things"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "newOwner";
                type: "publicKey";
            }, {
                name: "config";
                type: {
                    defined: "TSwapConfig";
                };
            }];
        } & {
            name: "initUpdateTswap";
        }) | ({
            name: "initUpdateTswap";
            accounts: [{
                name: "tswap";
                isMut: true;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We ask also for a signature just to make sure this wallet can actually sign things"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "newOwner";
                type: "publicKey";
            }, {
                name: "config";
                type: {
                    defined: "TSwapConfig";
                };
            }];
        } & {
            name: "initUpdateTswap";
        })>;
        tx: {
            ixs: TransactionInstruction[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
    }>;
    withdrawTswapFee({ lamports, destination, owner, cosigner, }: {
        owner?: PublicKey;
        cosigner?: PublicKey;
        lamports: BN;
        destination: PublicKey;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, ({
            name: "withdrawTswapFees"; /** pnft args */
            accounts: [{
                name: "tswap";
                isMut: true;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We ask also for a signature just to make sure this wallet can actually sign things"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "destination";
                isMut: true; /** optional % OF full royalty amount, so eg 50% of 10% royalty would be 5% */
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "amount";
                type: "u64";
            }];
        } & {
            name: "withdrawTswapFees";
        }) | ({
            name: "withdrawTswapFees";
            accounts: [{
                name: "tswap";
                isMut: true;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We ask also for a signature just to make sure this wallet can actually sign things"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "destination";
                isMut: true;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "amount";
                type: "u64";
            }];
        } & {
            name: "withdrawTswapFees";
        }) | ({
            name: "withdrawTswapFees";
            accounts: [{
                name: "tswap";
                isMut: true;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We ask also for a signature just to make sure this wallet can actually sign things"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "destination";
                isMut: true;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "amount";
                type: "u64";
            }];
        } & {
            name: "withdrawTswapFees";
        }) | ({
            name: "withdrawTswapFees";
            accounts: [{
                name: "tswap";
                isMut: true;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We ask also for a signature just to make sure this wallet can actually sign things"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "destination";
                isMut: true;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "amount";
                type: "u64";
            }];
        } & {
            name: "withdrawTswapFees";
        }) | ({
            name: "withdrawTswapFees"; /** pnft args */
            accounts: [{
                name: "tswap";
                isMut: true;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We ask also for a signature just to make sure this wallet can actually sign things"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "destination";
                isMut: true;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "amount";
                type: "u64";
            }];
        } & {
            name: "withdrawTswapFees";
        }) | ({
            name: "withdrawTswapFees";
            accounts: [{
                name: "tswap";
                isMut: true;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We ask also for a signature just to make sure this wallet can actually sign things"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "destination";
                isMut: true;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "amount";
                type: "u64";
            }];
        } & {
            name: "withdrawTswapFees";
        })>;
        tx: {
            ixs: TransactionInstruction[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
    }>;
    initPool({ owner, whitelist, config, customAuthSeed, isCosigned, orderType, maxTakerSellCount, }: {
        owner: PublicKey;
        whitelist: PublicKey;
        config: PoolConfigAnchor;
        customAuthSeed?: number[];
        isCosigned?: boolean;
        orderType?: OrderType;
        maxTakerSellCount?: number;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, ({
            name: "initPool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftAuthority";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "authSeeds";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "isCosigned";
                type: "bool";
            }, {
                name: "orderType";
                type: "u8";
            }, {
                name: "maxTakerSellCount";
                type: {
                    option: "u32";
                };
            }];
        } & {
            name: "initPool";
        }) | ({
            name: "initPool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "initPool";
        }) | ({
            name: "initPool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "initPool";
        }) | ({
            name: "initPool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftAuthority";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "authSeeds";
                type: {
                    array: ["u8", 32];
                };
            }];
        } & {
            name: "initPool";
        }) | ({
            name: "initPool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftAuthority";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "authSeeds";
                type: {
                    array: ["u8", 32];
                };
            }];
        } & {
            name: "initPool";
        }) | ({
            name: "initPool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftAuthority";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "authSeeds";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "isCosigned";
                type: "bool";
            }, {
                name: "orderType";
                type: "u8";
            }];
        } & {
            name: "initPool";
        }) | ({
            name: "initPool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftAuthority";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "authSeeds";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "isCosigned";
                type: "bool";
            }, {
                name: "orderType";
                type: "u8";
            }, {
                name: "maxTakerSellCount";
                type: {
                    option: "u32";
                };
            }];
        } & {
            name: "initPool";
        }) | ({
            name: "initPool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftAuthority";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "authSeeds";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "isCosigned";
                type: "bool";
            }, {
                name: "orderType";
                type: "u8";
            }, {
                name: "maxTakerSellCount";
                type: {
                    option: "u32";
                };
            }];
        } & {
            name: "initPool";
        }) | ({
            name: "initPool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftAuthority";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "authSeeds";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "isCosigned";
                type: "bool";
            }, {
                name: "orderType";
                type: "u8";
            }, {
                name: "maxTakerSellCount";
                type: {
                    option: "u32";
                };
            }];
        } & {
            name: "initPool";
        }) | ({
            name: "initPool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftAuthority";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "authSeeds";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "isCosigned";
                type: "bool";
            }, {
                name: "orderType";
                type: "u8";
            }, {
                name: "maxTakerSellCount";
                type: {
                    option: "u32";
                };
            }];
        } & {
            name: "initPool";
        }) | ({
            name: "initPool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftAuthority";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "authSeeds";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "isCosigned";
                type: "bool";
            }, {
                name: "orderType";
                type: "u8";
            }, {
                name: "maxTakerSellCount";
                type: {
                    option: "u32";
                };
            }];
        } & {
            name: "initPool";
        }) | ({
            name: "initPool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftAuthority";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "authSeeds";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "isCosigned";
                type: "bool";
            }, {
                name: "orderType";
                type: "u8";
            }, {
                name: "maxTakerSellCount";
                type: {
                    option: "u32";
                };
            }];
        } & {
            name: "initPool";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        authSeed: number[];
        nftAuthPda: PublicKey;
        nftAuthBump: number;
        tswapPda: PublicKey;
        tswapBump: number;
        poolPda: PublicKey;
        poolBump: number;
        solEscrowPda: PublicKey;
        solEscrowBump: number;
    }>;
    closePool({ owner, whitelist, config, }: {
        owner: PublicKey;
        whitelist: PublicKey;
        config: PoolConfigAnchor;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, ({
            name: "closePool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
                docs: ["(!) if the order is marginated this won't return any funds to the user, since margin isn't auto-closed"];
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftAuthority";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "closePool";
        }) | ({
            name: "closePool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "closePool";
        }) | ({
            name: "closePool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "closePool";
        }) | ({
            name: "closePool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftAuthority";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "closePool";
        }) | ({
            name: "closePool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftAuthority";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "closePool";
        }) | ({
            name: "closePool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
                docs: ["(!) if the order is marginated this won't return any funds to the user, since margin isn't auto-closed"];
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftAuthority";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "closePool";
        }) | ({
            name: "closePool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
                docs: ["(!) if the order is marginated this won't return any funds to the user, since margin isn't auto-closed"];
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftAuthority";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "closePool";
        }) | ({
            name: "closePool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
                docs: ["(!) if the order is marginated this won't return any funds to the user, since margin isn't auto-closed"];
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftAuthority";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "closePool";
        }) | ({
            name: "closePool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
                docs: ["(!) if the order is marginated this won't return any funds to the user, since margin isn't auto-closed"];
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftAuthority";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "closePool";
        }) | ({
            name: "closePool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
                docs: ["(!) if the order is marginated this won't return any funds to the user, since margin isn't auto-closed"];
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftAuthority";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "closePool";
        }) | ({
            name: "closePool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
                docs: ["(!) if the order is marginated this won't return any funds to the user, since margin isn't auto-closed"];
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftAuthority";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "closePool";
        }) | ({
            name: "closePool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
                docs: ["(!) if the order is marginated this won't return any funds to the user, since margin isn't auto-closed"];
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftAuthority";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "closePool";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        nftAuthPda: PublicKey;
        tswapPda: PublicKey;
        tswapBump: number;
        poolPda: PublicKey;
        poolBump: number;
        solEscrowPda: PublicKey;
        solEscrowBump: number;
    }>;
    editPool({ owner, whitelist, oldConfig, newConfig, isCosigned, maxTakerSellCount, mmCompoundFees, }: {
        owner: PublicKey;
        whitelist: PublicKey;
        oldConfig: PoolConfigAnchor;
        newConfig?: PoolConfigAnchor;
        isCosigned?: boolean | null;
        maxTakerSellCount?: number;
        mmCompoundFees?: boolean | null;
    }): Promise<{
        builder: any;
        tx: {
            ixs: any[];
            extraSigners: never[];
        };
        nftAuthPda: PublicKey;
        tswapPda: PublicKey;
        tswapBump: number;
        oldPoolPda: PublicKey;
        oldPoolBump: number;
        oldSolEscrowPda: PublicKey;
        oldSolEscrowBump: number;
        newPoolPda: PublicKey;
        newPoolBump: number;
        newSolEscrowPda: PublicKey;
        newSolEscrowBump: number;
    }>;
    depositNft({ whitelist, nftMint, nftSource, owner, config, tokenProgram, 
    /** pnft args */
    meta, authData, compute, ruleSetAddnCompute, priorityMicroLamports, }: {
        whitelist: PublicKey;
        nftMint: PublicKey;
        nftSource: PublicKey;
        owner: PublicKey;
        config: PoolConfigAnchor;
        tokenProgram: PublicKey;
    } & PnftArgs): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, ({
            name: "depositNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
            }, {
                name: "nftSource";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
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
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "mintProof";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
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
                name: "authRules";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }, {
                name: "rulesAccPresent";
                type: "bool";
            }];
        } & {
            name: "depositNft";
        }) | ({
            name: "depositNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
            }, {
                name: "nftSource";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
            }, {
                name: "tokenProgram";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "proof";
                type: {
                    vec: {
                        array: ["u8", 32];
                    };
                };
            }];
        } & {
            name: "depositNft";
        }) | ({
            name: "depositNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
            }, {
                name: "nftSource";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "proof";
                type: {
                    vec: {
                        array: ["u8", 32];
                    };
                };
            }];
        } & {
            name: "depositNft";
        }) | ({
            name: "depositNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
            }, {
                name: "nftSource";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "proof";
                type: {
                    vec: {
                        array: ["u8", 32];
                    };
                };
            }];
        } & {
            name: "depositNft";
        }) | ({
            name: "depositNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
            }, {
                name: "nftSource";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "proof";
                type: {
                    vec: {
                        array: ["u8", 32];
                    };
                };
            }];
        } & {
            name: "depositNft";
        }) | ({
            name: "depositNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
            }, {
                name: "nftSource";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
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
                name: "nftMetadata";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "proof";
                type: {
                    vec: {
                        array: ["u8", 32];
                    };
                };
            }];
        } & {
            name: "depositNft";
        }) | ({
            name: "depositNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
            }, {
                name: "nftSource";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
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
                name: "nftMetadata";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "proof";
                type: {
                    vec: {
                        array: ["u8", 32];
                    };
                };
            }];
        } & {
            name: "depositNft";
        }) | ({
            name: "depositNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
            }, {
                name: "nftSource";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
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
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "mintProof";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }];
        } & {
            name: "depositNft";
        }) | ({
            name: "depositNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
            }, {
                name: "nftSource";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
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
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "mintProof";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }];
        } & {
            name: "depositNft";
        }) | ({
            name: "depositNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
            }, {
                name: "nftSource";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
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
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "mintProof";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }];
        } & {
            name: "depositNft";
        }) | ({
            name: "depositNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
            }, {
                name: "nftSource";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
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
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "mintProof";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }];
        } & {
            name: "depositNft";
        }) | ({
            name: "depositNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
            }, {
                name: "nftSource";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
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
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "mintProof";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }];
        } & {
            name: "depositNft";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        poolPda: PublicKey;
        poolBump: number;
        escrowPda: PublicKey;
        escrowBump: number;
        receiptPda: PublicKey;
        receiptBump: number;
        mintProofPda: PublicKey;
        ownerTokenRecordPda: PublicKey;
        ownerTokenRecordBump: number;
        destTokenRecordPda: PublicKey;
        destTokenRecordBump: number;
        nftEditionPda: PublicKey;
        meta: {
            address: PublicKey;
            metadata: import("@metaplex-foundation/mpl-token-metadata").Metadata;
        };
    }>;
    depositSol({ whitelist, owner, config, lamports, }: {
        whitelist: PublicKey;
        owner: PublicKey;
        config: PoolConfigAnchor;
        lamports: BN;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, ({
            name: "depositSol";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "depositSol";
        }) | ({
            name: "depositSol";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "depositSol";
        }) | ({
            name: "depositSol";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "depositSol";
        }) | ({
            name: "depositSol";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "depositSol";
        }) | ({
            name: "depositSol";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "depositSol";
        }) | ({
            name: "depositSol";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "depositSol";
        }) | ({
            name: "depositSol";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "depositSol";
        }) | ({
            name: "depositSol";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "depositSol";
        }) | ({
            name: "depositSol";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "depositSol";
        }) | ({
            name: "depositSol";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "depositSol";
        }) | ({
            name: "depositSol";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "depositSol";
        }) | ({
            name: "depositSol";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "depositSol";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        poolPda: PublicKey;
        poolBump: number;
        solEscrowPda: PublicKey;
        solEscrowBump: number;
    }>;
    withdrawNft({ whitelist, nftMint, nftDest, owner, config, tokenProgram, 
    /** pnft args */
    meta, authData, compute, ruleSetAddnCompute, priorityMicroLamports, }: {
        whitelist: PublicKey;
        nftMint: PublicKey;
        nftDest: PublicKey;
        owner: PublicKey;
        config: PoolConfigAnchor;
        tokenProgram: PublicKey;
    } & PnftArgs): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, ({
            name: "withdrawNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftDest";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
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
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
                name: "authRules";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }, {
                name: "rulesAccPresent";
                type: "bool";
            }];
        } & {
            name: "withdrawNft";
        }) | ({
            name: "withdrawNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftDest";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
            }, {
                name: "cosigner";
                isMut: false;
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "withdrawNft";
        }) | ({
            name: "withdrawNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftDest";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "withdrawNft";
        }) | ({
            name: "withdrawNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftDest";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "withdrawNft";
        }) | ({
            name: "withdrawNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftDest";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "withdrawNft";
        }) | ({
            name: "withdrawNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftDest";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "withdrawNft";
        }) | ({
            name: "withdrawNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftDest";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "withdrawNft";
        }) | ({
            name: "withdrawNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftDest";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
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
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }];
        } & {
            name: "withdrawNft";
        }) | ({
            name: "withdrawNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftDest";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
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
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }];
        } & {
            name: "withdrawNft";
        }) | ({
            name: "withdrawNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftDest";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
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
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }];
        } & {
            name: "withdrawNft";
        }) | ({
            name: "withdrawNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftDest";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
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
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }];
        } & {
            name: "withdrawNft";
        }) | ({
            name: "withdrawNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftDest";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
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
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }];
        } & {
            name: "withdrawNft";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        poolPda: PublicKey;
        poolBump: number;
        escrowPda: PublicKey;
        escrowBump: number;
        receiptPda: PublicKey;
        receiptBump: number;
        ownerTokenRecordBump: number;
        ownerTokenRecordPda: PublicKey;
        destTokenRecordBump: number;
        destTokenRecordPda: PublicKey;
        meta: {
            address: PublicKey;
            metadata: import("@metaplex-foundation/mpl-token-metadata").Metadata;
        };
    }>;
    withdrawSol({ whitelist, owner, config, lamports, }: {
        whitelist: PublicKey;
        owner: PublicKey;
        config: PoolConfigAnchor;
        lamports: BN;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, ({
            name: "withdrawSol";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "withdrawSol";
        }) | ({
            name: "withdrawSol";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "withdrawSol";
        }) | ({
            name: "withdrawSol";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "withdrawSol";
        }) | ({
            name: "withdrawSol";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "withdrawSol";
        }) | ({
            name: "withdrawSol";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "withdrawSol";
        }) | ({
            name: "withdrawSol";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "withdrawSol";
        }) | ({
            name: "withdrawSol";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "withdrawSol";
        }) | ({
            name: "withdrawSol";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "withdrawSol";
        }) | ({
            name: "withdrawSol";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "withdrawSol";
        }) | ({
            name: "withdrawSol";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "withdrawSol";
        }) | ({
            name: "withdrawSol";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "withdrawSol";
        }) | ({
            name: "withdrawSol";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "withdrawSol";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        poolPda: PublicKey;
        poolBump: number;
        solEscrowPda: PublicKey;
        solEscrowBump: number;
    }>;
    withdrawMmFee({ whitelist, owner, config, lamports, }: {
        whitelist: PublicKey;
        owner: PublicKey;
        config: PoolConfigAnchor;
        lamports: BN;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, ({
            name: "withdrawMmFee";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "withdrawMmFee";
        }) | ({
            name: "withdrawMmFee";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "withdrawMmFee";
        }) | ({
            name: "withdrawMmFee";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "withdrawMmFee";
        }) | ({
            name: "withdrawMmFee";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "withdrawMmFee";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        poolPda: PublicKey;
        poolBump: number;
        solEscrowPda: PublicKey;
        solEscrowBump: number;
    }>;
    buyNft({ whitelist, nftMint, nftBuyerAcc, owner, buyer, config, maxPrice, tokenProgram, marginNr, optionalRoyaltyPct, takerBroker, 
    /** pnft args */
    meta, authData, compute, ruleSetAddnCompute, priorityMicroLamports, }: {
        whitelist: PublicKey;
        nftMint: PublicKey;
        nftBuyerAcc: PublicKey;
        owner: PublicKey;
        buyer: PublicKey;
        config: PoolConfigAnchor;
        maxPrice: BN;
        tokenProgram: PublicKey;
        marginNr?: number | null;
        optionalRoyaltyPct?: number | null;
        takerBroker?: PublicKey | null;
    } & PnftArgs): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, ({
            name: "buyNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, has_one = whitelist on pool"];
            }, {
                name: "nftBuyerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account.", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
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
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "maxPrice";
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
            name: "buyNft";
        }) | ({
            name: "buyNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, has_one = whitelist on pool"];
            }, {
                name: "nftBuyerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftMetadata";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account.", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
                isMut: true;
                isSigner: true;
            }, {
                name: "cosigner";
                isMut: false;
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "proof";
                type: {
                    vec: {
                        array: ["u8", 32];
                    };
                };
            }, {
                name: "maxPrice";
                type: "u64";
            }];
        } & {
            name: "buyNft";
        }) | ({
            name: "buyNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, has_one = whitelist on pool"];
            }, {
                name: "nftBuyerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftMetadata";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account.", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "proof";
                type: {
                    vec: {
                        array: ["u8", 32];
                    };
                };
            }, {
                name: "maxPrice";
                type: "u64";
            }];
        } & {
            name: "buyNft";
        }) | ({
            name: "buyNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, has_one = whitelist on pool"];
            }, {
                name: "nftBuyerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftMetadata";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account.", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "proof";
                type: {
                    vec: {
                        array: ["u8", 32];
                    };
                };
            }, {
                name: "maxPrice";
                type: "u64";
            }];
        } & {
            name: "buyNft";
        }) | ({
            name: "buyNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, has_one = whitelist on pool"];
            }, {
                name: "nftBuyerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftMetadata";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account.", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "proof";
                type: {
                    vec: {
                        array: ["u8", 32];
                    };
                };
            }, {
                name: "maxPrice";
                type: "u64";
            }];
        } & {
            name: "buyNft";
        }) | ({
            name: "buyNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, has_one = whitelist on pool"];
            }, {
                name: "nftBuyerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftMetadata";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account.", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "maxPrice";
                type: "u64";
            }];
        } & {
            name: "buyNft";
        }) | ({
            name: "buyNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, has_one = whitelist on pool"];
            }, {
                name: "nftBuyerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftMetadata";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account.", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "maxPrice";
                type: "u64";
            }];
        } & {
            name: "buyNft";
        }) | ({
            name: "buyNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, has_one = whitelist on pool"];
            }, {
                name: "nftBuyerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account.", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
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
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "maxPrice";
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
            }];
        } & {
            name: "buyNft";
        }) | ({
            name: "buyNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, has_one = whitelist on pool"];
            }, {
                name: "nftBuyerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account.", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
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
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "maxPrice";
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
            }];
        } & {
            name: "buyNft";
        }) | ({
            name: "buyNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, has_one = whitelist on pool"];
            }, {
                name: "nftBuyerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account.", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
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
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "maxPrice";
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
            }];
        } & {
            name: "buyNft";
        }) | ({
            name: "buyNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, has_one = whitelist on pool"];
            }, {
                name: "nftBuyerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account.", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
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
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "maxPrice";
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
            }];
        } & {
            name: "buyNft";
        }) | ({
            name: "buyNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, has_one = whitelist on pool"];
            }, {
                name: "nftBuyerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account.", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
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
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "maxPrice";
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
            }];
        } & {
            name: "buyNft";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        poolPda: PublicKey;
        poolBump: number;
        escrowPda: PublicKey;
        escrowBump: number;
        solEscrowPda: PublicKey;
        solEscrowBump: number;
        receiptPda: PublicKey;
        receiptBump: number;
        ownerTokenRecordBump: number;
        ownerTokenRecordPda: PublicKey;
        destTokenRecordBump: number;
        destTokenRecordPda: PublicKey;
        meta: {
            address: PublicKey;
            metadata: import("@metaplex-foundation/mpl-token-metadata").Metadata;
        };
        ruleSet: PublicKey | undefined;
        marginBump: any;
        marginPda: any;
    }>;
    sellNft({ type, whitelist, nftMint, nftSellerAcc, owner, seller, config, minPrice, tokenProgram, marginNr, isCosigned, cosigner, optionalRoyaltyPct, takerBroker, 
    /** pnft args */
    meta, authData, compute, ruleSetAddnCompute, priorityMicroLamports, }: {
        type: "trade" | "token";
        whitelist: PublicKey;
        nftMint: PublicKey;
        nftSellerAcc: PublicKey;
        owner: PublicKey;
        seller: PublicKey;
        config: PoolConfigAnchor;
        minPrice: BN;
        tokenProgram: PublicKey;
        marginNr?: number | null;
        isCosigned?: boolean;
        cosigner?: PublicKey;
        /** optional % OF full royalty amount, so eg 50% of 10% royalty would be 5% */
        optionalRoyaltyPct?: number | null;
        /** optional taker broker account */
        takerBroker?: PublicKey | null;
    } & PnftArgs): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, ({
            name: "sellNftTradePool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                    docs: ["intentionally not deserializing, it would be dummy in the case of VOC/FVC based verification"];
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "tokenProgram";
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
                name: "associatedTokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "minPrice";
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
            name: "sellNftTradePool";
        }) | ({
            name: "sellNftTradePool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }, {
                    name: "cosigner";
                    isMut: false;
                    isSigner: true;
                }];
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "tokenProgram";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "proof";
                type: {
                    vec: {
                        array: ["u8", 32];
                    };
                };
            }, {
                name: "minPrice";
                type: "u64";
            }];
        } & {
            name: "sellNftTradePool";
        }) | ({
            name: "sellNftTradePool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "tokenProgram";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "proof";
                type: {
                    vec: {
                        array: ["u8", 32];
                    };
                };
            }, {
                name: "minPrice";
                type: "u64";
            }];
        } & {
            name: "sellNftTradePool";
        }) | ({
            name: "sellNftTradePool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "tokenProgram";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "proof";
                type: {
                    vec: {
                        array: ["u8", 32];
                    };
                };
            }, {
                name: "minPrice";
                type: "u64";
            }];
        } & {
            name: "sellNftTradePool";
        }) | ({
            name: "sellNftTradePool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "tokenProgram";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "proof";
                type: {
                    vec: {
                        array: ["u8", 32];
                    };
                };
            }, {
                name: "minPrice";
                type: "u64";
            }];
        } & {
            name: "sellNftTradePool";
        }) | ({
            name: "sellNftTradePool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                    docs: ["intentionally not deserializing here, coz it might be a blank account if merkle proof isn't used"];
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "tokenProgram";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "minPrice";
                type: "u64";
            }];
        } & {
            name: "sellNftTradePool";
        }) | ({
            name: "sellNftTradePool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                    docs: ["intentionally not deserializing here, coz it might be a blank account if merkle proof isn't used"];
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "tokenProgram";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "minPrice";
                type: "u64";
            }];
        } & {
            name: "sellNftTradePool";
        }) | ({
            name: "sellNftTradePool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                    docs: ["intentionally not deserializing, it would be dummy in the case of VOC/FVC based verification"];
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "tokenProgram";
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
                name: "associatedTokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "minPrice";
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
            }];
        } & {
            name: "sellNftTradePool";
        }) | ({
            name: "sellNftTradePool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                    docs: ["intentionally not deserializing, it would be dummy in the case of VOC/FVC based verification"];
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "tokenProgram";
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
                name: "associatedTokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "minPrice";
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
            }];
        } & {
            name: "sellNftTradePool";
        }) | ({
            name: "sellNftTradePool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                    docs: ["intentionally not deserializing, it would be dummy in the case of VOC/FVC based verification"];
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "tokenProgram";
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
                name: "associatedTokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "minPrice";
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
            }];
        } & {
            name: "sellNftTradePool";
        }) | ({
            name: "sellNftTradePool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                    docs: ["intentionally not deserializing, it would be dummy in the case of VOC/FVC based verification"];
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "tokenProgram";
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
                name: "associatedTokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "minPrice";
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
            }];
        } & {
            name: "sellNftTradePool";
        }) | ({
            name: "sellNftTradePool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                    docs: ["intentionally not deserializing, it would be dummy in the case of VOC/FVC based verification"];
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "tokenProgram";
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
                name: "associatedTokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "minPrice";
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
            }];
        } & {
            name: "sellNftTradePool";
        })> | import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, ({
            name: "sellNftTokenPool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                    docs: ["intentionally not deserializing, it would be dummy in the case of VOC/FVC based verification"];
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "ownerAtaAcc";
                isMut: true;
                isSigner: false;
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
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "tempEscrowTokenRecord";
                isMut: true;
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
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "minPrice";
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
            name: "sellNftTokenPool";
        }) | ({
            name: "sellNftTokenPool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }, {
                    name: "cosigner";
                    isMut: false;
                    isSigner: true;
                }];
            }, {
                name: "ownerAtaAcc";
                isMut: true;
                isSigner: false;
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "proof";
                type: {
                    vec: {
                        array: ["u8", 32];
                    };
                };
            }, {
                name: "minPrice";
                type: "u64";
            }];
        } & {
            name: "sellNftTokenPool";
        }) | ({
            name: "sellNftTokenPool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "ownerAtaAcc";
                isMut: true;
                isSigner: false;
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "proof";
                type: {
                    vec: {
                        array: ["u8", 32];
                    };
                };
            }, {
                name: "minPrice";
                type: "u64";
            }];
        } & {
            name: "sellNftTokenPool";
        }) | ({
            name: "sellNftTokenPool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "ownerAtaAcc";
                isMut: true;
                isSigner: false;
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "proof";
                type: {
                    vec: {
                        array: ["u8", 32];
                    };
                };
            }, {
                name: "minPrice";
                type: "u64";
            }];
        } & {
            name: "sellNftTokenPool";
        }) | ({
            name: "sellNftTokenPool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "ownerAtaAcc";
                isMut: true;
                isSigner: false;
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "proof";
                type: {
                    vec: {
                        array: ["u8", 32];
                    };
                };
            }, {
                name: "minPrice";
                type: "u64";
            }];
        } & {
            name: "sellNftTokenPool";
        }) | ({
            name: "sellNftTokenPool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                    docs: ["intentionally not deserializing here, coz it might be a blank account if merkle proof isn't used"];
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "ownerAtaAcc";
                isMut: true;
                isSigner: false;
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "minPrice";
                type: "u64";
            }];
        } & {
            name: "sellNftTokenPool";
        }) | ({
            name: "sellNftTokenPool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                    docs: ["intentionally not deserializing here, coz it might be a blank account if merkle proof isn't used"];
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "ownerAtaAcc";
                isMut: true;
                isSigner: false;
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "minPrice";
                type: "u64";
            }];
        } & {
            name: "sellNftTokenPool";
        }) | ({
            name: "sellNftTokenPool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                    docs: ["intentionally not deserializing, it would be dummy in the case of VOC/FVC based verification"];
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "ownerAtaAcc";
                isMut: true;
                isSigner: false;
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
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "minPrice";
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
            }];
        } & {
            name: "sellNftTokenPool";
        }) | ({
            name: "sellNftTokenPool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                    docs: ["intentionally not deserializing, it would be dummy in the case of VOC/FVC based verification"];
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "ownerAtaAcc";
                isMut: true;
                isSigner: false;
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
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "minPrice";
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
            }];
        } & {
            name: "sellNftTokenPool";
        }) | ({
            name: "sellNftTokenPool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                    docs: ["intentionally not deserializing, it would be dummy in the case of VOC/FVC based verification"];
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "ownerAtaAcc";
                isMut: true;
                isSigner: false;
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
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "minPrice";
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
            }];
        } & {
            name: "sellNftTokenPool";
        }) | ({
            name: "sellNftTokenPool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                    docs: ["intentionally not deserializing, it would be dummy in the case of VOC/FVC based verification"];
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "ownerAtaAcc";
                isMut: true;
                isSigner: false;
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
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "tempEscrowTokenRecord";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "minPrice";
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
            }];
        } & {
            name: "sellNftTokenPool";
        }) | ({
            name: "sellNftTokenPool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                    docs: ["intentionally not deserializing, it would be dummy in the case of VOC/FVC based verification"];
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "ownerAtaAcc";
                isMut: true;
                isSigner: false;
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
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "tempEscrowTokenRecord";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "minPrice";
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
            }];
        } & {
            name: "sellNftTokenPool";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        poolPda: PublicKey;
        poolBump: number;
        solEscrowPda: PublicKey;
        solEscrowBump: number;
        ownerAtaAcc: PublicKey;
        escrowPda: PublicKey;
        escrowBump: number;
        receiptPda: PublicKey;
        receiptBump: number;
        marginPda: any;
        marginBump: any;
        ownerTokenRecordBump: number;
        ownerTokenRecordPda: PublicKey;
        destTokenRecordBump: number;
        destTokenRecordPda: PublicKey;
        meta: {
            address: PublicKey;
            metadata: import("@metaplex-foundation/mpl-token-metadata").Metadata;
        };
    }>;
    reallocPool({ owner, cosigner, whitelist, config, }: {
        owner: PublicKey;
        cosigner: PublicKey;
        whitelist: PublicKey;
        config: PoolConfigAnchor;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, ({
            name: "reallocPool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "owner";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "reallocPool";
        }) | ({
            name: "reallocPool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "owner";
                isMut: false;
                isSigner: false;
            }, {
                name: "tswapOwner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "reallocPool";
        }) | ({
            name: "reallocPool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "owner";
                isMut: false;
                isSigner: false;
            }, {
                name: "tswapOwner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "reallocPool";
        }) | ({
            name: "reallocPool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "owner";
                isMut: false;
                isSigner: false;
            }, {
                name: "tswapOwner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "reallocPool";
        }) | ({
            name: "reallocPool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "owner";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "reallocPool";
        }) | ({
            name: "reallocPool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "owner";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "reallocPool";
        }) | ({
            name: "reallocPool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "owner";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "reallocPool";
        }) | ({
            name: "reallocPool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "owner";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "reallocPool";
        }) | ({
            name: "reallocPool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "owner";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "reallocPool";
        }) | ({
            name: "reallocPool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "owner";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "reallocPool";
        }) | ({
            name: "reallocPool";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "owner";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "reallocPool";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        poolPda: PublicKey;
        poolBump: number;
    }>;
    initMarginAcc({ owner, name, desiredNr, }: {
        owner: PublicKey;
        name: number[];
        desiredNr?: number;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, ({
            name: "initMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "marginNr";
                type: "u16";
            }, {
                name: "name";
                type: {
                    array: ["u8", 32];
                };
            }];
        } & {
            name: "initMarginAccount";
        }) | ({
            name: "initMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "marginNr";
                type: "u16";
            }, {
                name: "name";
                type: {
                    array: ["u8", 32];
                };
            }];
        } & {
            name: "initMarginAccount";
        }) | ({
            name: "initMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "marginNr";
                type: "u16";
            }, {
                name: "name";
                type: {
                    array: ["u8", 32];
                };
            }];
        } & {
            name: "initMarginAccount";
        }) | ({
            name: "initMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "marginNr";
                type: "u16";
            }, {
                name: "name";
                type: {
                    array: ["u8", 32];
                };
            }];
        } & {
            name: "initMarginAccount";
        }) | ({
            name: "initMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "marginNr";
                type: "u16";
            }, {
                name: "name";
                type: {
                    array: ["u8", 32];
                };
            }];
        } & {
            name: "initMarginAccount";
        }) | ({
            name: "initMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "marginNr";
                type: "u16";
            }, {
                name: "name";
                type: {
                    array: ["u8", 32];
                };
            }];
        } & {
            name: "initMarginAccount";
        }) | ({
            name: "initMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "marginNr";
                type: "u16";
            }, {
                name: "name";
                type: {
                    array: ["u8", 32];
                };
            }];
        } & {
            name: "initMarginAccount";
        }) | ({
            name: "initMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "marginNr";
                type: "u16";
            }, {
                name: "name";
                type: {
                    array: ["u8", 32];
                };
            }];
        } & {
            name: "initMarginAccount";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        marginPda: any;
        marginBump: any;
        marginNr: any;
    }>;
    closeMarginAcc({ marginNr, owner, }: {
        marginNr: number;
        owner: PublicKey;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, ({
            name: "closeMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "closeMarginAccount";
        }) | ({
            name: "closeMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "closeMarginAccount";
        }) | ({
            name: "closeMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "closeMarginAccount";
        }) | ({
            name: "closeMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            /** pnft args */
            args: [];
        } & {
            name: "closeMarginAccount";
        }) | ({
            name: "closeMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            /** pnft args */
            args: [];
        } & {
            name: "closeMarginAccount";
        }) | ({
            name: "closeMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            /** pnft args */
            args: [];
        } & {
            name: "closeMarginAccount";
        }) | ({
            name: "closeMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "closeMarginAccount";
        }) | ({
            name: "closeMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "closeMarginAccount";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        marginPda: PublicKey;
        marginBump: number;
    }>;
    depositMarginAcc({ marginNr, owner, amount, }: {
        marginNr: number;
        owner: PublicKey;
        amount: BN;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, ({
            name: "depositMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "depositMarginAccount";
        }) | ({
            name: "depositMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "depositMarginAccount";
        }) | ({
            name: "depositMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "depositMarginAccount";
        }) | ({
            name: "depositMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "depositMarginAccount";
        }) | ({
            name: "depositMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "depositMarginAccount";
        }) | ({
            name: "depositMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "depositMarginAccount";
        }) | ({
            name: "depositMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "depositMarginAccount";
        }) | ({
            name: "depositMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "depositMarginAccount";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        marginPda: PublicKey;
        marginBump: number;
    }>;
    withdrawMarginAcc({ marginNr, owner, amount, }: {
        marginNr: number;
        owner: PublicKey;
        amount: BN;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, ({
            name: "withdrawMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "withdrawMarginAccount";
        }) | ({
            name: "withdrawMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "withdrawMarginAccount";
        }) | ({
            name: "withdrawMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }]; /** pnft args */
            args: [{
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "withdrawMarginAccount";
        }) | ({
            name: "withdrawMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "withdrawMarginAccount";
        }) | ({
            name: "withdrawMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "withdrawMarginAccount";
        }) | ({
            name: "withdrawMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "withdrawMarginAccount";
        }) | ({
            name: "withdrawMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "withdrawMarginAccount";
        }) | ({
            name: "withdrawMarginAccount";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "withdrawMarginAccount";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        marginPda: PublicKey;
        marginBump: number;
    }>;
    attachPoolMargin({ config, marginNr, owner, whitelist, }: {
        config: PoolConfigAnchor;
        marginNr: number;
        owner: PublicKey;
        whitelist: PublicKey;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, ({
            name: "attachPoolToMargin";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "attachPoolToMargin";
        }) | ({
            name: "attachPoolToMargin";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "attachPoolToMargin";
        }) | ({
            name: "attachPoolToMargin";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "attachPoolToMargin";
        }) | ({
            name: "attachPoolToMargin";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "attachPoolToMargin";
        }) | ({
            name: "attachPoolToMargin";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "attachPoolToMargin";
        }) | ({
            name: "attachPoolToMargin";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "attachPoolToMargin";
        }) | ({
            name: "attachPoolToMargin";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "attachPoolToMargin";
        }) | ({
            name: "attachPoolToMargin";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "attachPoolToMargin";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        marginPda: PublicKey;
        marginBump: number;
        poolPda: PublicKey;
        poolBump: number;
        solEscrowPda: PublicKey;
        solEscrowBump: number;
    }>;
    detachPoolMargin({ config, marginNr, owner, amount, whitelist, }: {
        config: PoolConfigAnchor;
        marginNr: number;
        owner: PublicKey;
        amount?: BN;
        whitelist: PublicKey;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, ({
            name: "detachPoolFromMargin";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "detachPoolFromMargin";
        }) | ({
            name: "detachPoolFromMargin";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "detachPoolFromMargin";
        }) | ({
            name: "detachPoolFromMargin";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "detachPoolFromMargin";
        }) | ({
            name: "detachPoolFromMargin";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "detachPoolFromMargin";
        }) | ({
            name: "detachPoolFromMargin";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "detachPoolFromMargin";
        }) | ({
            name: "detachPoolFromMargin";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "detachPoolFromMargin";
        }) | ({
            name: "detachPoolFromMargin";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "detachPoolFromMargin";
        }) | ({
            name: "detachPoolFromMargin";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation / will be stored inside pool"];
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "lamports";
                type: "u64";
            }];
        } & {
            name: "detachPoolFromMargin";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        marginPda: PublicKey;
        marginBump: number;
        poolPda: PublicKey;
        poolBump: number;
        solEscrowPda: PublicKey;
        solEscrowBump: number;
    }>;
    setPoolFreeze({ whitelist, owner, config, marginNr, freeze, cosigner, }: {
        whitelist: PublicKey;
        owner: PublicKey;
        config: PoolConfigAnchor;
        marginNr: number;
        freeze: boolean;
        cosigner?: PublicKey;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, ({
            name: "setPoolFreeze";
            accounts: [{
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "freeze";
                type: "bool";
            }];
        } & {
            name: "setPoolFreeze";
        }) | ({
            name: "setPoolFreeze";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "freeze";
                type: "bool";
            }];
        } & {
            name: "setPoolFreeze";
        }) | ({
            name: "setPoolFreeze";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "freeze";
                type: "bool";
            }];
        } & {
            name: "setPoolFreeze";
        }) | ({
            name: "setPoolFreeze";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: false;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "freeze";
                type: "bool";
            }];
        } & {
            name: "setPoolFreeze";
        }) | ({
            name: "setPoolFreeze";
            accounts: [];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "freeze";
                type: "bool";
            }];
        } & {
            name: "setPoolFreeze";
        }) | ({
            name: "setPoolFreeze";
            accounts: [];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "freeze";
                type: "bool";
            }];
        } & {
            name: "setPoolFreeze";
        }) | ({
            name: "setPoolFreeze";
            accounts: [];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "freeze";
                type: "bool";
            }];
        } & {
            name: "setPoolFreeze";
        }) | ({
            name: "setPoolFreeze";
            accounts: [{
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "freeze";
                type: "bool";
            }];
        } & {
            name: "setPoolFreeze";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        poolPda: PublicKey;
        poolBump: number;
        solEscrowPda: PublicKey;
        solEscrowBump: number;
        marginPda: PublicKey;
        marginBump: number;
    }>;
    takeSnipe({ whitelist, nftMint, nftSellerAcc, owner, seller, config, actualPrice, marginNr, tokenProgram, cosigner, 
    /** pnft args */
    meta, authData, compute, ruleSetAddnCompute, priorityMicroLamports, }: {
        whitelist: PublicKey;
        nftMint: PublicKey;
        nftSellerAcc: PublicKey;
        owner: PublicKey;
        seller: PublicKey;
        config: PoolConfigAnchor;
        actualPrice: BN;
        marginNr: number;
        tokenProgram: PublicKey;
        cosigner?: PublicKey;
    } & PnftArgs): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, ({
            name: "takeSnipe";
            accounts: [{
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "actualPrice";
                type: "u64";
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }];
        } & {
            name: "takeSnipe";
        }) | ({
            name: "takeSnipe";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                    docs: ["intentionally not deserializing here, coz it might be a blank account if merkle proof isn't used"];
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "ownerAtaAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
                docs: ["Snipes are always marginated, hence include as a fixed account"];
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We have to cosign because the ix skips royalties, hence include as a fixed account", "(!) this doesn't mean that the order itself is cosigned, it might not be, just the same kp"];
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "actualPrice";
                type: "u64";
            }];
        } & {
            name: "takeSnipe";
        }) | ({
            name: "takeSnipe";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                    docs: ["intentionally not deserializing here, coz it might be a blank account if merkle proof isn't used"];
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "ownerAtaAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
                docs: ["Snipes are always marginated, hence include as a fixed account"];
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We have to cosign because the ix skips royalties, hence include as a fixed account", "(!) this doesn't mean that the order itself is cosigned, it might not be, just the same kp"];
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "actualPrice";
                type: "u64";
            }];
        } & {
            name: "takeSnipe";
        }) | ({
            name: "takeSnipe";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                    docs: ["intentionally not deserializing, it would be dummy in the case of VOC/FVC based verification"];
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "nftMetadata";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "ownerAtaAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "marginAccount";
                isMut: true;
                isSigner: false;
                docs: ["Snipes are always marginated, hence include as a fixed account"];
            }, {
                name: "cosigner";
                isMut: false;
                isSigner: true;
                docs: ["We have to cosign because the ix skips royalties, hence include as a fixed account", "(!) this doesn't mean that the order itself is cosigned, it might not be, just the same kp"];
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
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "actualPrice";
                type: "u64";
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }];
        } & {
            name: "takeSnipe";
        }) | ({
            name: "takeSnipe";
            accounts: [];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "actualPrice";
                type: "u64";
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }];
        } & {
            name: "takeSnipe";
        }) | ({
            name: "takeSnipe";
            accounts: [];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "actualPrice";
                type: "u64";
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }];
        } & {
            name: "takeSnipe";
        }) | ({
            name: "takeSnipe";
            accounts: [];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "actualPrice";
                type: "u64";
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }];
        } & {
            name: "takeSnipe";
        }) | ({
            name: "takeSnipe";
            accounts: [{
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "actualPrice";
                type: "u64";
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }];
        } & {
            name: "takeSnipe";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        poolPda: PublicKey;
        poolBump: number;
        solEscrowPda: PublicKey;
        solEscrowBump: number;
        ownerAtaAcc: PublicKey;
        escrowPda: PublicKey;
        escrowBump: number;
        receiptPda: PublicKey;
        receiptBump: number;
        marginPda: PublicKey;
        marginBump: number;
        ownerTokenRecordBump: number;
        ownerTokenRecordPda: PublicKey;
        destTokenRecordBump: number;
        destTokenRecordPda: PublicKey;
        meta: {
            address: PublicKey;
            metadata: import("@metaplex-foundation/mpl-token-metadata").Metadata;
        };
        ruleSet: PublicKey | undefined;
    }>;
    list({ nftMint, nftSource, owner, price, tokenProgram, payer, 
    /** pnft args */
    meta, authData, compute, ruleSetAddnCompute, priorityMicroLamports, }: {
        nftMint: PublicKey;
        nftSource: PublicKey;
        owner: PublicKey;
        price: BN;
        tokenProgram: PublicKey;
        payer?: PublicKey | null;
    } & PnftArgs): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, ({
            name: "list";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftSource";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
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
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
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
                name: "authRules";
                isMut: false;
                isSigner: false;
            }, {
                name: "payer";
                isMut: true;
                isSigner: true;
            }];
            args: [{
                name: "price";
                type: "u64";
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }, {
                name: "rulesAccPresent";
                type: "bool";
            }];
        } & {
            name: "list";
        }) | ({
            name: "list";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftSource";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
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
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
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
            }];
            args: [{
                name: "price";
                type: "u64";
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }];
        } & {
            name: "list";
        }) | ({
            name: "list";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftSource";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
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
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
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
            }];
            args: [{
                name: "price";
                type: "u64";
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }];
        } & {
            name: "list";
        }) | ({
            name: "list";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftSource";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
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
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
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
            }];
            args: [{
                name: "price";
                type: "u64";
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }];
        } & {
            name: "list";
        }) | ({
            name: "list";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftSource";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account"];
            }, {
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "rent"; /** pnft args */
                isMut: false;
                isSigner: false;
            }, {
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
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
            }];
            args: [{
                name: "price";
                type: "u64";
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }];
        } & {
            name: "list";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        escrowPda: PublicKey;
        escrowBump: number;
        ownerTokenRecordPda: PublicKey;
        ownerTokenRecordBump: number;
        destTokenRecordPda: PublicKey;
        destTokenRecordBump: number;
        nftEditionPda: PublicKey;
        meta: {
            address: PublicKey;
            metadata: import("@metaplex-foundation/mpl-token-metadata").Metadata;
        };
        singleListing: PublicKey;
        singleListingBump: number;
    }>;
    delist({ nftMint, nftDest, owner, tokenProgram, payer, 
    /** pnft args */
    meta, authData, compute, ruleSetAddnCompute, priorityMicroLamports, }: {
        nftMint: PublicKey;
        nftDest: PublicKey;
        owner: PublicKey;
        tokenProgram: PublicKey;
        payer?: PublicKey | null;
    } & PnftArgs): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, ({
            name: "delist";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftDest";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account", "This is closed below (dest = owner)"];
            }, {
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
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
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
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
                name: "authRules";
                isMut: false;
                isSigner: false;
            }, {
                name: "payer";
                isMut: true;
                isSigner: true;
            }];
            args: [{
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }, {
                name: "rulesAccPresent";
                type: "bool";
            }];
        } & {
            name: "delist";
        }) | ({
            name: "delist";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftDest";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account", "This is closed below (dest = owner)"];
            }, {
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
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
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
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
            }];
            args: [{
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }];
        } & {
            name: "delist";
        }) | ({
            name: "delist";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftDest";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account", "This is closed below (dest = owner)"];
            }, {
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
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
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
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
            }];
            args: [{
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }];
        } & {
            name: "delist";
        }) | ({
            name: "delist";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftDest";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account", "This is closed below (dest = owner)"];
            }, {
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
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
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
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
                    isSigner: false; /** optional % OF full royalty amount, so eg 50% of 10% royalty would be 5% */
                }];
            }];
            args: [{
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }];
        } & {
            name: "delist";
        }) | ({
            name: "delist";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftDest";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account", "This is closed below (dest = owner)"];
            }, {
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
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
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
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
            }];
            args: [{
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }];
        } & {
            name: "delist";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        escrowPda: PublicKey;
        escrowBump: number;
        ownerTokenRecordBump: number;
        ownerTokenRecordPda: PublicKey;
        destTokenRecordBump: number;
        destTokenRecordPda: PublicKey;
        meta: {
            address: PublicKey;
            metadata: import("@metaplex-foundation/mpl-token-metadata").Metadata;
        };
        singleListing: PublicKey;
        singleListingBump: number;
    }>;
    buySingleListing({ nftMint, nftBuyerAcc, owner, buyer, maxPrice, tokenProgram, optionalRoyaltyPct, takerBroker, 
    /** pnft args */
    meta, authData, compute, ruleSetAddnCompute, priorityMicroLamports, }: {
        nftMint: PublicKey;
        nftBuyerAcc: PublicKey;
        owner: PublicKey;
        buyer: PublicKey;
        maxPrice: BN;
        tokenProgram: PublicKey;
        optionalRoyaltyPct?: number | null;
        takerBroker?: PublicKey | null;
    } & PnftArgs): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, ({
            name: "buySingleListing";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: true;
                isSigner: false;
            }, {
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftBuyerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account.", "This is closed below (dest = owner)"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
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
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
                name: "authRules";
                isMut: false;
                isSigner: false;
            }, {
                name: "takerBroker";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "maxPrice";
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
            name: "buySingleListing";
        }) | ({
            name: "buySingleListing";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: true;
                isSigner: false;
            }, {
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftBuyerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account.", "This is closed below (dest = owner)"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
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
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
            }];
            args: [{
                name: "maxPrice";
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
            }];
        } & {
            name: "buySingleListing";
        }) | ({
            name: "buySingleListing";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                /** optional taker broker account */
                name: "feeVault";
                isMut: true;
                isSigner: false;
            }, {
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftBuyerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account.", "This is closed below (dest = owner)"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
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
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
            }];
            args: [{
                name: "maxPrice";
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
            }];
        } & {
            name: "buySingleListing";
        }) | ({
            name: "buySingleListing";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: true;
                isSigner: false;
            }, {
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftBuyerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account.", "This is closed below (dest = owner)"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
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
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
            }];
            args: [{
                name: "maxPrice";
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
            }];
        } & {
            name: "buySingleListing";
        }) | ({
            name: "buySingleListing";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: true;
                isSigner: false;
            }, {
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftBuyerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account.", "This is closed below (dest = owner)"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
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
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
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
            }];
            args: [{
                name: "maxPrice";
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
            }];
        } & {
            name: "buySingleListing";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        escrowPda: PublicKey;
        escrowBump: number;
        ownerTokenRecordBump: number;
        ownerTokenRecordPda: PublicKey;
        destTokenRecordBump: number;
        destTokenRecordPda: PublicKey;
        meta: {
            address: PublicKey;
            metadata: import("@metaplex-foundation/mpl-token-metadata").Metadata;
        };
        ruleSet: PublicKey | undefined;
        singleListing: PublicKey;
        singleListingBump: number;
    }>;
    editSingleListing({ nftMint, owner, price, }: {
        nftMint: PublicKey;
        owner: PublicKey;
        price: BN;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, ({
            name: "editSingleListing";
            accounts: [{
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "owner";
                isMut: false;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "price";
                type: "u64";
            }];
        } & {
            name: "editSingleListing";
        }) | ({
            name: "editSingleListing";
            accounts: [{
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "owner";
                isMut: false;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "price";
                type: "u64";
            }];
        } & {
            name: "editSingleListing";
        }) | ({
            name: "editSingleListing";
            accounts: [{
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "owner";
                isMut: false;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "price";
                type: "u64";
            }];
        } & {
            name: "editSingleListing";
        }) | ({
            name: "editSingleListing";
            accounts: [{
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "owner";
                isMut: false;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "price";
                type: "u64";
            }];
        } & {
            name: "editSingleListing";
        }) | ({
            name: "editSingleListing";
            accounts: [{
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "owner";
                isMut: false;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "price";
                type: "u64";
            }];
        } & {
            name: "editSingleListing";
        })>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        singleListing: PublicKey;
        singleListingBump: number;
    }>;
    listT22({ nftMint, nftSource, owner, price, payer, compute, priorityMicroLamports, }: {
        nftMint: PublicKey;
        nftSource: PublicKey;
        owner: PublicKey;
        price: BN;
        payer?: PublicKey | null;
        compute?: number | null | undefined;
        priorityMicroLamports?: number | null | undefined;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, {
            name: "listT22";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftSource";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "payer";
                isMut: true;
                isSigner: true;
            }];
            args: [{
                name: "price";
                type: "u64";
            }];
        } & {
            name: "listT22";
        }>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        escrowPda: PublicKey;
        escrowBump: number;
        singleListing: PublicKey;
        singleListingBump: number;
    }>;
    delistT22({ nftMint, nftDest, owner, payer, compute, priorityMicroLamports, }: {
        nftMint: PublicKey;
        nftDest: PublicKey;
        owner: PublicKey;
        payer?: PublicKey | null;
        compute?: number | null | undefined;
        priorityMicroLamports?: number | null | undefined;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, {
            name: "delistT22";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftDest";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account", "This is closed below (dest = owner)"];
            }, {
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
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
                name: "associatedTokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "payer";
                isMut: true;
                isSigner: true;
            }];
            args: [];
        } & {
            name: "delistT22";
        }>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        escrowPda: PublicKey;
        escrowBump: number;
        singleListing: PublicKey;
        singleListingBump: number;
    }>;
    buySingleListingT22({ nftMint, nftBuyerAcc, owner, buyer, maxPrice, takerBroker, compute, priorityMicroLamports, }: {
        nftMint: PublicKey;
        nftBuyerAcc: PublicKey;
        owner: PublicKey;
        buyer: PublicKey;
        maxPrice: BN;
        takerBroker?: PublicKey | null;
        compute?: number | null | undefined;
        priorityMicroLamports?: number | null | undefined;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, {
            name: "buySingleListingT22";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: true;
                isSigner: false;
            }, {
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftBuyerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account.", "This is closed below (dest = owner)"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
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
                name: "takerBroker";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "maxPrice";
                type: "u64";
            }];
        } & {
            name: "buySingleListingT22";
        }>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        escrowPda: PublicKey;
        escrowBump: number;
        singleListing: PublicKey;
        singleListingBump: number;
    }>;
    buyNftT22({ whitelist, nftMint, nftBuyerAcc, owner, buyer, config, maxPrice, marginNr, takerBroker, compute, priorityMicroLamports, }: {
        whitelist: PublicKey;
        nftMint: PublicKey;
        nftBuyerAcc: PublicKey;
        owner: PublicKey;
        buyer: PublicKey;
        config: PoolConfigAnchor;
        maxPrice: BN;
        marginNr?: number | null;
        takerBroker?: PublicKey | null;
        compute?: number | null | undefined;
        priorityMicroLamports?: number | null | undefined;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, {
            name: "buyNftT22";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, has_one = whitelist on pool"];
            }, {
                name: "nftBuyerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account.", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
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
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "takerBroker";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "maxPrice";
                type: "u64";
            }];
        } & {
            name: "buyNftT22";
        }>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        poolPda: PublicKey;
        poolBump: number;
        escrowPda: PublicKey;
        escrowBump: number;
        solEscrowPda: PublicKey;
        solEscrowBump: number;
        receiptPda: PublicKey;
        receiptBump: number;
        marginBump: number | null;
        marginPda: PublicKey | null;
    }>;
    depositNftT22({ whitelist, nftMint, nftSource, owner, config, compute, priorityMicroLamports, }: {
        whitelist: PublicKey;
        nftMint: PublicKey;
        nftSource: PublicKey;
        owner: PublicKey;
        config: PoolConfigAnchor;
        compute?: number | null | undefined;
        priorityMicroLamports?: number | null | undefined;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, {
            name: "depositNftT22";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
            }, {
                name: "nftSource";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "mintProof";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "depositNftT22";
        }>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        poolPda: PublicKey;
        poolBump: number;
        escrowPda: PublicKey;
        escrowBump: number;
        receiptPda: PublicKey;
        receiptBump: number;
        mintProofPda: PublicKey;
    }>;
    sellNftT22({ type, whitelist, nftMint, nftSellerAcc, owner, seller, config, minPrice, marginNr, isCosigned, cosigner, takerBroker, compute, priorityMicroLamports, }: {
        type: "trade" | "token";
        whitelist: PublicKey;
        nftMint: PublicKey;
        nftSellerAcc: PublicKey;
        owner: PublicKey;
        seller: PublicKey;
        config: PoolConfigAnchor;
        minPrice: BN;
        marginNr?: number | null;
        isCosigned?: boolean;
        cosigner?: PublicKey;
        /** optional taker broker account */
        takerBroker?: PublicKey | null;
        compute?: number | null | undefined;
        priorityMicroLamports?: number | null | undefined;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, {
            name: "sellNftTradePoolT22";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                    docs: ["intentionally not deserializing, it would be dummy in the case of VOC/FVC based verification"];
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "tokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
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
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "minPrice";
                type: "u64";
            }];
        } & {
            name: "sellNftTradePoolT22";
        }> | import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, {
            name: "sellNftTokenPoolT22";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                    docs: ["intentionally not deserializing, it would be dummy in the case of VOC/FVC based verification"];
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "ownerAtaAcc";
                isMut: true;
                isSigner: false;
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
                name: "marginAccount";
                isMut: true;
                isSigner: false;
            }, {
                name: "takerBroker";
                isMut: true;
                isSigner: false;
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "minPrice";
                type: "u64";
            }];
        } & {
            name: "sellNftTokenPoolT22";
        }>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        poolPda: PublicKey;
        poolBump: number;
        solEscrowPda: PublicKey;
        solEscrowBump: number;
        ownerAtaAcc: PublicKey;
        escrowPda: PublicKey;
        escrowBump: number;
        receiptPda: PublicKey;
        receiptBump: number;
        marginPda: PublicKey | null;
        marginBump: number | null;
    }>;
    withdrawNftT22({ whitelist, nftMint, nftDest, owner, config, compute, priorityMicroLamports, }: {
        whitelist: PublicKey;
        nftMint: PublicKey;
        nftDest: PublicKey;
        owner: PublicKey;
        config: PoolConfigAnchor;
        compute?: number | null | undefined;
        priorityMicroLamports?: number | null | undefined;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, {
            name: "withdrawNftT22";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftDest";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
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
            }];
            args: [{
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "withdrawNftT22";
        }>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        poolPda: PublicKey;
        poolBump: number;
        escrowPda: PublicKey;
        escrowBump: number;
        receiptPda: PublicKey;
        receiptBump: number;
    }>;
    wnsList({ nftMint, nftSource, owner, price, collectionMint, payer, compute, priorityMicroLamports, }: {
        nftMint: PublicKey;
        nftSource: PublicKey;
        owner: PublicKey;
        price: BN;
        collectionMint: PublicKey;
        payer?: PublicKey | null;
        compute?: number | null | undefined;
        priorityMicroLamports?: number | null | undefined;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, {
            name: "wnsList";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftSource";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
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
                name: "payer";
                isMut: true;
                isSigner: true;
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
                name: "price";
                type: "u64";
            }];
        } & {
            name: "wnsList";
        }>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        escrowPda: PublicKey;
        escrowBump: number;
        singleListing: PublicKey;
        singleListingBump: number;
    }>;
    wnsDelist({ nftMint, nftDest, owner, collectionMint, payer, compute, priorityMicroLamports, }: {
        nftMint: PublicKey;
        nftDest: PublicKey;
        owner: PublicKey;
        collectionMint: PublicKey;
        payer?: PublicKey | null;
        compute?: number | null | undefined;
        priorityMicroLamports?: number | null | undefined;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, {
            name: "wnsDelist";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftDest";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account", "This is closed below (dest = owner)"];
            }, {
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "tokenProgram";
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
                name: "associatedTokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "payer";
                isMut: true;
                isSigner: true;
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
            args: [];
        } & {
            name: "wnsDelist";
        }>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        escrowPda: PublicKey;
        escrowBump: number;
        singleListing: PublicKey;
        singleListingBump: number;
    }>;
    wnsBuySingleListing({ nftMint, nftBuyerAcc, owner, buyer, maxPrice, collectionMint, takerBroker, compute, priorityMicroLamports, }: {
        nftMint: PublicKey;
        nftBuyerAcc: PublicKey;
        owner: PublicKey;
        buyer: PublicKey;
        maxPrice: BN;
        collectionMint: PublicKey;
        takerBroker?: PublicKey | null;
        compute?: number | null | undefined;
        priorityMicroLamports?: number | null | undefined;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, {
            name: "wnsBuySingleListing";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: true;
                isSigner: false;
            }, {
                name: "singleListing";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftBuyerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account.", "This is closed below (dest = owner)"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
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
                name: "maxPrice";
                type: "u64";
            }];
        } & {
            name: "wnsBuySingleListing";
        }>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        escrowPda: PublicKey;
        escrowBump: number;
        singleListing: PublicKey;
        singleListingBump: number;
    }>;
    wnsBuyNft({ whitelist, nftMint, nftBuyerAcc, owner, buyer, config, maxPrice, collectionMint, marginNr, takerBroker, compute, priorityMicroLamports, }: {
        whitelist: PublicKey;
        nftMint: PublicKey;
        nftBuyerAcc: PublicKey;
        owner: PublicKey;
        buyer: PublicKey;
        config: PoolConfigAnchor;
        maxPrice: BN;
        collectionMint: PublicKey;
        marginNr?: number | null;
        takerBroker?: PublicKey | null;
        compute?: number | null | undefined;
        priorityMicroLamports?: number | null | undefined;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, {
            name: "wnsBuyNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "feeVault";
                isMut: true;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, has_one = whitelist on pool"];
            }, {
                name: "nftBuyerAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account.", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "solEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: false;
            }, {
                name: "buyer";
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
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "maxPrice";
                type: "u64";
            }];
        } & {
            name: "wnsBuyNft";
        }>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        poolPda: PublicKey;
        poolBump: number;
        escrowPda: PublicKey;
        escrowBump: number;
        solEscrowPda: PublicKey;
        solEscrowBump: number;
        receiptPda: PublicKey;
        receiptBump: number;
        marginBump: number | null;
        marginPda: PublicKey | null;
    }>;
    wnsDepositNft({ whitelist, nftMint, nftSource, owner, config, collectionMint, compute, priorityMicroLamports, }: {
        whitelist: PublicKey;
        nftMint: PublicKey;
        nftSource: PublicKey;
        owner: PublicKey;
        config: PoolConfigAnchor;
        collectionMint: PublicKey;
        compute?: number | null | undefined;
        priorityMicroLamports?: number | null | undefined;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, {
            name: "wnsDepositNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
                docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
            }, {
                name: "nftSource";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
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
                name: "mintProof";
                isMut: false;
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
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "wnsDepositNft";
        }>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        poolPda: PublicKey;
        poolBump: number;
        escrowPda: PublicKey;
        escrowBump: number;
        receiptPda: PublicKey;
        receiptBump: number;
        mintProofPda: PublicKey;
    }>;
    wnsSellNft({ type, whitelist, nftMint, nftSellerAcc, owner, seller, config, minPrice, collectionMint, marginNr, isCosigned, cosigner, takerBroker, compute, priorityMicroLamports, }: {
        type: "trade" | "token";
        whitelist: PublicKey;
        nftMint: PublicKey;
        nftSellerAcc: PublicKey;
        owner: PublicKey;
        seller: PublicKey;
        config: PoolConfigAnchor;
        minPrice: BN;
        collectionMint: PublicKey;
        marginNr?: number | null;
        isCosigned?: boolean;
        cosigner?: PublicKey;
        /** optional taker broker account */
        takerBroker?: PublicKey | null;
        compute?: number | null | undefined;
        priorityMicroLamports?: number | null | undefined;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, {
            name: "wnsSellNftTradePool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                    docs: ["intentionally not deserializing, it would be dummy in the case of VOC/FVC based verification"];
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
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
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "minPrice";
                type: "u64";
            }];
        } & {
            name: "wnsSellNftTradePool";
        }> | import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, {
            name: "wnsSellNftTokenPool";
            accounts: [{
                name: "shared";
                accounts: [{
                    name: "tswap";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "feeVault";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "pool";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "whitelist";
                    isMut: false;
                    isSigner: false;
                    docs: ["Needed for pool seeds derivation, also checked via has_one on pool"];
                }, {
                    name: "mintProof";
                    isMut: false;
                    isSigner: false;
                    docs: ["intentionally not deserializing, it would be dummy in the case of VOC/FVC based verification"];
                }, {
                    name: "nftSellerAcc";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "nftMint";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "solEscrow";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "owner";
                    isMut: true;
                    isSigner: false;
                }, {
                    name: "seller";
                    isMut: true;
                    isSigner: true;
                }];
            }, {
                name: "ownerAtaAcc";
                isMut: true;
                isSigner: false;
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
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }, {
                name: "minPrice";
                type: "u64";
            }];
        } & {
            name: "wnsSellNftTokenPool";
        }>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        poolPda: PublicKey;
        poolBump: number;
        solEscrowPda: PublicKey;
        solEscrowBump: number;
        ownerAtaAcc: PublicKey;
        escrowPda: PublicKey;
        escrowBump: number;
        receiptPda: PublicKey;
        receiptBump: number;
        marginPda: PublicKey | null;
        marginBump: number | null;
    }>;
    wnsWithdrawNft({ whitelist, nftMint, nftDest, owner, config, collectionMint, compute, priorityMicroLamports, }: {
        whitelist: PublicKey;
        nftMint: PublicKey;
        nftDest: PublicKey;
        owner: PublicKey;
        config: PoolConfigAnchor;
        collectionMint: PublicKey;
        compute?: number | null | undefined;
        priorityMicroLamports?: number | null | undefined;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TSwapIDL, {
            name: "wnsWithdrawNft";
            accounts: [{
                name: "tswap";
                isMut: false;
                isSigner: false;
            }, {
                name: "pool";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftDest";
                isMut: true;
                isSigner: false;
            }, {
                name: "nftMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "nftEscrow";
                isMut: true;
                isSigner: false;
                docs: ["Implicitly checked via transfer. Will fail if wrong account", "This is closed below (dest = owner)"];
            }, {
                name: "nftReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["Tied to the pool because used to verify pool seeds"];
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
                name: "config";
                type: {
                    defined: "PoolConfig";
                };
            }];
        } & {
            name: "wnsWithdrawNft";
        }>;
        tx: {
            ixs: TransactionInstruction[];
            extraSigners: never[];
        };
        tswapPda: PublicKey;
        tswapBump: number;
        poolPda: PublicKey;
        poolBump: number;
        escrowPda: PublicKey;
        escrowBump: number;
        receiptPda: PublicKey;
        receiptBump: number;
    }>;
    clearDelegate(nftDest: PublicKey, owner: PublicKey): Promise<TransactionInstruction[]>;
    getTswapRent(): Promise<number>;
    getPoolRent(): Promise<number>;
    getMarginAccountRent(): Promise<number>;
    getSingleListingRent(): Promise<number>;
    getNftDepositReceiptRent(): Promise<number>;
    getNftAuthorityRent(): Promise<number>;
    getTokenAcctRent(): Promise<number>;
    getImmutableTokenAcctRent(): Promise<number>;
    getTokenAcctRentForMint(mint: PublicKey, programId: PublicKey): Promise<number>;
    getSolEscrowRent(): Promise<number>;
    getApproveRent(): Promise<number>;
    getError(name: (typeof IDL_latest)["errors"][number]["name"]): (typeof IDL_latest)["errors"][number];
    getErrorCodeHex(name: (typeof IDL_latest)["errors"][number]["name"]): string;
    /** This only works for the latest IDL. This is intentional: otherwise we'll need to switch/case all historical deprecated ixs downstream. */
    parseIxs(tx: TransactionResponse): ParsedTSwapIx[];
    getPoolConfig(ix: ParsedTSwapIx): PoolConfig | null;
    getSolAmount(ix: ParsedTSwapIx): BN | null;
    getFeeAmount(ix: ParsedTSwapIx): BN | null;
    getAccountByName(ix: ParsedTSwapIx, name: AccountSuffix): ParsedAccount | undefined;
    static uuidToBuffer: (uuid: string) => number[];
}
//# sourceMappingURL=sdk.d.ts.map