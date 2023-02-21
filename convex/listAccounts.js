import { query } from "./_generated/server";

export default query(async ({ db, auth }) => {
  const identity = await auth.getUserIdentity();
  return await db
    .query("accounts")
    .filter((q) => q.eq(q.field("owner_id"), identity.tokenIdentifier))
    .collect();
});
