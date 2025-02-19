"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TensorSwapSDK = exports.APPROX_SOL_ESCROW_RENT = exports.APPROX_NFT_AUTHORITY_RENT = exports.APPROX_DEPOSIT_RECEIPT_RENT = exports.APPROX_SINGLE_LISTING_RENT = exports.APPROX_SOL_MARGIN_RENT = exports.APPROX_POOL_RENT = exports.APPROX_TSWAP_RENT = exports.NFT_AUTHORITY_SIZE = exports.DEPOSIT_RECEIPT_SIZE = exports.SINGLE_LISTING_SIZE = exports.MARGIN_SIZE = exports.POOL_SIZE = exports.TSWAP_SIZE = exports.SNIPE_MIN_FEE = exports.TAKER_BROKER_PCT = exports.SNIPE_PROFIT_SHARE_BPS = exports.SNIPE_FEE_BPS = exports.triageIDL = exports.TSwapIDL_latest_EffSlot_Devnet = exports.TSwapIDL_latest_EffSlot_Mainnet = exports.TSwapIDL_latest = exports.TSwapIDL_v1_7_0_EffSlot_Devnet = exports.TSwapIDL_v1_7_0_EffSlot_Mainnet = exports.TSwapIDL_v1_7_0 = exports.TSwapIDL_v1_6_0_EffSlot_Mainnet = exports.TSwapIDL_v1_6_0 = exports.TSwapIDL_v1_5_0_EffSlot_Mainnet = exports.TSwapIDL_v1_5_0 = exports.TSwapIDL_v1_4_0_EffSlot_Mainnet = exports.TSwapIDL_v1_4_0 = exports.TSwapIDL_v1_3_0_EffSlot_Mainnet = exports.TSwapIDL_v1_3_0 = exports.TSwapIDL_v1_1_0_EffSlot_Mainnet = exports.TSwapIDL_v1_1_0 = exports.TSwapIDL_v1_0_0_EffSlot_Mainnet = exports.TSwapIDL_v1_0_0 = exports.TSwapIDL_v0_3_5_EffSlot_Mainnet = exports.TSwapIDL_v0_3_5 = exports.TSwapIDL_v0_3_0_EffSlot_Mainnet = exports.TSwapIDL_v0_3_0 = exports.TSwapIDL_v0_2_0_EffSlot_Mainnet = exports.TSwapIDL_v0_2_0 = exports.TSwapIDL_v0_1_32_EffSlot_Mainnet = exports.TSwapIDL_v0_1_32 = void 0;
const anchor_1 = require("@coral-xyz/anchor");
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const tensor_common_1 = require("@tensor-hq/tensor-common");
const bn_js_1 = __importDefault(require("bn.js"));
const uuid_1 = require("uuid");
const common_1 = require("../common");
const token2022_1 = require("../token2022");
const tensor_whitelist_1 = require("../tensor_whitelist");
const constants_1 = require("./constants");
const pda_1 = require("./pda");
/*
Guide for protocol rollout: https://www.notion.so/tensor-hq/Protocol-Deployment-playbook-d345244ec21e48fb8a1f37277b38e38e
 */
