import { getExtraAccountMetaAddress, getExtraAccountMetas, resolveExtraAccountMeta, } from "@solana/spl-token";
import { PublicKey, } from "@solana/web3.js";
export async function getTransferHookExtraAccounts(connection, mint, instruction, tansferHookProgramId, commitment) {
    const address = getExtraAccountMetaAddress(mint, tansferHookProgramId);
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
    for (const extraAccountMeta of getExtraAccountMetas(account)) {
        extraMetas.push(await resolveExtraAccountMeta(connection, extraAccountMeta, instruction.keys, instruction.data, instruction.programId));
    }
    // add the extra account meta
    extraMetas.push({
        pubkey: address,
        isSigner: false,
        isWritable: false,
    });
    return extraMetas;
}
// ------------ WNS
export const WNS_DISTRIBUTION_PROGRAM_ID = new PublicKey("diste3nXmK7ddDTs1zb6uday6j4etCa9RChD8fJ1xay");
export const WNS_PROGRAM_ID = new PublicKey("wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM");
export const getApprovalAccount = (mint) => {
    const [approvalAccount] = PublicKey.findProgramAddressSync([Buffer.from("approve-account"), mint.toBuffer()], WNS_PROGRAM_ID);
    return approvalAccount;
};
export const getDistributionAccount = (collection) => {
    const [distributionAccount] = PublicKey.findProgramAddressSync([collection.toBuffer()], WNS_DISTRIBUTION_PROGRAM_ID);
    return distributionAccount;
};
export const getApproveAccountLen = () => {
    // discriminator + slot
    return 8 + 8;
};
//# sourceMappingURL=token2022.js.map