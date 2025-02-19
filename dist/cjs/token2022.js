"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApproveAccountLen = exports.getDistributionAccount = exports.getApprovalAccount = exports.WNS_PROGRAM_ID = exports.WNS_DISTRIBUTION_PROGRAM_ID = exports.getTransferHookExtraAccounts = void 0;
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
async function getTransferHookExtraAccounts(connection, mint, instruction, tansferHookProgramId, commitment) {
    const address = (0, spl_token_1.getExtraAccountMetaAddress)(mint, tansferHookProgramId);
    const account = await connection.getAccountInfo(address, commitment);
    const extraMetas = [
        {
            pubkey: tansferHookProgramId,
            isSigner: false,
            isWritable: false,
        },
    ];
    // if we don't have the account, no extra accounts to add
    if (account == null) {
        return extraMetas;
    }
    for (const extraAccountMeta of (0, spl_token_1.getExtraAccountMetas)(account)) {
        extraMetas.push(await (0, spl_token_1.resolveExtraAccountMeta)(connection, extraAccountMeta, instruction.keys, instruction.data, instruction.programId));
    }
    // add the extra account meta
    extraMetas.push({
        pubkey: address,
        isSigner: false,
        isWritable: false,
    });
    return extraMetas;
}
exports.getTransferHookExtraAccounts = getTransferHookExtraAccounts;
// ------------ WNS
exports.WNS_DISTRIBUTION_PROGRAM_ID = new web3_js_1.PublicKey("diste3nXmK7ddDTs1zb6uday6j4etCa9RChD8fJ1xay");
exports.WNS_PROGRAM_ID = new web3_js_1.PublicKey("wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM");
const getApprovalAccount = (mint) => {
    const [approvalAccount] = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("approve-account"), mint.toBuffer()], exports.WNS_PROGRAM_ID);
    return approvalAccount;
};
exports.getApprovalAccount = getApprovalAccount;
const getDistributionAccount = (collection) => {
    const [distributionAccount] = web3_js_1.PublicKey.findProgramAddressSync([collection.toBuffer()], exports.WNS_DISTRIBUTION_PROGRAM_ID);
    return distributionAccount;
};
exports.getDistributionAccount = getDistributionAccount;
const getApproveAccountLen = () => {
    // discriminator + slot
    return 8 + 8;
};
exports.getApproveAccountLen = getApproveAccountLen;
//# sourceMappingURL=token2022.js.map