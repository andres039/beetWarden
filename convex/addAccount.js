import { mutation } from "./_generated/server";

export default mutation(async ({ db, auth }, account) => {
  const identity = await auth.getUserIdentity();

  if (account._id) {
    const accountIsSaved = await db
      .query("accounts")
      .filter((q) => q.eq(q.field("_id"), account._id))
      .unique();
    await db.patch(accountIsSaved._id, account);
    return;
  }

  const acc = { ...account, owner_id: identity.tokenIdentifier };
  db.insert("accounts", acc);

});