// ---------------------------------------- Versioned IDLs for backwards compat when parsing.
const tensorswap_1 = require("./idl/tensorswap");
const tensorswap_v0_1_32_1 = require("./idl/tensorswap_v0_1_32");
const tensorswap_v0_2_0_1 = require("./idl/tensorswap_v0_2_0");
const tensorswap_v0_3_0_1 = require("./idl/tensorswap_v0_3_0");
const tensorswap_v0_3_5_1 = require("./idl/tensorswap_v0_3_5");
const tensorswap_v1_0_0_1 = require("./idl/tensorswap_v1_0_0");
const tensorswap_v1_1_0_1 = require("./idl/tensorswap_v1_1_0");
const tensorswap_v1_3_0_1 = require("./idl/tensorswap_v1_3_0");
const tensorswap_v1_4_0_1 = require("./idl/tensorswap_v1_4_0");
const tensorswap_v1_5_0_1 = require("./idl/tensorswap_v1_5_0");
const tensorswap_v1_6_0_1 = require("./idl/tensorswap_v1_6_0");
const tensorswap_v1_7_0_1 = require("./idl/tensorswap_v1_7_0");
const types_1 = require("./types");
const token2022_2 = require("../token2022");
// https://solscan.io/tx/5ZWevmR3TLzUEVsPyE9bdUBqseeBdVMuELG45L15dx8rnXVCQZE2n1V1EbqEuGEaF6q4fND7rT7zwW8ZXjP1uC5s
exports.TSwapIDL_v0_1_32 = tensorswap_v0_1_32_1.IDL;
exports.TSwapIDL_v0_1_32_EffSlot_Mainnet = 150855169;
// remove cosigner: https://solscan.io/tx/5aswB2admCErRwPNgM3DeaYcbVYjAjpHuKVFAZenaSGEm8PKL8R2BmqsGFWdGfMR25NPrVSNKix18ZgLtVpHyXUJ
exports.TSwapIDL_v0_2_0 = tensorswap_v0_2_0_1.IDL;
exports.TSwapIDL_v0_2_0_EffSlot_Mainnet = 153016663;
// editable pools: https://solscan.io/tx/2NjcKJov7cm7Fa1PqEADMgjiFBS6UXAzXoaiLinCU35stFUAgVyLBniaPyLExPoz18TKis5ch9YxfBs7yAkbjXXn
exports.TSwapIDL_v0_3_0 = tensorswap_v0_3_0_1.IDL;
exports.TSwapIDL_v0_3_0_EffSlot_Mainnet = 154762923;
// remove pool migration ixs: https://solscan.io/tx/3YruQxQ2HGMEcNRogwGAXw2rXDH3uVKCjZYs655erEKX1T3FxcLBshHHgP5deTLQ4Jd28SZTVGFb2oBpGx6HqANe
exports.TSwapIDL_v0_3_5 = tensorswap_v0_3_5_1.IDL;
exports.TSwapIDL_v0_3_5_EffSlot_Mainnet = 154963721;
// sniping, cross-margin https://solscan.io/tx/5ogSWohwXU3A2xjdsVwcrF3Hm7gC4zvGfzcsYco4hCKB8SduvTH9aUQTdLZw49YuAVXd4n7B4Ny8q7nEqMaKxJ2N
exports.TSwapIDL_v1_0_0 = tensorswap_v1_0_0_1.IDL;
exports.TSwapIDL_v1_0_0_EffSlot_Mainnet = 172173995;
// purchase caps for margin orders: https://solscan.io/tx/5YSJCyjo7bKi6etipyHmv3HcSCCc1de2fuSVK1h918GL6HqSomNrukZDvUvMnihtQ21UV2ZAGjdFiRx6PYjcSnWA
exports.TSwapIDL_v1_1_0 = tensorswap_v1_1_0_1.IDL;
exports.TSwapIDL_v1_1_0_EffSlot_Mainnet = 173144552;
// 1_2_0 was pricing function upgrade
// pnft integration, taker-pays: https://solscan.io/tx/5vHiFK8ij7LRCpBWZt8PQEyPJcPHrUhuoFMD7FQfQcyJ6Fxp3WpHXNUxPKRYacQmqEV2Cw8tb3PjvCQKhvsGQbUa
exports.TSwapIDL_v1_3_0 = tensorswap_v1_3_0_1.IDL;
exports.TSwapIDL_v1_3_0_EffSlot_Mainnet = 176096448;
// add single listing: https://solscan.io/tx/JMWgwm6RdhZzdRoj9tBQHp5ZXstFr3vuFk94uD4qdq6DfQFKL6D9Zb7rj1reRsHBt87QfYcYwVYfKQ4qFyCcs6r
exports.TSwapIDL_v1_4_0 = tensorswap_v1_4_0_1.IDL;
exports.TSwapIDL_v1_4_0_EffSlot_Mainnet = 177428733;
// enable margin for MM pools + make MM profit withdrawable
// part 1 (everything except edit in place): https://solscan.io/tx/2uZgAZXfeabhqAhQTtWinnHkfJHnfuDzPKJcypxK9L3xuHsVwaz9Arb7EDMU3khbKmwGbigcZsweQEXNj8Pa9tcT
// part 2 (enabled mmCompoundFee in edit in place): https://solscan.io/tx/44aWhcQNx8a95PGGCFsTskLyJwxGbcvRnmsDaqvxsdD9dmKMP6NPRKzPoAiNiGhNfVMRq1ADg6seHPHxU6r8R7jZ
exports.TSwapIDL_v1_5_0 = tensorswap_v1_5_0_1.IDL;
exports.TSwapIDL_v1_5_0_EffSlot_Mainnet = 182023294;
// remove delegate from SELL NOW: https://solscan.io/tx/3hq9BG1xWEM5NcwTZiLVsNRsACXZxACXBjPNpamg4WMufi3K9Ej5jLHXxo1DEzw1C5vDr1XvKYYGPuciqqoEQiK8
exports.TSwapIDL_v1_6_0 = tensorswap_v1_6_0_1.IDL;
exports.TSwapIDL_v1_6_0_EffSlot_Mainnet = 182972833;
// add cpi ix for TBID + export acc size as constants
exports.TSwapIDL_v1_7_0 = tensorswap_v1_7_0_1.IDL;
exports.TSwapIDL_v1_7_0_EffSlot_Mainnet = 183869296; // https://solscan.io/tx/5jhCkfL622mQm6LXCmzsKbYCMHcyFjHcSLqJPV2G6HApS7iFK9UMyg7gaoeW8aUW6kPFsfAdraibpvNRe3fnSc3h
exports.TSwapIDL_v1_7_0_EffSlot_Devnet = 213361116; // https://solscan.io/tx/GFL7tCbYtDFyG1kVqMDoZ1RTgmE7rGrpp99Ec8ZrUEpp2xH8oMsads6bUqxDhEXQH9caJzMGSCj6ZNZ69kykJYD?cluster=devnet
// add optional royalties + remove optional accs + add broker + add payer for list/delist
exports.TSwapIDL_latest = tensorswap_1.IDL;
exports.TSwapIDL_latest_EffSlot_Mainnet = 186744215; // https://solscan.io/tx/JtcwNt69DQnJt7622LJwYFBeJbaBLwuabnWLes9YdncxxPR3nsSXpH1GqLcZQKVmWQhCqrUKSueirogrBVrTK811
exports.TSwapIDL_latest_EffSlot_Devnet = 265356431; // https://solscan.io/tx/2Ad89TuMGGiu2QEBxcbMiso47rmiyJWJTTRUrGekaipecuWwrCm3G3KYsVGi8PWUSecuTzS8MCFKNsZMJBS1PSR3?cluster=devnet
// Use this function to figure out which IDL to use based on the slot # of historical txs.
const triageIDL = (slot, cluster) => {
    switch (cluster) {
        case tensor_common_1.Cluster.Mainnet:
            //cba to parse really old txs, this was before public launch
            if (slot < exports.TSwapIDL_v0_1_32_EffSlot_Mainnet)
                return null;
            if (slot < exports.TSwapIDL_v0_2_0_EffSlot_Mainnet)
                return exports.TSwapIDL_v0_1_32;
            if (slot < exports.TSwapIDL_v0_3_0_EffSlot_Mainnet)
                return exports.TSwapIDL_v0_2_0;
            if (slot < exports.TSwapIDL_v0_3_5_EffSlot_Mainnet)
                return exports.TSwapIDL_v0_3_0;
            if (slot < exports.TSwapIDL_v1_0_0_EffSlot_Mainnet)
                return exports.TSwapIDL_v0_3_5;
            if (slot < exports.TSwapIDL_v1_1_0_EffSlot_Mainnet)
                return exports.TSwapIDL_v1_0_0;
            if (slot < exports.TSwapIDL_v1_3_0_EffSlot_Mainnet)
                return exports.TSwapIDL_v1_1_0;
            if (slot < exports.TSwapIDL_v1_4_0_EffSlot_Mainnet)
                return exports.TSwapIDL_v1_3_0;
            if (slot < exports.TSwapIDL_v1_5_0_EffSlot_Mainnet)
                return exports.TSwapIDL_v1_4_0;
            if (slot < exports.TSwapIDL_v1_6_0_EffSlot_Mainnet)
                return exports.TSwapIDL_v1_5_0;
            if (slot < exports.TSwapIDL_v1_7_0_EffSlot_Mainnet)
                return exports.TSwapIDL_v1_6_0;
            if (slot < exports.TSwapIDL_latest_EffSlot_Mainnet)
                return exports.TSwapIDL_v1_7_0;
            return exports.TSwapIDL_latest;
        case tensor_common_1.Cluster.Devnet:
            if (slot < exports.TSwapIDL_v1_7_0_EffSlot_Devnet)
                return null;
            if (slot < exports.TSwapIDL_latest_EffSlot_Devnet)
                return exports.TSwapIDL_v1_7_0;
            return exports.TSwapIDL_latest;
    }
};
exports.triageIDL = triageIDL;
// --------------------------------------- constants
exports.SNIPE_FEE_BPS = +tensorswap_1.IDL.constants.find((c) => c.name === "SNIPE_FEE_BPS").value;
exports.SNIPE_PROFIT_SHARE_BPS = +tensorswap_1.IDL.constants.find((c) => c.name === "SNIPE_PROFIT_SHARE_BPS").value;
exports.TAKER_BROKER_PCT = +tensorswap_1.IDL.constants.find((c) => c.name === "TAKER_BROKER_PCT").value;
exports.SNIPE_MIN_FEE = 0.01 * web3_js_1.LAMPORTS_PER_SOL;
exports.TSWAP_SIZE = (0, common_1.evalMathExpr)(tensorswap_1.IDL.constants.find((c) => c.name === "TSWAP_SIZE").value);
exports.POOL_SIZE = (0, common_1.evalMathExpr)(tensorswap_1.IDL.constants.find((c) => c.name === "POOL_SIZE").value);
exports.MARGIN_SIZE = (0, common_1.evalMathExpr)(tensorswap_1.IDL.constants.find((c) => c.name === "MARGIN_SIZE").value);
exports.SINGLE_LISTING_SIZE = (0, common_1.evalMathExpr)(tensorswap_1.IDL.constants.find((c) => c.name === "SINGLE_LISTING_SIZE").value);
exports.DEPOSIT_RECEIPT_SIZE = (0, common_1.evalMathExpr)(tensorswap_1.IDL.constants.find((c) => c.name === "DEPOSIT_RECEIPT_SIZE").value);
exports.NFT_AUTHORITY_SIZE = (0, common_1.evalMathExpr)(tensorswap_1.IDL.constants.find((c) => c.name === "NFT_AUTHORITY_SIZE").value);
exports.APPROX_TSWAP_RENT = (0, tensor_common_1.getRentSync)(exports.TSWAP_SIZE);
exports.APPROX_POOL_RENT = (0, tensor_common_1.getRentSync)(exports.POOL_SIZE);
exports.APPROX_SOL_MARGIN_RENT = (0, tensor_common_1.getRentSync)(exports.MARGIN_SIZE);
exports.APPROX_SINGLE_LISTING_RENT = (0, tensor_common_1.getRentSync)(exports.SINGLE_LISTING_SIZE);
exports.APPROX_DEPOSIT_RECEIPT_RENT = (0, tensor_common_1.getRentSync)(exports.DEPOSIT_RECEIPT_SIZE);
exports.APPROX_NFT_AUTHORITY_RENT = (0, tensor_common_1.getRentSync)(exports.NFT_AUTHORITY_SIZE);
exports.APPROX_SOL_ESCROW_RENT = 946560; //token account owned by the program, keep hardcoded
//decided to NOT build the tx inside the sdk (too much coupling - should not care about blockhash)
class TensorSwapSDK {
    program;
    discMap;
    coder;
    eventParser;
    constructor({ idl = tensorswap_1.IDL, addr = constants_1.TENSORSWAP_ADDR, provider, coder, }) {
        this.program = new anchor_1.Program(idl, addr, provider, coder);
        this.discMap = (0, tensor_common_1.genAcctDiscHexMap)(idl);
        this.coder = new anchor_1.BorshCoder(idl);
        this.eventParser = new anchor_1.EventParser(addr, this.coder);
    }
    // --------------------------------------- fetchers
    async fetchTSwap(tswap, commitment) {
        return (await this.program.account.tSwap.fetch(tswap, commitment));
    }
    async fetchPool(pool, commitment) {
        return (await this.program.account.pool.fetch(pool, commitment));
    }
    async fetchReceipt(receipt, commitment) {
        return (await this.program.account.nftDepositReceipt.fetch(receipt, commitment));
    }
    async fetchSolEscrow(escrow, commitment) {
        return (await this.program.account.solEscrow.fetch(escrow, commitment));
    }
    async fetchNftAuthority(authority, commitment) {
        return (await this.program.account.nftAuthority.fetch(authority, commitment));
    }
    async fetchMarginAccount(marginAccount, commitment) {
        return (await this.program.account.marginAccount.fetch(marginAccount, commitment));
    }
    async fetchSingleListing(singleListing, commitment) {
        return (await this.program.account.singleListing.fetch(singleListing, commitment));
    }
    // --------------------------------------- account methods
    decode(acct) {
        if (!acct.owner.equals(this.program.programId))
            return null;
        return (0, tensor_common_1.decodeAnchorAcct)(acct, this.discMap);
    }
    // --------------------------------------- tswap methods
    //main signature: owner
    async initUpdateTSwap({ owner = constants_1.TSWAP_OWNER, newOwner, config, feeVault, cosigner = constants_1.TSWAP_COSIGNER, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const builder = this.program.methods.initUpdateTswap(config).accounts({
            tswap: tswapPda,
            owner,
            cosigner,
            newOwner,
            //tswap itself is the default fee vault
            feeVault: feeVault ?? tswapPda,
            systemProgram: web3_js_1.SystemProgram.programId,
        });
        return {
            builder,
            tx: { ixs: [await builder.instruction()] },
            tswapPda,
            tswapBump,
        };
    }
    //main signature: owner
    async withdrawTswapFee({ lamports, destination, owner = constants_1.TSWAP_OWNER, cosigner = constants_1.TSWAP_COSIGNER, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const builder = this.program.methods.withdrawTswapFees(lamports).accounts({
            tswap: tswapPda,
            owner,
            cosigner,
            destination,
            systemProgram: web3_js_1.SystemProgram.programId,
        });
        return {
            builder,
            tx: { ixs: [await builder.instruction()] },
            tswapPda,
            tswapBump,
        };
    }
    // --------------------------------------- pool methods
    //main signature: owner
    async initPool({ owner, whitelist, config, customAuthSeed, isCosigned = false, orderType = types_1.OrderType.Standard, maxTakerSellCount, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [poolPda, poolBump] = (0, pda_1.findPoolPDA)({
            tswap: tswapPda,
            owner,
            whitelist,
            delta: config.delta,
            startingPrice: config.startingPrice,
            poolType: (0, types_1.poolTypeU8)(config.poolType),
            curveType: (0, types_1.curveTypeU8)(config.curveType),
        });
        const [solEscrowPda, solEscrowBump] = (0, pda_1.findSolEscrowPDA)({ pool: poolPda });
        const authSeed = customAuthSeed ?? TensorSwapSDK.uuidToBuffer((0, uuid_1.v4)().toString());
        if (authSeed.length != 32) {
            throw new Error("bad auth seed, expect it to be length 32");
        }
        const [nftAuthPda, nftAuthBump] = (0, pda_1.findNftAuthorityPDA)({ authSeed });
        const builder = this.program.methods
            .initPool(config, authSeed, isCosigned, orderType, maxTakerSellCount ?? null)
            .accounts({
            tswap: tswapPda,
            pool: poolPda,
            solEscrow: solEscrowPda,
            nftAuthority: nftAuthPda,
            whitelist,
            owner,
            systemProgram: web3_js_1.SystemProgram.programId,
        });
        return {
            builder,
            tx: { ixs: [await builder.instruction()], extraSigners: [] },
            authSeed,
            nftAuthPda,
            nftAuthBump,
            tswapPda,
            tswapBump,
            poolPda,
            poolBump,
            solEscrowPda,
            solEscrowBump,
        };
    }
    //main signature: owner
    async closePool({ owner, whitelist, config, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [poolPda, poolBump] = (0, pda_1.findPoolPDA)({
            tswap: tswapPda,
            owner,
            whitelist,
            delta: config.delta,
            startingPrice: config.startingPrice,
            poolType: (0, types_1.poolTypeU8)(config.poolType),
            curveType: (0, types_1.curveTypeU8)(config.curveType),
        });
        const [solEscrowPda, solEscrowBump] = (0, pda_1.findSolEscrowPDA)({ pool: poolPda });
        const poolAcc = await this.fetchPool(poolPda);
        const builder = this.program.methods.closePool(config).accounts({
            tswap: tswapPda,
            pool: poolPda,
            solEscrow: solEscrowPda,
            nftAuthority: poolAcc.nftAuthority,
            whitelist,
            owner,
            systemProgram: web3_js_1.SystemProgram.programId,
        });
        return {
            builder,
            tx: { ixs: [await builder.instruction()], extraSigners: [] },
            nftAuthPda: poolAcc.nftAuthority,
            tswapPda,
            tswapBump,
            poolPda,
            poolBump,
            solEscrowPda,
            solEscrowBump,
        };
    }
    //main signature: owner
    async editPool({ owner, whitelist, oldConfig, 
    //(!) new config is OPTIONAL. If not passed, pool is edited IN PLACE.
    newConfig, isCosigned = null, maxTakerSellCount, mmCompoundFees = null, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [oldPoolPda, oldPoolBump] = (0, pda_1.findPoolPDA)({
            tswap: tswapPda,
            owner,
            whitelist,
            delta: oldConfig.delta,
            startingPrice: oldConfig.startingPrice,
            poolType: (0, types_1.poolTypeU8)(oldConfig.poolType),
            curveType: (0, types_1.curveTypeU8)(oldConfig.curveType),
        });
        const poolAcc = await this.fetchPool(oldPoolPda);
        const [oldSolEscrowPda, oldSolEscrowBump] = (0, pda_1.findSolEscrowPDA)({
            pool: oldPoolPda,
        });
        let newPoolPda = oldPoolPda;
        let newPoolBump = oldPoolBump;
        let newSolEscrowPda = oldSolEscrowPda;
        let newSolEscrowBump = oldSolEscrowBump;
        let builder;
        //in case someone passes this in separately thinking it will affect the pool in full edit ix
        if (newConfig && !(0, tensor_common_1.isNullLike)(mmCompoundFees)) {
            newConfig.mmCompoundFees = mmCompoundFees;
        }
        if (!(0, tensor_common_1.isNullLike)(newConfig)) {
            //full edit with pool migration
            [newPoolPda, newPoolBump] = (0, pda_1.findPoolPDA)({
                tswap: tswapPda,
                owner,
                whitelist,
                delta: newConfig.delta,
                startingPrice: newConfig.startingPrice,
                poolType: (0, types_1.poolTypeU8)(newConfig.poolType),
                curveType: (0, types_1.curveTypeU8)(newConfig.curveType),
            });
            [newSolEscrowPda, newSolEscrowBump] = (0, pda_1.findSolEscrowPDA)({
                pool: newPoolPda,
            });
            builder = this.program.methods
                .editPool(oldConfig, newConfig, isCosigned, maxTakerSellCount ?? null)
                .accounts({
                tswap: tswapPda,
                oldPool: oldPoolPda,
                newPool: newPoolPda,
                oldSolEscrow: oldSolEscrowPda,
                newSolEscrow: newSolEscrowPda,
                nftAuthority: poolAcc.nftAuthority,
                whitelist,
                owner,
                systemProgram: web3_js_1.SystemProgram.programId,
            });
        }
        else {
            //in place edit w/o pool migration
            builder = this.program.methods
                .editPoolInPlace(oldConfig, isCosigned, maxTakerSellCount ?? null, mmCompoundFees)
                .accounts({
                tswap: tswapPda,
                pool: oldPoolPda,
                whitelist,
                owner,
                systemProgram: web3_js_1.SystemProgram.programId,
            });
        }
        return {
            builder,
            tx: { ixs: [await builder.instruction()], extraSigners: [] },
            nftAuthPda: poolAcc.nftAuthority,
            tswapPda,
            tswapBump,
            oldPoolPda,
            oldPoolBump,
            oldSolEscrowPda,
            oldSolEscrowBump,
            newPoolPda,
            newPoolBump,
            newSolEscrowPda,
            newSolEscrowBump,
        };
    }
    // --------------------------------------- deposit/withdraw methods
    // main signature: owner
    async depositNft({ whitelist, nftMint, nftSource, owner, config, tokenProgram, 
    /** pnft args */
    meta, authData = null, compute = common_1.DEFAULT_XFER_COMPUTE_UNITS, ruleSetAddnCompute = common_1.DEFAULT_RULESET_ADDN_COMPUTE_UNITS, priorityMicroLamports = common_1.DEFAULT_MICRO_LAMPORTS, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [poolPda, poolBump] = (0, pda_1.findPoolPDA)({
            tswap: tswapPda,
            owner,
            whitelist,
            delta: config.delta,
            startingPrice: config.startingPrice,
            poolType: (0, types_1.poolTypeU8)(config.poolType),
            curveType: (0, types_1.curveTypeU8)(config.curveType),
        });
        const [escrowPda, escrowBump] = (0, pda_1.findNftEscrowPDA)({ nftMint });
        const [receiptPda, receiptBump] = (0, pda_1.findNftDepositReceiptPDA)({
            nftMint,
        });
        const [mintProofPda] = (0, tensor_whitelist_1.findMintProofPDA)({ mint: nftMint, whitelist });
        //pnft
        const { meta: newMeta, ownerTokenRecordBump, ownerTokenRecordPda, destTokenRecordBump, destTokenRecordPda, ruleSet, nftEditionPda, authDataSerialized, } = await (0, tensor_common_1.prepPnftAccounts)({
            connection: this.program.provider.connection,
            meta,
            nftMint,
            destAta: escrowPda,
            authData,
            sourceAta: nftSource,
        });
        meta = newMeta;
        const builder = this.program.methods
            .depositNft(config, authDataSerialized, !!ruleSet)
            .accounts({
            tswap: tswapPda,
            pool: poolPda,
            whitelist,
            nftMint,
            nftSource,
            nftEscrow: escrowPda,
            nftReceipt: receiptPda,
            nftMetadata: meta.address,
            owner,
            tokenProgram,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
            mintProof: mintProofPda,
            nftEdition: nftEditionPda,
            destTokenRecord: destTokenRecordPda,
            ownerTokenRecord: ownerTokenRecordPda,
            pnftShared: {
                authorizationRulesProgram: tensor_common_1.AUTH_PROGRAM_ID,
                tokenMetadataProgram: tensor_common_1.TMETA_PROGRAM_ID,
                instructions: web3_js_1.SYSVAR_INSTRUCTIONS_PUBKEY,
            },
            authRules: ruleSet ?? web3_js_1.SystemProgram.programId,
        });
        const ruleSetCompute = ruleSet ? ruleSetAddnCompute : null;
        const ixs = (0, tensor_common_1.prependComputeIxs)([await builder.instruction()], (0, tensor_common_1.isNullLike)(compute) && (0, tensor_common_1.isNullLike)(ruleSetCompute)
            ? null
            : (compute ?? 0) + (ruleSetCompute ?? 0), priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            tswapPda,
            tswapBump,
            poolPda,
            poolBump,
            escrowPda,
            escrowBump,
            receiptPda,
            receiptBump,
            mintProofPda,
            ownerTokenRecordPda,
            ownerTokenRecordBump,
            destTokenRecordPda,
            destTokenRecordBump,
            nftEditionPda,
            meta,
        };
    }
    // main signature: owner
    async depositSol({ whitelist, owner, config, lamports, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [poolPda, poolBump] = (0, pda_1.findPoolPDA)({
            tswap: tswapPda,
            owner,
            whitelist,
            delta: config.delta,
            startingPrice: config.startingPrice,
            poolType: (0, types_1.poolTypeU8)(config.poolType),
            curveType: (0, types_1.curveTypeU8)(config.curveType),
        });
        const [solEscrowPda, solEscrowBump] = (0, pda_1.findSolEscrowPDA)({ pool: poolPda });
        const builder = this.program.methods
            .depositSol(config, lamports)
            .accounts({
            tswap: tswapPda,
            pool: poolPda,
            whitelist,
            solEscrow: solEscrowPda,
            owner,
            systemProgram: web3_js_1.SystemProgram.programId,
        });
        return {
            builder,
            tx: { ixs: [await builder.instruction()], extraSigners: [] },
            tswapPda,
            tswapBump,
            poolPda,
            poolBump,
            solEscrowPda,
            solEscrowBump,
        };
    }
    // main signature: owner
    async withdrawNft({ whitelist, nftMint, nftDest, owner, config, tokenProgram, 
    /** pnft args */
    meta, authData = null, compute = common_1.DEFAULT_XFER_COMPUTE_UNITS, ruleSetAddnCompute = common_1.DEFAULT_RULESET_ADDN_COMPUTE_UNITS, priorityMicroLamports = common_1.DEFAULT_MICRO_LAMPORTS, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [poolPda, poolBump] = (0, pda_1.findPoolPDA)({
            tswap: tswapPda,
            owner,
            whitelist,
            delta: config.delta,
            startingPrice: config.startingPrice,
            poolType: (0, types_1.poolTypeU8)(config.poolType),
            curveType: (0, types_1.curveTypeU8)(config.curveType),
        });
        const [escrowPda, escrowBump] = (0, pda_1.findNftEscrowPDA)({ nftMint });
        const [receiptPda, receiptBump] = (0, pda_1.findNftDepositReceiptPDA)({
            nftMint,
        });
        //pnft
        const { meta: newMeta, ownerTokenRecordBump, ownerTokenRecordPda, destTokenRecordBump, destTokenRecordPda, ruleSet, nftEditionPda, authDataSerialized, } = await (0, tensor_common_1.prepPnftAccounts)({
            connection: this.program.provider.connection,
            meta,
            nftMint,
            destAta: nftDest,
            authData,
            sourceAta: escrowPda,
        });
        meta = newMeta;
        const builder = this.program.methods
            .withdrawNft(config, authDataSerialized, !!ruleSet)
            .accounts({
            tswap: tswapPda,
            pool: poolPda,
            whitelist,
            nftMint,
            nftDest,
            nftEscrow: escrowPda,
            nftReceipt: receiptPda,
            owner,
            tokenProgram,
            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
            nftMetadata: meta.address,
            nftEdition: nftEditionPda,
            destTokenRecord: destTokenRecordPda,
            ownerTokenRecord: ownerTokenRecordPda,
            pnftShared: {
                authorizationRulesProgram: tensor_common_1.AUTH_PROGRAM_ID,
                tokenMetadataProgram: tensor_common_1.TMETA_PROGRAM_ID,
                instructions: web3_js_1.SYSVAR_INSTRUCTIONS_PUBKEY,
            },
            authRules: ruleSet ?? web3_js_1.SystemProgram.programId,
        });
        const ruleSetCompute = ruleSet ? ruleSetAddnCompute : null;
        const ixs = (0, tensor_common_1.prependComputeIxs)([
            ...(await this.clearDelegate(nftDest, owner)),
            await builder.instruction(),
        ], (0, tensor_common_1.isNullLike)(compute) && (0, tensor_common_1.isNullLike)(ruleSetCompute)
            ? null
            : (compute ?? 0) + (ruleSetCompute ?? 0), priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            tswapPda,
            tswapBump,
            poolPda,
            poolBump,
            escrowPda,
            escrowBump,
            receiptPda,
            receiptBump,
            ownerTokenRecordBump,
            ownerTokenRecordPda,
            destTokenRecordBump,
            destTokenRecordPda,
            meta,
        };
    }
    // main signature: owner
    async withdrawSol({ whitelist, owner, config, lamports, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [poolPda, poolBump] = (0, pda_1.findPoolPDA)({
            tswap: tswapPda,
            owner,
            whitelist,
            delta: config.delta,
            startingPrice: config.startingPrice,
            poolType: (0, types_1.poolTypeU8)(config.poolType),
            curveType: (0, types_1.curveTypeU8)(config.curveType),
        });
        const [solEscrowPda, solEscrowBump] = (0, pda_1.findSolEscrowPDA)({ pool: poolPda });
        const builder = this.program.methods
            .withdrawSol(config, lamports)
            .accounts({
            tswap: tswapPda,
            pool: poolPda,
            whitelist,
            solEscrow: solEscrowPda,
            owner,
            systemProgram: web3_js_1.SystemProgram.programId,
        });
        return {
            builder,
            tx: { ixs: [await builder.instruction()], extraSigners: [] },
            tswapPda,
            tswapBump,
            poolPda,
            poolBump,
            solEscrowPda,
            solEscrowBump,
        };
    }
    // main signature: owner
    async withdrawMmFee({ whitelist, owner, config, lamports, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [poolPda, poolBump] = (0, pda_1.findPoolPDA)({
            tswap: tswapPda,
            owner,
            whitelist,
            delta: config.delta,
            startingPrice: config.startingPrice,
            poolType: (0, types_1.poolTypeU8)(config.poolType),
            curveType: (0, types_1.curveTypeU8)(config.curveType),
        });
        const [solEscrowPda, solEscrowBump] = (0, pda_1.findSolEscrowPDA)({ pool: poolPda });
        const builder = this.program.methods
            .withdrawMmFee(config, lamports)
            .accounts({
            tswap: tswapPda,
            pool: poolPda,
            whitelist,
            solEscrow: solEscrowPda,
            owner,
            systemProgram: web3_js_1.SystemProgram.programId,
        });
        return {
            builder,
            tx: { ixs: [await builder.instruction()], extraSigners: [] },
            tswapPda,
            tswapBump,
            poolPda,
            poolBump,
            solEscrowPda,
            solEscrowBump,
        };
    }
    // --------------------------------------- trade (buy/sell) methods
    //main signature: buyer
    async buyNft({ whitelist, nftMint, nftBuyerAcc, owner, buyer, config, maxPrice, tokenProgram, marginNr = null, optionalRoyaltyPct = null, takerBroker = null, 
    /** pnft args */
    meta, authData = null, compute = common_1.DEFAULT_XFER_COMPUTE_UNITS, ruleSetAddnCompute = common_1.DEFAULT_RULESET_ADDN_COMPUTE_UNITS, priorityMicroLamports = common_1.DEFAULT_MICRO_LAMPORTS, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [poolPda, poolBump] = (0, pda_1.findPoolPDA)({
            tswap: tswapPda,
            owner,
            whitelist,
            delta: config.delta,
            startingPrice: config.startingPrice,
            poolType: (0, types_1.poolTypeU8)(config.poolType),
            curveType: (0, types_1.curveTypeU8)(config.curveType),
        });
        const [escrowPda, escrowBump] = (0, pda_1.findNftEscrowPDA)({ nftMint });
        const [solEscrowPda, solEscrowBump] = (0, pda_1.findSolEscrowPDA)({ pool: poolPda });
        const [receiptPda, receiptBump] = (0, pda_1.findNftDepositReceiptPDA)({
            nftMint,
        });
        const tSwapAcc = await this.fetchTSwap(tswapPda);
        //pnft
        const { meta: newMeta, creators, ownerTokenRecordBump, ownerTokenRecordPda, destTokenRecordBump, destTokenRecordPda, ruleSet, nftEditionPda, authDataSerialized, } = await (0, tensor_common_1.prepPnftAccounts)({
            connection: this.program.provider.connection,
            meta,
            nftMint,
            destAta: nftBuyerAcc,
            authData,
            sourceAta: escrowPda,
        });
        meta = newMeta;
        let marginPda;
        let marginBump;
        if (!(0, tensor_common_1.isNullLike)(marginNr)) {
            [marginPda, marginBump] = (0, pda_1.findMarginPDA)({
                tswap: tswapPda,
                owner,
                marginNr,
            });
        }
        const builder = this.program.methods
            // TODO: Proofs disabled for buys for now until tx size limit increases.
            .buyNft(config, maxPrice, !!ruleSet, authDataSerialized, optionalRoyaltyPct)
            .accounts({
            tswap: tswapPda,
            feeVault: tSwapAcc.feeVault,
            pool: poolPda,
            whitelist,
            nftMint,
            nftMetadata: meta.address,
            nftBuyerAcc,
            nftEscrow: escrowPda,
            nftReceipt: receiptPda,
            solEscrow: solEscrowPda,
            owner,
            buyer,
            tokenProgram,
            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
            nftEdition: nftEditionPda,
            destTokenRecord: destTokenRecordPda,
            ownerTokenRecord: ownerTokenRecordPda,
            pnftShared: {
                authorizationRulesProgram: tensor_common_1.AUTH_PROGRAM_ID,
                tokenMetadataProgram: tensor_common_1.TMETA_PROGRAM_ID,
                instructions: web3_js_1.SYSVAR_INSTRUCTIONS_PUBKEY,
            },
            authRules: ruleSet ?? web3_js_1.SystemProgram.programId,
            marginAccount: marginPda ?? buyer,
            takerBroker: takerBroker ?? tSwapAcc.feeVault,
        })
            .remainingAccounts((creators ?? []).map((c) => {
            return {
                pubkey: c.address,
                isWritable: c.share > 0,
                isSigner: false,
            };
        }));
        const ruleSetCompute = ruleSet ? ruleSetAddnCompute : null;
        const ixs = (0, tensor_common_1.prependComputeIxs)([
            // TODO: not including as it would incur an extra RPC call on every buy tx (slower). Let's see if needed.
            // ...(await this.clearDelegate(nftBuyerAcc, buyer)),
            await builder.instruction(),
        ], (0, tensor_common_1.isNullLike)(compute) && (0, tensor_common_1.isNullLike)(ruleSetCompute)
            ? null
            : (compute ?? 0) + (ruleSetCompute ?? 0), priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            tswapPda,
            tswapBump,
            poolPda,
            poolBump,
            escrowPda,
            escrowBump,
            solEscrowPda,
            solEscrowBump,
            receiptPda,
            receiptBump,
            ownerTokenRecordBump,
            ownerTokenRecordPda,
            destTokenRecordBump,
            destTokenRecordPda,
            meta,
            ruleSet,
            marginBump,
            marginPda,
        };
    }
    //main signature: seller
    async sellNft({ type, whitelist, nftMint, nftSellerAcc, owner, seller, config, minPrice, tokenProgram, marginNr = null, isCosigned = false, cosigner = constants_1.TSWAP_COSIGNER, optionalRoyaltyPct = null, takerBroker = null, 
    /** pnft args */
    meta, authData = null, compute = common_1.DEFAULT_XFER_COMPUTE_UNITS, ruleSetAddnCompute = common_1.DEFAULT_RULESET_ADDN_COMPUTE_UNITS, priorityMicroLamports = common_1.DEFAULT_MICRO_LAMPORTS, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [poolPda, poolBump] = (0, pda_1.findPoolPDA)({
            tswap: tswapPda,
            owner,
            whitelist,
            delta: config.delta,
            startingPrice: config.startingPrice,
            poolType: (0, types_1.poolTypeU8)(config.poolType),
            curveType: (0, types_1.curveTypeU8)(config.curveType),
        });
        const [solEscrowPda, solEscrowBump] = (0, pda_1.findSolEscrowPDA)({ pool: poolPda });
        const ownerAtaAcc = (0, spl_token_1.getAssociatedTokenAddressSync)(nftMint, owner, true, tokenProgram);
        const [escrowPda, escrowBump] = (0, pda_1.findNftEscrowPDA)({ nftMint });
        const [receiptPda, receiptBump] = (0, pda_1.findNftDepositReceiptPDA)({ nftMint });
        const [mintProofPda] = (0, tensor_whitelist_1.findMintProofPDA)({ mint: nftMint, whitelist });
        const tSwapAcc = await this.fetchTSwap(tswapPda);
        //prepare 2 pnft account sets
        const { meta: newMeta, creators, ownerTokenRecordBump, ownerTokenRecordPda, destTokenRecordBump: escrowDestTokenRecordBump, destTokenRecordPda: escrowDestTokenRecordPda, ruleSet, nftEditionPda, authDataSerialized, } = await (0, tensor_common_1.prepPnftAccounts)({
            connection: this.program.provider.connection,
            meta,
            nftMint,
            destAta: escrowPda,
            authData,
            sourceAta: nftSellerAcc,
        });
        meta = newMeta;
        // Re-use fetched meta = faster.
        const { destTokenRecordBump: tokenDestTokenRecordBump, destTokenRecordPda: tokenDestTokenRecordPda, } = await (0, tensor_common_1.prepPnftAccounts)({
            connection: this.program.provider.connection,
            meta,
            nftMint,
            destAta: ownerAtaAcc,
            authData,
            sourceAta: nftSellerAcc,
        });
        let marginPda;
        let marginBump;
        if (!(0, tensor_common_1.isNullLike)(marginNr)) {
            [marginPda, marginBump] = (0, pda_1.findMarginPDA)({
                tswap: tswapPda,
                owner,
                marginNr,
            });
        }
        //1.optional cosigner
        const remAcc = [];
        if (isCosigned && type === "token") {
            remAcc.push({
                pubkey: cosigner,
                isSigner: true,
                isWritable: false,
            });
        }
        //2.optional creators (last)
        creators.map((c) => {
            remAcc.push({
                pubkey: c.address,
                isWritable: c.share > 0,
                isSigner: false,
            });
        });
        const shared = {
            tswap: tswapPda,
            feeVault: tSwapAcc.feeVault,
            pool: poolPda,
            whitelist,
            nftMint,
            nftMetadata: meta.address,
            nftSellerAcc,
            solEscrow: solEscrowPda,
            mintProof: mintProofPda,
            owner,
            seller,
        };
        const { method, accounts } = type === "trade"
            ? {
                method: this.program.methods.sellNftTradePool,
                accounts: {
                    nftEscrow: escrowPda,
                    nftReceipt: receiptPda,
                    destTokenRecord: escrowDestTokenRecordPda,
                },
            }
            : {
                method: this.program.methods.sellNftTokenPool,
                accounts: {
                    nftEscrow: escrowPda,
                    ownerAtaAcc,
                    destTokenRecord: tokenDestTokenRecordPda,
                    tempEscrowTokenRecord: escrowDestTokenRecordPda,
                },
            };
        // TODO: Proofs passed through PDA instead of ix b/c of tx limit size.
        // const builder = method(config as any, proof, minPrice)
        const builder = method(config, minPrice, !!ruleSet, authDataSerialized, optionalRoyaltyPct)
            .accounts({
            shared,
            tokenProgram,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
            nftEdition: nftEditionPda,
            ownerTokenRecord: ownerTokenRecordPda,
            pnftShared: {
                authorizationRulesProgram: tensor_common_1.AUTH_PROGRAM_ID,
                tokenMetadataProgram: tensor_common_1.TMETA_PROGRAM_ID,
                instructions: web3_js_1.SYSVAR_INSTRUCTIONS_PUBKEY,
            },
            authRules: ruleSet ?? web3_js_1.SystemProgram.programId,
            marginAccount: marginPda ?? seller,
            takerBroker: takerBroker ?? tSwapAcc.feeVault,
            ...accounts,
        })
            .remainingAccounts(remAcc);
        const ruleSetCompute = ruleSet ? ruleSetAddnCompute : null;
        const ixs = (0, tensor_common_1.prependComputeIxs)([await builder.instruction()], (0, tensor_common_1.isNullLike)(compute) && (0, tensor_common_1.isNullLike)(ruleSetCompute)
            ? null
            : (compute ?? 0) + (ruleSetCompute ?? 0), priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            tswapPda,
            tswapBump,
            poolPda,
            poolBump,
            solEscrowPda,
            solEscrowBump,
            ownerAtaAcc,
            escrowPda,
            escrowBump,
            receiptPda,
            receiptBump,
            marginPda,
            marginBump,
            ownerTokenRecordBump,
            ownerTokenRecordPda,
            destTokenRecordBump: type === "trade" ? escrowDestTokenRecordBump : tokenDestTokenRecordBump,
            destTokenRecordPda: type === "trade" ? escrowDestTokenRecordPda : tokenDestTokenRecordPda,
            meta,
        };
    }
    async reallocPool({ owner, cosigner = constants_1.TSWAP_COSIGNER, whitelist, config, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [poolPda, poolBump] = (0, pda_1.findPoolPDA)({
            tswap: tswapPda,
            owner,
            whitelist,
            delta: config.delta,
            startingPrice: config.startingPrice,
            poolType: (0, types_1.poolTypeU8)(config.poolType),
            curveType: (0, types_1.curveTypeU8)(config.curveType),
        });
        const builder = this.program.methods.reallocPool(config).accounts({
            tswap: tswapPda,
            pool: poolPda,
            whitelist,
            owner,
            cosigner,
            systemProgram: web3_js_1.SystemProgram.programId,
        });
        return {
            builder,
            tx: { ixs: [await builder.instruction()], extraSigners: [] },
            tswapPda,
            tswapBump,
            poolPda,
            poolBump,
        };
    }
    // --------------------------------------- margin
    //main signer: owner
    async initMarginAcc({ owner, name, desiredNr, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        let marginNr;
        let marginPda;
        let marginBump;
        if ((0, tensor_common_1.isNullLike)(desiredNr)) {
            ({ marginNr, marginPda, marginBump } = await (0, pda_1.findNextFreeMarginNr)({
                connection: this.program.provider.connection,
                owner,
                tswap: tswapPda,
            }));
        }
        else {
            marginNr = desiredNr;
            [marginPda, marginBump] = (0, pda_1.findMarginPDA)({
                tswap: tswapPda,
                owner,
                marginNr: desiredNr,
            });
        }
        const builder = this.program.methods
            .initMarginAccount(marginNr, name)
            .accounts({
            tswap: tswapPda,
            marginAccount: marginPda,
            owner,
            systemProgram: web3_js_1.SystemProgram.programId,
        });
        return {
            builder,
            tx: { ixs: [await builder.instruction()], extraSigners: [] },
            tswapPda,
            tswapBump,
            marginPda,
            marginBump,
            marginNr,
        };
    }
    //main signer: owner
    async closeMarginAcc({ marginNr, owner, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [marginPda, marginBump] = (0, pda_1.findMarginPDA)({
            tswap: tswapPda,
            marginNr,
            owner,
        });
        const builder = this.program.methods.closeMarginAccount().accounts({
            tswap: tswapPda,
            marginAccount: marginPda,
            owner,
            systemProgram: web3_js_1.SystemProgram.programId,
        });
        return {
            builder,
            tx: { ixs: [await builder.instruction()], extraSigners: [] },
            tswapPda,
            tswapBump,
            marginPda,
            marginBump,
        };
    }
    //main signer: owner
    async depositMarginAcc({ marginNr, owner, amount, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [marginPda, marginBump] = (0, pda_1.findMarginPDA)({
            tswap: tswapPda,
            marginNr,
            owner,
        });
        const builder = this.program.methods.depositMarginAccount(amount).accounts({
            tswap: tswapPda,
            marginAccount: marginPda,
            owner,
            systemProgram: web3_js_1.SystemProgram.programId,
        });
        return {
            builder,
            tx: { ixs: [await builder.instruction()], extraSigners: [] },
            tswapPda,
            tswapBump,
            marginPda,
            marginBump,
        };
    }
    //main signer: owner
    async withdrawMarginAcc({ marginNr, owner, amount, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [marginPda, marginBump] = (0, pda_1.findMarginPDA)({
            tswap: tswapPda,
            marginNr,
            owner,
        });
        const builder = this.program.methods
            .withdrawMarginAccount(amount)
            .accounts({
            tswap: tswapPda,
            marginAccount: marginPda,
            owner,
            systemProgram: web3_js_1.SystemProgram.programId,
        });
        return {
            builder,
            tx: { ixs: [await builder.instruction()], extraSigners: [] },
            tswapPda,
            tswapBump,
            marginPda,
            marginBump,
        };
    }
    //main signer: owner
    async attachPoolMargin({ config, marginNr, owner, whitelist, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [marginPda, marginBump] = (0, pda_1.findMarginPDA)({
            tswap: tswapPda,
            marginNr,
            owner,
        });
        const [poolPda, poolBump] = (0, pda_1.findPoolPDA)({
            tswap: tswapPda,
            owner,
            whitelist,
            delta: config.delta,
            startingPrice: config.startingPrice,
            poolType: (0, types_1.poolTypeU8)(config.poolType),
            curveType: (0, types_1.curveTypeU8)(config.curveType),
        });
        const [solEscrowPda, solEscrowBump] = (0, pda_1.findSolEscrowPDA)({ pool: poolPda });
        const builder = this.program.methods
            .attachPoolToMargin(config)
            .accounts({
            tswap: tswapPda,
            marginAccount: marginPda,
            pool: poolPda,
            whitelist,
            owner,
            solEscrow: solEscrowPda,
            systemProgram: web3_js_1.SystemProgram.programId,
        });
        return {
            builder,
            tx: { ixs: [await builder.instruction()], extraSigners: [] },
            tswapPda,
            tswapBump,
            marginPda,
            marginBump,
            poolPda,
            poolBump,
            solEscrowPda,
            solEscrowBump,
        };
    }
    //main signer: owner
    async detachPoolMargin({ config, marginNr, owner, amount = new bn_js_1.default(0), whitelist, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [marginPda, marginBump] = (0, pda_1.findMarginPDA)({
            tswap: tswapPda,
            marginNr,
            owner,
        });
        const [poolPda, poolBump] = (0, pda_1.findPoolPDA)({
            tswap: tswapPda,
            owner,
            whitelist,
            delta: config.delta,
            startingPrice: config.startingPrice,
            poolType: (0, types_1.poolTypeU8)(config.poolType),
            curveType: (0, types_1.curveTypeU8)(config.curveType),
        });
        const [solEscrowPda, solEscrowBump] = (0, pda_1.findSolEscrowPDA)({ pool: poolPda });
        const builder = this.program.methods
            .detachPoolFromMargin(config, amount)
            .accounts({
            tswap: tswapPda,
            marginAccount: marginPda,
            pool: poolPda,
            whitelist,
            owner,
            solEscrow: solEscrowPda,
            systemProgram: web3_js_1.SystemProgram.programId,
        });
        return {
            builder,
            tx: { ixs: [await builder.instruction()], extraSigners: [] },
            tswapPda,
            tswapBump,
            marginPda,
            marginBump,
            poolPda,
            poolBump,
            solEscrowPda,
            solEscrowBump,
        };
    }
    // --------------------------------------- advanced ordering system
    //main signature cosigner
    async setPoolFreeze({ whitelist, owner, config, marginNr, freeze, cosigner = constants_1.TSWAP_COSIGNER, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [poolPda, poolBump] = (0, pda_1.findPoolPDA)({
            tswap: tswapPda,
            owner,
            whitelist,
            delta: config.delta,
            startingPrice: config.startingPrice,
            poolType: (0, types_1.poolTypeU8)(config.poolType),
            curveType: (0, types_1.curveTypeU8)(config.curveType),
        });
        const [marginPda, marginBump] = (0, pda_1.findMarginPDA)({
            tswap: tswapPda,
            owner,
            marginNr,
        });
        const [solEscrowPda, solEscrowBump] = (0, pda_1.findSolEscrowPDA)({ pool: poolPda });
        const builder = this.program.methods
            .setPoolFreeze(config, freeze)
            .accounts({
            tswap: tswapPda,
            pool: poolPda,
            whitelist,
            solEscrow: solEscrowPda,
            owner,
            cosigner,
            marginAccount: marginPda,
            systemProgram: web3_js_1.SystemProgram.programId,
        });
        return {
            builder,
            tx: { ixs: [await builder.instruction()], extraSigners: [] },
            tswapPda,
            tswapBump,
            poolPda,
            poolBump,
            solEscrowPda,
            solEscrowBump,
            marginPda,
            marginBump,
        };
    }
    //main signature: cosigner
    async takeSnipe({ whitelist, nftMint, nftSellerAcc, owner, seller, config, actualPrice, marginNr, tokenProgram, cosigner = constants_1.TSWAP_COSIGNER, 
    /** pnft args */
    meta, authData = null, compute = common_1.DEFAULT_XFER_COMPUTE_UNITS, ruleSetAddnCompute = common_1.DEFAULT_RULESET_ADDN_COMPUTE_UNITS, priorityMicroLamports = common_1.DEFAULT_MICRO_LAMPORTS, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [poolPda, poolBump] = (0, pda_1.findPoolPDA)({
            tswap: tswapPda,
            owner,
            whitelist,
            delta: config.delta,
            startingPrice: config.startingPrice,
            poolType: (0, types_1.poolTypeU8)(config.poolType),
            curveType: (0, types_1.curveTypeU8)(config.curveType),
        });
        const [solEscrowPda, solEscrowBump] = (0, pda_1.findSolEscrowPDA)({ pool: poolPda });
        const ownerAtaAcc = (0, spl_token_1.getAssociatedTokenAddressSync)(nftMint, owner, true, tokenProgram);
        const [escrowPda, escrowBump] = (0, pda_1.findNftEscrowPDA)({ nftMint });
        const [receiptPda, receiptBump] = (0, pda_1.findNftDepositReceiptPDA)({ nftMint });
        const [mintProofPda] = (0, tensor_whitelist_1.findMintProofPDA)({ mint: nftMint, whitelist });
        const tSwapAcc = await this.fetchTSwap(tswapPda);
        const [marginPda, marginBump] = (0, pda_1.findMarginPDA)({
            tswap: tswapPda,
            owner,
            marginNr,
        });
        //pnft
        const { meta: newMeta, ownerTokenRecordBump, ownerTokenRecordPda, destTokenRecordBump, destTokenRecordPda, ruleSet, nftEditionPda, authDataSerialized, } = await (0, tensor_common_1.prepPnftAccounts)({
            connection: this.program.provider.connection,
            meta,
            nftMint,
            destAta: ownerAtaAcc,
            authData,
            sourceAta: nftSellerAcc,
        });
        meta = newMeta;
        const remAcc = [];
        //1.optional ruleset
        if (!!ruleSet) {
            remAcc.push({ pubkey: ruleSet, isSigner: false, isWritable: false });
        }
        const builder = this.program.methods
            .takeSnipe(config, actualPrice, authDataSerialized)
            .accounts({
            shared: {
                tswap: tswapPda,
                feeVault: tSwapAcc.feeVault,
                pool: poolPda,
                whitelist,
                nftSellerAcc,
                nftMint,
                mintProof: mintProofPda,
                nftMetadata: meta.address,
                solEscrow: solEscrowPda,
                owner,
                seller,
            },
            ownerAtaAcc,
            marginAccount: marginPda,
            cosigner,
            tokenProgram,
            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
            nftEdition: nftEditionPda,
            destTokenRecord: destTokenRecordPda,
            ownerTokenRecord: ownerTokenRecordPda,
            pnftShared: {
                authorizationRulesProgram: tensor_common_1.AUTH_PROGRAM_ID,
                tokenMetadataProgram: tensor_common_1.TMETA_PROGRAM_ID,
                instructions: web3_js_1.SYSVAR_INSTRUCTIONS_PUBKEY,
            },
        })
            .remainingAccounts(remAcc);
        const ruleSetCompute = ruleSet ? ruleSetAddnCompute : null;
        const ixs = (0, tensor_common_1.prependComputeIxs)([await builder.instruction()], (0, tensor_common_1.isNullLike)(compute) && (0, tensor_common_1.isNullLike)(ruleSetCompute)
            ? null
            : (compute ?? 0) + (ruleSetCompute ?? 0), priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            tswapPda,
            tswapBump,
            poolPda,
            poolBump,
            solEscrowPda,
            solEscrowBump,
            ownerAtaAcc,
            escrowPda,
            escrowBump,
            receiptPda,
            receiptBump,
            marginPda,
            marginBump,
            ownerTokenRecordBump,
            ownerTokenRecordPda,
            destTokenRecordBump,
            destTokenRecordPda,
            meta,
            ruleSet,
        };
    }
    // --------------------------------------- single listings
    //main signature owner + payer
    async list({ nftMint, nftSource, owner, price, tokenProgram, payer = null, 
    /** pnft args */
    meta, authData = null, compute = common_1.DEFAULT_XFER_COMPUTE_UNITS, ruleSetAddnCompute = common_1.DEFAULT_RULESET_ADDN_COMPUTE_UNITS, priorityMicroLamports = common_1.DEFAULT_MICRO_LAMPORTS, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [singleListing, singleListingBump] = (0, pda_1.findSingleListingPDA)({
            nftMint,
        });
        const [escrowPda, escrowBump] = (0, pda_1.findNftEscrowPDA)({ nftMint });
        //pnft
        const { meta: newMeta, ownerTokenRecordBump, ownerTokenRecordPda, destTokenRecordBump, destTokenRecordPda, ruleSet, nftEditionPda, authDataSerialized, } = await (0, tensor_common_1.prepPnftAccounts)({
            connection: this.program.provider.connection,
            meta,
            nftMint,
            destAta: escrowPda,
            authData,
            sourceAta: nftSource,
        });
        meta = newMeta;
        const builder = this.program.methods
            .list(price, authDataSerialized, !!ruleSet)
            .accounts({
            tswap: tswapPda,
            nftMint,
            nftSource,
            nftEscrow: escrowPda,
            nftMetadata: meta.address,
            owner,
            singleListing,
            tokenProgram,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
            nftEdition: nftEditionPda,
            destTokenRecord: destTokenRecordPda,
            ownerTokenRecord: ownerTokenRecordPda,
            pnftShared: {
                authorizationRulesProgram: tensor_common_1.AUTH_PROGRAM_ID,
                tokenMetadataProgram: tensor_common_1.TMETA_PROGRAM_ID,
                instructions: web3_js_1.SYSVAR_INSTRUCTIONS_PUBKEY,
            },
            authRules: ruleSet ?? web3_js_1.SystemProgram.programId,
            payer: payer ?? owner,
        });
        const ruleSetCompute = ruleSet ? ruleSetAddnCompute : null;
        const ixs = (0, tensor_common_1.prependComputeIxs)([await builder.instruction()], (0, tensor_common_1.isNullLike)(compute) && (0, tensor_common_1.isNullLike)(ruleSetCompute)
            ? null
            : (compute ?? 0) + (ruleSetCompute ?? 0), priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            tswapPda,
            tswapBump,
            escrowPda,
            escrowBump,
            ownerTokenRecordPda,
            ownerTokenRecordBump,
            destTokenRecordPda,
            destTokenRecordBump,
            nftEditionPda,
            meta,
            singleListing,
            singleListingBump,
        };
    }
    // main signature: owner
    async delist({ nftMint, nftDest, owner, tokenProgram, payer = null, 
    /** pnft args */
    meta, authData = null, compute = common_1.DEFAULT_XFER_COMPUTE_UNITS, ruleSetAddnCompute = common_1.DEFAULT_RULESET_ADDN_COMPUTE_UNITS, priorityMicroLamports = common_1.DEFAULT_MICRO_LAMPORTS, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [singleListing, singleListingBump] = (0, pda_1.findSingleListingPDA)({
            nftMint,
        });
        const [escrowPda, escrowBump] = (0, pda_1.findNftEscrowPDA)({ nftMint });
        //pnft
        const { meta: newMeta, ownerTokenRecordBump, ownerTokenRecordPda, destTokenRecordBump, destTokenRecordPda, ruleSet, nftEditionPda, authDataSerialized, } = await (0, tensor_common_1.prepPnftAccounts)({
            connection: this.program.provider.connection,
            meta,
            nftMint,
            destAta: nftDest,
            authData,
            sourceAta: escrowPda,
        });
        meta = newMeta;
        const builder = this.program.methods
            .delist(authDataSerialized, !!ruleSet)
            .accounts({
            tswap: tswapPda,
            singleListing,
            nftMint,
            nftDest,
            nftEscrow: escrowPda,
            owner,
            tokenProgram,
            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
            nftMetadata: meta.address,
            nftEdition: nftEditionPda,
            destTokenRecord: destTokenRecordPda,
            ownerTokenRecord: ownerTokenRecordPda,
            pnftShared: {
                authorizationRulesProgram: tensor_common_1.AUTH_PROGRAM_ID,
                tokenMetadataProgram: tensor_common_1.TMETA_PROGRAM_ID,
                instructions: web3_js_1.SYSVAR_INSTRUCTIONS_PUBKEY,
            },
            authRules: ruleSet ?? web3_js_1.SystemProgram.programId,
            payer: payer ?? owner,
        });
        const ruleSetCompute = ruleSet ? ruleSetAddnCompute : null;
        const ixs = (0, tensor_common_1.prependComputeIxs)([
            ...(await this.clearDelegate(nftDest, owner)),
            await builder.instruction(),
        ], (0, tensor_common_1.isNullLike)(compute) && (0, tensor_common_1.isNullLike)(ruleSetCompute)
            ? null
            : (compute ?? 0) + (ruleSetCompute ?? 0), priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            tswapPda,
            tswapBump,
            escrowPda,
            escrowBump,
            ownerTokenRecordBump,
            ownerTokenRecordPda,
            destTokenRecordBump,
            destTokenRecordPda,
            meta,
            singleListing,
            singleListingBump,
        };
    }
    //main signature: buyer
    async buySingleListing({ nftMint, nftBuyerAcc, owner, buyer, maxPrice, tokenProgram, optionalRoyaltyPct = null, takerBroker = null, 
    /** pnft args */
    meta, authData = null, compute = common_1.DEFAULT_XFER_COMPUTE_UNITS, ruleSetAddnCompute = common_1.DEFAULT_RULESET_ADDN_COMPUTE_UNITS, priorityMicroLamports = common_1.DEFAULT_MICRO_LAMPORTS, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [singleListing, singleListingBump] = (0, pda_1.findSingleListingPDA)({
            nftMint,
        });
        const [escrowPda, escrowBump] = (0, pda_1.findNftEscrowPDA)({ nftMint });
        const tSwapAcc = await this.fetchTSwap(tswapPda);
        //pnft
        const { meta: newMeta, creators, ownerTokenRecordBump, ownerTokenRecordPda, destTokenRecordBump, destTokenRecordPda, ruleSet, nftEditionPda, authDataSerialized, } = await (0, tensor_common_1.prepPnftAccounts)({
            connection: this.program.provider.connection,
            meta,
            nftMint,
            destAta: nftBuyerAcc,
            authData,
            sourceAta: escrowPda,
        });
        meta = newMeta;
        const builder = this.program.methods
            .buySingleListing(maxPrice, !!ruleSet, authDataSerialized, optionalRoyaltyPct)
            .accounts({
            tswap: tswapPda,
            singleListing,
            feeVault: tSwapAcc.feeVault,
            nftMint,
            nftMetadata: meta.address,
            nftBuyerAcc,
            nftEscrow: escrowPda,
            owner,
            buyer,
            tokenProgram,
            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
            nftEdition: nftEditionPda,
            destTokenRecord: destTokenRecordPda,
            ownerTokenRecord: ownerTokenRecordPda,
            pnftShared: {
                authorizationRulesProgram: tensor_common_1.AUTH_PROGRAM_ID,
                tokenMetadataProgram: tensor_common_1.TMETA_PROGRAM_ID,
                instructions: web3_js_1.SYSVAR_INSTRUCTIONS_PUBKEY,
            },
            authRules: ruleSet ?? web3_js_1.SystemProgram.programId,
            takerBroker: takerBroker ?? tSwapAcc.feeVault,
        })
            .remainingAccounts(creators.map((c) => {
            return {
                pubkey: c.address,
                isWritable: c.share > 0,
                isSigner: false,
            };
        }));
        const ruleSetCompute = ruleSet ? ruleSetAddnCompute : null;
        const ixs = (0, tensor_common_1.prependComputeIxs)([
            // TODO: not including as it would incur an extra RPC call on every buy tx (slower). Let's see if needed.
            // ...(await this.clearDelegate(nftBuyerAcc, buyer)),
            await builder.instruction(),
        ], (0, tensor_common_1.isNullLike)(compute) && (0, tensor_common_1.isNullLike)(ruleSetCompute)
            ? null
            : (compute ?? 0) + (ruleSetCompute ?? 0), priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            tswapPda,
            tswapBump,
            escrowPda,
            escrowBump,
            ownerTokenRecordBump,
            ownerTokenRecordPda,
            destTokenRecordBump,
            destTokenRecordPda,
            meta,
            ruleSet,
            singleListing,
            singleListingBump,
        };
    }
    // main signature: owner
    async editSingleListing({ nftMint, owner, price, }) {
        const [singleListing, singleListingBump] = (0, pda_1.findSingleListingPDA)({
            nftMint,
        });
        const builder = this.program.methods.editSingleListing(price).accounts({
            singleListing,
            nftMint,
            owner,
            systemProgram: web3_js_1.SystemProgram.programId,
        });
        return {
            builder,
            tx: {
                ixs: [await builder.instruction()],
                extraSigners: [],
            },
            singleListing,
            singleListingBump,
        };
    }
    // --------------------------------------- T22
    //main signature owner + payer
    async listT22({ nftMint, nftSource, owner, price, payer = null, compute = common_1.DEFAULT_XFER_COMPUTE_UNITS, priorityMicroLamports = common_1.DEFAULT_MICRO_LAMPORTS, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [singleListing, singleListingBump] = (0, pda_1.findSingleListingPDA)({
            nftMint,
        });
        const [escrowPda, escrowBump] = (0, pda_1.findNftEscrowPDA)({ nftMint });
        const builder = this.program.methods.listT22(price).accounts({
            tswap: tswapPda,
            nftMint,
            nftSource,
            nftEscrow: escrowPda,
            owner,
            singleListing,
            tokenProgram: spl_token_1.TOKEN_2022_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            payer: payer ?? owner,
        });
        const ixs = (0, tensor_common_1.prependComputeIxs)([await builder.instruction()], (0, tensor_common_1.isNullLike)(compute) ? null : compute ?? 0, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            tswapPda,
            tswapBump,
            escrowPda,
            escrowBump,
            singleListing,
            singleListingBump,
        };
    }
    // main signature: owner
    async delistT22({ nftMint, nftDest, owner, payer = null, compute = common_1.DEFAULT_XFER_COMPUTE_UNITS, priorityMicroLamports = common_1.DEFAULT_MICRO_LAMPORTS, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [singleListing, singleListingBump] = (0, pda_1.findSingleListingPDA)({
            nftMint,
        });
        const [escrowPda, escrowBump] = (0, pda_1.findNftEscrowPDA)({ nftMint });
        const builder = this.program.methods.delistT22().accounts({
            tswap: tswapPda,
            singleListing,
            nftMint,
            nftDest,
            nftEscrow: escrowPda,
            owner,
            tokenProgram: spl_token_1.TOKEN_2022_PROGRAM_ID,
            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
            payer: payer ?? owner,
        });
        const ixs = (0, tensor_common_1.prependComputeIxs)([
            ...(await this.clearDelegate(nftDest, owner)),
            await builder.instruction(),
        ], (0, tensor_common_1.isNullLike)(compute) ? null : compute ?? 0, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            tswapPda,
            tswapBump,
            escrowPda,
            escrowBump,
            singleListing,
            singleListingBump,
        };
    }
    //main signature: buyer
    async buySingleListingT22({ nftMint, nftBuyerAcc, owner, buyer, maxPrice, takerBroker = null, compute = common_1.DEFAULT_XFER_COMPUTE_UNITS, priorityMicroLamports = common_1.DEFAULT_MICRO_LAMPORTS, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [singleListing, singleListingBump] = (0, pda_1.findSingleListingPDA)({
            nftMint,
        });
        const [escrowPda, escrowBump] = (0, pda_1.findNftEscrowPDA)({ nftMint });
        const tSwapAcc = await this.fetchTSwap(tswapPda);
        const builder = this.program.methods
            .buySingleListingT22(maxPrice)
            .accounts({
            tswap: tswapPda,
            singleListing,
            feeVault: tSwapAcc.feeVault,
            nftMint,
            nftBuyerAcc,
            nftEscrow: escrowPda,
            owner,
            buyer,
            tokenProgram: spl_token_1.TOKEN_2022_PROGRAM_ID,
            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            takerBroker: takerBroker ?? tSwapAcc.feeVault,
        });
        const ixs = (0, tensor_common_1.prependComputeIxs)([await builder.instruction()], (0, tensor_common_1.isNullLike)(compute) ? null : compute ?? 0, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            tswapPda,
            tswapBump,
            escrowPda,
            escrowBump,
            singleListing,
            singleListingBump,
        };
    }
    //main signature: buyer
    async buyNftT22({ whitelist, nftMint, nftBuyerAcc, owner, buyer, config, maxPrice, marginNr = null, takerBroker = null, compute = common_1.DEFAULT_XFER_COMPUTE_UNITS, priorityMicroLamports = common_1.DEFAULT_MICRO_LAMPORTS, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [poolPda, poolBump] = (0, pda_1.findPoolPDA)({
            tswap: tswapPda,
            owner,
            whitelist,
            delta: config.delta,
            startingPrice: config.startingPrice,
            poolType: (0, types_1.poolTypeU8)(config.poolType),
            curveType: (0, types_1.curveTypeU8)(config.curveType),
        });
        const [escrowPda, escrowBump] = (0, pda_1.findNftEscrowPDA)({ nftMint });
        const [solEscrowPda, solEscrowBump] = (0, pda_1.findSolEscrowPDA)({ pool: poolPda });
        const [receiptPda, receiptBump] = (0, pda_1.findNftDepositReceiptPDA)({
            nftMint,
        });
        const tSwapAcc = await this.fetchTSwap(tswapPda);
        let marginPda = null;
        let marginBump = null;
        if (!(0, tensor_common_1.isNullLike)(marginNr)) {
            [marginPda, marginBump] = (0, pda_1.findMarginPDA)({
                tswap: tswapPda,
                owner,
                marginNr,
            });
        }
        const builder = this.program.methods
            // TODO: Proofs disabled for buys for now until tx size limit increases.
            .buyNftT22(config, maxPrice)
            .accounts({
            tswap: tswapPda,
            feeVault: tSwapAcc.feeVault,
            pool: poolPda,
            whitelist,
            nftMint,
            nftBuyerAcc,
            nftEscrow: escrowPda,
            nftReceipt: receiptPda,
            solEscrow: solEscrowPda,
            owner,
            buyer,
            tokenProgram: spl_token_1.TOKEN_2022_PROGRAM_ID,
            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            marginAccount: marginPda ?? buyer,
            takerBroker: takerBroker ?? tSwapAcc.feeVault,
        });
        const ixs = (0, tensor_common_1.prependComputeIxs)([await builder.instruction()], (0, tensor_common_1.isNullLike)(compute) ? null : compute ?? 0, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            tswapPda,
            tswapBump,
            poolPda,
            poolBump,
            escrowPda,
            escrowBump,
            solEscrowPda,
            solEscrowBump,
            receiptPda,
            receiptBump,
            marginBump,
            marginPda,
        };
    }
    // main signature: owner
    async depositNftT22({ whitelist, nftMint, nftSource, owner, config, compute = common_1.DEFAULT_XFER_COMPUTE_UNITS, priorityMicroLamports = common_1.DEFAULT_MICRO_LAMPORTS, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [poolPda, poolBump] = (0, pda_1.findPoolPDA)({
            tswap: tswapPda,
            owner,
            whitelist,
            delta: config.delta,
            startingPrice: config.startingPrice,
            poolType: (0, types_1.poolTypeU8)(config.poolType),
            curveType: (0, types_1.curveTypeU8)(config.curveType),
        });
        const [escrowPda, escrowBump] = (0, pda_1.findNftEscrowPDA)({ nftMint });
        const [receiptPda, receiptBump] = (0, pda_1.findNftDepositReceiptPDA)({
            nftMint,
        });
        const [mintProofPda] = (0, tensor_whitelist_1.findMintProofPDA)({ mint: nftMint, whitelist });
        const builder = this.program.methods.depositNftT22(config).accounts({
            tswap: tswapPda,
            pool: poolPda,
            whitelist,
            nftMint,
            nftSource,
            nftEscrow: escrowPda,
            nftReceipt: receiptPda,
            owner,
            tokenProgram: spl_token_1.TOKEN_2022_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            mintProof: mintProofPda,
        });
        const ixs = (0, tensor_common_1.prependComputeIxs)([await builder.instruction()], (0, tensor_common_1.isNullLike)(compute) ? null : compute ?? 0, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            tswapPda,
            tswapBump,
            poolPda,
            poolBump,
            escrowPda,
            escrowBump,
            receiptPda,
            receiptBump,
            mintProofPda,
        };
    }
    //main signature: seller
    async sellNftT22({ type, whitelist, nftMint, nftSellerAcc, owner, seller, config, minPrice, marginNr = null, isCosigned = false, cosigner = constants_1.TSWAP_COSIGNER, takerBroker = null, compute = common_1.DEFAULT_XFER_COMPUTE_UNITS, priorityMicroLamports = common_1.DEFAULT_MICRO_LAMPORTS, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [poolPda, poolBump] = (0, pda_1.findPoolPDA)({
            tswap: tswapPda,
            owner,
            whitelist,
            delta: config.delta,
            startingPrice: config.startingPrice,
            poolType: (0, types_1.poolTypeU8)(config.poolType),
            curveType: (0, types_1.curveTypeU8)(config.curveType),
        });
        const [solEscrowPda, solEscrowBump] = (0, pda_1.findSolEscrowPDA)({ pool: poolPda });
        const ownerAtaAcc = (0, spl_token_1.getAssociatedTokenAddressSync)(nftMint, owner, true, spl_token_1.TOKEN_2022_PROGRAM_ID);
        const [escrowPda, escrowBump] = (0, pda_1.findNftEscrowPDA)({ nftMint });
        const [receiptPda, receiptBump] = (0, pda_1.findNftDepositReceiptPDA)({ nftMint });
        const [mintProofPda] = (0, tensor_whitelist_1.findMintProofPDA)({ mint: nftMint, whitelist });
        const tSwapAcc = await this.fetchTSwap(tswapPda);
        let marginPda = null;
        let marginBump = null;
        if (!(0, tensor_common_1.isNullLike)(marginNr)) {
            [marginPda, marginBump] = (0, pda_1.findMarginPDA)({
                tswap: tswapPda,
                owner,
                marginNr,
            });
        }
        //1.optional cosigner
        const remAcc = [];
        if (isCosigned && type === "token") {
            remAcc.push({
                pubkey: cosigner,
                isSigner: true,
                isWritable: false,
            });
        }
        const shared = {
            tswap: tswapPda,
            feeVault: tSwapAcc.feeVault,
            pool: poolPda,
            whitelist,
            nftMint,
            nftSellerAcc,
            solEscrow: solEscrowPda,
            mintProof: mintProofPda,
            owner,
            seller,
        };
        const { method, accounts } = type === "trade"
            ? {
                method: this.program.methods.sellNftTradePoolT22,
                accounts: {
                    nftEscrow: escrowPda,
                    nftReceipt: receiptPda,
                },
            }
            : {
                method: this.program.methods.sellNftTokenPoolT22,
                accounts: {
                    ownerAtaAcc,
                    associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
                },
            };
        // TODO: Proofs passed through PDA instead of ix b/c of tx limit size.
        // const builder = method(config as any, proof, minPrice)
        const builder = method(config, minPrice)
            .accounts({
            shared,
            tokenProgram: spl_token_1.TOKEN_2022_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            marginAccount: marginPda ?? seller,
            takerBroker: takerBroker ?? tSwapAcc.feeVault,
            ...accounts,
        })
            .remainingAccounts(remAcc);
        const ixs = (0, tensor_common_1.prependComputeIxs)([await builder.instruction()], (0, tensor_common_1.isNullLike)(compute) ? null : compute ?? 0, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            tswapPda,
            tswapBump,
            poolPda,
            poolBump,
            solEscrowPda,
            solEscrowBump,
            ownerAtaAcc,
            escrowPda,
            escrowBump,
            receiptPda,
            receiptBump,
            marginPda,
            marginBump,
        };
    }
    // main signature: owner
    async withdrawNftT22({ whitelist, nftMint, nftDest, owner, config, compute = common_1.DEFAULT_XFER_COMPUTE_UNITS, priorityMicroLamports = common_1.DEFAULT_MICRO_LAMPORTS, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [poolPda, poolBump] = (0, pda_1.findPoolPDA)({
            tswap: tswapPda,
            owner,
            whitelist,
            delta: config.delta,
            startingPrice: config.startingPrice,
            poolType: (0, types_1.poolTypeU8)(config.poolType),
            curveType: (0, types_1.curveTypeU8)(config.curveType),
        });
        const [escrowPda, escrowBump] = (0, pda_1.findNftEscrowPDA)({ nftMint });
        const [receiptPda, receiptBump] = (0, pda_1.findNftDepositReceiptPDA)({
            nftMint,
        });
        const builder = this.program.methods
            .withdrawNftT22(config)
            .accounts({
            tswap: tswapPda,
            pool: poolPda,
            whitelist,
            nftMint,
            nftDest,
            nftEscrow: escrowPda,
            nftReceipt: receiptPda,
            owner,
            tokenProgram: spl_token_1.TOKEN_2022_PROGRAM_ID,
            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
        });
        const ixs = (0, tensor_common_1.prependComputeIxs)([
            ...(await this.clearDelegate(nftDest, owner)),
            await builder.instruction(),
        ], (0, tensor_common_1.isNullLike)(compute) ? null : compute ?? 0, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            tswapPda,
            tswapBump,
            poolPda,
            poolBump,
            escrowPda,
            escrowBump,
            receiptPda,
            receiptBump,
        };
    }
    // --------------------------------------- WNS
    //main signature owner + payer
    async wnsList({ nftMint, nftSource, owner, price, collectionMint, payer = null, compute = common_1.DEFAULT_XFER_COMPUTE_UNITS, priorityMicroLamports = common_1.DEFAULT_MICRO_LAMPORTS, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [singleListing, singleListingBump] = (0, pda_1.findSingleListingPDA)({
            nftMint,
        });
        const [escrowPda, escrowBump] = (0, pda_1.findNftEscrowPDA)({ nftMint });
        const approveAccount = (0, token2022_2.getApprovalAccount)(nftMint);
        const distribution = (0, token2022_2.getDistributionAccount)(collectionMint);
        const extraMetas = (0, spl_token_1.getExtraAccountMetaAddress)(nftMint, token2022_1.WNS_PROGRAM_ID);
        const builder = this.program.methods.wnsList(price).accounts({
            tswap: tswapPda,
            nftMint,
            nftSource,
            nftEscrow: escrowPda,
            owner,
            singleListing,
            tokenProgram: spl_token_1.TOKEN_2022_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            payer: payer ?? owner,
            approveAccount,
            distribution,
            distributionProgram: token2022_1.WNS_DISTRIBUTION_PROGRAM_ID,
            wnsProgram: token2022_1.WNS_PROGRAM_ID,
            extraMetas,
        });
        const ixs = (0, tensor_common_1.prependComputeIxs)([await builder.instruction()], (0, tensor_common_1.isNullLike)(compute) ? null : compute ?? 0, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            tswapPda,
            tswapBump,
            escrowPda,
            escrowBump,
            singleListing,
            singleListingBump,
        };
    }
    // main signature: owner
    async wnsDelist({ nftMint, nftDest, owner, collectionMint, payer = null, compute = common_1.DEFAULT_XFER_COMPUTE_UNITS, priorityMicroLamports = common_1.DEFAULT_MICRO_LAMPORTS, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [singleListing, singleListingBump] = (0, pda_1.findSingleListingPDA)({
            nftMint,
        });
        const [escrowPda, escrowBump] = (0, pda_1.findNftEscrowPDA)({ nftMint });
        const approveAccount = (0, token2022_2.getApprovalAccount)(nftMint);
        const distribution = (0, token2022_2.getDistributionAccount)(collectionMint);
        const extraMetas = (0, spl_token_1.getExtraAccountMetaAddress)(nftMint, token2022_1.WNS_PROGRAM_ID);
        const builder = this.program.methods.wnsDelist().accounts({
            tswap: tswapPda,
            singleListing,
            nftMint,
            nftDest,
            nftEscrow: escrowPda,
            owner,
            tokenProgram: spl_token_1.TOKEN_2022_PROGRAM_ID,
            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
            payer: payer ?? owner,
            approveAccount,
            distribution,
            distributionProgram: token2022_1.WNS_DISTRIBUTION_PROGRAM_ID,
            wnsProgram: token2022_1.WNS_PROGRAM_ID,
            extraMetas,
        });
        const ixs = (0, tensor_common_1.prependComputeIxs)([
            ...(await this.clearDelegate(nftDest, owner)),
            await builder.instruction(),
        ], (0, tensor_common_1.isNullLike)(compute) ? null : compute ?? 0, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            tswapPda,
            tswapBump,
            escrowPda,
            escrowBump,
            singleListing,
            singleListingBump,
        };
    }
    //main signature: buyer
    async wnsBuySingleListing({ nftMint, nftBuyerAcc, owner, buyer, maxPrice, collectionMint, takerBroker = null, compute = common_1.DEFAULT_XFER_COMPUTE_UNITS, priorityMicroLamports = common_1.DEFAULT_MICRO_LAMPORTS, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [singleListing, singleListingBump] = (0, pda_1.findSingleListingPDA)({
            nftMint,
        });
        const [escrowPda, escrowBump] = (0, pda_1.findNftEscrowPDA)({ nftMint });
        const tSwapAcc = await this.fetchTSwap(tswapPda);
        const approveAccount = (0, token2022_2.getApprovalAccount)(nftMint);
        const distribution = (0, token2022_2.getDistributionAccount)(collectionMint);
        const extraMetas = (0, spl_token_1.getExtraAccountMetaAddress)(nftMint, token2022_1.WNS_PROGRAM_ID);
        const builder = this.program.methods
            .wnsBuySingleListing(maxPrice)
            .accounts({
            tswap: tswapPda,
            singleListing,
            feeVault: tSwapAcc.feeVault,
            nftMint,
            nftBuyerAcc,
            nftEscrow: escrowPda,
            owner,
            buyer,
            tokenProgram: spl_token_1.TOKEN_2022_PROGRAM_ID,
            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            takerBroker: takerBroker ?? tSwapAcc.feeVault,
            approveAccount,
            distribution,
            distributionProgram: token2022_1.WNS_DISTRIBUTION_PROGRAM_ID,
            wnsProgram: token2022_1.WNS_PROGRAM_ID,
            extraMetas,
        });
        const ixs = (0, tensor_common_1.prependComputeIxs)([await builder.instruction()], (0, tensor_common_1.isNullLike)(compute) ? null : compute ?? 0, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            tswapPda,
            tswapBump,
            escrowPda,
            escrowBump,
            singleListing,
            singleListingBump,
        };
    }
    //main signature: buyer
    async wnsBuyNft({ whitelist, nftMint, nftBuyerAcc, owner, buyer, config, maxPrice, collectionMint, marginNr = null, takerBroker = null, compute = common_1.DEFAULT_XFER_COMPUTE_UNITS, priorityMicroLamports = common_1.DEFAULT_MICRO_LAMPORTS, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [poolPda, poolBump] = (0, pda_1.findPoolPDA)({
            tswap: tswapPda,
            owner,
            whitelist,
            delta: config.delta,
            startingPrice: config.startingPrice,
            poolType: (0, types_1.poolTypeU8)(config.poolType),
            curveType: (0, types_1.curveTypeU8)(config.curveType),
        });
        const [escrowPda, escrowBump] = (0, pda_1.findNftEscrowPDA)({ nftMint });
        const [solEscrowPda, solEscrowBump] = (0, pda_1.findSolEscrowPDA)({ pool: poolPda });
        const [receiptPda, receiptBump] = (0, pda_1.findNftDepositReceiptPDA)({
            nftMint,
        });
        const tSwapAcc = await this.fetchTSwap(tswapPda);
        const approveAccount = (0, token2022_2.getApprovalAccount)(nftMint);
        const distribution = (0, token2022_2.getDistributionAccount)(collectionMint);
        const extraMetas = (0, spl_token_1.getExtraAccountMetaAddress)(nftMint, token2022_1.WNS_PROGRAM_ID);
        let marginPda = null;
        let marginBump = null;
        if (!(0, tensor_common_1.isNullLike)(marginNr)) {
            [marginPda, marginBump] = (0, pda_1.findMarginPDA)({
                tswap: tswapPda,
                owner,
                marginNr,
            });
        }
        const builder = this.program.methods
            // TODO: Proofs disabled for buys for now until tx size limit increases.
            .wnsBuyNft(config, maxPrice)
            .accounts({
            tswap: tswapPda,
            feeVault: tSwapAcc.feeVault,
            pool: poolPda,
            whitelist,
            nftMint,
            nftBuyerAcc,
            nftEscrow: escrowPda,
            nftReceipt: receiptPda,
            solEscrow: solEscrowPda,
            owner,
            buyer,
            tokenProgram: spl_token_1.TOKEN_2022_PROGRAM_ID,
            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            marginAccount: marginPda ?? buyer,
            takerBroker: takerBroker ?? tSwapAcc.feeVault,
            approveAccount,
            distribution,
            distributionProgram: token2022_1.WNS_DISTRIBUTION_PROGRAM_ID,
            wnsProgram: token2022_1.WNS_PROGRAM_ID,
            extraMetas,
        });
        const ixs = (0, tensor_common_1.prependComputeIxs)([await builder.instruction()], (0, tensor_common_1.isNullLike)(compute) ? null : compute ?? 0, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            tswapPda,
            tswapBump,
            poolPda,
            poolBump,
            escrowPda,
            escrowBump,
            solEscrowPda,
            solEscrowBump,
            receiptPda,
            receiptBump,
            marginBump,
            marginPda,
        };
    }
    // main signature: owner
    async wnsDepositNft({ whitelist, nftMint, nftSource, owner, config, collectionMint, compute = common_1.DEFAULT_XFER_COMPUTE_UNITS, priorityMicroLamports = common_1.DEFAULT_MICRO_LAMPORTS, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [poolPda, poolBump] = (0, pda_1.findPoolPDA)({
            tswap: tswapPda,
            owner,
            whitelist,
            delta: config.delta,
            startingPrice: config.startingPrice,
            poolType: (0, types_1.poolTypeU8)(config.poolType),
            curveType: (0, types_1.curveTypeU8)(config.curveType),
        });
        const [escrowPda, escrowBump] = (0, pda_1.findNftEscrowPDA)({ nftMint });
        const [receiptPda, receiptBump] = (0, pda_1.findNftDepositReceiptPDA)({
            nftMint,
        });
        const [mintProofPda] = (0, tensor_whitelist_1.findMintProofPDA)({ mint: nftMint, whitelist });
        const approveAccount = (0, token2022_2.getApprovalAccount)(nftMint);
        const distribution = (0, token2022_2.getDistributionAccount)(collectionMint);
        const extraMetas = (0, spl_token_1.getExtraAccountMetaAddress)(nftMint, token2022_1.WNS_PROGRAM_ID);
        const builder = this.program.methods.wnsDepositNft(config).accounts({
            tswap: tswapPda,
            pool: poolPda,
            whitelist,
            nftMint,
            nftSource,
            nftEscrow: escrowPda,
            nftReceipt: receiptPda,
            owner,
            tokenProgram: spl_token_1.TOKEN_2022_PROGRAM_ID,
            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            mintProof: mintProofPda,
            approveAccount,
            distribution,
            distributionProgram: token2022_1.WNS_DISTRIBUTION_PROGRAM_ID,
            wnsProgram: token2022_1.WNS_PROGRAM_ID,
            extraMetas,
        });
        const ixs = (0, tensor_common_1.prependComputeIxs)([await builder.instruction()], (0, tensor_common_1.isNullLike)(compute) ? null : compute ?? 0, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            tswapPda,
            tswapBump,
            poolPda,
            poolBump,
            escrowPda,
            escrowBump,
            receiptPda,
            receiptBump,
            mintProofPda,
        };
    }
    //main signature: seller
    async wnsSellNft({ type, whitelist, nftMint, nftSellerAcc, owner, seller, config, minPrice, collectionMint, marginNr = null, isCosigned = false, cosigner = constants_1.TSWAP_COSIGNER, takerBroker = null, compute = common_1.DEFAULT_XFER_COMPUTE_UNITS, priorityMicroLamports = common_1.DEFAULT_MICRO_LAMPORTS, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [poolPda, poolBump] = (0, pda_1.findPoolPDA)({
            tswap: tswapPda,
            owner,
            whitelist,
            delta: config.delta,
            startingPrice: config.startingPrice,
            poolType: (0, types_1.poolTypeU8)(config.poolType),
            curveType: (0, types_1.curveTypeU8)(config.curveType),
        });
        const [solEscrowPda, solEscrowBump] = (0, pda_1.findSolEscrowPDA)({ pool: poolPda });
        const ownerAtaAcc = (0, spl_token_1.getAssociatedTokenAddressSync)(nftMint, owner, true, spl_token_1.TOKEN_2022_PROGRAM_ID);
        const [escrowPda, escrowBump] = (0, pda_1.findNftEscrowPDA)({ nftMint });
        const [receiptPda, receiptBump] = (0, pda_1.findNftDepositReceiptPDA)({ nftMint });
        const [mintProofPda] = (0, tensor_whitelist_1.findMintProofPDA)({ mint: nftMint, whitelist });
        const tSwapAcc = await this.fetchTSwap(tswapPda);
        const approveAccount = (0, token2022_2.getApprovalAccount)(nftMint);
        const distribution = (0, token2022_2.getDistributionAccount)(collectionMint);
        const extraMetas = (0, spl_token_1.getExtraAccountMetaAddress)(nftMint, token2022_1.WNS_PROGRAM_ID);
        let marginPda = null;
        let marginBump = null;
        if (!(0, tensor_common_1.isNullLike)(marginNr)) {
            [marginPda, marginBump] = (0, pda_1.findMarginPDA)({
                tswap: tswapPda,
                owner,
                marginNr,
            });
        }
        //1.optional cosigner
        const cosigned = [];
        if (isCosigned && type === "token") {
            cosigned.push({
                pubkey: cosigner,
                isSigner: true,
                isWritable: false,
            });
        }
        const shared = {
            tswap: tswapPda,
            feeVault: tSwapAcc.feeVault,
            pool: poolPda,
            whitelist,
            nftMint,
            nftSellerAcc,
            solEscrow: solEscrowPda,
            mintProof: mintProofPda,
            owner,
            seller,
        };
        const { method, accounts } = type === "trade"
            ? {
                method: this.program.methods.wnsSellNftTradePool,
                accounts: {
                    nftEscrow: escrowPda,
                    nftReceipt: receiptPda,
                },
            }
            : {
                method: this.program.methods.wnsSellNftTokenPool,
                accounts: {
                    ownerAtaAcc,
                    associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
                },
            };
        // TODO: Proofs passed through PDA instead of ix b/c of tx limit size.
        // const builder = method(config as any, proof, minPrice)
        const builder = method(config, minPrice)
            .accounts({
            shared,
            tokenProgram: spl_token_1.TOKEN_2022_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            marginAccount: marginPda ?? seller,
            takerBroker: takerBroker ?? tSwapAcc.feeVault,
            approveAccount,
            distribution,
            distributionProgram: token2022_1.WNS_DISTRIBUTION_PROGRAM_ID,
            wnsProgram: token2022_1.WNS_PROGRAM_ID,
            extraMetas,
            ...accounts,
        })
            .remainingAccounts(cosigned);
        const ixs = (0, tensor_common_1.prependComputeIxs)([await builder.instruction()], (0, tensor_common_1.isNullLike)(compute) ? null : compute ?? 0, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            tswapPda,
            tswapBump,
            poolPda,
            poolBump,
            solEscrowPda,
            solEscrowBump,
            ownerAtaAcc,
            escrowPda,
            escrowBump,
            receiptPda,
            receiptBump,
            marginPda,
            marginBump,
        };
    }
    // main signature: owner
    async wnsWithdrawNft({ whitelist, nftMint, nftDest, owner, config, collectionMint, compute = common_1.DEFAULT_XFER_COMPUTE_UNITS, priorityMicroLamports = common_1.DEFAULT_MICRO_LAMPORTS, }) {
        const [tswapPda, tswapBump] = (0, pda_1.findTSwapPDA)({});
        const [poolPda, poolBump] = (0, pda_1.findPoolPDA)({
            tswap: tswapPda,
            owner,
            whitelist,
            delta: config.delta,
            startingPrice: config.startingPrice,
            poolType: (0, types_1.poolTypeU8)(config.poolType),
            curveType: (0, types_1.curveTypeU8)(config.curveType),
        });
        const [escrowPda, escrowBump] = (0, pda_1.findNftEscrowPDA)({ nftMint });
        const [receiptPda, receiptBump] = (0, pda_1.findNftDepositReceiptPDA)({
            nftMint,
        });
        const approveAccount = (0, token2022_2.getApprovalAccount)(nftMint);
        const distribution = (0, token2022_2.getDistributionAccount)(collectionMint);
        const extraMetas = (0, spl_token_1.getExtraAccountMetaAddress)(nftMint, token2022_1.WNS_PROGRAM_ID);
        const builder = this.program.methods
            .wnsWithdrawNft(config)
            .accounts({
            tswap: tswapPda,
            pool: poolPda,
            whitelist,
            nftMint,
            nftDest,
            nftEscrow: escrowPda,
            nftReceipt: receiptPda,
            owner,
            tokenProgram: spl_token_1.TOKEN_2022_PROGRAM_ID,
            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            approveAccount,
            distribution,
            distributionProgram: token2022_1.WNS_DISTRIBUTION_PROGRAM_ID,
            wnsProgram: token2022_1.WNS_PROGRAM_ID,
            extraMetas,
        });
        const ixs = (0, tensor_common_1.prependComputeIxs)([
            ...(await this.clearDelegate(nftDest, owner)),
            await builder.instruction(),
        ], (0, tensor_common_1.isNullLike)(compute) ? null : compute ?? 0, priorityMicroLamports);
        return {
            builder,
            tx: {
                ixs,
                extraSigners: [],
            },
            tswapPda,
            tswapBump,
            poolPda,
            poolBump,
            escrowPda,
            escrowBump,
            receiptPda,
            receiptBump,
        };
    }
    // --------------------------------------- helper methods
    // remove delegate if set, else a pNFT transfer will fail
    async clearDelegate(nftDest, owner) {
        let destAtaInfo = null;
        // putting inside a try statement because a token account might not exist onchain and this would lead to errors
        try {
            destAtaInfo = await (0, spl_token_1.getAccount)(this.program.provider.connection, nftDest);
        }
        catch { }
        if (!!destAtaInfo?.delegate) {
            return [(0, spl_token_1.createRevokeInstruction)(nftDest, owner)];
        }
        return [];
    }
    async getTswapRent() {
        return await (0, tensor_common_1.getRent)(this.program.provider.connection, this.program.account.tSwap);
    }
    async getPoolRent() {
        return await (0, tensor_common_1.getRent)(this.program.provider.connection, this.program.account.pool);
    }
    async getMarginAccountRent() {
        return await (0, tensor_common_1.getRent)(this.program.provider.connection, this.program.account.marginAccount);
    }
    async getSingleListingRent() {
        return await (0, tensor_common_1.getRent)(this.program.provider.connection, this.program.account.singleListing);
    }
    async getNftDepositReceiptRent() {
        return await (0, tensor_common_1.getRent)(this.program.provider.connection, this.program.account.nftDepositReceipt);
    }
    async getNftAuthorityRent() {
        return await (0, tensor_common_1.getRent)(this.program.provider.connection, this.program.account.nftAuthority);
    }
    async getTokenAcctRent() {
        return await (0, spl_token_1.getMinimumBalanceForRentExemptAccount)(this.program.provider.connection);
    }
    async getImmutableTokenAcctRent() {
        const accountLen = (0, spl_token_1.getAccountLen)([spl_token_1.ExtensionType.ImmutableOwner]);
        return await this.program.provider.connection.getMinimumBalanceForRentExemption(accountLen);
    }
    async getTokenAcctRentForMint(mint, programId) {
        /* TODO: currently using fixed extensions since WNS uses extensions that are not
                 yet supported by the spl library.
    
        const mintAccount = await getMint(
          this.program.provider.connection,
          mint,
          undefined,
          programId
        );
        const accountLen = getAccountLenForMint(mintAccount);
        */
        const accountLen = (0, spl_token_1.getAccountLen)([spl_token_1.ExtensionType.TransferHookAccount]);
        return await this.program.provider.connection.getMinimumBalanceForRentExemption(accountLen);
    }
    async getSolEscrowRent() {
        return await (0, tensor_common_1.getRent)(this.program.provider.connection, this.program.account.solEscrow);
    }
    async getApproveRent() {
        return await this.program.provider.connection.getMinimumBalanceForRentExemption((0, token2022_1.getApproveAccountLen)());
    }
    getError(name) {
        //@ts-ignore (throwing weird ts errors for me)
        return this.program.idl.errors.find((e) => e.name === name);
    }
    getErrorCodeHex(name) {
        return (0, tensor_common_1.hexCode)(this.getError(name).code);
    }
    // --------------------------------------- parsing raw transactions
    /** This only works for the latest IDL. This is intentional: otherwise we'll need to switch/case all historical deprecated ixs downstream. */
    parseIxs(tx) {
        return (0, tensor_common_1.parseAnchorIxs)({
            tx,
            coder: this.coder,
            eventParser: this.eventParser,
            programId: this.program.programId,
        });
    }
    getPoolConfig(ix) {
        // No "default": this ensures we explicitly think about how to handle new ixs.
        switch (ix.ix.name) {
            case "initUpdateTswap":
            case "withdrawTswapFees":
            case "initMarginAccount":
            case "closeMarginAccount":
            case "depositMarginAccount":
            case "withdrawMarginAccount":
            case "withdrawMarginAccountCpi":
            case "withdrawMarginAccountCpiTcomp":
            case "withdrawMarginAccountCpiTlock":
            case "attachPoolToMargin":
            case "detachPoolFromMargin":
            case "takeSnipe":
            case "list":
            case "delist":
            case "buySingleListing":
            case "editSingleListing":
            case "listT22":
            case "delistT22":
            case "buySingleListingT22":
            case "wnsList":
            case "wnsDelist":
            case "wnsBuySingleListing":
                return null;
            case "editPool": {
                const config = ix.ix.data.newConfig;
                return (0, types_1.castPoolConfigAnchor)(config);
            }
            case "initPool":
            case "closePool":
            case "depositNft":
            case "withdrawNft":
            case "depositSol":
            case "withdrawSol":
            case "withdrawMmFee":
            case "buyNft":
            case "sellNftTokenPool":
            case "sellNftTradePool":
            case "depositNftT22":
            case "withdrawNftT22":
            case "buyNftT22":
            case "sellNftTokenPoolT22":
            case "sellNftTradePoolT22":
            case "wnsDepositNft":
            case "wnsWithdrawNft":
            case "wnsBuyNft":
            case "wnsSellNftTokenPool":
            case "wnsSellNftTradePool":
            case "setPoolFreeze":
            case "editPoolInPlace":
            case "reallocPool": {
                const config = ix.ix.data.config;
                return (0, types_1.castPoolConfigAnchor)(config);
            }
        }
    }
    getSolAmount(ix) {
        switch (ix.ix.name) {
            case "buyNft":
            case "sellNftTradePool":
            case "sellNftTokenPool":
            case "takeSnipe":
            case "buySingleListing":
            case "buyNftT22":
            case "sellNftTokenPoolT22":
            case "sellNftTradePoolT22":
            case "buySingleListingT22":
            case "wnsBuyNft":
            case "wnsBuySingleListing":
            case "wnsSellNftTokenPool":
            case "wnsSellNftTradePool": {
                // NB: the actual sell price includes the "MM fee" (really a spread).
                const event = ix.events.find((e) => e.name === "BuySellEvent");
                if (!event)
                    return null;
                return event.data.currentPrice.sub(event.data.mmFee);
            }
            case "delist":
            case "delistT22":
            case "wnsDelist": {
                const event = ix.events.find((e) => e.name === "DelistEvent");
                if (!event)
                    return null;
                return event.data.currentPrice;
            }
            case "depositSol":
            case "withdrawSol":
            case "withdrawMmFee":
            case "depositMarginAccount":
            case "withdrawMarginAccount":
            case "withdrawMarginAccountCpi":
            case "withdrawMarginAccountCpiTcomp":
            case "withdrawMarginAccountCpiTlock":
            case "withdrawTswapFees":
            case "detachPoolFromMargin":
                return ix.ix.data.lamports;
            case "list":
            case "listT22":
            case "wnsList":
            case "editSingleListing":
                return ix.ix.data.price;
            case "initUpdateTswap":
            case "initPool":
            case "closePool":
            case "depositNft":
            case "withdrawNft":
            case "editPool":
            case "editPoolInPlace":
            case "reallocPool":
            case "initMarginAccount":
            case "closeMarginAccount":
            case "setPoolFreeze":
            case "attachPoolToMargin":
            case "depositNftT22":
            case "withdrawNftT22":
            case "wnsDepositNft":
            case "wnsWithdrawNft":
                return null;
        }
    }
    getFeeAmount(ix) {
        switch (ix.ix.name) {
            // No "default": this ensures we explicitly think about how to handle new ixs.
            case "buyNft":
            case "sellNftTradePool":
            case "sellNftTokenPool":
            case "takeSnipe":
            case "buySingleListing":
            case "buyNftT22":
            case "sellNftTradePoolT22":
            case "sellNftTokenPoolT22":
            case "buySingleListingT22":
            case "wnsBuyNft":
            case "wnsSellNftTradePool":
            case "wnsSellNftTokenPool":
            case "wnsBuySingleListing":
                // TODO: Think of a better way to handle multiple events.
                const event = ix.events.find((e) => e.name === "BuySellEvent");
                if (!event)
                    return null;
                return event.data.tswapFee.add(event.data.creatorsFee);
            case "list":
            case "delist":
            case "initUpdateTswap":
            case "withdrawTswapFees":
            case "initPool":
            case "closePool":
            case "depositNft":
            case "withdrawNft":
            case "depositSol":
            case "withdrawSol":
            case "withdrawMmFee":
            case "editPool":
            case "editPoolInPlace":
            case "reallocPool":
            case "initMarginAccount":
            case "closeMarginAccount":
            case "depositMarginAccount":
            case "withdrawMarginAccount":
            case "withdrawMarginAccountCpi":
            case "withdrawMarginAccountCpiTcomp":
            case "withdrawMarginAccountCpiTlock":
            case "attachPoolToMargin":
            case "detachPoolFromMargin":
            case "setPoolFreeze":
            case "editSingleListing":
            case "listT22":
            case "delistT22":
            case "depositNftT22":
            case "withdrawNftT22":
            case "wnsList":
            case "wnsDelist":
            case "wnsDepositNft":
            case "wnsWithdrawNft":
                return null;
        }
    }
    // FYI: accounts under InstructioNDisplay is the space-separated capitalized
    // version of the fields for the corresponding #[Accounts].
    // eg sol_escrow -> "Sol Escrow', or tswap -> "Tswap"
    // shared.sol_escrow -> "Shared > Sol Escrow"
    getAccountByName(ix, name) {
        // We use endsWith since composite nested accounts (eg shared.sol_escrow)
        // will prefix it as "Shared > Sol Escrow"
        return ix.formatted?.accounts.find((acc) => acc.name?.endsWith(name));
    }
    static uuidToBuffer = (uuid) => {
        return Buffer.from(uuid.replaceAll("-", "")).toJSON().data;
    };
}
exports.TensorSwapSDK = TensorSwapSDK;
//# sourceMappingURL=sdk.js.map