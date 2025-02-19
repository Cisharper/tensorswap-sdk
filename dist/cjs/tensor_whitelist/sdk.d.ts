/// <reference types="node" />
/// <reference types="@metaplex-foundation/mpl-bubblegum/node_modules/@solana/web3.js" />
import { AccountInfo, Commitment, PublicKey } from "@solana/web3.js";
import { Coder, Program, Provider } from "@coral-xyz/anchor";
import MerkleTree from "merkletreejs";
import { TensorWhitelist as TensorWhitelist_v0_1_0 } from "./idl/tensor_whitelist_v0_1_0";
import { IDL as IDL_latest, TensorWhitelist as TensorWhitelist_latest } from "./idl/tensor_whitelist";
import { AcctDiscHexMap, Cluster } from "@tensor-hq/tensor-common";
export declare const TensorWhitelistIDL_v0_1_0: TensorWhitelist_v0_1_0;
export declare const TensorWhitelistIDL_v0_1_0_EffSlot = 0;
export declare const TensorWhitelistIDL_latest: TensorWhitelist_latest;
export declare const TensorWhitelistIDL_latest_EffSlot_Mainnet = 172170872;
export declare const TensorWhitelistIDL_latest_EffSlot_Devnet = 203539290;
export type TensorWhitelistIDL = TensorWhitelist_v0_1_0 | TensorWhitelist_latest;
export declare const triageWhitelistIDL: (slot: number | bigint, cluster: Cluster) => TensorWhitelistIDL | null;
export declare const WHITELIST_SIZE: number;
export declare const AUTHORITY_SIZE: number;
export declare const MINT_PROOF_SIZE: number;
export declare const APPROX_WHITELIST_RENT: number;
export declare const APPROX_AUTHORITY_RENT: number;
export declare const APPROX_MINT_PROOF_RENT: number;
export type AuthorityAnchor = {
    bump: number;
    cosigner: PublicKey;
    owner: PublicKey;
};
export type WhitelistAnchor = {
    version: number;
    bump: number;
    verified: boolean;
    rootHash: number[];
    uuid: number[];
    name: number[];
    frozen: boolean;
    voc?: PublicKey;
    fvc?: PublicKey;
};
export type MintProofAnchor = {
    proofLen: number;
    proof: number[][];
};
export type TensorWhitelistPdaAnchor = AuthorityAnchor | WhitelistAnchor;
export type TaggedTensorWhitelistPdaAnchor = {
    name: "authority";
    account: AuthorityAnchor;
} | {
    name: "whitelist";
    account: WhitelistAnchor;
} | {
    name: "mintProof";
    account: MintProofAnchor;
};
export declare class TensorWhitelistSDK {
    program: Program<TensorWhitelistIDL>;
    discMap: AcctDiscHexMap<TensorWhitelistIDL>;
    constructor({ idl, addr, provider, coder, }: {
        idl?: any;
        addr?: PublicKey;
        provider?: Provider;
        coder?: Coder;
    });
    fetchAuthority(authority: PublicKey, commitment?: Commitment): Promise<AuthorityAnchor>;
    fetchWhitelist(whitelist: PublicKey, commitment?: Commitment): Promise<WhitelistAnchor>;
    fetchMintProof(mintProof: PublicKey, commitment?: Commitment): Promise<MintProofAnchor>;
    decode(acct: AccountInfo<Buffer>): TaggedTensorWhitelistPdaAnchor | null;
    initUpdateAuthority({ cosigner, owner, newCosigner, newOwner, }: {
        cosigner?: PublicKey;
        owner?: PublicKey;
        newCosigner: PublicKey | null;
        newOwner: PublicKey | null;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TensorWhitelistIDL, ({
            name: "initUpdateAuthority";
            accounts: [{
                name: "whitelistAuthority";
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
                name: "newOwner";
                type: "publicKey";
            }];
        } & {
            name: "initUpdateAuthority";
        }) | ({
            name: "initUpdateAuthority";
            accounts: [{
                name: "whitelistAuthority";
                isMut: true;
                isSigner: false;
            }, {
                name: "cosigner";
                isMut: true;
                isSigner: true;
                docs: ["both have to sign on any updates"];
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
                name: "newCosigner";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "newOwner";
                type: {
                    option: "publicKey";
                };
            }];
        } & {
            name: "initUpdateAuthority";
        })>;
        tx: {
            ixs: import("@solana/web3.js").TransactionInstruction[];
            extraSigners: never[];
        };
        authPda: PublicKey;
    }>;
    initUpdateWhitelist({ cosigner, owner, //can't pass default here, coz then it'll be auto-included in rem accs
    uuid, rootHash, name, voc, fvc, compute, priorityMicroLamports, }: {
        cosigner?: PublicKey;
        owner?: PublicKey;
        uuid: number[];
        rootHash?: number[] | null;
        name?: number[] | null;
        voc?: PublicKey | null;
        fvc?: PublicKey | null;
        priorityMicroLamports?: number | null;
        compute?: number | null;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TensorWhitelistIDL, ({
            name: "initUpdateWhitelist";
            accounts: [{
                name: "whitelist";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelistAuthority";
                isMut: false;
                isSigner: false;
                docs: ["there can only be 1 whitelist authority (due to seeds),", "and we're checking that 1)the correct owner is present on it, and 2)is a signer"];
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
                name: "uuid";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "rootHash";
                type: {
                    option: {
                        array: ["u8", 32];
                    };
                };
            }, {
                name: "name";
                type: {
                    option: {
                        array: ["u8", 32];
                    };
                };
            }];
        } & {
            name: "initUpdateWhitelist";
        }) | ({
            name: "initUpdateWhitelist";
            docs: ["Store min 1, max 3, check in priority order"];
            accounts: [{
                name: "whitelist";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelistAuthority";
                isMut: false;
                isSigner: false;
                docs: ["there can only be 1 whitelist authority (due to seeds),", "and we're checking that 1)the correct cosigner is present on it, and 2)is a signer"];
            }, {
                name: "cosigner";
                isMut: true;
                isSigner: true;
                docs: ["only cosigner has to sign for unfrozen, for frozen owner also has to sign"];
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "uuid";
                type: {
                    array: ["u8", 32];
                };
            }, {
                name: "rootHash";
                type: {
                    option: {
                        array: ["u8", 32];
                    };
                };
            }, {
                name: "name";
                type: {
                    option: {
                        array: ["u8", 32];
                    };
                };
            }, {
                name: "voc";
                type: {
                    option: "publicKey";
                };
            }, {
                name: "fvc";
                type: {
                    option: "publicKey";
                };
            }];
        } & {
            name: "initUpdateWhitelist";
        })>;
        tx: {
            ixs: import("@solana/web3.js").TransactionInstruction[];
            extraSigners: never[];
        };
        authPda: PublicKey;
        whitelistPda: PublicKey;
    }>;
    freezeWhitelist({ uuid, cosigner, }: {
        uuid: number[];
        cosigner?: PublicKey;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TensorWhitelistIDL, {
            name: "freezeWhitelist";
            accounts: [{
                name: "whitelist";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelistAuthority";
                isMut: false;
                isSigner: false;
                docs: ["there can only be 1 whitelist authority (due to seeds),", "and we're checking that 1)the correct cosigner is present on it, and 2)is a signer"];
            }, {
                name: "cosigner";
                isMut: true;
                isSigner: true;
                docs: ["freezing only requires cosigner"];
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "freezeWhitelist";
        }>;
        tx: {
            ixs: import("@solana/web3.js").TransactionInstruction[];
            extraSigners: never[];
        };
        authPda: PublicKey;
        whitelistPda: PublicKey;
    }>;
    unfreezeWhitelist({ uuid, owner, }: {
        uuid: number[];
        owner?: PublicKey;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TensorWhitelistIDL, {
            name: "unfreezeWhitelist";
            accounts: [{
                name: "whitelist";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelistAuthority";
                isMut: false;
                isSigner: false;
                docs: ["there can only be 1 whitelist authority (due to seeds),", "and we're checking that 1)the correct cosigner is present on it, and 2)is a signer"];
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
                docs: ["unfreezing requires owner"];
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "unfreezeWhitelist";
        }>;
        tx: {
            ixs: import("@solana/web3.js").TransactionInstruction[];
            extraSigners: never[];
        };
        authPda: PublicKey;
        whitelistPda: PublicKey;
    }>;
    initUpdateMintProof({ user, mint, whitelist, proof, }: {
        user: PublicKey;
        mint: PublicKey;
        whitelist: PublicKey;
        proof: Buffer[];
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TensorWhitelistIDL, ({
            name: "initUpdateMintProof";
            accounts: [{
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "mint";
                isMut: false;
                isSigner: false;
            }, {
                name: "mintProof";
                isMut: true;
                isSigner: false;
            }, {
                name: "user";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "proof";
                type: {
                    vec: {
                        array: ["u8", 32];
                    };
                };
            }];
        } & {
            name: "initUpdateMintProof";
        }) | ({
            name: "initUpdateMintProof";
            accounts: [{
                name: "whitelist";
                isMut: false;
                isSigner: false;
            }, {
                name: "mint";
                isMut: false;
                isSigner: false;
            }, {
                name: "mintProof";
                isMut: true;
                isSigner: false;
            }, {
                name: "user";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "proof";
                type: {
                    vec: {
                        array: ["u8", 32];
                    };
                };
            }];
        } & {
            name: "initUpdateMintProof";
        })>;
        tx: {
            ixs: import("@solana/web3.js").TransactionInstruction[];
            extraSigners: never[];
        };
        mintProofPda: PublicKey;
    }>;
    reallocAuthority({ cosigner, }: {
        cosigner?: PublicKey;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TensorWhitelistIDL, {
            name: "reallocAuthority";
            accounts: [{
                name: "whitelistAuthority";
                isMut: true;
                isSigner: false;
                docs: ["there can only be 1 whitelist authority (due to seeds),", "and we're checking that 1)the correct cosigner is present on it, and 2)is a signer"];
            }, {
                name: "cosigner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "reallocAuthority";
        }>;
        tx: {
            ixs: import("@solana/web3.js").TransactionInstruction[];
            extraSigners: never[];
        };
        authPda: PublicKey;
    }>;
    reallocWhitelist({ uuid, cosigner, }: {
        uuid: number[];
        cosigner?: PublicKey;
    }): Promise<{
        builder: import("@coral-xyz/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<TensorWhitelistIDL, {
            name: "reallocWhitelist";
            accounts: [{
                name: "whitelist";
                isMut: true;
                isSigner: false;
            }, {
                name: "whitelistAuthority";
                isMut: false;
                isSigner: false;
                docs: ["there can only be 1 whitelist authority (due to seeds),", "and we're checking that 1)the correct cosigner is present on it, and 2)is a signer"];
            }, {
                name: "cosigner";
                isMut: true;
                isSigner: true;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "reallocWhitelist";
        }>;
        tx: {
            ixs: import("@solana/web3.js").TransactionInstruction[];
            extraSigners: never[];
        };
        authPda: PublicKey;
        whitelistPda: PublicKey;
    }>;
    getWhitelistRent(): Promise<number>;
    getAuthorityRent(): Promise<number>;
    getMintProofRent(): Promise<number>;
    getError(name: typeof IDL_latest["errors"][number]["name"]): typeof IDL_latest["errors"][number];
    getErrorCodeHex(name: typeof IDL_latest["errors"][number]["name"]): string;
    static uuidToBuffer: (uuid: string) => number[];
    static bufferToUuid: (buffer: number[]) => string;
    static nameToBuffer: (name: string) => number[];
    static bufferToName: (buffer: number[]) => string;
    static createTreeForMints: (mints: PublicKey[], skipVerify?: boolean) => {
        tree: MerkleTree;
        root: number[];
        proofs: {
            mint: PublicKey;
            proof: Buffer[];
        }[];
    };
    genWhitelistUUID(): string;
}
//# sourceMappingURL=sdk.d.ts.map