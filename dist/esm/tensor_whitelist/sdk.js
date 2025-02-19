import { SystemProgram, } from "@solana/web3.js";
import { Program } from "@coral-xyz/anchor";
import { TLIST_ADDR, TLIST_COSIGNER, TLIST_OWNER } from "./constants";
import { findMintProofPDA, findWhitelistAuthPDA, findWhitelistPDA, } from "./pda";
import { v4 } from "uuid";
import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";
import { DEFAULT_MICRO_LAMPORTS, evalMathExpr, } from "../common";
// ---------------------------------------- Versioned IDLs for backwards compat when parsing.
import { IDL as IDL_v0_1_0, } from "./idl/tensor_whitelist_v0_1_0";
import { IDL as IDL_latest, } from "./idl/tensor_whitelist";
import { Cluster, decodeAnchorAcct, genAcctDiscHexMap, getRent, getRentSync, hexCode, prependComputeIxs, removeNullBytes, } from "@tensor-hq/tensor-common";
//a non-breaking update to migrate account space to exportable constants: https://explorer.solana.com/tx/5czMUGttDttcXwhTTGH8QzyTffwcVfeUAQbY2FzSh8WGxRFBQAmdrYeGBQxfEfS1bog4CfTvqPvXmvxdygQ5aJKE
export const TensorWhitelistIDL_v0_1_0 = IDL_v0_1_0;
export const TensorWhitelistIDL_v0_1_0_EffSlot = 0; //todo find slot
// added 3 types of verification: https://solscan.io/tx/55gtoZSTKf96XL6XDD5e9F4nkoiPqXHtP4mJoYNT6eZVwtHw2FRRhVxfg9jHADMLrVS2FmNRh2VAWVCqnTxrX3Ro
export const TensorWhitelistIDL_latest = IDL_latest;
export const TensorWhitelistIDL_latest_EffSlot_Mainnet = 172170872;
export const TensorWhitelistIDL_latest_EffSlot_Devnet = 203539290;
// Use this function to figure out which IDL to use based on the slot # of historical txs.
export const triageWhitelistIDL = (slot, cluster) => {
    switch (cluster) {
        case Cluster.Mainnet:
            //cba to parse really old txs, this was before public launch
            if (slot < TensorWhitelistIDL_v0_1_0_EffSlot)
                return null;
            if (slot < TensorWhitelistIDL_latest_EffSlot_Mainnet)
                return TensorWhitelistIDL_v0_1_0;
            return TensorWhitelistIDL_latest;
        case Cluster.Devnet:
            if (slot < TensorWhitelistIDL_latest_EffSlot_Devnet)
                return TensorWhitelistIDL_v0_1_0;
            return TensorWhitelistIDL_latest;
    }
};
// --------------------------------------- constants
export const WHITELIST_SIZE = evalMathExpr(IDL_latest.constants.find((c) => c.name === "WHITELIST_SIZE").value);
export const AUTHORITY_SIZE = evalMathExpr(IDL_latest.constants.find((c) => c.name === "AUTHORITY_SIZE").value);
export const MINT_PROOF_SIZE = evalMathExpr(IDL_latest.constants.find((c) => c.name === "MINT_PROOF_SIZE").value);
export const APPROX_WHITELIST_RENT = getRentSync(WHITELIST_SIZE);
export const APPROX_AUTHORITY_RENT = getRentSync(AUTHORITY_SIZE);
export const APPROX_MINT_PROOF_RENT = getRentSync(MINT_PROOF_SIZE);
// --------------------------------------- sdk
export class TensorWhitelistSDK {
    program;
    discMap;
    constructor({ idl = IDL_latest, addr = TLIST_ADDR, provider, coder, }) {
        this.program = new Program(idl, addr, provider, coder);
        this.discMap = genAcctDiscHexMap(idl);
    }
    // --------------------------------------- fetchers
    async fetchAuthority(authority, commitment) {
        return (await this.program.account.authority.fetch(authority, commitment));
    }
    async fetchWhitelist(whitelist, commitment) {
        return (await this.program.account.whitelist.fetch(whitelist, commitment));
    }
    async fetchMintProof(mintProof, commitment) {
        return (await this.program.account.mintProof.fetch(mintProof, commitment));
    }
    // --------------------------------------- account methods
    decode(acct) {
        if (!acct.owner.equals(this.program.programId))
            return null;
        return decodeAnchorAcct(acct, this.discMap);
    }
    // --------------------------------------- authority methods
    //main signature: cosigner
    async initUpdateAuthority({ cosigner = TLIST_COSIGNER, owner = TLIST_OWNER, newCosigner, newOwner, }) {
        const [authPda] = findWhitelistAuthPDA({});
        const builder = this.program.methods
            .initUpdateAuthority(newCosigner, newOwner)
            .accounts({
            whitelistAuthority: authPda,
            owner,
            cosigner,
            systemProgram: SystemProgram.programId,
        });
        return {
            builder,
            tx: { ixs: [await builder.instruction()], extraSigners: [] },
            authPda,
        };
    }
    // --------------------------------------- whitelist methods
    //main signature: cosigner
    async initUpdateWhitelist({ cosigner = TLIST_COSIGNER, owner, //can't pass default here, coz then it'll be auto-included in rem accs
    uuid, rootHash = null, name = null, voc = null, fvc = null, compute = null, priorityMicroLamports = DEFAULT_MICRO_LAMPORTS, }) {
        const [authPda] = findWhitelistAuthPDA({});
        const [whitelistPda] = findWhitelistPDA({
            uuid,
        });
        //only needed for frozen whitelists
        const remAcc = owner
            ? [
                {
                    pubkey: owner,
                    isWritable: false,
                    isSigner: true,
                },
            ]
            : [];
        const builder = this.program.methods
            .initUpdateWhitelist(uuid, rootHash, name, voc, fvc)
            .accounts({
            whitelist: whitelistPda,
            whitelistAuthority: authPda,
            cosigner,
            systemProgram: SystemProgram.programId,
        })
            .remainingAccounts(remAcc);
        return {
            builder,
            tx: {
                ixs: prependComputeIxs([await builder.instruction()], compute, priorityMicroLamports),
                extraSigners: [],
            },
            authPda,
            whitelistPda,
        };
    }
    //main signature: cosigner
    async freezeWhitelist({ uuid, cosigner = TLIST_COSIGNER, }) {
        const [authPda] = findWhitelistAuthPDA({});
        const [whitelistPda] = findWhitelistPDA({
            uuid,
        });
        const builder = this.program.methods.freezeWhitelist().accounts({
            whitelist: whitelistPda,
            whitelistAuthority: authPda,
            cosigner,
            systemProgram: SystemProgram.programId,
        });
        return {
            builder,
            tx: { ixs: [await builder.instruction()], extraSigners: [] },
            authPda,
            whitelistPda,
        };
    }
    //main signature: owner
    async unfreezeWhitelist({ uuid, owner = TLIST_OWNER, }) {
        const [authPda] = findWhitelistAuthPDA({});
        const [whitelistPda] = findWhitelistPDA({
            uuid,
        });
        const builder = this.program.methods.unfreezeWhitelist().accounts({
            whitelist: whitelistPda,
            whitelistAuthority: authPda,
            owner,
            systemProgram: SystemProgram.programId,
        });
        return {
            builder,
            tx: { ixs: [await builder.instruction()], extraSigners: [] },
            authPda,
            whitelistPda,
        };
    }
    // --------------------------------------- mint proof methods
    //main signature: user
    async initUpdateMintProof({ user, mint, whitelist, proof, }) {
        const [mintProofPda] = findMintProofPDA({ mint, whitelist });
        const builder = this.program.methods.initUpdateMintProof(proof).accounts({
            whitelist,
            mint,
            user,
            mintProof: mintProofPda,
            systemProgram: SystemProgram.programId,
        });
        return {
            builder,
            tx: { ixs: [await builder.instruction()], extraSigners: [] },
            mintProofPda,
        };
    }
    // --------------------------------------- reallocs
    async reallocAuthority({ cosigner = TLIST_COSIGNER, }) {
        const [authPda] = findWhitelistAuthPDA({});
        const builder = this.program.methods.reallocAuthority().accounts({
            whitelistAuthority: authPda,
            cosigner,
            systemProgram: SystemProgram.programId,
        });
        return {
            builder,
            tx: { ixs: [await builder.instruction()], extraSigners: [] },
            authPda,
        };
    }
    async reallocWhitelist({ uuid, cosigner = TLIST_COSIGNER, }) {
        const [authPda] = findWhitelistAuthPDA({});
        const [whitelistPda] = findWhitelistPDA({
            uuid,
        });
        const builder = this.program.methods.reallocWhitelist().accounts({
            whitelist: whitelistPda,
            whitelistAuthority: authPda,
            cosigner,
            systemProgram: SystemProgram.programId,
        });
        return {
            builder,
            tx: { ixs: [await builder.instruction()], extraSigners: [] },
            authPda,
            whitelistPda,
        };
    }
    // --------------------------------------- helper methods
    async getWhitelistRent() {
        return await getRent(this.program.provider.connection, this.program.account.whitelist);
    }
    async getAuthorityRent() {
        return await getRent(this.program.provider.connection, this.program.account.authority);
    }
    async getMintProofRent() {
        return await getRent(this.program.provider.connection, this.program.account.mintProof);
    }
    getError(name) {
        //@ts-ignore (throwing weird ts errors for me)
        return this.program.idl.errors.find((e) => e.name === name);
    }
    getErrorCodeHex(name) {
        return hexCode(this.getError(name).code);
    }
    static uuidToBuffer = (uuid) => {
        return Buffer.from(uuid.replaceAll("-", "")).toJSON().data;
    };
    static bufferToUuid = (buffer) => {
        const raw = String.fromCharCode(...buffer);
        return `${raw.slice(0, 8)}-${raw.slice(8, 12)}-${raw.slice(12, 16)}-${raw.slice(16, 20)}-${raw.slice(20)}`;
    };
    // NB: this truncates names to 32 bytes (32 chars if ascii, < if unicode).
    static nameToBuffer = (name) => {
        return Buffer.from(name.padEnd(32, "\0")).toJSON().data.slice(0, 32);
    };
    static bufferToName = (buffer) => {
        return removeNullBytes(String.fromCharCode(...buffer));
    };
    // Generates a Merkle tree + root hash + proofs for a set of mints.
    static createTreeForMints = (mints, skipVerify = false) => {
        const buffers = mints.map((m) => m.toBuffer());
        // Create hashes
        const leaves = buffers.map(keccak256);
        // Create an array of { leaf, mint } to preserve mapping
        const leafMintPairs = leaves.map((leaf, index) => {
            return { leaf: leaf, mint: mints[index] };
        });
        // Presort the array based on the leaves, so that original leaves remain in the same order after tree construction
        const sortedLeafMintPairs = leafMintPairs.slice().sort((a, b) => Buffer.compare(a.leaf, b.leaf));
        // Extract only the leaves from sortedLeafMintPairs
        const sortedLeaves = sortedLeafMintPairs.map(pair => pair.leaf);
        const tree = new MerkleTree(sortedLeaves, keccak256, {
            sortPairs: true,
        });
        const rootHash = tree.getRoot();
        // Get all proofs (order should be same as leaves)
        const allProofs = tree.getProofs();
        // This assumes proofs indices align with mints indices (which appears to be the case).
        const proofs = sortedLeafMintPairs.map((val, index) => {
            const proof = allProofs[index];
            const mint = val.mint;
            if (!skipVerify && !tree.verify(proof, keccak256(mint.toBuffer()), rootHash)) {
                throw new Error(`Invalid proof for mint at index ${index}`);
            }
            const validProof = proof.map((p) => p.data);
            return { mint, proof: validProof };
        });
        return { tree, root: tree.getRoot().toJSON().data, proofs };
    };
    genWhitelistUUID() {
        return v4().toString();
    }
}
//# sourceMappingURL=sdk.js.map